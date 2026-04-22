import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

export default function Starfield({ count = 2000 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorChoices = [
      new THREE.Color('#ffffff'), // white
      new THREE.Color('#00f0ff'), // neon blue
      new THREE.Color('#b026ff'), // neon violet
      new THREE.Color('#050505'), // dim
    ]

    for (let i = 0; i < count; i++) {
      // spread stars far and wide
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group>
      {/* Original static/slow rotating starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Dynamic drifting particles */}
      <Sparkles count={300} scale={50} size={1.5} speed={0.4} opacity={0.6} color="#00f0ff" />
      <Sparkles count={300} scale={50} size={1.5} speed={0.4} opacity={0.6} color="#b026ff" />
      <Sparkles count={300} scale={50} size={2} speed={0.2} opacity={0.8} color="#ffffff" />
      
      {/* Distant moving stars */}
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
    </group>
  )
}

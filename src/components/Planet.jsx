import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const OrbitingSkill = ({ radius, speed, color, label, offset = 0 }) => {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    // Orbit around Y axis
    ref.current.position.x = Math.sin(t) * radius
    ref.current.position.z = Math.cos(t) * radius
    // Add slight vertical wave
    ref.current.position.y = Math.sin(t * 2) * 0.5
  })

  return (
    <group ref={ref}>
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </Sphere>
      <Html distanceFactor={10} center>
        <div className="px-3 py-1 glassmorphism rounded-full border border-white/20 text-white text-sm font-bold tracking-wider pointer-events-none whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  )
}

const DecorativeParticle = ({ radius, speed, color, offset = 0, size = 0.05 }) => {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.x = Math.sin(t) * radius
    ref.current.position.z = Math.cos(t) * radius
    ref.current.position.y = Math.cos(t * 1.5) * (radius * 0.5)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} />
    </mesh>
  )
}

export default function Planet({ scrollY }) {
  const planetRef = useRef()
  const groupRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Antigravity vertical bobbing & constant rotation
    if (planetRef.current) {
      planetRef.current.position.y = Math.sin(t * 1.5) * 0.2;
      planetRef.current.rotation.y += 0.005;
      planetRef.current.rotation.x += 0.002;
    }

    // Scroll-linked position and scale mapping
    if (groupRef.current && scrollY) {
      const currentScroll = scrollY.get();
      // Assume the hero section is roughly equal to window innerHeight
      const maxScroll = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 500;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      
      // We want to move it to the top right of the viewport
      const targetX = (viewport.width / 2) - 2.5; // right edge - padding
      const targetY = (viewport.height / 2) - 2.5; // top edge - padding
      const targetZ = -2; // push slightly back
      
      const currentX = THREE.MathUtils.lerp(0, targetX, progress);
      const currentY = THREE.MathUtils.lerp(0, targetY, progress);
      const currentZ = THREE.MathUtils.lerp(0, targetZ, progress);
      
      // Scale down as it moves to corners
      const targetScale = THREE.MathUtils.lerp(1, 0.35, progress);

      groupRef.current.position.set(currentX, currentY, currentZ);
      groupRef.current.scale.setScalar(targetScale);
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={planetRef}>
        {/* Core Sun Light casting light on orbiters */}
        <pointLight intensity={3} color="#ffaa00" distance={20} decay={2} />
        
        {/* Core Sun */}
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial 
            color="#ff4400" 
            emissive="#ffbb00"
            emissiveIntensity={2}
            roughness={0.4}
            metalness={0.1}
            distort={0.4} 
            speed={3} 
            wireframe={false}
          />
        </Sphere>
        
        {/* Sun inner flare */}
        <Sphere args={[2.05, 32, 32]}>
           <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </Sphere>

        {/* Outer Solar Corona / Heat Glow */}
        <Sphere args={[2.2, 32, 32]}>
          <meshBasicMaterial color="#ff4400" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </Sphere>
        <Sphere args={[2.5, 32, 32]}>
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </Sphere>

        {/* Orbiting Skills */}
        <OrbitingSkill radius={3.2} speed={1.2} color="#ff3333" label="Java" offset={0} />
        <OrbitingSkill radius={3.6} speed={1.1} color="#68a063" label="Node.js" offset={1.5} />
        <OrbitingSkill radius={4.0} speed={1.0} color="#00f0ff" label="Three.js" offset={0.5} />
        <OrbitingSkill radius={4.4} speed={0.9} color="#22aaff" label="Python" offset={2} />
        <OrbitingSkill radius={4.8} speed={0.8} color="#e34c26" label="HTML" offset={3.5} />
        <OrbitingSkill radius={5.2} speed={0.7} color="#38bdf8" label="Tailwind" offset={1.0} />
        <OrbitingSkill radius={5.6} speed={0.6} color="#00ffcc" label="React" offset={4} />
        <OrbitingSkill radius={6.0} speed={0.5} color="#0055ff" label="Framer" offset={5.5} />
        <OrbitingSkill radius={6.4} speed={0.4} color="#f7df1e" label="JS" offset={2.5} />

        {/* Pure Decorative Particles for extra visual density */}
        <DecorativeParticle radius={3.0} speed={1.5} color="#ffaa00" offset={0} />
        <DecorativeParticle radius={3.5} speed={-1.2} color="#ffffff" offset={2} />
        <DecorativeParticle radius={4.0} speed={1.8} color="#ff4400" offset={4} />
        <DecorativeParticle radius={4.5} speed={-0.8} color="#00f0ff" offset={1} />
        <DecorativeParticle radius={5.0} speed={1.1} color="#ffcc00" offset={3} />
        <DecorativeParticle radius={5.5} speed={-1.5} color="#b026ff" offset={5} />
        <DecorativeParticle radius={6.0} speed={0.7} color="#ffffff" offset={0.5} />
      </group>
    </group>
  )
}

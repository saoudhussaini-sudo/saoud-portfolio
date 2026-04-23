import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Planet from './components/Planet'
import Starfield from './components/Starfield'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  
  // Track continuous page scroll
  const { scrollY } = useScroll();
  // Smooth out the scroll value
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsClient(true);
    // Force scroll to top on reload to avoid jumpy planet placement
    window.scrollTo(0, 0);
  }, []);

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="relative w-full text-white">
      {/* 3D Background Canvas - fixed and behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 10]} intensity={2} color="#b026ff" />
            <directionalLight position={[-10, 10, 10]} intensity={2} color="#00f0ff" />
            <pointLight position={[0, -5, 5]} intensity={1} color="#ffffff" />
            
            <Starfield />
            {/* The planet needs pointer-events auto to allow rotation, 
                we manage raycasting globally or manually if needed, 
                but since it moves behind UI we can keep it pointer-events-none 
                and just auto-rotate, or enable it if the user wants strictly interactive. 
                For "orbiting" elements, they'll animate automatically. */}
            <Planet scrollY={smoothScrollY} />
          </Suspense>
        </Canvas>
      </div>

      {/* DOM Content (Foreground) */}
      <div className="relative z-10 w-full overflow-hidden">
        <MusicPlayer />
        <Navbar />
        <main className="flex flex-col">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#111',
          color: '#fff',
          border: '1px solid #333',
        }
      }}/>
    </div>
  )
}

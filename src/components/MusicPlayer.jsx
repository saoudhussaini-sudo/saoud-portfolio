import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

export const tracks = [
  { title: "Ethereal Journey", src: "/saoud-portfolio/music/muc1.mp3" },
  { title: "Cyber Pulse", src: "/saoud-portfolio/music/muc2.mp3" },
  { title: "Midnight Neon", src: "/saoud-portfolio/music/muc3.mp3" }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3); // Default slightly lower volume
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const isConnectedRef = useRef(false);

  // Initialize Web Audio API for visualizer
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64; 

      if (audioRef.current && !isConnectedRef.current) {
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
          isConnectedRef.current = true;
        } catch (error) {
          console.error("Audio routing error:", error);
        }
      }
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  // Listen for the first user interaction to autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        initAudio();
        if (audioRef.current) {
          audioRef.current.volume = volume;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => console.log("Autoplay pending interaction:", err));
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('pointerdown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, [hasInteracted, volume]);

  const handleNextTrack = (e) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevTrack = (e) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Audio play error:", err));
      }
    }
  }, [currentTrackIndex]);

  // Handle Play / Pause
  const togglePlay = (e) => {
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    initAudio();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Canvas visualizer loop
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate average volume for glow effect
    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
    setAudioLevel(average);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      // Scale down slightly to fit canvas height comfortably
      barHeight = (dataArray[i] / 255) * canvas.height * 0.8; 

      // Neon gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, 'rgba(176, 38, 255, 0.8)'); // Purple
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0.8)'); // Cyan

      ctx.fillStyle = gradient;
      
      // Center the bars vertically or draw from bottom
      const y = canvas.height - barHeight - 2;
      
      // Draw rounded bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth - 1, barHeight + 2, 2);
      ctx.fill();

      x += barWidth;
    }

    requestRef.current = requestAnimationFrame(drawWaveform);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(drawWaveform);
    } else {
      cancelAnimationFrame(requestRef.current);
      if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw flat line when paused
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.roundRect(0, canvasRef.current.height / 2 - 1, canvasRef.current.width, 2, 2);
          ctx.fill();
          
          setAudioLevel(0);
      }
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Dynamic glow based on audio level
  const glowIntensity = Math.min(audioLevel / 50, 1) * 15;
  const shadowValue = isPlaying 
    ? `0 0 ${10 + glowIntensity}px rgba(176, 38, 255, 0.3), 0 0 ${20 + glowIntensity}px rgba(0, 240, 255, 0.2)`
    : '0 0 10px rgba(0,0,0,0.3)';

  return (
    <motion.div 
      className="fixed top-24 right-6 z-[100] flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef}
        src={tracks[currentTrackIndex].src} 
        onEnded={handleNextTrack}
        crossOrigin="anonymous"
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, width: 0, x: 10 }}
            animate={{ opacity: 1, width: 'auto', x: 0 }}
            exit={{ opacity: 0, width: 0, x: 10 }}
            className="overflow-hidden flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-2 px-3 h-auto"
            style={{ boxShadow: shadowValue }}
          >
            <div className="flex flex-col gap-2 min-w-[160px] py-1">
              <span className="text-xs text-[#00f0ff] font-medium truncate text-center w-full px-2 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                {tracks[currentTrackIndex].title}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevTrack} 
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <SkipBack size={14} />
                </button>
                <button 
                  onClick={handleNextTrack} 
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <SkipForward size={14} />
                </button>
                <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                <button 
                  onClick={toggleMute}
                  className="text-white/60 hover:text-[#00f0ff] transition-colors p-1"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                    if (audioRef.current) audioRef.current.volume = val;
                  }}
                  className="w-full accent-[#00f0ff] bg-white/20 h-1 rounded-full appearance-none outline-none cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex items-center h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-1 shadow-lg"
        style={{ boxShadow: shadowValue }}
        whileHover={{ scale: 1.02 }}
      >
        <button 
          onClick={togglePlay} 
          className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white group"
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" className="group-hover:text-[#00f0ff] transition-colors" />
          ) : (
            <Play size={16} fill="currentColor" className="ml-1 group-hover:text-[#00f0ff] transition-colors" />
          )}
        </button>
        
        <div className="w-16 h-8 mx-2 flex items-center justify-center pointer-events-none">
          <canvas ref={canvasRef} width="64" height="32" className="block w-full h-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { personalData } from "../data/personal";

interface MarqueeProps {
  baseVelocity?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  baseVelocity = 1.5,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionFactor = useRef<number>(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * 45;

    // React to scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = reverse ? 1 : -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = reverse ? -1 : 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap around seamlessly
  const x = useTransform(baseX, (v) => `${(v % 33.333) - 33.333}%`);

  const marqueeText = personalData.marqueeItems;
  const repeated = [...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText];

  return (
    <div className={`relative w-full overflow-hidden border-y border-black/10 py-6 md:py-8 bg-white/40 backdrop-blur-sm select-none ${className}`}>
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-6">
            <span className="font-extrabold tracking-tighter text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] uppercase">
              {item}
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#111111]/30" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { useCursorStore } from '../store';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { active, text } = useCursorStore();

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference">
      <motion.div
        ref={cursorRef}
        className="absolute -top-4 -left-4 flex items-center justify-center rounded-full border border-white bg-white/10 backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: active ? (text ? 80 : 64) : 32,
          height: active ? (text ? 80 : 64) : 32,
          marginLeft: active ? (text ? -24 : -16) : 0,
          marginTop: active ? (text ? -24 : -16) : 0,
        }}
        animate={{
          scale: active ? 1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {active && text && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-sans font-bold uppercase tracking-widest text-white mix-blend-normal"
          >
            {text}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        ref={dotRef}
        className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"
        animate={{
          scale: active ? 0 : 1,
          opacity: active ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

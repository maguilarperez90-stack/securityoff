'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const borderX = useSpring(cursorX, springConfig);
  const borderY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Inner Dot */}
      <motion.div
        className="fixed w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(52,168,90,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer Glow / Pro Frame */}
      <motion.div
        className="fixed w-10 h-10 border border-primary/20 rounded-lg"
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.4 : 1,
          borderColor: isHovering ? 'rgba(52, 168, 90, 0.8)' : 'rgba(52, 168, 90, 0.2)',
          borderRadius: isHovering ? '20px' : '8px',
        }}
        style={{
          x: borderX,
          y: borderY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Target Lines */}
      {['top', 'bottom', 'left', 'right'].map((dir) => (
        <motion.div
          key={dir}
          className="fixed bg-primary/40"
          animate={{
            width: dir === 'left' || dir === 'right' ? (isHovering ? 8 : 4) : 1,
            height: dir === 'top' || dir === 'bottom' ? (isHovering ? 8 : 4) : 1,
            opacity: isHovering ? 1 : 0.4,
          }}
          style={{
            x: borderX,
            y: borderY,
            translateX: dir === 'left' ? '-150%' : dir === 'right' ? '50%' : '-50%',
            translateY: dir === 'top' ? '-150%' : dir === 'bottom' ? '50%' : '-50%',
          }}
        />
      ))}
    </div>
  );
};

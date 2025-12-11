import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useCursor } from '../contexts/CursorContext';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const { cursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variants: Variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(34, 211, 238, 0.15)', // Cyan tint
      borderColor: '#22d3ee',
      borderWidth: 1,
      transition: { type: 'spring', stiffness: 500, damping: 28 },
    },
    link: {
      height: 64,
      width: 64,
      backgroundColor: 'rgba(139, 92, 246, 0.2)', // Purple tint
      borderColor: '#8b5cf6',
      borderWidth: 2,
      transition: { type: 'spring', stiffness: 400, damping: 20 },
    },
    text: {
      height: 48,
      width: 4,
      borderRadius: '2px',
      backgroundColor: '#f3f4f6',
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      transition: { type: 'spring', stiffness: 500, damping: 28 },
    },
    hidden: {
      height: 0,
      width: 0,
      opacity: 0,
    }
  };

  const dotVariants: Variants = {
    default: {
      height: 8,
      width: 8,
      backgroundColor: '#22d3ee',
    },
    link: {
      height: 8,
      width: 8,
      backgroundColor: '#8b5cf6',
    },
    text: {
      height: 0,
      width: 0,
    },
    hidden: {
      height: 0,
      width: 0,
      opacity: 0,
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-solid"
          style={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          variants={variants}
          animate={cursorVariant}
        />
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
           style={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
          }}
          variants={dotVariants}
          animate={cursorVariant}
        />
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
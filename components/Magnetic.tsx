

import React, { useRef, ReactElement, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: ReactElement;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(element, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.8,
        ease: 'power4.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // FIX: The original `cloneElement` approach had a type error and a runtime logic issue
  // because it attempted to pass a `ref` to functional components that don't forward refs.
  // Wrapping the children in a `span` provides a reliable DOM element for GSAP to target,
  // resolving both the compile-time error and the animation bug.
  // Using `inline-block` ensures the wrapper behaves correctly for positioning and animation.
  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
};

export default Magnetic;
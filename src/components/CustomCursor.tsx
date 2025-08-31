'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const previousPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let isTouch = false;
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Calculate velocity
      velocityRef.current.x = mouseX - previousPosRef.current.x;
      velocityRef.current.y = mouseY - previousPosRef.current.y;
      previousPosRef.current.x = mouseX;
      previousPosRef.current.y = mouseY;
      
      // Move cursor dot immediately
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
      
      // Move outer cursor with smoothing
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.45, ease: 'power3.out' });
      
      // Apply velocity-based rotation and scale
      const velocity = Math.sqrt(
        velocityRef.current.x ** 2 + velocityRef.current.y ** 2
      );
      const rotation = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);
      const scale = Math.min(1 + velocity * 0.008, 1.3);
      
      gsap.to(cursor, {
        rotation: rotation,
        scaleX: scale,
        scaleY: 1 / scale,
        duration: 0.25,
      });
    };
    
    // Hover handlers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('a, button, [data-cursor="hover"]')) {
        isHovering = true;
        gsap.to(cursor, {
          scale: 1.5,
          borderWidth: 6,
          borderColor: '#ed6a2f',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
        });
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('a, button, [data-cursor="hover"]')) {
        isHovering = false;
        gsap.to(cursor, {
          scale: 1,
          borderWidth: 6,
          borderColor: '#fff',
          backgroundColor: 'transparent',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
        });
      }
    };
    
    // Hide/show cursor
    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Touch support: hide custom cursor on touch
    const handleTouchStart = () => {
      isTouch = true;
      gsap.set([cursor, cursorDot], { opacity: 0 });
      document.body.style.cursor = 'auto';
    };
    const handleTouchEnd = () => {
      isTouch = false;
      document.body.style.cursor = 'none';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      {/* Outer cursor */}
      <div
        ref={cursorRef}
        className="fixed w-24 h-24 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          border: '6px solid #fff',
          borderRadius: '50%',
          mixBlendMode: 'exclusion',
        }}
      />
      
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-6 h-6 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background: '#fff',
          mixBlendMode: 'exclusion',
        }}
      />
    </>
  );
}
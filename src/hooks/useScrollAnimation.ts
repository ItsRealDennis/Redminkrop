import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
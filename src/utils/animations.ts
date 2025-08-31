import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.fromTo(element, 
    { 
      opacity: 0, 
      y: 50 
    }, 
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      delay,
      ease: "power2.out" 
    }
  );
};

export const fadeInScale = (element: string | Element, delay = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay,
      ease: "back.out(1.7)"
    }
  );
};

export const planetHover = (element: Element) => {
  return gsap.to(element, { 
    scale: 1.1, 
    duration: 0.3, 
    ease: "power2.out" 
  });
};

export const planetUnhover = (element: Element) => {
  return gsap.to(element, { 
    scale: 1, 
    duration: 0.3, 
    ease: "power2.out" 
  });
};

export const staggerFadeIn = (elements: string | Element[], staggerAmount = 0.1) => {
  return gsap.fromTo(elements,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerAmount,
      ease: "power2.out"
    }
  );
};

export const createScrollTrigger = (
  element: string | Element,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options: ScrollTrigger.Vars = {}
) => {
  return ScrollTrigger.create({
    trigger: element,
    animation,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    ...options
  });
};
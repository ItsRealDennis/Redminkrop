
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    
    if (!section || !heading || !subheading || !paragraph || !cta) return;
    
    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    // Animate decorative lines
    lineRefs.current.forEach((line, index) => {
      tl.from(line, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power4.inOut',
      }, index * 0.1);
    });
    
    // Split and animate heading
    const headingSplit = new SplitType(heading, {
      types: 'lines,words',
      lineClass: 'overflow-hidden',
    });
    
    tl.from(headingSplit.words, {
      y: 120,
      rotationX: -80,
      autoAlpha: 0,
      stagger: { amount: 0.9, from: 'start' },
      duration: 1.3,
    }, '-=0.8');
    
    // Animate subheading
    tl.from(subheading, { y: 40, autoAlpha: 0, duration: 0.9 }, '-=0.8');
    
    // Animate paragraph
    tl.from(paragraph, { y: 30, autoAlpha: 0, duration: 0.9 }, '-=0.6');
    
    // Animate CTA with magnetic effect setup
    tl.from(cta, { scale: 0, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5');
    
    // Removed scroll-based pinning and parallax per feedback
    
    // Magnetic button effect
    const magneticStrength = 0.3;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      
      if (distance < 200) {
        const pullX = deltaX * magneticStrength;
        const pullY = deltaY * magneticStrength;
        
        gsap.to(cta, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };
    
    const handleMouseLeave = () => {
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    cta.addEventListener('mouseleave', handleMouseLeave);

    // Pointer-driven parallax layers
    const parallaxLayers = [
      { el: heading, depth: 0.30 },
      { el: subheading, depth: 0.18 },
      { el: paragraph, depth: 0.14 },
      { el: cta, depth: 0.35 },
    ];

    const handlePointerMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxLayers.forEach(({ el, depth }) => {
        gsap.to(el, {
          x: relX * depth * 30,
          y: relY * depth * 30,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    };
    section.addEventListener('mousemove', handlePointerMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cta.removeEventListener('mouseleave', handleMouseLeave);
      section.removeEventListener('mousemove', handlePointerMove);
      headingSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleCtaClick = () => {
    gsap.to(window, {
      scrollTo: { y: window.innerHeight, autoKill: false },
      duration: 1.5,
      ease: 'power4.inOut',
    });
  };
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-8 py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={(el) => { if (el) lineRefs.current[0] = el; }}
          className="absolute top-20 left-0 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
        />
        <div
          ref={(el) => { if (el) lineRefs.current[1] = el; }}
          className="absolute top-40 right-0 w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
        />
        <div
          ref={(el) => { if (el) lineRefs.current[2] = el; }}
          className="absolute bottom-32 left-10 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
        />

        {/* Soft glows */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(closest-side, rgba(255,51,102,0.15), transparent 70%)' }} />
        <div className="absolute bottom-0 right-10 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(closest-side, rgba(120,180,255,0.12), transparent 70%)' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <p
          ref={subheadingRef}
          className="font-accent text-sm uppercase tracking-[0.3em] text-gray-400 mb-8"
        >
          RedMinKrop præsenterer
        </p>
        
        <h1
          ref={headingRef}
          className="font-display text-7xl md:text-8xl leading-[0.9] tracking-tight mb-8"
        >
          Fremtidens<br />
          <span className="font-light italic">sundhedsløsning</span>
        </h1>
        
        <p
          ref={paragraphRef}
          className="font-body text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          En revolutionerende digital oplevelse der transformerer
          måden virksomheder tænker medarbejdersundhed på.
          Ingen downloads. Ingen PDFs. Kun resultater.
        </p>
        
        <button
          ref={ctaRef}
          onClick={handleCtaClick}
          className="btn relative overflow-hidden group"
          data-cursor="hover"
        >
          <span className="relative z-10">Udforsk universet</span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out-expo origin-left" />
          <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            Udforsk universet
          </span>
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-20 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
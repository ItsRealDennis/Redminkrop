'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplitType from 'split-type';
import './HeroRMKPremium.css';

gsap.registerPlugin(ScrollToPlugin);

export default function HeroRMKPremium() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    const heart = heartRef.current;
    
    if (!section || !heading || !subheading || !paragraph || !cta) return;
    
    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    // 1) Animate decorative lines
    lineRefs.current.forEach((line, index) => {
      tl.from(line, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power4.inOut',
      }, index * 0.1);
    });
    
    // 2) Split and animate heading
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
    
    // 3) Animate subheading
    tl.from(subheading, { y: 40, autoAlpha: 0, duration: 0.9 }, '-=0.8');
    
    // Animate heart
    if (heart) {
      tl.from(heart, { scale: 0, autoAlpha: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.6');
    }
    
    // 4) Animate paragraph
    tl.from(paragraph, { y: 30, autoAlpha: 0, duration: 0.9 }, '-=0.5');
    
    // 5) Animate CTA with magnetic effect setup
    tl.from(cta, { scale: 0, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5');
    
    // 6) Magnetic button effect
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
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cta.removeEventListener('mouseleave', handleMouseLeave);
      headingSplit.revert();
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
    <section ref={sectionRef} className="rmk-hero-premium">
      {/* Decorative elements */}
      <div className="rmk-hero-decor">
        <div
          ref={(el) => { if (el) lineRefs.current[0] = el; }}
          className="rmk-decor-line rmk-decor-line--1"
        />
        <div
          ref={(el) => { if (el) lineRefs.current[1] = el; }}
          className="rmk-decor-line rmk-decor-line--2"
        />
        <div
          ref={(el) => { if (el) lineRefs.current[2] = el; }}
          className="rmk-decor-line rmk-decor-line--3"
        />

        {/* Soft glows - RMK Orange */}
        <div className="rmk-glow rmk-glow--1" />
        <div className="rmk-glow rmk-glow--2" />
      </div>
      
      {/* Content */}
      <div className="rmk-hero-container">
        <p
          ref={subheadingRef}
          className="rmk-hero-subtitle"
        >
          REDMINKROP præsenterer
        </p>
        
        <h1
          ref={headingRef}
          className="rmk-hero-title"
        >
          FREMTIDENS<br />
          <span className="rmk-hero-title-accent">SUNDHEDSLØSNING</span>
        </h1>
        
        <div ref={heartRef} className="rmk-hero-heart">
          <span>🧡</span>
        </div>
        
        <p
          ref={paragraphRef}
          className="rmk-hero-text"
        >
          En revolutionerende digital oplevelse der transformerer
          måden virksomheder tænker medarbejdersundhed på.
          Ingen downloads. Ingen PDFs. Kun resultater.
        </p>
        
        <button
          ref={ctaRef}
          onClick={handleCtaClick}
          className="rmk-hero-button"
          data-cursor="hover"
        >
          <span className="rmk-button-text">UDFORSK UNIVERSET</span>
          <div className="rmk-button-bg" />
          <span className="rmk-button-text-hover">UDFORSK UNIVERSET</span>
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="rmk-scroll-indicator">
        <div className="rmk-scroll-line" />
      </div>
    </section>
  );
}
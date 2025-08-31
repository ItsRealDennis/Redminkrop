'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './HeroRMK.css';

gsap.registerPlugin(ScrollToPlugin);

export default function HeroRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    
    if (!section || !heading || !subheading || !paragraph || !cta) return;
    
    // Simple fade in animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(subheading, { y: 20, autoAlpha: 0, duration: 0.8 })
      .from(heading, { y: 30, autoAlpha: 0, duration: 1 }, '-=0.4')
      .from(paragraph, { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.4')
      .from(cta, { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.4');
    
    return () => {
      tl.kill();
    };
  }, []);
  
  const handleCtaClick = () => {
    const timelineSection = document.querySelector('.rmk-timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section ref={sectionRef} className="rmk-hero">
      {/* RMK Logo/Brand Mark */}
      <div className="rmk-brand-mark">
        <div className="rmk-logo-circle">
          <svg className="rmk-logo-icon" viewBox="0 0 100 100" fill="none">
            {/* Simplified silhouette of stretching person */}
            <path d="M50 20 C40 25, 35 35, 35 45 L35 65 C35 70, 40 75, 45 75 L55 75 C60 75, 65 70, 65 65 L65 45 C65 35, 60 25, 50 20 M35 45 L20 30 M65 45 L80 30" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="rmk-hero-content">
        <p ref={subheadingRef} className="rmk-hero-subheading">
          REDMINKROP PRÆSENTERER
        </p>
        
        <h1 ref={headingRef} className="rmk-hero-heading">
          FREMTIDENS<br />
          <span className="rmk-hero-heading-accent">SUNDHEDSLØSNING</span>
        </h1>
        
        <p ref={paragraphRef} className="rmk-hero-description">
          En revolutionerende digital oplevelse der transformerer
          måden virksomheder tænker medarbejdersundhed på.
          Målbare resultater. Dokumenteret effekt.
        </p>
        
        <button
          ref={ctaRef}
          onClick={handleCtaClick}
          className="rmk-hero-cta"
        >
          UDFORSK VORES HISTORIE
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="rmk-scroll-indicator">
        <div className="rmk-scroll-line" />
        <span className="rmk-scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
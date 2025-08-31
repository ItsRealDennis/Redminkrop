'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CompanySize } from '@/data/tilbudData';
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface PlanetSelectionProps {
  onSelectSize: (size: CompanySize) => void;
}

export default function PlanetSelection({ onSelectSize }: PlanetSelectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const grid = gridRef.current;
    
    if (!section || !title || !subtitle) return;
    
    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });
    
    tl.from(title, {
      y: 100,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    .from(subtitle, {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8');
    
    if (grid) {
      gsap.from(grid.children, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleSelect = (size: CompanySize) => {
    gsap.to(sectionRef.current, {
      scale: 1.02,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.in',
      onComplete: () => {
        onSelectSize(size);
        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
      },
    });
  };

  const Card = ({
    label,
    size,
    color,
    description,
  }: { label: string; size: CompanySize; color: string; description: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [8, -8]);
    const rotateY = useTransform(x, [-50, 50], [-8, 8]);
    const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      x.set(Math.max(-50, Math.min(50, relX / 4)));
      y.set(Math.max(-50, Math.min(50, relY / 4)));
    };
    const onMouseLeave = () => { x.set(0); y.set(0); };

    return (
      <motion.button
        onClick={() => handleSelect(size)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: springX as unknown as MotionValue<number>, rotateY: springY as unknown as MotionValue<number> }}
        className="group relative rounded-3xl p-8 text-left glass-modern glow transition-transform duration-300 will-change-transform"
        data-cursor="hover"
      >
        {/* Border glow */}
        <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: `radial-gradient(140px 140px at 20% -10%, ${color}55, transparent 60%)`
        }} />
        <div className="glass-specular" />
        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 mb-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-accent uppercase tracking-[0.2em] text-gray-400 text-xs">{label}</span>
        </div>
        <h3 className="relative z-10 font-display text-3xl md:text-4xl mb-3">{size === 'small' ? 'Under 100' : size === 'medium' ? '100–500' : '500+'} ansatte</h3>
        <p className="relative z-10 text-gray-400 mb-6">{description}</p>
        {/* CTA row */}
        <div className="relative z-10 flex items-center gap-3 text-sm text-gray-300">
          <span>Vælg pakke</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </motion.button>
    );
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-8"
    >
      {/* Content */}
      <div className="relative z-10 text-center mb-12">
        <h2 
          ref={titleRef}
          className="font-display text-6xl md:text-7xl mb-6 opacity-0"
        >
          Vælg jeres <span className="italic font-light">størrelse</span>
        </h2>
        <p 
          ref={subtitleRef}
          className="font-body text-xl text-gray-400 opacity-0"
        >
          Vælg den pakke der matcher jeres virksomhed
        </p>
      </div>

      {/* Premium selector cards */}
      <div ref={gridRef} className="relative z-10 grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Card label="Startup" size="small" color="#10b981" description="Under 100 medarbejdere — hurtig implementering" />
        <Card label="Vækst" size="medium" color="#3b82f6" description="100–500 medarbejdere — målbar ROI" />
        <Card label="Enterprise" size="large" color="#8b5cf6" description="500+ medarbejdere — skræddersyet løsning" />
      </div>
    </section>
  );
}
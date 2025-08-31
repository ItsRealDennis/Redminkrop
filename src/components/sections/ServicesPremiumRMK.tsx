'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesPremiumRMK.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'health-screening',
    number: '01',
    title: 'SUNDHEDSSCREENING',
    tagline: 'Forebyggelse gennem data',
    description: 'Omfattende helbredstjek med avancerede målinger og personlig sundhedsprofil.',
    stats: { value: '87%', label: 'Færre sygedage' },
    image: '🫀',
  },
  {
    id: 'ergonomi',
    number: '02',
    title: 'ERGONOMI',
    tagline: 'Optimal arbejdsplads',
    description: 'Professionel vurdering og optimering af arbejdsstationer.',
    stats: { value: '92%', label: 'Mindre smerte' },
    image: '💺',
  },
  {
    id: 'fitness',
    number: '03',
    title: 'FITNESS & TRÆNING',
    tagline: 'Styrke og velvære',
    description: 'Skræddersyede træningsprogrammer leveret on-site eller digitalt.',
    stats: { value: '3x', label: 'Mere energi' },
    image: '💪',
  },
  {
    id: 'mental-health',
    number: '04',
    title: 'MENTAL SUNDHED',
    tagline: 'Trivsel og balance',
    description: 'Støtte til stresshåndtering, mindfulness og mental robusthed.',
    stats: { value: '76%', label: 'Højere trivsel' },
    image: '🧠',
  }
];

export default function ServicesPremiumRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;
    
    if (!title || !cards) return;

    // Title animation
    const titleWords = title.querySelectorAll('.word');
    gsap.fromTo(titleWords, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        }
      }
    );

    // Cards horizontal scroll (desktop only)
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      const cardElements = cards.querySelectorAll('.service-card');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cards,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.round(progress * (services.length - 1));
            setActiveIndex(index);
          }
        }
      });

      // Create horizontal scroll effect
      cardElements.forEach((card, index) => {
        if (index === 0) return; // First card stays in place
        
        tl.fromTo(card,
          { xPercent: 100 },
          { xPercent: 0, ease: 'none' },
          index * 0.25
        );
      });
    } else {
      // Simple fade-in for mobile
      const cardElements = cards.querySelectorAll('.service-card');
      gsap.fromTo(cardElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    gsap.to(card, {
      '--mouse-x': `${x}%`,
      '--mouse-y': `${y}%`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="services-premium">
      <div className="services-header">
        <p className="services-label">WHAT WE OFFER</p>
        <h2 ref={titleRef} className="services-title">
          <span className="word">PREMIUM</span>{' '}
          <span className="word">HEALTH</span>{' '}
          <span className="word accent">SERVICES</span>
        </h2>
      </div>

      <div ref={cardsRef} className="services-cards mobile-stack">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`service-card ${activeIndex === index ? 'active' : ''}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background Number */}
            <div className="card-bg-number">{service.number}</div>
            
            {/* Main Content */}
            <div className="card-content">
              <div className="card-header">
                <span className="card-number">{service.number}</span>
                <div className="card-icon">{service.image}</div>
              </div>
              
              <h3 className="card-title">{service.title}</h3>
              <p className="card-tagline">{service.tagline}</p>
              <p className="card-description">{service.description}</p>
              
              <div className="card-stat">
                <span className="stat-value">{service.stats.value}</span>
                <span className="stat-label">{service.stats.label}</span>
              </div>
              
              <button className="card-cta">
                <span>EXPLORE</span>
                <div className="cta-arrow">→</div>
              </button>
            </div>

            {/* Hover Gradient */}
            <div className="card-gradient" />
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="services-progress">
        {services.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${activeIndex === index ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="services-cta-section">
        <h3 className="cta-title">
          READY TO TRANSFORM YOUR WORKPLACE?
        </h3>
        <p className="cta-subtitle">
          Let's create a custom health solution for your team
        </p>
        <button className="cta-main-button">
          <span>GET STARTED</span>
          <span className="button-bg" />
        </button>
      </div>
    </section>
  );
}
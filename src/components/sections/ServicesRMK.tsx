'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesRMK.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'health-screening',
    number: '01',
    title: 'SUNDHEDSSCREENING',
    subtitle: 'Forebyggelse gennem data',
    description: 'Omfattende helbredstjek med avancerede målinger og personlig sundhedsprofil. Vi identificerer risikofaktorer før de bliver problemer.',
    features: [
      'Blodtryk & puls analyse',
      'Body composition scanning',
      'Stress & søvn evaluering',
      'Personlig rapport'
    ],
    color: 'var(--rmk-orange)',
    icon: '♥',
  },
  {
    id: 'ergonomi',
    number: '02',
    title: 'ERGONOMI',
    subtitle: 'Optimal arbejdsplads',
    description: 'Professionel vurdering og optimering af arbejdsstationer. Reducer smerter og øg produktiviteten gennem korrekt indretning.',
    features: [
      'Arbejdspladsanalyse',
      'Personlig tilpasning',
      'Øvelsesprogrammer',
      'Opfølgning'
    ],
    color: 'var(--rmk-blue)',
    icon: '⚡',
  },
  {
    id: 'fitness',
    number: '03',
    title: 'FITNESS & TRÆNING',
    subtitle: 'Styrke og velvære',
    description: 'Skræddersyede træningsprogrammer leveret on-site eller digitalt. Fra yoga til højintensiv træning - alt efter jeres behov.',
    features: [
      'On-site gruppetræning',
      'Online live sessions',
      'Personlige programmer',
      'Progress tracking'
    ],
    color: 'var(--rmk-yellow)',
    icon: '💪',
  },
  {
    id: 'mental-health',
    number: '04',
    title: 'MENTAL SUNDHED',
    subtitle: 'Trivsel og balance',
    description: 'Støtte til stresshåndtering, mindfulness og mental robusthed. Skab en arbejdsplads hvor medarbejdere trives.',
    features: [
      'Stress workshops',
      'Mindfulness træning',
      '1:1 coaching',
      'Krisehjælp'
    ],
    color: 'var(--rmk-dark-orange)',
    icon: '🧠',
  }
];

export default function ServicesRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const cards = cardRefs.current;
    
    // Stagger cards on scroll
    cards.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    gsap.to(card, {
      rotationY: deltaX * 10,
      rotationX: -deltaY * 10,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="rmk-services">
      <div className="rmk-services-container">
        {/* Header */}
        <div className="rmk-services-header">
          <p className="rmk-services-subtitle">HVAD VI TILBYDER</p>
          <h2 className="rmk-services-title">
            VORES <span className="rmk-accent">SERVICES</span>
          </h2>
          <p className="rmk-services-intro">
            Komplette sundhedsløsninger der skaber målbare resultater. 
            Hver service er designet til at maksimere ROI og medarbejdertrivsel.
          </p>
        </div>

        {/* Service Cards */}
        <div className="rmk-services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => { if (el) cardRefs.current[index] = el }}
              className="rmk-service-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                handleMouseLeave(index);
              }}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              {/* Card Number */}
              <span className="rmk-service-number">{service.number}</span>
              
              {/* Card Icon */}
              <div className="rmk-service-icon">
                <span>{service.icon}</span>
              </div>

              {/* Card Content */}
              <div className="rmk-service-content">
                <h3 className="rmk-service-title">{service.title}</h3>
                <p className="rmk-service-subtitle">{service.subtitle}</p>
                <p className="rmk-service-description">{service.description}</p>
                
                {/* Features */}
                <ul className="rmk-service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="rmk-feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect Background */}
              <div className="rmk-service-bg" />
              
              {/* CTA */}
              <button className="rmk-service-cta">
                LÆS MERE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rmk-services-cta">
          <p className="rmk-cta-text">
            Klar til at investere i jeres medarbejderes sundhed?
          </p>
          <button className="rmk-cta-button">
            FÅ EN SKRÆDDERSYET LØSNING
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
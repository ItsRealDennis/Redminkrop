'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PackagesRMK.css';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: 'small',
    size: 'Under 100 ansatte',
    title: 'Startpakken til små virksomheder',
    features: [
      'Basis sundhedsscreening',
      'Kvartalsvis ergonomi-tjek',
      'Digital træningsplatform',
      'Månedlig sundhedsrapport'
    ],
    price: 'Fra 199 kr/medarbejder',
    color: '--rmk-orange',
  },
  {
    id: 'medium',
    size: '100–500 ansatte',
    title: 'Den skalerede sundhedspakke',
    features: [
      'Udvidet sundhedsscreening',
      'Månedlig ergonomi-gennemgang',
      'On-site fitness sessioner',
      'Dedikeret sundhedskonsulent',
      'Detaljeret analytics dashboard'
    ],
    price: 'Fra 149 kr/medarbejder',
    color: '--rmk-blue',
    popular: true,
  },
  {
    id: 'enterprise',
    size: '500+ ansatte',
    title: 'Enterprise sundhedsprogram',
    features: [
      'Komplet sundhedsscreening',
      'Ugentlig on-site support',
      'Skræddersyet wellness program',
      'C-level sundhedsrapportering',
      'API integration',
      '24/7 mental sundhed hotline'
    ],
    price: 'Kontakt for pris',
    color: '--rmk-dark-orange',
  }
];

interface PackagesRMKProps {
  onPackageSelect?: (packageId: string) => void;
}

export default function PackagesRMK({ onPackageSelect }: PackagesRMKProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    
    if (!title) return;

    // Title animation
    gsap.fromTo(title.querySelectorAll('.word'), 
      { 
        y: 100, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        }
      }
    );

    // Cards animation
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 150,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="packages" className="packages-section">
      <div className="packages-container">
        {/* Header */}
        <div className="packages-header">
          <h2 ref={titleRef} className="packages-title">
            <span className="word">VÆLG DEN</span>
            <span className="word accent">LØSNING</span>
            <span className="word">DER PASSER</span>
            <span className="word">TIL JER</span>
          </h2>
          <p className="packages-subtitle">
            Samme kvalitet – forskellige niveauer af dækning og governance.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              ref={el => {cardsRef.current[index] = el}}
              className={`package-card ${pkg.popular ? 'popular' : ''}`}
              style={{ '--accent-color': `var(${pkg.color})` } as React.CSSProperties}
            >
              {pkg.popular && (
                <div className="popular-badge">MEST POPULÆRE</div>
              )}
              
              <div className="package-content">
                <div className="package-header">
                  <p className="package-size">{pkg.size}</p>
                  <h3 className="package-card-title">{pkg.title}</h3>
                </div>

                <div className="package-features">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <div className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="package-footer">
                  <p className="package-price">{pkg.price}</p>
                  <button 
                    className="package-cta"
                    onClick={() => onPackageSelect?.(pkg.id)}
                  >
                    <span>SE PAKKEN</span>
                    <svg className="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Background decoration */}
              <div className="package-bg-decoration">
                <div className="bg-circle" />
                <div className="bg-lines" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="packages-bottom-cta">
          <p className="cta-text">Usikker på hvilken pakke der passer bedst?</p>
          <button className="consultation-button">
            <span>BOOK GRATIS KONSULTATION</span>
            <div className="button-bg" />
          </button>
        </div>
      </div>
    </section>
  );
}
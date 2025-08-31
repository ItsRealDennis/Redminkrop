'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CasesRMK.css';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: 'it-company',
    company: 'TechCorp Danmark',
    type: 'IT-virksomhed',
    employees: '240 ansatte',
    metric: '18',
    metricSign: '-',
    metricUnit: '%',
    mainResult: 'reduktion i sygefravær',
    period: 'Efter 12 måneder med sundhedstjek + ergonomi',
    quote: 'RMK har transformeret vores arbejdskultur. Medarbejderne er sundere, gladere og mere produktive end nogensinde før.',
    author: 'Lars Nielsen',
    position: 'CEO',
    color: '#ed6a2f'
  },
  {
    id: 'production',
    company: 'Nordic Production A/S',
    type: 'Produktionsvirksomhed', 
    employees: '85 ansatte',
    metric: '92',
    metricSign: '',
    metricUnit: '',
    mainResult: 'NPS score',
    period: 'Efter fast massageordning og online træning',
    quote: 'Massageordningen og online træning har gjort en kæmpe forskel. Vores folk elsker det, og vi ser det tydeligt i resultaterne.',
    author: 'Maria Hansen',
    position: 'HR Chef',
    color: '#39bde4'
  },
  {
    id: 'finance',
    company: 'Danske Finans Group',
    type: 'Finansiel virksomhed',
    employees: '1100 ansatte',
    metric: '75',
    metricSign: '',
    metricUnit: '%',
    mainResult: 'medarbejderengagement',
    period: 'Med hybrid-pakke og kvartalsvise KPI-rapporter',
    quote: 'De kvartalsvise KPI-rapporter giver os præcis den indsigt, vi har brug for til at træffe de rigtige beslutninger om medarbejdernes sundhed.',
    author: 'Thomas Andersen',
    position: 'CHRO',
    color: '#d45a29'
  }
];

export default function CasesRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const caseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Scroll-triggered case changes
    caseRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      ScrollTrigger.create({
        trigger: ref,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveCase(index),
        onEnterBack: () => setActiveCase(index),
      });
    });

    // Number counting animation
    caseRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      const metricEl = ref.querySelector('.case-metric-value');
      const targetValue = parseInt(cases[index].metric);
      
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(metricEl,
            { innerText: 0, opacity: 0, scale: 0.8 },
            {
              innerText: targetValue,
              opacity: 1,
              scale: 1,
              duration: 2.5,
              ease: 'power2.out',
              snap: { innerText: 1 }
            }
          );
        },
        once: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="cases" className="cases-section">
      {/* Fixed sidebar indicator */}
      <div className="cases-indicator">
        {cases.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${activeCase === index ? 'active' : ''}`}
            onClick={() => {
              caseRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label={`Go to case ${index + 1}`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="cases-header">
        <h2 className="cases-title">
          <span className="title-line">DOKUMENTEREDE</span>
          <span className="title-line accent">RESULTATER</span>
        </h2>
        <p className="cases-subtitle">
          Tre eksempler på hvordan vi skaber værdi
        </p>
      </div>

      {/* Cases */}
      <div className="cases-list">
        {cases.map((caseItem, index) => (
          <div
            key={caseItem.id}
            ref={el => caseRefs.current[index] = el}
            className="case-section"
            style={{ '--case-color': caseItem.color } as React.CSSProperties}
          >
            <div className="case-container">
              {/* Left side - Company info */}
              <div className="case-info">
                <div className="case-company">
                  <h3 className="company-name">{caseItem.company}</h3>
                  <p className="company-type">{caseItem.type} • {caseItem.employees}</p>
                </div>
                
                <div className="case-quote">
                  <blockquote>{caseItem.quote}</blockquote>
                  <cite>
                    <span className="author-name">{caseItem.author}</span>
                    <span className="author-position">{caseItem.position}</span>
                  </cite>
                </div>
              </div>

              {/* Right side - Result */}
              <div className="case-result">
                <div className="result-metric">
                  <span className="metric-sign">{caseItem.metricSign}</span>
                  <span className="case-metric-value">{caseItem.metric}</span>
                  <span className="metric-unit">{caseItem.metricUnit}</span>
                </div>
                <h4 className="result-label">{caseItem.mainResult}</h4>
                <p className="result-period">{caseItem.period}</p>
              </div>
            </div>

            {/* Background number */}
            <div className="case-bg-number">0{index + 1}</div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="cases-cta-section">
        <div className="cta-container">
          <h3 className="cta-title">Klar til at se lignende resultater?</h3>
          <p className="cta-subtitle">
            Lad os tale om, hvordan vi kan hjælpe jer med at skabe en sundere arbejdsplads
          </p>
          <button className="cta-button">
            <span>BOOK EN UFORPLIGTENDE SAMTALE</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
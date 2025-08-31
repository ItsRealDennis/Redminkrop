'use client';

import { useEffect, useRef } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';
import './Timeline2Column.css';

export default function Timeline2Column() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { rootMargin: '-10% 0px', threshold: 0.1 }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="timeline-section timeline-container">
      <div className="timeline-wrapper">
        <header className="timeline-header">
          <h2 className="timeline-title">
            Vores rejse mod sundere arbejdspladser
          </h2>
          <p className="timeline-subtitle">
            Fra første skridt til målbare resultater — se hvordan vi har skabt værdi for virksomheder gennem årene.
          </p>
        </header>

        <ol className="timeline-list" role="list">
          {TIMELINE_DATA.map((item, index) => (
            <li
              key={item.year}
              ref={(el) => { if (el) itemRefs.current[index] = el; }}
              className="timeline-item"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="timeline-grid">
                {/* Left: Year & Story */}
                <div className="timeline-story">
                  <div className="timeline-year-wrapper">
                    <time 
                      dateTime={item.year.toString()} 
                      className="timeline-year"
                    >
                      {item.year}
                    </time>
                    {item.year === 2025 && (
                      <span className="timeline-future-badge">
                        Fremtiden
                      </span>
                    )}
                  </div>
                  <h3 className="timeline-item-title">
                    {item.title}
                  </h3>
                  <p className="timeline-description">
                    {item.summary}
                  </p>
                  {item.link && (
                    <Link 
                      href={item.link} 
                      className="timeline-link"
                    >
                      <span>Læs mere</span>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>

                {/* Right: Impact & KPIs */}
                <div className="timeline-impact">
                  {item.impact && (
                    <div className="impact-box">
                      <h4 className="impact-label">IMPACT</h4>
                      <p className="impact-text">{item.impact}</p>
                    </div>
                  )}

                  {item.kpis.length > 0 && (
                    <div className="kpi-grid">
                      {item.kpis.map((kpi, kpiIndex) => (
                        <div 
                          key={kpiIndex} 
                          className="kpi-card"
                        >
                          <div className="kpi-value">
                            {kpi.value}<span className="kpi-unit">{kpi.unit}</span>
                          </div>
                          <div className="kpi-label">
                            {kpi.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.quote && (
                    <blockquote className="timeline-quote">
                      <p className="quote-text">
                        "{item.quote.text}"
                      </p>
                      <footer className="quote-author">
                        <cite>
                          <span className="quote-name">{item.quote.author}</span>
                          <span className="quote-role"> — {item.quote.role}</span>
                        </cite>
                      </footer>
                    </blockquote>
                  )}

                  {item.year === 2025 && (
                    <div className="timeline-cta">
                      <p className="cta-text">
                        Bliv en del af vores næste kapitel
                      </p>
                      <Link 
                        href="/kontakt" 
                        className="btn btn-premium"
                      >
                        Book en snak
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              {index < TIMELINE_DATA.length - 1 && (
                <div className="timeline-divider" aria-hidden="true">
                  <div className="divider-line" />
                  <div className="divider-dot" />
                  <div className="divider-line" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
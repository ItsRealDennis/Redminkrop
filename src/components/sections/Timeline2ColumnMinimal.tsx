'use client';

import { useEffect, useRef } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';
import './Timeline2ColumnMinimal.css';

export default function Timeline2ColumnMinimal() {
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
    <section ref={sectionRef} className="timeline-minimal-section">
      <div className="timeline-minimal-wrapper">
        <header className="timeline-minimal-header">
          <h2 className="timeline-minimal-title">
            Vores historie
          </h2>
          <p className="timeline-minimal-subtitle">
            Fra vision til virkelighed — en rejse mod sundere arbejdspladser
          </p>
        </header>

        <div className="timeline-minimal-content">
          {TIMELINE_DATA.map((item, index) => (
            <article
              key={item.year}
              ref={(el) => { if (el) itemRefs.current[index] = el; }}
              className="timeline-minimal-item"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="timeline-minimal-grid">
                {/* Left: Year & Content */}
                <div className="timeline-minimal-main">
                  <time className="timeline-minimal-year" dateTime={item.year.toString()}>
                    {item.year}
                  </time>
                  <h3 className="timeline-minimal-heading">
                    {item.title}
                  </h3>
                  <p className="timeline-minimal-text">
                    {item.summary}
                  </p>
                  
                  {item.quote && (
                    <blockquote className="timeline-minimal-quote">
                      <p>"{item.quote.text}"</p>
                      <cite>
                        {item.quote.author}, {item.quote.role}
                      </cite>
                    </blockquote>
                  )}
                </div>

                {/* Right: Key Metrics Only */}
                <aside className="timeline-minimal-metrics">
                  {item.kpis.length > 0 && (
                    <>
                      {item.kpis.slice(0, 2).map((kpi, idx) => (
                        <div key={idx} className="timeline-minimal-metric">
                          <div className="metric-value">
                            {kpi.value}<span className="metric-unit">{kpi.unit}</span>
                          </div>
                          <div className="metric-label">{kpi.label}</div>
                        </div>
                      ))}
                    </>
                  )}
                  
                  {item.link && (
                    <Link href={item.link} className="timeline-minimal-link">
                      Læs mere →
                    </Link>
                  )}
                </aside>
              </div>
            </article>
          ))}
        </div>

        {/* Simple CTA at the end */}
        <div className="timeline-minimal-cta">
          <p>Klar til at skrive næste kapitel sammen?</p>
          <Link href="/kontakt" className="timeline-minimal-button">
            Start dialogen
          </Link>
        </div>
      </div>
    </section>
  );
}
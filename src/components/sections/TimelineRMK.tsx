'use client';

import { useEffect, useRef, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';
import './TimelineRMK.css';

export default function TimelineRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Parallax effect for year numbers
    const handleScroll = () => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const yearEl = item.querySelector('.rmk-year-bg') as HTMLElement;
        if (yearEl) {
          const scrollProgress = rect.top / window.innerHeight;
          const yOffset = scrollProgress * 40;
          const xOffset = scrollProgress * -20;
          yearEl.style.transform = `translate(${xOffset}px, calc(-50% + ${yOffset}px))`;
        }
      });
    };

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            const index = itemRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="rmk-timeline">
      {/* RMK Brand Progress Indicator */}
      <div className="rmk-progress">
        <div className="rmk-progress-track">
          <div 
            className="rmk-progress-fill" 
            style={{ height: `${((activeIndex + 1) / TIMELINE_DATA.length) * 100}%` }}
          />
        </div>
        {TIMELINE_DATA.map((item, index) => (
          <button
            key={item.year}
            className={`rmk-progress-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            aria-label={`Gå til år ${item.year}`}
          >
            <span className="rmk-progress-year">{item.year}</span>
          </button>
        ))}
      </div>

      {/* Timeline Sections */}
      {TIMELINE_DATA.map((item, index) => (
        <article
          key={item.year}
          ref={(el) => { if (el) itemRefs.current[index] = el; }}
          className="rmk-section"
        >
          {/* Background Year - RMK Style */}
          <div className="rmk-year-bg" aria-hidden="true">
            {item.year}
          </div>

          {/* Content */}
          <div className="rmk-content">
            <div className="rmk-grid">
              {/* Main Content */}
              <div className="rmk-main">
                <div className="rmk-header">
                  <time className="rmk-year-label" dateTime={item.year.toString()}>
                    {item.year}
                  </time>
                  {item.year === 2025 && (
                    <span className="rmk-badge">NÆSTE KAPITEL</span>
                  )}
                </div>

                <h2 className="rmk-title">
                  {item.title.toUpperCase()}
                </h2>

                <p className="rmk-description">
                  {item.summary}
                </p>

                {item.impact && (
                  <div className="rmk-impact">
                    <span className="rmk-impact-icon">→</span>
                    <p>{item.impact}</p>
                  </div>
                )}

                {item.quote && (
                  <blockquote className="rmk-quote">
                    <p>&ldquo;{item.quote.text}&rdquo;</p>
                    <footer>
                      <strong>{item.quote.author}</strong>
                      <span> – {item.quote.role}</span>
                    </footer>
                  </blockquote>
                )}

              </div>

              {/* Metrics Side - RMK Minimal */}
              <aside className="rmk-metrics">
                {item.kpis.slice(0, 2).map((kpi, kpiIndex) => (
                  <div key={kpiIndex} className="rmk-metric">
                    <div className="rmk-metric-value">
                      <span className="rmk-metric-number">{kpi.value}</span>
                      <span className="rmk-metric-unit">{kpi.unit}</span>
                    </div>
                    <div className="rmk-metric-label">{kpi.label.toUpperCase()}</div>
                  </div>
                ))}
              </aside>
            </div>
          </div>

          {/* Section Divider */}
          {index < TIMELINE_DATA.length - 1 && (
            <div className="rmk-divider" aria-hidden="true">
              <div className="rmk-divider-line" />
              <div className="rmk-divider-dot" />
              <div className="rmk-divider-line" />
            </div>
          )}
        </article>
      ))}

    </section>
  );
}
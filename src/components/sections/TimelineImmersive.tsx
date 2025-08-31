'use client';

import { useEffect, useRef, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';
import './TimelineImmersive.css';

export default function TimelineImmersive() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Parallax effect for year numbers
    const handleScroll = () => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const yearEl = item.querySelector('.immersive-year-bg') as HTMLElement;
        if (yearEl) {
          const scrollProgress = rect.top / window.innerHeight;
          const yOffset = scrollProgress * 40;
          const xOffset = scrollProgress * -20; // Subtle horizontal movement
          yearEl.style.transform = `translate(${xOffset}px, calc(-50% + ${yOffset}px))`;
        }
      });
    };

    // Intersection Observer for active section
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
    <section ref={sectionRef} className="immersive-timeline">
      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ height: `${((activeIndex + 1) / TIMELINE_DATA.length) * 100}%` }}
          />
        </div>
        <div className="progress-years">
          {TIMELINE_DATA.map((item, index) => (
            <button
              key={item.year}
              className={`progress-year ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <span className="progress-year-text">{item.year}</span>
              <span className="progress-year-dot" />
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Sections */}
      {TIMELINE_DATA.map((item, index) => (
        <article
          key={item.year}
          ref={(el) => { if (el) itemRefs.current[index] = el; }}
          className="immersive-section"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Background Year */}
          <div className="immersive-year-bg" aria-hidden="true">
            {item.year}
          </div>

          {/* Content Container */}
          <div className="immersive-content">
            <div className="immersive-grid">
              {/* Left: Main Content */}
              <div className="immersive-main">
                <div className="immersive-header">
                  <time className="immersive-year" dateTime={item.year.toString()}>
                    {item.year}
                  </time>
                  {item.year === 2025 && (
                    <span className="immersive-badge">Next Chapter</span>
                  )}
                </div>

                <h2 className="immersive-title">
                  <span className="title-line">{item.title.split(' ').slice(0, -1).join(' ')}</span>
                  <span className="title-line accent">{item.title.split(' ').slice(-1)[0]}</span>
                </h2>

                <p className="immersive-description">
                  {item.summary}
                </p>

                {item.impact && (
                  <p className="immersive-impact-text">
                    {item.impact}
                  </p>
                )}
                
                {item.link && (
                  <Link href={item.link} className="immersive-inline-link">
                    {item.link.includes('/cases') ? 'Se case →' : 
                     item.link.includes('/kontakt') ? 'Kontakt →' : 
                     'Læs mere →'}
                  </Link>
                )}
              </div>

              {/* Right: Metrics & Quote */}
              <aside className="immersive-side">
                <div className="side-content">
                  {/* Show only the most impactful metric */}
                  {item.kpis.length > 0 && (
                    <div className="immersive-metrics">
                      <div className="metric-card">
                        <div className="metric-value">
                          <span className="metric-number">
                            {item.kpis[0].value}
                          </span>
                          <span className="metric-unit">{item.kpis[0].unit}</span>
                        </div>
                        <div className="metric-label">{item.kpis[0].label}</div>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>

          {/* Section Divider */}
          {index < TIMELINE_DATA.length - 1 && (
            <div className="section-divider">
              <div className="divider-line" />
              <div className="divider-circle">
                <div className="divider-pulse" />
              </div>
              <div className="divider-line" />
            </div>
          )}
        </article>
      ))}

      {/* Final CTA Section */}
      <div className="immersive-cta-section">
        <div className="cta-content">
          <h3 className="cta-title">Ready to Transform Your Workplace?</h3>
          <p className="cta-subtitle">
            Join leading companies who've revolutionized their employee wellbeing
          </p>
          <Link href="/kontakt" className="cta-button">
            <span>Begin Your Journey</span>
            <div className="button-glow" />
          </Link>
        </div>
        <div className="cta-bg-pattern" aria-hidden="true" />
      </div>
    </section>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';
import './TimelineUltraMinimal.css';

export default function TimelineUltraMinimal() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const yearEl = item.querySelector('.ultra-year-float') as HTMLElement;
        if (yearEl) {
          const offset = (rect.top / window.innerHeight) * 30;
          yearEl.style.transform = `translateY(${offset}px)`;
        }
      });
    };

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
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
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
    <section ref={sectionRef} className="ultra-timeline">
      {/* Minimal Progress */}
      <div className="ultra-progress">
        {TIMELINE_DATA.map((item, index) => (
          <div
            key={item.year}
            className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        ))}
      </div>

      {/* Timeline Sections */}
      {TIMELINE_DATA.map((item, index) => (
        <article
          key={item.year}
          ref={(el) => { if (el) itemRefs.current[index] = el; }}
          className="ultra-section"
        >
          {/* Floating Year */}
          <div className="ultra-year-float" aria-hidden="true">
            {item.year}
          </div>

          {/* Main Content */}
          <div className="ultra-content">
            <div className="ultra-grid">
              {/* Primary Content */}
              <div className="ultra-primary">
                <time className="ultra-year" dateTime={item.year.toString()}>
                  {item.year}
                </time>

                <h2 className="ultra-title">
                  {item.title}
                </h2>

                <p className="ultra-text">
                  {item.summary}
                </p>

                {item.impact && (
                  <p className="ultra-impact">
                    → {item.impact}
                  </p>
                )}

                {item.quote && (
                  <blockquote className="ultra-quote">
                    <p>{item.quote.text}</p>
                    <cite>— {item.quote.author}</cite>
                  </blockquote>
                )}
              </div>

              {/* Minimal Side Info */}
              <aside className="ultra-aside">
                {/* Only show the most important KPI */}
                {item.kpis.length > 0 && (
                  <div className="ultra-stat">
                    <div className="stat-number">
                      {item.kpis[0].value}{item.kpis[0].unit}
                    </div>
                    <div className="stat-label">{item.kpis[0].label}</div>
                  </div>
                )}

                {item.link && (
                  <Link href={item.link} className="ultra-link">
                    →
                  </Link>
                )}
              </aside>
            </div>
          </div>
        </article>
      ))}

      {/* End Mark */}
      <div className="ultra-end">
        <Link href="/kontakt" className="ultra-cta">
          Next Chapter →
        </Link>
      </div>
    </section>
  );
}
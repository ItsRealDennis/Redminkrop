'use client';

import { useEffect, useRef, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline-data';
import Link from 'next/link';

export default function TimelineYearPills() {
  const [activeYear, setActiveYear] = useState(TIMELINE_DATA[0].year);
  const sectionRefs = useRef<{ [key: number]: HTMLElement }>({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for scroll-triggered year changes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = parseInt(entry.target.getAttribute('data-year') || '');
            if (year) setActiveYear(year);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToYear = (year: number) => {
    const section = sectionRefs.current[year];
    if (section) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const top = section.offsetTop - navHeight - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20">
      {/* Sticky Year Navigation */}
      <div 
        ref={navRef}
        className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          <nav role="navigation" aria-label="Timeline navigation">
            <ul className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
              {TIMELINE_DATA.map((item) => (
                <li key={item.year}>
                  <button
                    onClick={() => scrollToYear(item.year)}
                    className={`
                      px-5 py-2.5 rounded-full font-medium transition-all duration-300
                      ${activeYear === item.year 
                        ? 'bg-brand text-white shadow-lg shadow-brand/25' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    aria-current={activeYear === item.year ? 'true' : 'false'}
                  >
                    <time dateTime={item.year.toString()}>{item.year}</time>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12">
        {TIMELINE_DATA.map((item, index) => (
          <article
            key={item.year}
            ref={(el) => { if (el) sectionRefs.current[item.year] = el; }}
            data-year={item.year}
            className="py-16 md:py-20 border-b border-gray-800 last:border-0"
          >
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="md:col-span-7 space-y-6">
                <header>
                  <div className="flex items-baseline gap-4 mb-4">
                    <time 
                      dateTime={item.year.toString()} 
                      className="font-display text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light"
                    >
                      {item.year}
                    </time>
                    {item.year === 2025 && (
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-light/10 text-brand-light animate-pulse">
                        Næste
                      </span>
                    )}
                  </div>
                  <h2 className="font-accent text-3xl md:text-4xl font-medium text-white mb-4">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {item.summary}
                  </p>
                </header>

                {item.impact && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 text-white">
                    <svg className="w-5 h-5 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-medium">{item.impact}</span>
                  </div>
                )}

                {item.quote && (
                  <blockquote className="pl-6 border-l-4 border-brand/50">
                    <p className="text-lg text-gray-300 italic mb-3">
                      "{item.quote.text}"
                    </p>
                    <footer>
                      <cite className="not-italic text-sm">
                        <span className="font-medium text-white">{item.quote.author}</span>
                        <span className="text-gray-400"> — {item.quote.role}</span>
                      </cite>
                    </footer>
                  </blockquote>
                )}
              </div>

              {/* KPIs & Actions */}
              <div className="md:col-span-5 space-y-6">
                {item.kpis.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Resultater
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {item.kpis.map((kpi, kpiIndex) => (
                        <div 
                          key={kpiIndex} 
                          className="group relative p-5 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-brand/30 transition-all duration-300"
                        >
                          <div className="relative z-10">
                            <div className="text-3xl font-bold text-white mb-1">
                              <span className="count-up" data-target={kpi.value}>
                                {kpi.value}
                              </span>
                              <span className="text-brand-light">{kpi.unit}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                              {kpi.label}
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.link && (
                  <Link 
                    href={item.link} 
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-brand/30 transition-all duration-300 group"
                  >
                    <span className="font-medium text-white">
                      {item.link.includes('/cases') ? 'Se case study' : 
                       item.link.includes('/services') ? 'Udforsk service' :
                       item.link.includes('/kontakt') ? 'Book møde' : 
                       'Læs mere'}
                    </span>
                    <svg className="w-5 h-5 text-brand-light transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}

                {item.year === 2025 && (
                  <div className="p-6 rounded-xl bg-gradient-to-r from-brand/20 to-brand-light/20 border border-brand/30">
                    <h3 className="font-accent text-xl font-medium text-white mb-3">
                      Klar til fremtiden?
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Lad os sammen skabe næste kapitel i jeres sundhedshistorie.
                    </p>
                    <Link 
                      href="/kontakt" 
                      className="btn btn-premium w-full justify-center"
                    >
                      Start dialogen
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
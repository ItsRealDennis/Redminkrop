'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type TimelineItem = {
  year: number;
  title: string;
  description: string;
  future?: boolean;
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  { year: 2019, title: 'Foundation', description: 'RedMinKrop etableres med missionen om datadrevet medarbejdersundhed.' },
  { year: 2020, title: 'Platform v1', description: 'Første version lanceres — sundhedsprofiler og baseline screenings.' },
  { year: 2021, title: 'Scale', description: 'Udvider til større kunder; on-site teams og avancerede rapporter.' },
  { year: 2023, title: 'AI Insights', description: 'Prediktive modeller for sundhedsrisici og målbar ROI.' },
  { year: 2024, title: 'Enterprise Suite', description: 'API-integrationer og global support 24/7.' },
  { year: 2025, title: 'Future', description: 'Din virksomhed her? Kontakt os for at blive del af historien.', future: true },
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    const dot = progressDotRef.current;
    const trail = trailRef.current;
    if (!section || !progress || !dot) return;

    // Progress fill based on section scroll
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: prefersReducedMotion ? false : 0.6,
      onUpdate: (self) => {
        const pct = Math.max(0, Math.min(1, self.progress));
        const heightPct = pct * 100;
        progress.style.height = heightPct + '%';
        dot.style.transform = `translateY(${heightPct}%) translate(-50%, -50%)`;
        dot.style.opacity = '1';
        if (trail) {
          trail.style.transform = `translateY(${heightPct}%) translate(-50%, -50%)`;
          trail.style.opacity = '0.7';
        }
      },
    });

    // Intersection Observer for card reveals and active node state
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            el.classList.add('reveal-in');
            const idx = cardRefs.current.indexOf(el);
            if (idx >= 0) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.3 }
    );

    cardRefs.current.forEach((c, idx) => io.observe(c));

    return () => {
      st.kill();
      io.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_160px_1fr] gap-8 md:gap-12 items-start">
        {/* Left column cards */}
        <div className="space-y-10">
          {TIMELINE_ITEMS.filter((_, i) => i % 2 === 0).map((item, idx) => {
            const index = TIMELINE_ITEMS.findIndex(t => t.year === item.year);
            return (
              <div key={item.year} ref={(el) => { if (el) cardRefs.current[index] = el; }} className="glass-modern p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] reveal-preference">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-4xl md:text-[2.5rem] leading-none font-semibold">{item.year}</span>
                  {item.future && <span className="italic text-brand-light text-sm md:text-base">Aspirational</span>}
                </div>
                <h3 className="font-accent text-lg md:text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
                {item.future && (
                  <div className="mt-4 flex items-center gap-3">
                    <button className="btn btn-premium" data-cursor="hover">Kontakt os</button>
                    <span className="text-gray-400 text-sm">Bliv en del af 2025-kapitlet</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center sticky spine with year ring */}
        <div className="relative">
          <div className="sticky top-[35vh]">
            {/* Spine track */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-[35vh] h-[70vh] w-px" style={{ background: 'linear-gradient(180deg, rgba(20,184,166,0.25), rgba(14,165,233,0.25))' }} aria-hidden="true" />
            {/* Progress fill */}
            <div ref={progressRef} className="absolute left-1/2 -translate-x-1/2 -top-[35vh] w-[3px]" style={{ background: 'linear-gradient(180deg, #14b8a6, #0ea5e9)', height: '0%' }} aria-hidden="true" />
            {/* Trail */}
            <div ref={trailRef} className="timeline-trail" aria-hidden="true" />
            {/* Year ring */}
            <div className="relative mx-auto w-40 h-40 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(closest-side, rgba(6,182,212,0.25), transparent 70%)', boxShadow: '0 0 40px rgba(6,182,212,0.25)' }}>
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-white/15" />
              <div className="relative z-10 text-center">
                <div className="font-accent uppercase tracking-[0.25em] text-gray-400 text-xs">ÅR</div>
                <div className="font-display text-5xl font-semibold">{TIMELINE_ITEMS[activeIndex]?.year}</div>
              </div>
            </div>
            {/* Progress dot positioned along spine within ring height */}
            <div ref={progressDotRef} className="absolute left-1/2 -translate-x-1/2 -top-[35vh] w-3 h-3 rounded-full opacity-0" style={{ background: '#06b6d4', boxShadow: '0 0 20px 6px rgba(6,182,212,0.35)', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />
          </div>
        </div>

        {/* Right column cards */}
        <div className="space-y-10">
          {TIMELINE_ITEMS.filter((_, i) => i % 2 === 1).map((item) => {
            const index = TIMELINE_ITEMS.findIndex(t => t.year === item.year);
            return (
              <div key={item.year} ref={(el) => { if (el) cardRefs.current[index] = el; }} className="glass-modern p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] reveal-preference">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-4xl md:text-[2.5rem] leading-none font-semibold">{item.year}</span>
                  {item.future && <span className="italic text-brand-light text-sm md:text-base">Aspirational</span>}
                </div>
                <h3 className="font-accent text-lg md:text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
                {item.future && (
                  <div className="mt-4 flex items-center gap-3">
                    <button className="btn btn-premium" data-cursor="hover">Kontakt os</button>
                    <span className="text-gray-400 text-sm">Bliv en del af 2025-kapitlet</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



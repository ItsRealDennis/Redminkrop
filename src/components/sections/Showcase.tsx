'use client';

import { useEffect, useRef } from 'react';

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Projekt A',
    description: 'Et imponerende projekt med innovative funktioner og smukt design.',
    image: '/window.svg'
  },
  {
    title: 'Projekt B',
    description: 'En banebrydende løsning, der løfter brugeroplevelsen til nye højder.',
    image: '/globe.svg'
  },
  {
    title: 'Projekt C',
    description: 'En unik implementering, der kombinerer teknologi og kreativitet.',
    image: '/file.svg'
  }
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const heading = section.querySelector('h2.reveal-preference') as HTMLElement | null;
    if (heading) io.observe(heading);
    cardsRef.current.forEach((card: HTMLDivElement) => io.observe(card));

    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 reveal-preference">Vores Projekter</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => { if (el) cardsRef.current[index] = el; }}
              className="glass-modern border border-white/10 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] reveal-preference"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
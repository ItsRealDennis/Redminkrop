'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesModernRMK.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'health-screening',
    number: '01',
    title: 'Sundhedsscreening',
    description: 'Omfattende helbredstjek med avancerede målinger og personlig sundhedsprofil.',
    image: '/images/health-screening.jpg',
  },
  {
    id: 'ergonomi',
    number: '02',
    title: 'Ergonomi',
    description: 'Professionel vurdering og optimering af arbejdsstationer.',
    image: '/images/ergonomi.jpg',
  },
  {
    id: 'fitness',
    number: '03',
    title: 'Fitness & Træning',
    description: 'Skræddersyede træningsprogrammer leveret on-site eller digitalt.',
    image: '/images/fitness.jpg',
  },
  {
    id: 'mental-health',
    number: '04',
    title: 'Mental Sundhed',
    description: 'Støtte til stresshåndtering, mindfulness og mental robusthed.',
    image: '/images/mental-health.jpg',
  }
];

export default function ServicesModernRMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const items = itemsRef.current.filter(Boolean);
    
    if (!header) return;

    // Simple elegant reveal for header
    gsap.fromTo(header,
      { 
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        }
      }
    );

    // Service items animation
    items.forEach((item, index) => {
      const isEven = index % 2 === 0;
      
      // Content animation
      const content = item.querySelector('.service-content');
      const visual = item.querySelector('.service-visual');
      
      gsap.fromTo(content,
        {
          x: isEven ? -100 : 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
          }
        }
      );

      // Visual animation (delayed)
      gsap.fromTo(visual,
        {
          x: isEven ? 100 : -100,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
          }
        }
      );

      // Parallax effect on scroll
      gsap.to(visual, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="services-modern">
      <div className="services-container">
        {/* Redesigned Header */}
        <div ref={headerRef} className="services-header">
          <div className="header-content">
            <span className="header-number">02</span>
            <div className="header-text">
              <h2 className="header-title">Services</h2>
              <p className="header-subtitle">Fire kerneområder der transformerer arbejdspladser</p>
            </div>
          </div>
        </div>

        {/* Services Journey */}
        <div className="services-journey">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => itemsRef.current[index] = el}
              className={`service-block ${index % 2 === 0 ? 'left-aligned' : 'right-aligned'}`}
            >
              <div className="service-content">
                <span className="service-number">{service.number}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-link">
                  Læs mere
                  <span className="link-arrow">→</span>
                </button>
              </div>
              
              <div className="service-visual">
                <div className="visual-shape">
                  <span className="shape-number">{service.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Line */}
        <div className="journey-line"></div>
      </div>
    </section>
  );
}
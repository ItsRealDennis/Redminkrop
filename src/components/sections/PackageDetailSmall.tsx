'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PackageDetailSmall.css';

gsap.registerPlugin(ScrollTrigger);

const packageData = {
  title: 'Startpakken til små virksomheder',
  subtitle: 'Under 100 ansatte',
  description: 'Perfekt til jer, der vil give medarbejderne et sundt fundament – uden kompleksitet.',
  features: [
    {
      icon: '🫀',
      title: 'Sundhedstjek (basis)',
      frequency: '1× årligt',
      description: 'Omfattende helbredsundersøgelse med personlig sundhedsprofil'
    },
    {
      icon: '💺',
      title: 'Ergonomi-rundering',
      frequency: '1× årligt',
      description: 'Professionel gennemgang af arbejdsstationer og anbefalinger'
    },
    {
      icon: '🏃‍♀️',
      title: 'Online morgentræning',
      frequency: '2× pr. uge',
      description: 'Live træningssessioner direkte fra kontoret eller hjemme'
    }
  ],
  impact: {
    mainStat: '10-15%',
    mainLabel: 'lavere sygefravær',
    subStats: [
      { value: '87%', label: 'høj deltagelse' },
      { value: '4.8/5', label: 'medarbejdertilfredshed' },
      { value: '3 mdr', label: 'ROI periode' }
    ]
  },
  pricing: {
    price: '199 kr',
    period: 'pr. medarbejder/måned',
    minEmployees: '20',
    includes: 'Alt inkluderet - ingen skjulte gebyrer'
  }
};

export default function PackageDetailSmall() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [employees, setEmployees] = useState(50);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['health', 'ergonomi', 'training']);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const features = featuresRef.current;
    const impact = impactRef.current;

    if (!hero || !features || !impact) return;

    // Hero animation
    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top 80%',
      }
    })
    .fromTo(hero.querySelector('.package-eyebrow'), 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(hero.querySelector('.package-title'), 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.4'
    )
    .fromTo(hero.querySelector('.package-description'), 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Features animation
    const featureCards = features.querySelectorAll('.feature-card');
    gsap.fromTo(featureCards,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: features,
          start: 'top 80%',
        }
      }
    );

    // Impact animation
    const impactStats = impact.querySelectorAll('.stat-item');
    gsap.fromTo(impactStats,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: impact,
          start: 'top 80%',
        }
      }
    );

    // Parallax effect for background elements
    gsap.to('.hero-bg-text', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="package-detail-small">
      {/* Hero Section */}
      <div ref={heroRef} className="package-hero">
        <div className="hero-bg-text">SMALL</div>
        <div className="hero-container">
          <p className="package-eyebrow">{packageData.subtitle}</p>
          <h1 className="package-title">{packageData.title}</h1>
          <p className="package-description">{packageData.description}</p>
          
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => {
              const pricingSection = document.querySelector('.package-pricing-section');
              pricingSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>SE JERES PRIS</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </button>
            <button className="cta-secondary" onClick={() => {
              const demoSection = document.querySelector('.interactive-demo-section');
              demoSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>PRØV PLATFORMEN</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="package-features-section">
        <div className="features-container">
          <h2 className="section-title">
            <span>HVAD FÅR I MED</span>
            <span className="accent">STARTPAKKEN?</span>
          </h2>
          
          <div className="features-grid">
            {packageData.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-frequency">{feature.frequency}</p>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div ref={impactRef} className="package-impact-section">
        <div className="impact-container">
          <h2 className="section-title">
            <span>DOKUMENTERET</span>
            <span className="accent">EFFEKT</span>
          </h2>
          
          <div className="impact-grid">
            <div className="main-stat">
              <div className="stat-value">{packageData.impact.mainStat}</div>
              <div className="stat-label">{packageData.impact.mainLabel}</div>
              <div className="stat-decoration" />
            </div>
            
            <div className="sub-stats">
              {packageData.impact.subStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="impact-note">
            Høj deltagelse via online platform og målbar reduktion i sygefravær allerede efter 3 måneder.
          </p>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="interactive-demo-section">
        <div className="demo-container">
          <h2 className="section-title">
            <span>OPLEV VORES</span>
            <span className="accent">PLATFORM</span>
          </h2>
          
          <div className="demo-preview">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="browser-url">rmk-health.dk/dashboard</div>
              </div>
              <div className="browser-content">
                <div className="dashboard-preview">
                  <div className="dashboard-header">
                    <h3>Velkommen til RMK Health Platform</h3>
                    <p>50 medarbejdere • 87% deltagelse</p>
                  </div>
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <span className="stat-icon">📊</span>
                      <span className="stat-value">-12%</span>
                      <span className="stat-label">Sygefravær</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">💪</span>
                      <span className="stat-value">92%</span>
                      <span className="stat-label">Træningsdeltagelse</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">😊</span>
                      <span className="stat-value">4.8/5</span>
                      <span className="stat-label">Tilfredshed</span>
                    </div>
                  </div>
                  <div className="demo-features">
                    <div className="feature-preview">
                      <h4>Næste sundhedsscreening</h4>
                      <p>15. februar 2024 • 32 tilmeldte</p>
                    </div>
                    <div className="feature-preview">
                      <h4>Morgentræning i dag</h4>
                      <p>Kl. 07:30 • Online yoga session</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="demo-cta" onClick={() => setShowDemo(true)}>
              <span>START INTERAKTIV DEMO</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Pricing Calculator */}
      <div className="package-pricing-section">
        <div className="pricing-container">
          <h2 className="section-title">
            <span>BEREGN JERES</span>
            <span className="accent">INVESTERING</span>
          </h2>
          
          <div className="pricing-calculator">
            <div className="calculator-input">
              <label>Antal medarbejdere</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={employees} 
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="employee-slider"
                />
                <div className="slider-value">{employees}</div>
              </div>
            </div>
            
            <div className="calculator-result">
              <div className="price-breakdown">
                <div className="price-item">
                  <span>Månedlig investering</span>
                  <span className="price">{(employees * 199).toLocaleString('da-DK')} kr</span>
                </div>
                <div className="price-item">
                  <span>Pr. medarbejder</span>
                  <span className="price">199 kr/md</span>
                </div>
                <div className="price-item highlight">
                  <span>Forventet besparelse (sygefravær)</span>
                  <span className="price savings">{(employees * 450).toLocaleString('da-DK')} kr/md</span>
                </div>
              </div>
              
              <div className="roi-indicator">
                <div className="roi-bar">
                  <div className="roi-fill" style={{ width: '226%' }}></div>
                </div>
                <p className="roi-text">226% ROI efter 3 måneder</p>
              </div>
            </div>
            
            <div className="pricing-ctas">
              <button className="cta-primary" onClick={() => {
                // Simulate booking
                alert('Booking system ville åbne her');
              }}>
                <span>BOOK GRATIS KONSULTATION</span>
                <div className="button-bg" />
              </button>
              <button className="cta-ghost" onClick={() => {
                // Start chat
                alert('Chat med konsulent ville starte her');
              }}>
                <span>CHAT MED OS NU</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
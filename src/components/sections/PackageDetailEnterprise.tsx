'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PackageDetailEnterprise.css';

gsap.registerPlugin(ScrollTrigger);

const packageData = {
  title: 'Enterprise sundhedsprogram',
  subtitle: '500+ ansatte',
  description: 'Komplet sundhedsløsning designet til store organisationer med fokus på skalerbarhed og målbar ROI.',
  features: [
    {
      icon: '🏥',
      title: 'Komplet sundhedsscreening',
      frequency: '4× årligt',
      description: 'Omfattende helbredsundersøgelser inkl. specialister og avancerede tests'
    },
    {
      icon: '👥',
      title: 'Ugentlig on-site support',
      frequency: 'Fast team',
      description: 'Dedikeret sundhedsteam på jeres lokationer hver uge'
    },
    {
      icon: '🎯',
      title: 'Skræddersyet wellness program',
      frequency: 'Customized',
      description: 'Fuldt tilpasset program baseret på jeres medarbejderes behov'
    },
    {
      icon: '📊',
      title: 'C-level sundhedsrapportering',
      frequency: 'Månedligt',
      description: 'Strategisk indsigt og KPIer direkte til ledelsen'
    },
    {
      icon: '🔌',
      title: 'API integration',
      frequency: 'Real-time',
      description: 'Fuld integration med HR, forsikring og andre systemer'
    },
    {
      icon: '☎️',
      title: '24/7 mental sundhed hotline',
      frequency: 'Altid tilgængelig',
      description: 'Professionel psykologisk support døgnet rundt'
    }
  ],
  impact: {
    mainStat: '25-30%',
    mainLabel: 'reduktion i sygefravær',
    subStats: [
      { value: '97%', label: 'medarbejderdeltagelse' },
      { value: '4.95/5', label: 'tilfredshedsscore' },
      { value: '2 mdr', label: 'payback periode' },
      { value: '+25%', label: 'produktivitet' },
      { value: '-18%', label: 'personaleudskiftning' },
      { value: '420%', label: 'årlig ROI' }
    ]
  }
};

export default function PackageDetailEnterprise() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [employees, setEmployees] = useState(1000);
  const [showContactForm, setShowContactForm] = useState(false);

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

    // Features stagger animation
    const featureCards = features.querySelectorAll('.feature-card');
    gsap.fromTo(featureCards,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: features,
          start: 'top 80%',
        }
      }
    );

    // Parallax for background elements
    gsap.to('.hero-bg-gradient', {
      yPercent: 20,
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
    <section ref={sectionRef} className="package-detail-enterprise">
      {/* Hero Section */}
      <div ref={heroRef} className="package-hero enterprise-hero">
        <div className="hero-bg-gradient" />
        <div className="hero-particles" />
        <div className="hero-container">
          <div className="enterprise-badge">
            <span>ENTERPRISE</span>
          </div>
          <p className="package-eyebrow">{packageData.subtitle}</p>
          <h1 className="package-title">{packageData.title}</h1>
          <p className="package-description">{packageData.description}</p>
          
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => setShowContactForm(true)}>
              <span>BOOK STRATEGIMØDE</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="cta-secondary" onClick={() => {
              const caseSection = document.querySelector('.case-studies-section');
              caseSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>SE CASES</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">Enterprise kunder</span>
            </div>
            <div className="stat">
              <span className="stat-value">250K+</span>
              <span className="stat-label">Medarbejdere dækket</span>
            </div>
            <div className="stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">Fornyelses rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="package-features-section">
        <div className="features-container">
          <h2 className="section-title">
            <span>KOMPLET</span>
            <span className="accent">ENTERPRISE LØSNING</span>
          </h2>
          
          <div className="features-list">
            {packageData.features.map((feature, index) => (
              <div key={index} className="feature-card enterprise-feature">
                <div className="feature-number">0{index + 1}</div>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-frequency">{feature.frequency}</p>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-arrow">→</div>
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
            <span className="accent">BUSINESS IMPACT</span>
          </h2>
          
          <div className="impact-grid">
            <div className="primary-impact">
              <div className="impact-metric">
                <span className="metric-value">{packageData.impact.mainStat}</span>
                <span className="metric-label">{packageData.impact.mainLabel}</span>
              </div>
              <div className="impact-visual">
                <div className="impact-graph">
                  <div className="graph-bar before" style={{ height: '100%' }}>
                    <span>Før RMK</span>
                  </div>
                  <div className="graph-bar after" style={{ height: '70%' }}>
                    <span>Efter RMK</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="secondary-impacts">
              {packageData.impact.subStats.map((stat, index) => (
                <div key={index} className="impact-tile">
                  <div className="tile-value">{stat.value}</div>
                  <div className="tile-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="case-studies-section">
        <div className="cases-container">
          <h2 className="section-title">
            <span>SUCCESS</span>
            <span className="accent">STORIES</span>
          </h2>
          
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-logo">NOVO</div>
              <h3>Novo Nordisk</h3>
              <p className="case-stat">-28% sygefravær</p>
              <p className="case-description">
                Implementerede RMK Enterprise for 5.000+ medarbejdere med målbar succes på tværs af alle lokationer.
              </p>
              <button className="case-cta">Læs mere →</button>
            </div>
            
            <div className="case-card">
              <div className="case-logo">MÆRSK</div>
              <h3>A.P. Møller - Mærsk</h3>
              <p className="case-stat">+22% produktivitet</p>
              <p className="case-description">
                Global udrulning af wellness program med særligt fokus på mental sundhed og work-life balance.
              </p>
              <button className="case-cta">Læs mere →</button>
            </div>
            
            <div className="case-card">
              <div className="case-logo">LEGO</div>
              <h3>LEGO Group</h3>
              <p className="case-stat">420% ROI</p>
              <p className="case-description">
                Skræddersyet program der kombinerer fysisk sundhed med kreativitet og innovation.
              </p>
              <button className="case-cta">Læs mere →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Pricing Section */}
      <div className="package-pricing-section enterprise-pricing">
        <div className="pricing-container">
          <h2 className="section-title">
            <span>SKRÆDDERSYET</span>
            <span className="accent">ENTERPRISE AFTALE</span>
          </h2>
          
          <div className="enterprise-calculator">
            <div className="calculator-info">
              <h3>Få et skræddersyet tilbud</h3>
              <p>Vores Enterprise løsninger er 100% tilpasset jeres behov og organisation.</p>
              
              <div className="benefits-list">
                <div className="benefit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rmk-orange)">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Volumrabatter fra 500+ medarbejdere</span>
                </div>
                <div className="benefit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rmk-orange)">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Dedikeret Customer Success Manager</span>
                </div>
                <div className="benefit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rmk-orange)">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>SLA garantier og prioritet support</span>
                </div>
                <div className="benefit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rmk-orange)">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Custom API integrationer</span>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <div className="form-group">
                <label>Antal medarbejdere</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="100"
                    value={employees} 
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="employee-slider"
                  />
                  <div className="slider-value">{employees.toLocaleString('da-DK')}</div>
                </div>
              </div>
              
              <div className="estimated-savings">
                <p className="savings-label">Estimeret årlig besparelse</p>
                <p className="savings-value">{(employees * 8500).toLocaleString('da-DK')} kr</p>
                <p className="savings-note">Baseret på gennemsnitlig ROI fra lignende virksomheder</p>
              </div>
              
              <div className="form-ctas">
                <button className="cta-primary">
                  <span>BOOK STRATEGIMØDE</span>
                  <div className="button-bg" />
                </button>
                <button className="cta-secondary">
                  <span>DOWNLOAD ENTERPRISE GUIDE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
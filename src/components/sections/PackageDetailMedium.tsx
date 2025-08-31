'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './PackageDetailMedium.css';

gsap.registerPlugin(ScrollTrigger);

const packageData = {
  title: 'Den skalerede sundhedspakke',
  subtitle: '100-500 ansatte',
  description: 'Den perfekte balance mellem omfattende sundhedstilbud og skalerbar implementering.',
  features: [
    {
      icon: '🏥',
      title: 'Udvidet sundhedsscreening',
      frequency: '2× årligt',
      description: 'Omfattende helbredsundersøgelse inkl. blodprøver og specialistvurdering'
    },
    {
      icon: '🪑',
      title: 'Månedlig ergonomi-gennemgang',
      frequency: '12× årligt',
      description: 'Løbende optimering af arbejdspladser med professionel ergonom'
    },
    {
      icon: '🏋️',
      title: 'On-site fitness sessioner',
      frequency: '3× pr. uge',
      description: 'Instruktørledede træningshold direkte på arbejdspladsen'
    },
    {
      icon: '👨‍⚕️',
      title: 'Dedikeret sundhedskonsulent',
      frequency: 'Fast tilknyttet',
      description: 'Personlig konsulent der kender jeres virksomhed og behov'
    },
    {
      icon: '📊',
      title: 'Analytics dashboard',
      frequency: 'Real-time',
      description: 'Detaljeret indsigt i sundhedsdata og ROI-målinger'
    }
  ],
  impact: {
    mainStat: '15-20%',
    mainLabel: 'reduktion i sygefravær',
    subStats: [
      { value: '94%', label: 'medarbejderdeltagelse' },
      { value: '4.9/5', label: 'tilfredshedsscore' },
      { value: '2.5 mdr', label: 'payback periode' },
      { value: '+18%', label: 'produktivitet' }
    ]
  },
  pricing: {
    price: '149 kr',
    period: 'pr. medarbejder/måned',
    minEmployees: '100',
    includes: 'Fuld pakke uden ekstra omkostninger'
  }
};

export default function PackageDetailMedium() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [employees, setEmployees] = useState(250);

  useEffect(() => {
    const hero = heroRef.current;
    const features = featuresRef.current;
    const impact = impactRef.current;

    if (!hero || !features || !impact) return;

    // Enhanced Hero animation with text splitting
    const titleText = new SplitType('.package-title', { types: 'chars' });
    const descText = new SplitType('.package-description', { types: 'words' });
    
    gsap.timeline()
    .fromTo(hero.querySelector('.popular-indicator'), 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo(hero.querySelector('.package-eyebrow'), 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.2'
    )
    .fromTo(titleText.chars, 
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out'
      },
      '-=0.4'
    )
    .fromTo(descText.words, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.03,
        ease: 'power2.out'
      },
      '-=0.4'
    )
    .fromTo(hero.querySelectorAll('.cta-primary, .cta-secondary'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      },
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
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: features,
          start: 'top 80%',
        }
      }
    );

    // Enhanced Parallax effects
    gsap.to('.hero-bg-text', {
      yPercent: -30,
      xPercent: 10,
      rotate: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
    
    gsap.to('.hero-bg-pattern', {
      yPercent: 20,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      }
    });
    
    // Impact chart animation
    const impactChart = impact.querySelector('.impact-chart circle:last-child');
    if (impactChart) {
      ScrollTrigger.create({
        trigger: impact,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(impactChart,
            { strokeDashoffset: 565 },
            { 
              strokeDashoffset: 452,
              duration: 2,
              ease: 'power2.out'
            }
          );
          
          // Animate percentage
          gsap.fromTo('.impact-center .stat-value',
            { innerText: 0, scale: 0.5, opacity: 0 },
            { 
              innerText: 20,
              scale: 1,
              opacity: 1,
              duration: 2,
              snap: { innerText: 1 },
              onUpdate: function() {
                const value = Math.round(this.targets()[0].innerText);
                this.targets()[0].innerText = `15-${value}%`;
              }
            }
          );
        },
        once: true
      });
    }
    
    // Interactive dashboard animation
    const widgets = document.querySelectorAll('.widget');
    ScrollTrigger.create({
      trigger: '.interactive-demo-section',
      start: 'top 60%',
      onEnter: () => {
        gsap.fromTo(widgets,
          { y: 50, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
        
        // Animate widget values
        gsap.fromTo('.widget-stat',
          { innerText: 0 },
          { 
            innerText: 247,
            duration: 2,
            snap: { innerText: 1 },
            onUpdate: function() {
              const value = Math.round(this.targets()[0].innerText);
              this.targets()[0].innerText = `${value}/250`;
            }
          }
        );
      },
      once: true
    });
    
    // Calculator interaction enhancement
    const slider = document.querySelector('.employee-slider') as HTMLInputElement;
    if (slider) {
      slider.addEventListener('input', () => {
        gsap.to('.roi-bar.savings .bar', {
          height: `${Math.min(100, (parseInt(slider.value) / 5))}%`,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="package-detail-medium">
      {/* Hero Section */}
      <div ref={heroRef} className="package-hero medium-hero">
        <div className="hero-bg-text">MEDIUM</div>
        <div className="hero-bg-pattern" />
        <div className="hero-container">
          <div className="popular-indicator">
            <span>MEST POPULÆRE VALG</span>
          </div>
          <p className="package-eyebrow">{packageData.subtitle}</p>
          <h1 className="package-title">{packageData.title}</h1>
          <p className="package-description">{packageData.description}</p>
          
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => {
              const pricingSection = document.querySelector('.package-pricing-section');
              pricingSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>BEREGN JERES PRIS</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </button>
            <button className="cta-secondary" onClick={() => {
              const demoSection = document.querySelector('.interactive-demo-section');
              demoSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>SE DEMO</span>
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
            <span>ALT HVAD I FÅR MED</span>
            <span className="accent">DEN SKALEREDE PAKKE</span>
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
                <div className="feature-badge">INKLUDERET</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div ref={impactRef} className="package-impact-section">
        <div className="impact-container">
          <h2 className="section-title">
            <span>MÅLBAR</span>
            <span className="accent">VIRKNING</span>
          </h2>
          
          <div className="impact-showcase">
            <div className="main-impact">
              <div className="impact-visual">
                <svg viewBox="0 0 200 200" className="impact-chart">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(237, 106, 47, 0.1)" strokeWidth="20" />
                  <circle cx="100" cy="100" r="90" fill="none" stroke="var(--rmk-orange)" strokeWidth="20" 
                    strokeDasharray="565" strokeDashoffset="452" strokeLinecap="round"
                    transform="rotate(-90 100 100)" />
                </svg>
                <div className="impact-center">
                  <div className="stat-value">{packageData.impact.mainStat}</div>
                  <div className="stat-label">{packageData.impact.mainLabel}</div>
                </div>
              </div>
            </div>
            
            <div className="sub-impacts">
              {packageData.impact.subStats.map((stat, index) => (
                <div key={index} className="impact-card">
                  <div className="impact-value">{stat.value}</div>
                  <div className="impact-label">{stat.label}</div>
                  <div className="impact-bar">
                    <div className="impact-fill" style={{ width: '85%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="interactive-demo-section">
        <div className="demo-container">
          <h2 className="section-title">
            <span>JERES PERSONLIGE</span>
            <span className="accent">SUNDHEDSPLATFORM</span>
          </h2>
          
          <div className="platform-showcase">
            <div className="device-mockup">
              <div className="device-frame">
                <div className="screen-content">
                  <div className="admin-dashboard">
                    <h3>Administrator Dashboard</h3>
                    <div className="dashboard-widgets">
                      <div className="widget">
                        <h4>Aktive medarbejdere</h4>
                        <div className="widget-stat">0/250</div>
                        <div className="widget-progress">
                          <div className="progress-bar" style={{ width: '98.8%' }} />
                        </div>
                      </div>
                      <div className="widget">
                        <h4>Næste screening</h4>
                        <div className="widget-date">15. marts 2024</div>
                        <div className="widget-info">186 tilmeldte</div>
                        <button className="widget-action">Se detaljer →</button>
                      </div>
                      <div className="widget highlight-widget">
                        <h4>Månedlig ROI</h4>
                        <div className="widget-value">312%</div>
                        <div className="widget-savings">67.500 kr sparet</div>
                        <div className="widget-sparkline">
                          <svg viewBox="0 0 100 40" className="sparkline">
                            <path d="M0,35 L10,30 L20,32 L30,25 L40,20 L50,15 L60,18 L70,10 L80,12 L90,5 L100,8" 
                              fill="none" stroke="var(--rmk-orange)" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                      <div className="widget">
                        <h4>Sygefravær</h4>
                        <div className="widget-trend">↓ 18%</div>
                        <div className="widget-comparison">vs. sidste år</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="platform-features">
              <div className="platform-feature">
                <span className="feature-icon">📱</span>
                <h4>Mobil app til alle</h4>
                <p>Let adgang for medarbejdere på farten</p>
              </div>
              <div className="platform-feature">
                <span className="feature-icon">🔐</span>
                <h4>GDPR-compliant</h4>
                <p>Fuld datasikkerhed og privatlivsbeskyttelse</p>
              </div>
              <div className="platform-feature">
                <span className="feature-icon">🔗</span>
                <h4>API integration</h4>
                <p>Nem integration med jeres HR-systemer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <blockquote className="testimonial-quote">
              "Efter kun 6 måneder med RMK's skalerede sundhedspakke har vi set en markant forbedring. 
              Vores sygefravær er faldet med 18%, og medarbejdertilfredsheden har aldrig været højere. 
              Det er den bedste investering, vi har gjort i vores folk."
            </blockquote>
            <div className="testimonial-author">
              <img src="/api/placeholder/80/80" alt="Maria Hansen" className="author-image" />
              <div className="author-info">
                <div className="author-name">Maria Hansen</div>
                <div className="author-title">HR Director, Nordic Production A/S</div>
                <div className="author-company">320 ansatte • Produktionsvirksomhed</div>
              </div>
            </div>
            <div className="testimonial-results">
              <div className="result-item">
                <div className="result-icon">📉</div>
                <div className="result-stat">-18%</div>
                <div className="result-label">Sygefravær</div>
              </div>
              <div className="result-item">
                <div className="result-icon">😊</div>
                <div className="result-stat">92</div>
                <div className="result-label">NPS Score</div>
              </div>
              <div className="result-item">
                <div className="result-icon">💰</div>
                <div className="result-stat">312%</div>
                <div className="result-label">ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Pricing Calculator */}
      <div className="package-pricing-section">
        <div className="pricing-container">
          <h2 className="section-title">
            <span>SKRÆDDERSYET</span>
            <span className="accent">PRISSÆTNING</span>
          </h2>
          
          <div className="pricing-calculator">
            <div className="calculator-input">
              <label>Antal medarbejdere</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="100" 
                  max="500" 
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
                  <span className="price">{(employees * 149).toLocaleString('da-DK')} kr</span>
                </div>
                <div className="price-item">
                  <span>Pr. medarbejder</span>
                  <span className="price">149 kr/md</span>
                </div>
                <div className="price-item highlight">
                  <span>Estimeret månedlig besparelse</span>
                  <span className="price savings">{(employees * 520).toLocaleString('da-DK')} kr</span>
                </div>
              </div>
              
              <div className="roi-visual">
                <div className="roi-comparison">
                  <div className="roi-bar investment">
                    <span>Investering</span>
                    <div className="bar" style={{ height: '30%' }} />
                  </div>
                  <div className="roi-bar savings">
                    <span>Besparelse</span>
                    <div className="bar" style={{ height: '100%' }} />
                  </div>
                </div>
                <p className="roi-text">349% ROI efter kun 2.5 måneder</p>
              </div>
            </div>
            
            <div className="pricing-ctas">
              <button className="cta-primary">
                <span>START I DAG</span>
                <div className="button-bg" />
              </button>
              <button className="cta-ghost">
                <span>BOOK MØDE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">
            <span>OFTE STILLEDE</span>
            <span className="accent">SPØRGSMÅL</span>
          </h2>
          
          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">
                <span>Hvordan kommer vi i gang med implementeringen?</span>
                <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>Vi starter med et kickoff-møde hvor vi kortlægger jeres behov og målsætninger. 
                Derefter udarbejder vi en detaljeret implementeringsplan med klare milepæle. 
                Hele processen tager typisk 2-3 uger fra underskrift til fuld implementering.</p>
                <div className="faq-timeline">
                  <div className="timeline-step">
                    <span className="step-number">1</span>
                    <span className="step-label">Kickoff møde</span>
                  </div>
                  <div className="timeline-step">
                    <span className="step-number">2</span>
                    <span className="step-label">Behovsanalyse</span>
                  </div>
                  <div className="timeline-step">
                    <span className="step-number">3</span>
                    <span className="step-label">Platform setup</span>
                  </div>
                  <div className="timeline-step">
                    <span className="step-number">4</span>
                    <span className="step-label">Go live!</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Kan vi tilpasse pakken til vores specifikke behov?</span>
                <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>Absolut! Selvom pakken indeholder vores mest efterspurgte services, kan vi skræddersy 
                indholdet til jeres virksomhed. Det kan være alt fra justering af screening-frekvens 
                til tilføjelse af specialiserede wellness-programmer.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Hvordan måler vi ROI på sundhedsinvesteringen?</span>
                <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>Vores analytics dashboard giver jer real-time indsigt i nøgletal som sygefravær, 
                medarbejdertilfredshed og produktivitet. I får kvartalsvise rapporter der tydeligt 
                viser udviklingen og den økonomiske gevinst.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Hvad hvis vi vokser ud af denne pakke?</span>
                <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>Når I når 500+ medarbejdere, kan vi seamlessly opgradere jer til vores Enterprise-pakke. 
                Alle jeres data og historik bevares, og I får adgang til endnu flere premium features 
                uden afbrydelse i servicen.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="final-cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            <span>Klar til at transformere</span>
            <span className="accent">jeres arbejdsplads?</span>
          </h2>
          <p className="cta-subtitle">
            Lad os vise jer, hvordan I kan skabe en sundere, mere produktiv virksomhed
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">
              <span>BOOK DEMO</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="cta-contact">
              <span>RING 70 27 42 27</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
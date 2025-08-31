'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const line = lineRef.current
    
    if (!footer || !line) return

    // Reveal line animation
    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          once: true
        }
      }
    )

    // Stagger content animation
    const elements = footer.querySelectorAll('.footer-animate')
    gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          once: true
        }
      }
    )
  }, [])

  const navLinks = [
    { label: 'Ydelser', href: '#services' },
    { label: 'Pakker', href: '#packages' },
    { label: 'Cases', href: '#cases' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Kontakt', href: '#contact' }
  ]

  const legalLinks = [
    { label: 'Persondatapolitik', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Vilkår', href: '/terms' }
  ]

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-line" ref={lineRef}></div>
      
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand footer-animate">
            <h2 className="footer-title">
              Lad os skabe<br />
              <span className="title-accent">noget stort</span><br />
              sammen
            </h2>
            <Link href="#contact" className="footer-cta">
              <span className="cta-text">Start dit projekt</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>

          <div className="footer-info">
            <div className="footer-section footer-animate">
              <h3 className="section-label">Navigation</h3>
              <ul className="footer-links">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section footer-animate">
              <h3 className="section-label">Kontakt</h3>
              <div className="contact-info">
                <a href="tel:+4512345678" className="contact-link">
                  +45 12 34 56 78
                </a>
                <a href="mailto:info@rmk.dk" className="contact-link">
                  info@rmk.dk
                </a>
                <address className="contact-address">
                  Eksempelvej 123<br />
                  1234 København
                </address>
              </div>
            </div>

            <div className="footer-section footer-animate">
              <h3 className="section-label">Sociale medier</h3>
              <div className="social-links">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom footer-animate">
          <div className="footer-meta">
            <p className="copyright">© 2024 RMK Tilbud</p>
            <p className="company-info">CVR: 12345678</p>
          </div>
          
          <nav className="legal-nav">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link href={link.href} className="legal-link">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="separator">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
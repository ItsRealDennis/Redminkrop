'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import './Navigation.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Delayed reveal of trigger button
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      
      if (triggerRef.current) {
        gsap.fromTo(triggerRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
        )
      }
    }, 2400)

    return () => clearTimeout(showTimer)
  }, [])

  // Magnetic effect for trigger
  useEffect(() => {
    const magnet = magnetRef.current
    if (!magnet) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnet.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 100
      
      if (distance < maxDistance) {
        const strength = 1 - (distance / maxDistance)
        gsap.to(magnet, {
          x: x * strength * 0.3,
          y: y * strength * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    magnet.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      magnet.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Navigation open/close animations
  useEffect(() => {
    if (!navRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const tl = gsap.timeline()
      
      tl.to('.nav-overlay', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .to(navRef.current, {
        x: 0,
        duration: 0.8,
        ease: 'power3.inOut'
      }, '-=0.3')
      .fromTo('.nav-link',
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.08,
          ease: 'power3.out' 
        },
        '-=0.4'
      )
      .fromTo('.nav-footer',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      
      // Rotate trigger button
      gsap.to('.trigger-line', {
        rotation: 180,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.inOut'
      })
    } else {
      document.body.style.overflow = ''
      
      gsap.to(navRef.current, {
        x: '-100%',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      gsap.to('.nav-overlay', {
        opacity: 0,
        duration: 0.4,
        delay: 0.2
      })
      
      // Reset trigger rotation
      gsap.to('.trigger-line', {
        rotation: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.inOut'
      })
    }
  }, [isOpen])

  const navItems = [
    { label: 'Ydelser', href: '#services', number: '01' },
    { label: 'Pakker', href: '#packages', number: '02' },
    { label: 'Cases', href: '#cases', number: '03' },
    { label: 'Timeline', href: '#timeline', number: '04' },
    { label: 'Kontakt', href: '#contact', number: '05' }
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Magnetic Trigger Button */}
      <button
        ref={triggerRef}
        className={`nav-trigger ${isVisible ? 'visible' : ''} ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <div ref={magnetRef} className="trigger-magnetic">
          <div className="trigger-icon">
            <span className="trigger-line"></span>
            <span className="trigger-line"></span>
            <span className="trigger-line"></span>
          </div>
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`nav-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Navigation */}
      <nav ref={navRef} className="side-navigation">
        <div className="nav-header">
          <Link href="/" className="nav-logo" onClick={handleNavClick}>
            <span className="logo-text">RMK</span>
            <span className="logo-subtitle">TILBUD</span>
          </Link>
        </div>

        <div className="nav-content">
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={handleNavClick}
              >
                <span className="link-number">{item.number}</span>
                <span className="link-text">{item.label}</span>
                <span className="link-arrow">→</span>
              </Link>
            ))}
          </div>

          <Link href="#contact" className="nav-cta" onClick={handleNavClick}>
            <span className="cta-text">Book møde</span>
            <div className="cta-background"></div>
          </Link>
        </div>

        <div className="nav-footer">
          <div className="nav-contact">
            <a href="tel:+4512345678" className="contact-item">+45 12 34 56 78</a>
            <a href="mailto:info@rmk.dk" className="contact-item">info@rmk.dk</a>
          </div>
          
          <div className="nav-social">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              Instagram
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="nav-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-line"></div>
        </div>
      </nav>
    </>
  )
}
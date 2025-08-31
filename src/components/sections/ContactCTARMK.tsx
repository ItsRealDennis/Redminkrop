'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './ContactCTARMK.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTARMK() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    const titleText = new SplitType('.contact-title', { types: 'chars' });
    
    gsap.fromTo(titleText.chars,
      { 
        y: 100, 
        opacity: 0,
        rotateX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
        }
      }
    );

    // Simple form animation
    gsap.fromTo(formRef.current,
      { 
        y: 30, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Show success message
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
          gsap.fromTo(successMessage,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      }
    });
    
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-cta-section">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h2 className="contact-title">
            LAD OS STARTE SAMTALEN
          </h2>
          <p className="contact-subtitle">
            Ring 70 27 42 27 eller udfyld formularen
          </p>
        </div>

        <div className="contact-content">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Navn *"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Virksomhed *"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email *"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefon"
              />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              <span>{isSubmitting ? 'SENDER...' : 'SEND'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
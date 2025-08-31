'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroRMKPremium from '@/components/sections/HeroRMKPremium';
import ServicesModernRMK from '@/components/sections/ServicesModernRMK';
import PackagesRMK from '@/components/sections/PackagesRMK';
import PackageDetailSmall from '@/components/sections/PackageDetailSmall';
import PackageDetailMedium from '@/components/sections/PackageDetailMedium';
import PackageDetailEnterprise from '@/components/sections/PackageDetailEnterprise';
import CasesRMK from '@/components/sections/CasesRMK';
import TimelineRMK from '@/components/sections/TimelineRMK';
import ContactCTARMK from '@/components/sections/ContactCTARMK';

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);

  const handlePackageSelect = (packageId: string) => {
    // Animate transition to detail view
    const tl = gsap.timeline();
    
    tl.to(mainContentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setSelectedPackage(packageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleBackToMain = () => {
    // Animate transition back to main view
    const tl = gsap.timeline();
    
    tl.to(detailContentRef.current, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setSelectedPackage(null);
      }
    });
  };

  useEffect(() => {
    if (selectedPackage && detailContentRef.current) {
      // Animate detail view entrance
      gsap.fromTo(detailContentRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    } else if (!selectedPackage && mainContentRef.current) {
      // Animate main view return
      gsap.fromTo(mainContentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [selectedPackage]);

  // Handle ESC key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPackage) {
        handleBackToMain();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPackage]);

  return (
    <main className="relative">
      {/* Main Content */}
      {!selectedPackage && (
        <div ref={mainContentRef}>
          <HeroRMKPremium />
          <ServicesModernRMK />
          <PackagesRMK onPackageSelect={handlePackageSelect} />
          <CasesRMK />
          <TimelineRMK />
          <ContactCTARMK />
        </div>
      )}

      {/* Package Detail Content */}
      {selectedPackage && (
        <div ref={detailContentRef}>
          {/* Back Button */}
          <button
            onClick={handleBackToMain}
            className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1"
            aria-label="Tilbage til oversigt"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            <span className="font-semibold text-sm uppercase tracking-wider">Tilbage</span>
          </button>

          {/* Package Detail Components */}
          {selectedPackage === 'small' && <PackageDetailSmall />}
          {selectedPackage === 'medium' && <PackageDetailMedium />}
          {selectedPackage === 'enterprise' && <PackageDetailEnterprise />}
        </div>
      )}
    </main>
  );
}
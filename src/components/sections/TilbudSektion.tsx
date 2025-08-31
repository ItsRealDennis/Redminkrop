'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { tilbudData, CompanySize } from '@/data/tilbudData';
import { staggerFadeIn } from '@/utils/animations';

interface TilbudSektionProps {
  selectedSize: CompanySize;
}

export default function TilbudSektion({ selectedSize }: TilbudSektionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);
  const fordelesRef = useRef<HTMLUListElement>(null);

  const data = tilbudData[selectedSize];

  useEffect(() => {
    if (servicesRef.current) {
      const serviceItems = servicesRef.current.querySelectorAll('li');
      staggerFadeIn(Array.from(serviceItems), 0.1);
    }
    if (fordelesRef.current) {
      const fordeleItems = fordelesRef.current.querySelectorAll('li');
      staggerFadeIn(Array.from(fordeleItems), 0.1);
    }
  }, [selectedSize]);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">{data.title}</span>
          </h2>
          <p className="text-xl text-gray-300">{data.description}</p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-space-dark/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-accent">Inkluderede Services</h3>
            <ul ref={servicesRef} className="space-y-4">
              {data.services.map((service, index) => (
                <li key={index} className="flex items-start opacity-0">
                  <svg className="w-6 h-6 text-planet-green mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits & Pricing */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-cosmic-purple/20 to-space-blue/20 border border-cosmic-purple/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Investering</h3>
              <p className="text-4xl font-bold gradient-text mb-2">{data.pris}</p>
              <p className="text-gray-300">{data.varighed}</p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-space-dark/50 backdrop-blur-sm border border-accent/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-star-gold">Fordele</h3>
              <ul ref={fordelesRef} className="space-y-3">
                {data.fordele.map((fordel, index) => (
                  <li key={index} className="flex items-start opacity-0">
                    <svg className="w-6 h-6 text-star-gold mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-300">{fordel}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-cosmic-purple to-space-blue text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 glow">
            Book et uforpligtende møde
          </button>
        </motion.div>
      </div>
    </section>
  );
}
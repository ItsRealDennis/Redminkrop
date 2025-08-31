'use client';

import { motion } from 'framer-motion';

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
  return (
    <section className="min-h-screen py-20 px-4 bg-space-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-16 gradient-text"
        >
          Vores Projekter
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-space-dark/50 border border-cosmic-purple/30 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-accent">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
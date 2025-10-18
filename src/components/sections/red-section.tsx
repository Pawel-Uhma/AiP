"use client";

import { motion } from "framer-motion";

export function RedSection() {
  return (
    <section id="red-section" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-red-500"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-mrs-saint-delafield)' }}>
          Red Section
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
          This is the red section with a beautiful background
        </p>
      </motion.div>
    </section>
  );
}

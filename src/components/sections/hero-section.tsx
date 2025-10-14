"use client";

import { motion } from "framer-motion";

const backgroundImages = [
  "/images/hero/background/DSC_5553.jpg",
  "/images/hero/background/DSC_5562.jpg",
  "/images/hero/background/DSC_5586.jpg",
  "/images/hero/background/DSC_5590.jpg",
  "/images/hero/background/DSC_5613.jpg",
  "/images/hero/background/DSC_5628.jpg",
  "/images/hero/background/DSC_5692.jpg",
  "/images/hero/background/DSC_5697.jpg",
  "/images/hero/background/DSC_5775.jpg",
  "/images/hero/background/DSC_6009.jpg",
  "/images/hero/background/DSC_6025.jpg",
  "/images/hero/background/DSC_6048.jpg",
  "/images/hero/background/DSC_6136.jpg",
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Moving Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="flex h-full"
          animate={{
            x: [0, -100 * backgroundImages.length + "%"],
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* Render images twice for seamless loop */}
          {[...backgroundImages, ...backgroundImages].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Wedding photo ${index + 1}`}
              className="h-full w-auto object-cover flex-shrink-0"
            />
          ))}
        </motion.div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Title - Absolutely Positioned */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-30 sm:top-20 md:top-24 lg:top-32 left-1/2 transform -translate-x-1/2 z-10 text-center"
      >
        <h1 className="font-monsieur">
          Amelia & Paweł
        </h1>
      </motion.div>

      {/* Date - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="font-bodoni text-xl sm:text-2xl lg:text-3xl text-white tracking-widest uppercase">
          18 LIPIEC 2026 WARSZAWA
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

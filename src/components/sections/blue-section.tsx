"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BlueSection() {
  return (
    <section id="blue-section" className="relative min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Image
          src="/images/color/blue.png"
          alt="Blue"
          width={800}
          height={600}
          className="w-full h-auto max-w-4xl"
        />
      </motion.div>
    </section>
  );
}

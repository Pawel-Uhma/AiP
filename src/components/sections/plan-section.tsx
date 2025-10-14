"use client";

import { motion } from "framer-motion";

export function PlanSection() {
  return (
    <section id="plan" className="relative min-h-[80vh] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <img
            src="/images/plan/background.png"
            alt="Wedding plan background"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Church Ceremony - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-[15%] left-[15%] md:left-[20%] lg:left-[25%] xl:left-[30%] z-10"
          >
            <div className=" backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-amber-800 mb-1">
                15:30 - 16:30
              </div>
              <div className="text-lg text-amber-700 font-medium">
                PARAFIA MATKI BOŻEJ<br />
                KRÓLOWEJ POLSKI
              </div>
            </div>
          </motion.div>

          {/* Reception - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-[15%] right-[15%] md:right-[20%] lg:right-[25%] xl:right-[30%] z-10"
          >
            <div className=" backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-amber-800 mb-1">
                17:30
              </div>
              <div className="text-lg text-amber-700 font-medium">
                STODOŁA RASZTÓW
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

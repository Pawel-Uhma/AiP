"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PlanSection() {
  return (
    <section id="plan" className="py-16 px-4" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* First Row: Parafia text and Church image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-row items-center justify-between mb-16 gap-2 sm:gap-4 lg:gap-8"
        >
          {/* Parafia Text */}
          <div className="flex-1 flex items-center justify-center lg:justify-start h-[200px] lg:h-[300px]">
            <div className="text-center lg:text-left px-4 sm:px-6 lg:px-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-amber-800 mb-2 lg:mb-4 font-pacifico">
                  15:30 - 16:30
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-amber-700 font-medium font-pacifico">
                  PARAFIA PW. MATKI BOŻEJ<br />
                  KRÓLOWEJ POLSKI
                </div>
            </div>
          </div>
          
          {/* Church Image */}
          <div className="flex-1 flex justify-center lg:justify-end h-[200px] lg:h-[300px] w-full lg:w-auto">
            <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-md lg:max-w-lg h-full">
              <Image
                src="/images/plan/church.png"
                alt="Church"
                width={400}
                height={300}
                className="object-contain h-full w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Second Row: Barn image and Stodola text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-row items-center justify-between gap-2 sm:gap-4 lg:gap-8"
        >
          {/* Barn Image */}
          <div className="flex-1 flex justify-center lg:justify-start h-[200px] lg:h-[300px] w-full lg:w-auto">
            <div className="relative w-full max-w-[250px] sm:max-w-[250px] md:max-w-md lg:max-w-lg h-full">
              <Image
                src="/images/plan/barn.png"
                alt="Barn"
                width={400}
                height={300}
                className="object-contain h-full w-full"
              />
            </div>
          </div>
          
          {/* Stodola Text */}
          <div className="flex-1 flex items-center justify-center lg:justify-end h-[200px] lg:h-[300px]">
            <div className="text-center lg:text-left px-4 sm:px-6 lg:px-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-amber-800 mb-2 lg:mb-4 font-pacifico">
                17:30
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-amber-700 font-medium font-pacifico">
                STODOŁA RASZTÓW
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

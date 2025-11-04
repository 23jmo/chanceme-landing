"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  popIn,
} from "@/components/framer-animations";
import Image from "next/image";

// Simple glassmorphic card wrapper for flex layouts
function GlassmorphicWrapper({
  children,
  className = "",
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: any;
}) {
  return (
    <motion.div
      className={`relative rounded-[30px] shrink-0 overflow-hidden w-full h-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants || popIn}
      style={{
        // Clean glassmorphism effect for light mode
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        // Subtle border and shadow for light mode
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: `
          0 1px 3px rgba(0, 0, 0, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.04)
        `,
      }}
    >
      {/* Subtle light mode overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[30px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export default function BentoSection() {
  return (
    <section
      id="bento"
      className="w-full py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="text-left mb-12 md:mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl tracking-tighter md:text-5xl lg:text-6xl font-bold text-gray-900">
            No waiting
          </h2>
        </motion.div>

        {/* Bento container - using flex layout to respect natural aspect ratios */}
        {/* Bento1: 687x345 (1.99:1), Bento2: 687x345 (1.99:1), Bento3: 657x729 (0.9:1) */}
        {/* Width ratio: Bento1/2 (687) : Bento3 (657) ≈ 51% : 49% */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left column - contains Bento1 and Bento2 stacked */}
          <div className="flex flex-col gap-4 md:gap-6 md:w-[51%]">
            {/* Bento 1 - Top, maintains 687x345 aspect ratio */}
            <div className="relative w-full" style={{ aspectRatio: '687/345' }}>
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento1.png"
                    alt="Bento 1"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </GlassmorphicWrapper>
            </div>

            {/* Bento 2 - Bottom, maintains 687x345 aspect ratio */}
            <div className="relative w-full" style={{ aspectRatio: '687/345' }}>
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento2.png"
                    alt="Bento 2"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </GlassmorphicWrapper>
            </div>
          </div>

          {/* Right column - contains Bento3 */}
          <div className="flex flex-col gap-4 md:gap-6 md:w-[49%]">
            {/* Bento 3 - Right side, maintains 657x729 aspect ratio */}
            <div className="relative w-full" style={{ aspectRatio: '657/729' }}>
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento3.png"
                    alt="Bento 3"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </GlassmorphicWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

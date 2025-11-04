"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  popIn,
  fadeInLeft,
  fadeInRight,
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl tracking-tighter md:text-4xl lg:text-5xl font-bold text-gray-900">
            Write your RDs better than your EDs
          </h2>
        </motion.div>

        {/* Bento container - all images have same width (2216px), using natural aspect ratios */}
        {/* Bento1: 2216x1412 (1.57:1), Bento2: 2216x1380 (1.61:1), Bento3: 2216x2916 (0.76:1) */}
        {/* All images displayed at equal width, maintaining their aspect ratios */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Left column - contains Bento1 and Bento2 stacked, same width as Bento3 */}
          <motion.div
            className="flex flex-col gap-4 md:gap-6 md:w-[50%]"
            variants={staggerContainer}
          >
            {/* Bento 1 - Top, maintains 2216x1412 aspect ratio */}
            <motion.div
              className="relative w-full"
              style={{ aspectRatio: "2216/1412" }}
              variants={fadeInLeft}
            >
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento1.png"
                    alt="Bento 1"
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </GlassmorphicWrapper>
            </motion.div>

            {/* Bento 2 - Bottom, maintains 2216x1380 aspect ratio */}
            <motion.div
              className="relative w-full"
              style={{ aspectRatio: "2216/1380" }}
              variants={fadeInLeft}
            >
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento2.png"
                    alt="Bento 2"
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </GlassmorphicWrapper>
            </motion.div>
          </motion.div>

          {/* Right column - contains Bento3, same width as left column */}
          <motion.div
            className="flex flex-col gap-4 md:gap-6 md:w-[50%]"
            variants={fadeInRight}
          >
            {/* Bento 3 - Right side, maintains 2216x2916 aspect ratio */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "2216/2916" }}
            >
              <GlassmorphicWrapper className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/Bento3.png"
                    alt="Bento 3"
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </GlassmorphicWrapper>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

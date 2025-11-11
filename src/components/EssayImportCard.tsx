/**
 * EssayImportCard Component
 * 
 * Displays a feature card showcasing the essay import functionality.
 * Shows a mockup document interface with text overlay explaining the feature.
 * 
 * Design: Yellow border card with document preview and gradient text background
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Image asset from Figma design
const documentImage = "https://www.figma.com/api/mcp/asset/5de46b9a-4c3c-4b85-9db1-b29e1aab2535";

export default function EssayImportCard() {
  return (
    <motion.div
      className="relative w-full h-full rounded-[30px] border-2 border-[#ffd769] overflow-hidden cursor-pointer"
      data-name="EssayImportCard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(255, 215, 105, 0.3)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background document image */}
      <Image
        alt="Document interface preview"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-[30px] pointer-events-none"
        src={documentImage}
        fill
        unoptimized
      />

      {/* Content overlay with gradient background */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        {/* Yellow gradient background behind text */}
        <div className="absolute left-0 bottom-0 w-full h-auto">
          {/* Blurred background layer */}
          <div className="absolute -left-8 top-auto bottom-0 w-[calc(100%+4rem)] h-[124px] bg-[#ffe6b8] blur-[20.75px]" />
          
          {/* Solid background layer */}
          <div className="absolute left-0 top-auto bottom-0 w-full h-[98px] bg-[#ffe6b8]" />
        </div>

        {/* Text content */}
        <div className="absolute left-5 bottom-0 right-5 z-10 pb-6">
          {/* Main heading */}
          <h3 className="font-semibold text-[30px] leading-normal text-black mb-2">
            Google Drive Integration
          </h3>
          
          {/* Description text */}
          <p className="font-normal text-[16px] leading-normal text-black max-w-[785px] whitespace-pre-wrap">
            Work with your essays as they are, Drafted brings in all your existing essays in one click
          </p>
        </div>
      </div>
    </motion.div>
  );
}


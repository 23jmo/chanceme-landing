"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Initial slide-in animation
    controls.start({
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    });
  }, [controls]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-[90%] px-4 py-4"
      initial={{ y: -100 }}
      animate={controls}
    >
      <motion.div
        className={`relative ${
          scrolled
            ? "mx-auto rounded-xl py-2 max-w-[95%] md:max-w-[90%]"
            : "w-full"
        }`}
        layout
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        <motion.div
          className={`absolute inset-0 rounded-xl border border-border/40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 ${
            scrolled ? "" : "pointer-events-none"
          }`}
          animate={{
            opacity: scrolled ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        />
        <div
          className={`relative flex items-center justify-between h-12 ${
            scrolled ? "px-4 md:px-8" : "px-0"
          }`}
        >
          <div className="flex items-center space-x-4 md:space-x-6 h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-full flex items-center"
            >
              <button
                onClick={() => window.location.href = "/"}
                className="flex cursor-pointer items-center space-x-2 h-full"
              >
                <Image
                  src="/logo.png"
                  alt="Chance Me Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                />
                <motion.span
                  className={`font-bold text-black transition-all duration-300 leading-none flex items-center ${
                    scrolled ? "text-xs md:text-sm lg:text-base" : "text-sm md:text-base lg:text-lg"
                  }`}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="hidden font-medium md:inline">Chance Me</span>
                </motion.span>
              </button>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-4 h-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-full flex items-center"
              >
                <button
                  className="text-xs md:text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors leading-none h-full flex items-center"
                  onClick={() => {
                    window.location.href = "/pricing";
                  }}
                >
                  Pricing
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-full flex items-center"
              >
                <button
                  className="text-xs md:text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors leading-none h-full flex items-center"
                  onClick={() => {
                    window.open("mailto:jym2117@columbia.edu", "_blank");
                  }}
                >
                  Contact
                </button>
              </motion.div>
            </nav>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-full flex items-center"
            >
              <Button
                size="sm"
                variant="ghost"
                className={`relative overflow-hidden transition-all duration-200 hover:scale-105 text-xs md:text-sm lg:text-base h-8 px-3 font-medium text-gray-700 hover:bg-gray-100 flex items-center ${
                  scrolled ? "" : ""
                }`}
                onClick={() =>
                  window.open("https://tally.so/r/nGk2jj", "_blank")
                }
              >
                Sign up
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-full flex items-center"
            >
              <Button
                size="sm"
                className={`relative overflow-hidden transition-all duration-200 hover:scale-105 text-xs md:text-sm lg:text-base h-8 px-3 flex items-center ${
                  scrolled
                    ? "bg-yellow-400/50 text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:bg-yellow-400/50"
                    : "bg-yellow-400/50 text-black hover:bg-yellow-400/70 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                }`}
                onClick={() =>
                  window.open("https://tally.so/r/nGk2jj", "_blank")
                }
              >
                Try for free
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

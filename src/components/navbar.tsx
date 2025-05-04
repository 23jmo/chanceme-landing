"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full px-6 py-4"
      initial={{ y: -100 }}
      animate={controls}
    >
      <motion.div
        className={`mx-auto rounded-xl border border-border/40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-200 ${
          scrolled
            ? "py-2 max-w-[95%] md:max-w-[90%]"
            : "py-3 max-w-[98%] md:max-w-[96%]"
        }`}
        layout
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        <div className="flex items-center px-4 md:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-100}
              duration={700}
              className="mr-6 flex cursor-pointer items-center space-x-2"
            >
              <Image
                src="/logo.png"
                alt="Chance Me Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <motion.span
                className={`font-bold text-black transition-all duration-200 ${
                  scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
                }`}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="hidden font-medium md:inline">Chance Me</span>
              </motion.span>
            </ScrollLink>
          </motion.div>

          <nav className="flex flex-1 items-center space-x-8 text-sm font-medium text-gray-700 md:block mx-4">
            {/* Navigation items can be added here */}
            <motion.div
              className="hidden md:flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {/* {["Process", "Get Started"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ScrollLink
                    to={item === "Process" ? "admission-trials" : "get-started"}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={700}
                    className="cursor-pointer capitalize hover:text-yellow-400 transition-colors"
                    activeClass="text-yellow-400"
                  >
                    {item}
                  </ScrollLink>
                </motion.div>
              ))} */}
            </motion.div>
          </nav>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="md:block hidden hover:bg-yellow-400/10 text-gray-700"
              onClick={() => {
                window.open("mailto:jym2117@columbia.edu", "_blank");
              }}
            >
              Contact
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="relative overflow-hidden bg-yellow-400/50 text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:bg-yellow-400/50 hover:scale-105 transition-all duration-200"
                onClick={() =>
                  window.open("https://tally.so/r/nGk2jj", "_blank")
                }
              >
                Join Waitlist
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}

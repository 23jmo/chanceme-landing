"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import CommentModeAnimation from "./CommentModeAnimation";
import DraftsStorage from "./DraftsStorage";
import SchoolsGrid from "./SchoolsGrid";

export default function ScrollShowcaseSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      title: "Chat Mode",
      description:
        "Have natural conversations with our AI agent about your essays. Ask questions, brainstorm ideas, and get guidance in a conversational format.",
    },
    {
      title: "Comment Mode",
      description:
        "Receive inline comments and suggestions directly on your essay. Get contextual feedback that helps you refine your writing with precision.",
    },
    {
      title: "Storing Drafts",
      description:
        "Never lose your work. All your drafts are automatically saved, so you can pick up where you left off and iterate on your essays with confidence.",
    },
    {
      title: "Tracking all of your Schools",
      description:
        "Manage all your college applications in one place. Track deadlines, requirements, and progress for each school to stay organized throughout the application process.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only enable scroll tracking on desktop (md and up)
      if (window.innerWidth < 768) {
        setActiveSection(0);
        setScrollProgress(Array(sections.length).fill(0));
        return;
      }

      if (!sectionRef.current) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      // Check which image section is currently most visible in viewport
      let activeIndex = 0;
      let maxVisibility = 0;
      const progress: number[] = [];

      imageRefs.current.forEach((ref, index) => {
        if (!ref) {
          progress.push(0);
          return;
        }

        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // Calculate progress: 0 = below viewport, 1 = at center, 2 = above viewport
        // Progress of 1 means the element is centered in viewport
        const progressValue = 1 - distanceFromCenter / (viewportHeight * 0.8);
        const clampedProgress = Math.max(0, Math.min(2, progressValue));
        progress.push(clampedProgress);

        // Calculate visibility for active section
        const visibleTop = Math.max(0, viewportHeight - rect.top);
        const visibleBottom = Math.max(0, rect.bottom);
        const visibleHeight = Math.min(visibleTop, visibleBottom, rect.height);
        const visibility =
          visibleHeight / Math.min(rect.height, viewportHeight);

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeIndex = index;
        }
      });

      setActiveSection(activeIndex);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial call
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections.length]);

  return (
    <motion.section
      ref={sectionRef}
      id="scroll-showcase"
      className="w-full py-16 md:py-24 lg:py-32 overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="w-full">
          {/* Mobile Layout - Static Cards */}
          <div className="md:hidden space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  {index === 0 ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <FloatingWindow />
                    </div>
                  ) : index === 1 ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <CommentModeAnimation />
                    </div>
                  ) : index === 2 ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <DraftsStorage />
                    </div>
                  ) : index === 3 ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <SchoolsGrid />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">
                        Screenshot {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Layout - Sticky Scroll */}
          <div className="hidden md:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-8 xl:gap-12 overflow-visible">
            {/* Left Side - Sticky Content */}
            <div
              className="w-1/2 max-w-md lg:max-w-lg sticky self-start flex flex-col justify-start z-10 pr-4 md:pr-8 lg:pr-12 xl:pr-16 pt-0 pl-8 md:pl-16 lg:pl-24 xl:pl-32"
              style={{
                top: "12rem",
              }}
            >
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity:
                        activeSection === index
                          ? 1
                          : activeSection > index
                          ? 0.3
                          : 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`space-y-0.5 sm:space-y-1 md:space-y-2 ${
                      activeSection === index ? "" : "pointer-events-none"
                    }`}
                  >
                    <h3
                      className={`text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold transition-colors duration-500 leading-tight ${
                        activeSection === index
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {section.title}
                    </h3>
                    <motion.p
                      className={`text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight ${
                        activeSection === index
                          ? "text-gray-700"
                          : "text-gray-500"
                      }`}
                      animate={{
                        opacity: activeSection === index ? 1 : 0,
                        height: activeSection === index ? "auto" : 0,
                      }}
                      transition={{
                        opacity: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                          delay: activeSection === index ? 0.1 : 0,
                        },
                        height: {
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      {section.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Horizontal Cards that scroll with page */}
            <div className="w-1/2 space-y-6 md:space-y-8 lg:space-y-12 overflow-visible pr-0 md:pr-12 lg:pr-24 relative after:content-[''] after:block after:h-[300vh] after:pointer-events-none after:-mb-[300vh]">
              {sections.map((section, index) => {
                const progress = scrollProgress[index] ?? 0;

                // Calculate opacity and x transform based on scroll progress
                // Progress ranges from 0 (below) to 2 (above), with 1 being centered
                // Progressive horizontal movement throughout entire scroll range
                let opacity = 0;
                let xOffset = 0;

                if (progress < 0.3) {
                  // Below viewport: not visible
                  opacity = 0;
                  xOffset = 0;
                } else if (progress <= 2) {
                  // Progressive opacity: fade in from 0.3 to 1, fade out from 1.7 to 2 (min 0.3)
                  if (progress < 1) {
                    // Fading in: 0.3 to 1
                    opacity = (progress - 0.3) / 0.7;
                  } else if (progress <= 1.7) {
                    // Full opacity: 1 to 1.7
                    opacity = 1;
                  } else {
                    // Fading out: 1.7 to 2, but maintain minimum of 0.3
                    opacity = Math.max(0.3, 1 - (progress - 1.7) / 0.3);
                  }

                  // Progressive horizontal movement: only move left, stay left once scrolled past
                  // At progress 0.3: x = 0
                  // At progress 1 (center): x = 20 (shifted right)
                  // At progress > 1: stay at x = 20
                  if (progress < 1) {
                    // Moving left as approaching center, but starting from right
                    const leftProgress = (progress - 0.3) / 0.7; // 0 to 1 as progress goes from 0.3 to 1
                    xOffset = 20 - 60 * leftProgress; // Start at 20, move to -40, but we'll keep it at 20
                    xOffset = 20; // Keep it more to the right
                  } else {
                    // Scrolled past: stay at right position
                    xOffset = 20;
                  }
                } else {
                  // Beyond viewport: maintain minimum opacity and right position
                  opacity = 0.3;
                  xOffset = 20;
                }

                return (
                  <motion.div
                    key={index}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    animate={{
                      opacity,
                      x: xOffset,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="w-full h-[500px] md:h-[550px] lg:h-[600px] flex items-center overflow-hidden"
                    style={{ width: "calc(100% + 250px)", marginLeft: "-50px" }}
                  >
                    {index === 0 ? (
                      <div className="w-full h-full">
                        <FloatingWindow />
                      </div>
                    ) : index === 1 ? (
                      <div className="w-full h-full">
                        <CommentModeAnimation />
                      </div>
                    ) : index === 2 ? (
                      <div className="w-full h-full">
                        <DraftsStorage />
                      </div>
                    ) : index === 3 ? (
                      <div className="w-full h-full">
                        <SchoolsGrid />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center">
                        <span className="text-gray-400 text-sm md:text-base">
                          Screenshot {index + 1}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

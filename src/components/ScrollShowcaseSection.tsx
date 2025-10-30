"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ScrollShowcaseSection() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      title: "Real-time Feedback",
      description: "Get instant, contextual feedback on your essays as you write. Our AI agent understands your story and provides actionable suggestions.",
    },
    {
      title: "Profile Integration",
      description: "The agent references your profile, activities, and background to give you personalized suggestions that align with your unique story.",
    },
    {
      title: "Smart Editing",
      description: "Automate repetitive tasks and focus on what matters—telling your story effectively. Our agent helps refine your writing style.",
    },
    {
      title: "School-Specific Guidance",
      description: "Receive feedback tailored to what your target schools are looking for. Each suggestion is crafted with admissions insights in mind.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check which image section is currently most visible in viewport
      let activeIndex = 0;
      let maxVisibility = 0;

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const visibleTop = Math.max(0, viewportHeight - rect.top);
        const visibleBottom = Math.max(0, rect.bottom);
        const visibleHeight = Math.min(visibleTop, visibleBottom, rect.height);
        const visibility = visibleHeight / Math.min(rect.height, viewportHeight);

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeIndex = index;
        }
      });

      setActiveSection(activeIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="scroll-showcase"
      className="w-full py-16 md:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row gap-4 md:gap-8 lg:gap-12">
            {/* Left Side - Sticky Content */}
            <div className="w-1/2 lg:w-1/2 sticky top-16 lg:top-24 h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)] flex flex-col justify-center z-10 pr-2 md:pr-4">
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeSection === index ? 1 : activeSection > index ? 0.3 : 0.5,
                      y: activeSection === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`space-y-1 md:space-y-2 ${activeSection === index ? "" : "pointer-events-none"}`}
                  >
                    <h3 className={`text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold transition-colors ${
                      activeSection === index ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {section.title}
                    </h3>
                    <p className={`text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ${
                      activeSection === index ? "text-gray-700 opacity-100" : "text-gray-500 opacity-0 max-h-0"
                    }`}>
                      {section.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Images that scroll with page */}
            <div className="w-1/2 lg:w-1/2 space-y-4 md:space-y-6 lg:space-y-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[800px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="text-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-full sm:max-w-md mx-auto aspect-video bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 sm:mb-4">
                      <span className="text-gray-400 text-xs sm:text-sm px-2">
                        Screenshot {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm">{section.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Twitter, Instagram } from "lucide-react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import TypedText from "@/components/TypedText";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  popIn,
  bounceIn,
} from "@/components/framer-animations";

import PersonalStatementCard from "@/components/PersonalStatementCard";
import AOOpinionCard from "@/components/AOOpinionCard";
import ScrollShowcaseSection from "@/components/ScrollShowcaseSection";
import BentoSection from "@/components/BentoSection";
import FeatureSection from "@/components/FeatureSection";

export default function LandingPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: "url('/absbg.png')",
        backgroundPosition: "center 20%",
      }}
    >
      <Navbar />
      <motion.main
        className="flex-1 w-full max-w-full"
        variants={staggerContainer}
      >
        <HeroSection />
        <PersonalStatement />
        <TrustedBySection />
        <ScrollShowcaseSection />
        <BentoSection />
        <FeatureSection />
        <FaqSection />
        <CtaSection />
      </motion.main>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <motion.section
      id="hero"
      className="w-full pt-8 pb-12 md:pt-16 md:pb-8 lg:pt-24 lg:pb-12 xl:pt-32 xl:pb-16 relative"
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerContainer}
        >
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Essays personalized for You and{" "}
              <span className="block sm:inline">
                <TypedText />
              </span>
            </motion.h1>
            <motion.p
              className="max-w-md mx-auto text-muted-foreground md:text-lg lg:text-xl"
              variants={fadeInUp}
            >
              Get personalized essay feedback and editing suggestions from AI
              agents.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              variants={fadeInUp}
            >
              <motion.div
                variants={popIn}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="https://tally.so/r/nGk2jj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center rounded-xl text-md font-semibold 
                    h-10 px-8 
                    text-gray-600 
                    bg-gradient-to-r from-gray-50 to-gray-100
                    border border-gray-200/60
                    shadow-sm
                    transition-all duration-300 ease-in-out 
                    hover:from-white hover:to-gray-50 hover:shadow-md hover:border-gray-300/80 hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2
                  "
                >
                  Sign up
                </Link>
              </motion.div>
              <motion.div
                variants={popIn}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="https://tally.so/r/nGk2jj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center rounded-xl text-md font-bold 
                    h-10 px-8 
                    text-black 
                    bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300
                    shadow-md shadow-yellow-500/30 
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-yellow-400/50 hover:scale-110
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2
                  "
                >
                  Try for free
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PersonalStatement() {
  const DESIGN_W = 1200;
  const DESIGN_H = 800; // Increased height to accommodate expanded comments

  const [scale, setScale] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      setWindowWidth(vw);
      // Use same effectiveDesignW logic as component body for consistency
      const effectiveDesignW = vw >= 1400 ? 1300 : vw >= 1100 ? 1250 : DESIGN_W;
      setScale(Math.min(1, vw / effectiveDesignW));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Track scroll position for auto-expanding comments
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate comment top positions relative to viewport
  const getCommentTop = (commentTopInSection: number) => {
    if (!sectionRef.current) return undefined;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    // Account for padding and container offset
    const containerTop = sectionTop + 48; // py-12 = 48px
    return containerTop + commentTopInSection * scale;
  };

  // Draft card dimensions (850px width from PersonalStatementCard)
  // Use wider design space on larger screens to allow more spacing
  const effectiveDesignW =
    windowWidth >= 1400 ? 1300 : windowWidth >= 1100 ? 1250 : DESIGN_W;

  const DRAFT_WIDTH = 850;
  const DRAFT_CENTER_X = effectiveDesignW / 2;
  const DRAFT_CENTER_Y = DESIGN_H / 2;
  const DRAFT_LEFT = DRAFT_CENTER_X - DRAFT_WIDTH / 2;
  const DRAFT_RIGHT = DRAFT_CENTER_X + DRAFT_WIDTH / 2;
  const COMMENT_WIDTH = 280;
  // Responsive spacing: more space on larger screens (in design space)
  const baseSpacing = 60;
  let COMMENT_SPACING =
    windowWidth >= 1400 ? 100 : windowWidth >= 1200 ? 80 : baseSpacing;

  // Calculate ideal positions (outside draft card)
  let leftCommentX = DRAFT_LEFT - COMMENT_WIDTH - COMMENT_SPACING;
  let rightCommentX = DRAFT_RIGHT + COMMENT_SPACING;

  // Check if total scaled width exceeds viewport width
  // If so, reduce spacing to allow comments to overlap draft card
  const totalScaledWidth =
    (rightCommentX + COMMENT_WIDTH - leftCommentX) * scale;
  const maxViewportWidth = windowWidth - 32; // Account for container padding

  if (totalScaledWidth > maxViewportWidth) {
    // Reduce spacing to fit within viewport
    // Keep draft card width constant, only adjust comment positions
    const targetTotalWidth = maxViewportWidth / scale;
    const currentTotalWidth = rightCommentX + COMMENT_WIDTH - leftCommentX;
    const excess = currentTotalWidth - targetTotalWidth;

    // Reduce spacing equally on both sides (may allow overlap)
    const spacingReduction = excess / 2;
    leftCommentX = leftCommentX + spacingReduction;
    rightCommentX = rightCommentX - spacingReduction;

    // Ensure comments don't go outside design bounds (with small margin)
    const minLeftMargin = 10;
    const maxRightMargin = effectiveDesignW - COMMENT_WIDTH - 10;
    leftCommentX = Math.max(minLeftMargin, leftCommentX);
    rightCommentX = Math.min(maxRightMargin, rightCommentX);
  } else {
    // Clamp to safe bounds
    const minLeftMargin = 10;
    const maxRightMargin = effectiveDesignW - COMMENT_WIDTH - 10;
    leftCommentX = Math.max(minLeftMargin, leftCommentX);
    rightCommentX = Math.min(maxRightMargin, rightCommentX);
  }

  const LEFT_COMMENT_X = leftCommentX;
  const RIGHT_COMMENT_X = rightCommentX;

  return (
    <motion.section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="personal-statement"
      className="w-full pt-24 pb-16 md:pt-38 md:pb-38 flex justify-center overflow-visible mb-20"
      variants={fadeInUp}
    >
      {/* Outer wrapper takes up real layout space */}
      <div
        style={{
          width: effectiveDesignW * scale,
          height: DESIGN_H * scale,
          position: "relative",
          minHeight: 240,
        }}
      >
        {/* Inner scene rendered at natural resolution then scaled */}
        <div
          style={{
            width: effectiveDesignW,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Main personal statement card centred */}
          <div
            style={{
              position: "absolute",
              top: DRAFT_CENTER_Y,
              left: DRAFT_CENTER_X,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PersonalStatementCard />
          </div>

          {/* Floating comment cards positioned relative to draft */}
          {/* Top-left comment - Edit suggestion demo */}
          <div
            style={{
              position: "absolute",
              top: Math.max(20, DRAFT_CENTER_Y - 200),
              left: LEFT_COMMENT_X,
            }}
          >
            <AOOpinionCard
              commentTitle="Make it more specific"
              scrollY={scrollY}
              commentTop={getCommentTop(Math.max(20, DRAFT_CENTER_Y - 200))}
              expandThreshold={350}
              commentReplies={[
                {
                  type: "user",
                  text: "I want to make this less vague, can you replace this with something specific about my extracurricular as Debate Captain?",
                  author: "user",
                  timestamp: new Date(Date.now() - 600000),
                },
                {
                  type: "tool",
                  toolItem: {
                    type: "tool",
                    id: "profile-search-1",
                    toolName: "search_activities",
                    status: "completed",
                    args: {
                      query: "debate leadership",
                    },
                    result: JSON.stringify(
                      {
                        extracurriculars: [
                          {
                            name: "Debate Captain",
                            hours: "10 hrs/week",
                            description:
                              "Led team of 25 students to regional championships",
                          },
                          {
                            name: "Model UN President",
                            hours: "5 hrs/week",
                            description: "Organized school-wide conferences",
                          },
                        ],
                      },
                      null,
                      2
                    ),
                  },
                },
                {
                  type: "tool",
                  toolItem: {
                    type: "tool",
                    id: "edit-1",
                    toolName: "make_edit_suggestion",
                    status: "completed",
                    args: {
                      original_text:
                        "I have always been passionate about many different things and I think that makes me a well-rounded person who would be great at college.",
                      context: "Debate Captain extracurricular",
                    },
                    editSuggestion: {
                      original_text:
                        "I have always been passionate about many different things and I think that makes me a well-rounded person who would be great at college.",
                      suggested_text:
                        "As Debate Captain, I learned to construct compelling arguments from limited information, organize team strategy sessions, and mentor newer members—skills that directly translate to collaborative academic work.",
                    },
                  },
                },
                {
                  type: "ai",
                  text: "I've created an edit suggestion that replaces the vague statement with specific details about your Debate Captain experience. The new text highlights concrete skills and demonstrates your leadership abilities.",
                  author: "ai",
                  timestamp: new Date(Date.now() - 300000),
                },
              ]}
              position={{ top: 0, left: 0 }}
            />
          </div>

          {/* Top-right comment - Web search demo */}
          <div
            style={{
              position: "absolute",
              top: Math.max(20, DRAFT_CENTER_Y - 250),
              left: RIGHT_COMMENT_X,
            }}
          >
            <AOOpinionCard
              commentTitle="Find Columbia clubs"
              scrollY={scrollY}
              commentTop={getCommentTop(Math.max(20, DRAFT_CENTER_Y - 250))}
              expandThreshold={350}
              commentReplies={[
                {
                  type: "user",
                  text: "Search for a Columbia club that I can write about relating to this section",
                  author: "user",
                  timestamp: new Date(Date.now() - 900000),
                },
                {
                  type: "tool",
                  toolItem: {
                    type: "tool",
                    id: "search-1",
                    toolName: "web_search",
                    status: "completed",
                    args: {
                      query: "Columbia University debate clubs organizations",
                    },
                    searchResults: {
                      query: "Columbia University debate clubs organizations",
                      results: [
                        {
                          title:
                            "Columbia Debate Society | Columbia University",
                          url: "https://debate.columbia.edu",
                          snippet:
                            "The Columbia Debate Society is one of the oldest student organizations on campus, competing in national and international tournaments.",
                        },
                        {
                          title: "Columbia Parliamentary Debate Association",
                          url: "https://cpda.columbia.edu",
                          snippet:
                            "CPDA hosts weekly debates and training sessions for students interested in parliamentary debate.",
                        },
                        {
                          title: "Model UN at Columbia",
                          url: "https://mun.columbia.edu",
                          snippet:
                            "Columbia's Model UN program offers students opportunities to engage in diplomatic simulations and develop public speaking skills.",
                        },
                      ],
                    },
                  },
                },
                {
                  type: "ai",
                  text: "I found several Columbia debate-related organizations that align with your essay topic. The Columbia Debate Society and Columbia Parliamentary Debate Association would be excellent additions to mention, as they directly connect to your experience as Debate Captain.",
                  author: "ai",
                  timestamp: new Date(Date.now() - 300000),
                },
              ]}
              position={{ top: 0, left: 0 }}
            />
          </div>

          {/* Middle-right comment - positioned to the right, middle */}
          <div
            style={{
              position: "absolute",
              top: DRAFT_CENTER_Y + 200,
              left: RIGHT_COMMENT_X,
            }}
          >
            <AOOpinionCard
              commentTitle="Good flow"
              commentReplies={[
                {
                  type: "ai",
                  text: "This paragraph transitions well into the next. The connection between your debate team experience and leadership is clear.",
                  author: "ai",
                  timestamp: new Date(Date.now() - 900000),
                },
              ]}
              position={{ top: 0, left: 0 }}
              scrollY={scrollY}
              commentTop={getCommentTop(DRAFT_CENTER_Y + 200)}
              expandThreshold={600}
            />
          </div>

          {/* Bottom-left comment - positioned to the left, bottom */}
          <div
            style={{
              position: "absolute",
              top: Math.min(DESIGN_H - 150, DRAFT_CENTER_Y + 250),
              left: LEFT_COMMENT_X,
            }}
          >
            <AOOpinionCard
              commentTitle="Strong conclusion"
              scrollY={scrollY}
              commentTop={getCommentTop(
                Math.min(DESIGN_H - 150, DRAFT_CENTER_Y + 250)
              )}
              expandThreshold={600}
              commentReplies={[
                {
                  type: "ai",
                  text: "Excellent closing paragraph. The 'full circle moment' effectively ties back to your opening.",
                  author: "ai",
                  timestamp: new Date(Date.now() - 1200000),
                },
                {
                  type: "user",
                  text: "Thank you! I worked hard on that part.",
                  author: "user",
                  timestamp: new Date(Date.now() - 600000),
                },
                {
                  type: "ai",
                  text: "It shows. This kind of thoughtful reflection is exactly what admissions officers look for.",
                  author: "ai",
                  timestamp: new Date(Date.now() - 300000),
                },
              ]}
              position={{ top: 0, left: 0 }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TrustedBySection() {
  const schoolLogos = [
    "school_logos/basis.png",
    "school_logos/brooklyntech.JPG",
    "school_logos/exeter.png",
    "school_logos/harker.jpg",
    "school_logos/harvardwestlake.svg",
    "school_logos/kis.png",
    "school_logos/nueva.jpeg",
    "school_logos/sas.webp",
    "school_logos/tas.jpg",
    "school_logos/thomasjefferson.jpg",
  ];

  const firstGroupRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(30);

  useLayoutEffect(() => {
    const el = firstGroupRef.current;
    if (!el) return;

    const compute = () => {
      const width = el.getBoundingClientRect().width;
      const speed = 40;
      const seconds = Math.max(10, width / Math.max(40, speed));
      setDuration(seconds);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <motion.section
      className="w-full py-12 md:py-16 lg:py-20"
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          className="text-center text-lg md:text-xl lg:text-2xl font-medium text-gray-600 mb-4 md:mb-6 tracking-normal"
          variants={fadeInUp}
        >
          Trusted by
        </motion.p>
        <motion.div
          className="flex items-center justify-center mb-8 md:mb-10"
          variants={fadeInUp}
        >
          <div className="h-[1.5px] w-38 md:w-56 lg:w-70 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </motion.div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div
            className="flex will-change-transform select-none hover:[animation-play-state:paused]"
            style={
              {
                width: "max-content",
                animation: `marquee-scroll ${duration}s linear infinite`,
              } as React.CSSProperties
            }
          >
            {/* Group A */}
            <div
              ref={firstGroupRef}
              className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14"
            >
              {schoolLogos.map((logo, i) => (
                <div
                  key={`a-${i}`}
                  className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center"
                >
                  <Image
                    src={`/${logo}`}
                    alt="School logo"
                    width={128}
                    height={64}
                    className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
            {/* Group B (duplicate) */}
            <div
              className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14"
              aria-hidden="true"
            >
              {schoolLogos.map((logo, i) => (
                <div
                  key={`b-${i}`}
                  className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center"
                >
                  <Image
                    src={`/${logo}`}
                    alt="School logo"
                    width={128}
                    height={64}
                    className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FaqSection() {
  // State to track which FAQ item is open
  const [openItem, setOpenItem] = useState<number | null>(null);

  // Toggle function for accordion
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "How does the agentic draft editor work?",
      answer:
        "Our AI-powered draft editor uses an intelligent agent that provides personalized feedback on your essays. Our goal is to provide a fully optimized essay-writing workflow using AI to deliver real-time actionable feedback and automate repetitive tasks.",
    },
    {
      question: "Why not just use ChatGPT?",
      answer:
        "Unlike ChatGPT, our agent provides contextual feedback based on your writing style, profile, background, and extracurriculars. It crafts responses tailored to your unique story and how it aligns with what your target schools are looking for.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, we offer a free tier with limited features to help you get started. Upgrade to our pro tier for higher agent quotas, unlimited drafts, and priority support.",
    },
    {
      question: "Why should I trust Chance Me?",
      answer:
        "Chance Me was developed by two Ivy League transfer computer science students who have been through the admissions process a total of 4 times. We know firsthand how important essays are, how long the process can take, and the lack of quality resources available to students. We built this tool to solve the problems we faced ourselves.",
    },
    {
      question: "Will you sell my data?",
      answer:
        "No. We will never sell your data to third parties. We will only use your data to improve our algorithm and user interface.",
    },
  ];

  return (
    <section
      id="faq"
      className="w-full py-16 md:py-24"
    >
      <div className="container max-w-4xl mx-auto px-4 mb-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tighter md:text-4xl font-bold mb-6 pb-6">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Fixed width container for FAQ items */}
        <div className="mx-auto w-[90%]">
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openItem === index;

              return (
                <div
                  key={index}
                  className="border-b border-gray-300 pb-4"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex justify-between items-center w-full py-2 text-left"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {item.question}
                    </span>
                    <span className="text-xl text-gray-700 ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 pt-4">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <motion.section
      id="get-started"
      className="w-full py-6 md:py-12 lg:py-18 mb-12"
      variants={fadeInUp}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mx-auto"
          variants={staggerContainer}
        >
          <motion.div
            className="space-y-2"
            variants={fadeInUp}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              variants={fadeInUp}
            >
              Ready to write stronger essays?
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              variants={fadeInUp}
            >
              Get personalized feedback and real-time editing suggestions from
              our AI agent.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col mb-12 lg:mb-24 py-4 gap-2 min-[400px]:flex-row"
            variants={popIn}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              size="lg"
              className="gap-1 text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.7)] animate-pulse"
              onClick={() => window.open("https://tally.so/r/nGk2jj", "_blank")}
            >
              Try for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer
      className="w-full bg-[#121212] text-white py-12 rounded-t-3xl relative overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] opacity-90" />

      <motion.div
        className="container px-4 md:px-6 mx-auto relative z-10"
        variants={staggerContainer}
      >
        {/* Logo and info section */}
        <motion.div
          className="mb-12"
          variants={staggerContainer}
        >
          <motion.div
            className="flex items-center gap-2 mb-4"
            variants={fadeInLeft}
          >
            <Image
              src="/logo.png"
              alt="Chance Me Logo"
              width={70}
              height={70}
              className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"
            />
            <span className="text-2xl md:text-3xl font-bold">Chance Me</span>
          </motion.div>
          <motion.p
            className="text-gray-400 max-w-md"
            variants={fadeInUp}
          >
            Chance Me is an AI-powered draft editor that helps you write
            stronger college essays with personalized feedback and real-time
            editing suggestions.
          </motion.p>

          {/* Social media */}
          <motion.div
            className="flex gap-6 mt-6"
            variants={staggerContainer}
          >
            <motion.div
              variants={bounceIn}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </motion.div>
            <motion.div
              variants={bounceIn}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Status */}
          <motion.div
            className="flex items-center gap-2 mt-8"
            variants={fadeInUp}
          >
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-gray-300">All services are online</span>
          </motion.div>

          <motion.div
            className="mt-4 text-gray-400"
            variants={fadeInUp}
          >
            &copy; {new Date().getFullYear()} Chance Me. All rights reserved.
          </motion.div>
        </motion.div>

        {/* Links section commented out as per original */}
      </motion.div>
    </motion.footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Twitter, Instagram } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import TypedText from "@/components/TypedText";
import AdmissionDot, { TrialStatus } from "@/components/AdmissionDot";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  popIn,
  bounceIn,
} from "@/components/framer-animations";

import PersonalStatementCard from "@/components/PersonalStatementCard";
import AOOpinionCard from "@/components/AOOpinionCard";

const DESIGN_W = 1200; // natural resolution
const DESIGN_H = 600;

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
        className="flex-1 mx-auto"
        variants={staggerContainer}
      >
        <HeroSection />
        <PersonalStatement />
        <AdmissionTrials />
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
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative"
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
              className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl text-center"
              variants={fadeInUp}
            >
              Essays personalized for you
              <br />
              and <TypedText />
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-muted-foreground md:text-xl lg:text-2xl"
              variants={fadeInUp}
            >
              Draft personalized essays with the context of your experiences and your dream school
        
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
                    inline-flex items-center justify-center rounded-lg text-md font-bold 
                    h-10 px-6 
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
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      setScale(Math.min(1, vw / DESIGN_W));
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

  // Draft card dimensions (700px width)
  const DRAFT_WIDTH = 700;
  const DRAFT_CENTER_X = DESIGN_W / 2;
  const DRAFT_CENTER_Y = DESIGN_H / 2;
  const DRAFT_LEFT = DRAFT_CENTER_X - DRAFT_WIDTH / 2;
  const DRAFT_RIGHT = DRAFT_CENTER_X + DRAFT_WIDTH / 2;
  const COMMENT_WIDTH = 280;
  const COMMENT_SPACING = 20; // Space between draft and comments
  
  // Calculate safe positions to keep comments on screen
  const LEFT_COMMENT_X = Math.max(10, DRAFT_LEFT - COMMENT_WIDTH - COMMENT_SPACING);
  const RIGHT_COMMENT_X = Math.min(DESIGN_W - COMMENT_WIDTH - 10, DRAFT_RIGHT + COMMENT_SPACING);

  return (
    <motion.section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="personal-statement"
      className="w-full py-12 md:py-32 flex justify-center overflow-visible"
      variants={fadeInUp}
    >
      {/* Outer wrapper takes up real layout space */}
      <div
        style={{
          width: DESIGN_W * scale,
          height: DESIGN_H * scale,
          position: "relative",
          minWidth: 320,
          minHeight: 240,
        }}
      >
        {/* Inner scene rendered at natural resolution then scaled */}
        <div
          style={{
            width: DESIGN_W,
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
              top: "50%",
              left: "50%",
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
                    result: JSON.stringify({
                      extracurriculars: [
                        { name: "Debate Captain", hours: "10 hrs/week", description: "Led team of 25 students to regional championships" },
                        { name: "Model UN President", hours: "5 hrs/week", description: "Organized school-wide conferences" }
                      ]
                    }, null, 2),
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
                      original_text: "I have always been passionate about many different things and I think that makes me a well-rounded person who would be great at college.",
                      context: "Debate Captain extracurricular",
                    },
                    editSuggestion: {
                      original_text: "I have always been passionate about many different things and I think that makes me a well-rounded person who would be great at college.",
                      suggested_text: "As Debate Captain, I learned to construct compelling arguments from limited information, organize team strategy sessions, and mentor newer members—skills that directly translate to collaborative academic work.",
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
                          title: "Columbia Debate Society | Columbia University",
                          url: "https://debate.columbia.edu",
                          snippet: "The Columbia Debate Society is one of the oldest student organizations on campus, competing in national and international tournaments.",
                        },
                        {
                          title: "Columbia Parliamentary Debate Association",
                          url: "https://cpda.columbia.edu",
                          snippet: "CPDA hosts weekly debates and training sessions for students interested in parliamentary debate.",
                        },
                        {
                          title: "Model UN at Columbia",
                          url: "https://mun.columbia.edu",
                          snippet: "Columbia's Model UN program offers students opportunities to engage in diplomatic simulations and develop public speaking skills.",
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
              commentTop={getCommentTop(Math.min(DESIGN_H - 150, DRAFT_CENTER_Y + 250))}
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

function AdmissionTrials() {
  // Define types for our trial data
  type Trial = {
    id: number;
    firstRoundDecision: "accepted" | "rejected";
    secondRoundDecision: "accepted" | "rejected" | null;
    status: TrialStatus;
    firstRoundOfficer: number; // Index of the officer
    boardOfficers: number[]; // Indices of the board officers
  };

  // State for selected trial (expanded view)
  const [selectedTrialId, setSelectedTrialId] = useState<number | null>(null);

  // State to control description visibility - start with toggle closed
  const [showDescription, setShowDescription] = useState(false);

  // Handle selecting a dot
  const handleSelectDot = (id: number) => {
    setSelectedTrialId(id === -1 ? null : id);
  };

  // Handle toggling description
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  // Admissions officers data
  const officers = [
    {
      name: "Julie Dobrow",
      image:
        "https://arts.columbia.edu/sites/default/files/styles/cu_crop/public/content/Images/Headshots/admis_hs_julie_dobrow_2.jpeg?itok=qX6ABjKo",
    },
    {
      name: "Kenny Wong",
      image:
        "https://arts.columbia.edu/sites/default/files/styles/cu_crop/public/content/Images/Headshots/admis_hs_kenny_wong_2.jpeg?itok=y9tt0Jwg",
    },
    {
      name: "Niquette Johnson",
      image:
        "https://arts.columbia.edu/sites/default/files/styles/cu_crop/public/content/Images/Headshots/staff_hs_johnson_niquette.jpg?itok=kUx2mzoq",
    },
    {
      name: "Michael Robinson",
      image:
        "https://business.columbia.edu/sites/default/files-efs/styles/default_content_image_mobile/public/imce-uploads/staff-photos/cbs-headshot-michael-robinson.jpg?h=b9cd3d4b&itok=gVYh60zk",
    },
    {
      name: "Sarah Chen",
      image:
        "https://arts.columbia.edu/sites/default/files/styles/cu_crop/public/content/Images/Headshots/admit_hs_tori_sheffer.jpeg?itok=Qx0m-msh",
    },
  ];

  // Generate some fake data for our trials
  const generateFakeTrials = useCallback((): Trial[] => {
    const trials: Trial[] = [];

    // Define which positions should be which status
    const positions: Record<number, TrialStatus> = {
      1: "accepted-round2",
      3: "accepted-round2",
      5: "accepted-round2",
      8: "accepted-round2",
      11: "accepted-round2",
      15: "accepted-round2",
      18: "accepted-round2",
      22: "accepted-round2",
      24: "accepted-round2",
      27: "accepted-round2",
      30: "accepted-round2",
      32: "accepted-round2",
      38: "accepted-round2",

      2: "rejected-round1",
      4: "rejected-round1",
      6: "rejected-round1",
      12: "rejected-round1",
      14: "rejected-round1",
      16: "rejected-round1",
      20: "rejected-round1",
      23: "rejected-round1",
      26: "rejected-round1",
      29: "rejected-round1",
      35: "rejected-round1",
      39: "rejected-round1",

      7: "rejected-round2",
      10: "rejected-round2",
      17: "rejected-round2",
      19: "rejected-round2",
      21: "rejected-round2",
      28: "rejected-round2",
      31: "rejected-round2",
      33: "rejected-round2",
      37: "rejected-round2",

      9: "in-progress",
      13: "in-progress",
      25: "in-progress",
      34: "in-progress",
      36: "in-progress",
      40: "in-progress",
    };

    // Create trials
    for (let i = 1; i <= 40; i++) {
      const status: TrialStatus = positions[i] || "in-progress";

      // Randomly select officers for this trial
      const firstRoundOfficer = Math.floor(Math.random() * 5);

      // Create a board with 3 officers (including the first round officer)
      const boardOfficers = [firstRoundOfficer];
      while (boardOfficers.length < 3) {
        const officer = Math.floor(Math.random() * 5);
        if (!boardOfficers.includes(officer)) {
          boardOfficers.push(officer);
        }
      }

      // Determine the decisions based on the status
      let firstRoundDecision: "accepted" | "rejected" = "rejected";
      let secondRoundDecision: "accepted" | "rejected" | null = null;

      switch (status) {
        case "accepted-round2":
          firstRoundDecision = "accepted";
          secondRoundDecision = "accepted";
          break;
        case "rejected-round1":
          firstRoundDecision = "rejected";
          break;
        case "rejected-round2":
          firstRoundDecision = "accepted";
          secondRoundDecision = "rejected";
          break;
        case "in-progress":
          // For in-progress, randomly determine if they passed round 1
          firstRoundDecision = Math.random() > 0.5 ? "accepted" : "rejected";
          // If they passed round 1, they're in round 2, otherwise still in round 1
          break;
      }

      trials.push({
        id: i,
        status,
        firstRoundDecision,
        secondRoundDecision,
        firstRoundOfficer,
        boardOfficers,
      });
    }

    return trials;
  }, []);

  // State to hold the generated trials
  const [trials, setTrials] = useState<Trial[]>([]);

  // Generate admission trial data inside useEffect to ensure it runs client-side only
  useEffect(() => {
    setTrials(generateFakeTrials());
  }, [generateFakeTrials]);

  return (
    <motion.section
      id="admission-trials"
      className="w-full py-12 md:py-32"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-10 text-center"
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            variants={fadeInUp}
          >
            <span className="text-primary">Try Your Luck 🍀</span>
          </motion.div>
          <motion.h2
            className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl flex items-center justify-center gap-2"
            variants={fadeInUp}
          >
            See The Admission Process At Work
            {showDescription ? (
              <motion.button
                onClick={toggleDescription}
                className="inline-flex p-1 rounded-full hover:bg-white/20"
                aria-label="Hide description"
                variants={popIn}
                whileHover="hover"
                whileTap="tap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  ></line>
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  ></line>
                </svg>
              </motion.button>
            ) : (
              <motion.button
                onClick={toggleDescription}
                className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-medium hover:bg-white/20"
                aria-label="Show description"
                variants={popIn}
                whileHover="hover"
                whileTap="tap"
              >
                ?
              </motion.button>
            )}
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            variants={fadeInUp}
          >
            We simulated the admission process 40 times
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          variants={fadeInUp}
        >
          <motion.div
            className={`flex flex-col md:flex-row ${
              showDescription
                ? "md:items-start"
                : "md:items-center justify-center"
            } gap-12 mt-2 w-full max-w-6xl mx-auto`}
            variants={staggerContainer}
            animate={showDescription ? "visible" : { opacity: 1 }}
          >
            {/* Main grid container - adding more spacing */}
            <motion.div
              className={`w-full ${
                showDescription
                  ? "md:w-2/3 mx-auto md:mx-0"
                  : "md:max-w-3xl mx-auto"
              }  bg-white/5 backdrop-blur-sm rounded-lg border border-gray-100/10 flex-shrink-0`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                staggerChildren: 0.03,
                delayChildren: 0.1,
                staggerDirection: 1,
              }}
            >
              {/* Selected dot card */}
              {selectedTrialId !== null && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`selected-${selectedTrialId}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="w-full mb-8"
                  >
                    {trials
                      .filter((trial) => trial.id === selectedTrialId)
                      .map((trial) => (
                        <AdmissionDot
                          key={trial.id}
                          id={trial.id}
                          status={trial.status}
                          firstRoundDecision={trial.firstRoundDecision}
                          secondRoundDecision={trial.secondRoundDecision}
                          firstRoundOfficer={trial.firstRoundOfficer}
                          boardOfficers={trial.boardOfficers}
                          officers={officers}
                          isSelected={true}
                          onSelect={handleSelectDot}
                          isOtherDotSelected={false}
                        />
                      ))}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Dots grid with improved spacing */}
              <motion.div
                className={`w-full mx-auto dots-grid ${
                  selectedTrialId !== null ? "mt-8 selected-mode" : ""
                }`}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    selectedTrialId !== null
                      ? "repeat(10, minmax(0, 1fr))"
                      : "repeat(8, minmax(0, 1fr))",
                  gap:
                    selectedTrialId !== null
                      ? "0.75rem 0.75rem"
                      : "1rem 0.85rem",
                  justifyContent: "center",
                  maxWidth: selectedTrialId !== null ? "100%" : "95%",
                  padding: selectedTrialId !== null ? "0" : "0.5rem",
                }}
              >
                {/* Adding responsive styles for the grid container */}
                <style
                  jsx
                  global
                >{`
                  @media (max-width: 768px) {
                    .dots-grid {
                      gap: 1rem 0.75rem !important;
                      max-width: 98% !important;
                      padding: 0.25rem !important;
                    }
                    .dots-grid.selected-mode {
                      grid-template-columns: repeat(
                        8,
                        minmax(0, 1fr)
                      ) !important;
                      gap: 0.7rem 0.6rem !important;
                    }
                  }
                  @media (max-width: 640px) {
                    .dots-grid {
                      grid-template-columns: repeat(
                        5,
                        minmax(0, 1fr)
                      ) !important;
                      gap: 0.75rem 0.6rem !important;
                      max-width: 100% !important;
                      padding: 0.2rem !important;
                    }
                    .dots-grid.selected-mode {
                      grid-template-columns: repeat(
                        8,
                        minmax(0, 1fr)
                      ) !important;
                      gap: 0.5rem 0.4rem !important;
                    }
                  }
                `}</style>
                {trials.map((trial) =>
                  selectedTrialId === trial.id ? null : (
                    <div
                      key={trial.id}
                      className="flex items-center justify-center"
                      style={{
                        aspectRatio: "1/1",
                        minWidth: 0, // Prevent overflow
                        minHeight: 0, // Prevent overflow
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: selectedTrialId !== null ? 0.7 : 1,
                          scale: selectedTrialId !== null ? 0.85 : 1,
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "2px", // Small padding to ensure spacing
                        }}
                      >
                        <AdmissionDot
                          id={trial.id}
                          status={trial.status}
                          firstRoundDecision={trial.firstRoundDecision}
                          secondRoundDecision={trial.secondRoundDecision}
                          firstRoundOfficer={trial.firstRoundOfficer}
                          boardOfficers={trial.boardOfficers}
                          officers={officers}
                          isSelected={selectedTrialId === trial.id}
                          onSelect={handleSelectDot}
                          isOtherDotSelected={selectedTrialId !== null}
                        />
                      </motion.div>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Description (Right side) */}
            {showDescription && (
              <motion.div
                className="mt-2 md:mt-0 md:w-1/3 text-center md:text-left"
                variants={fadeInRight}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="mb-4"
                  variants={fadeInUp}
                >
                  <h3 className="text-2xl font-semibold">
                    Two-Round Admission Process
                  </h3>
                </motion.div>

                <motion.p
                  className="text-muted-foreground mb-6"
                  variants={fadeInUp}
                >
                  Each dot represents an applicant going through our admission
                  process:
                </motion.p>

                <motion.div
                  className="space-y-4 text-sm"
                  variants={staggerContainer}
                >
                  <motion.div
                    className="flex gap-2"
                    variants={fadeInLeft}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full bg-red-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Round 1 Rejection</p>
                      <p className="text-muted-foreground">
                        Application rejected by the first admission officer.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-2"
                    variants={fadeInLeft}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full bg-blue-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">In Progress</p>
                      <p className="text-muted-foreground">
                        Application is still being reviewed.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-2"
                    variants={fadeInLeft}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full bg-green-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Accepted</p>
                      <p className="text-muted-foreground">
                        Application approved by the board of officers.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-8"
                  variants={fadeInUp}
                >
                  <p className="mb-2 font-medium">
                    Click on any dot to see detailed admission results
                  </p>
                  <p className="text-muted-foreground">
                    Hover over officers to learn more about them.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
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
      question: "Why should I trust your predictions?",
      answer:
        "Our multi-agent model replicates the decision-making process of real Ivy League admissions offices across 1,000 simulations, using profiles based on actual admissions officers. Backed by insights from both former and current admission professionals, our approach gives you a uniquely realistic and credible evaluation.",
    },
    {
      question: "How does Chance Me work?",
      answer:
        "We simulate the random nature of the admissions process to give you a more accurate prediction of your chances of getting into your dream college. We also consider essays, which most other platforms do not.",
    },
    {
      question: "Why Chance Me?",
      answer:
        "Chance me was made by two Columbia transfer students who have been through the college application process a total of 4 times and know what it's like to be in your shoes.",
    },
    {
      question: "When can I use Chance Me?",
      answer:
        "Chance me is currently in early beta as we continue to improve our algorithm and user interface. We are giving access to early users. If you are interested please send an email to jym2117@columbia.edu with your name and how much you are willing to pay per month ",
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

                  {/* Always render the content div but control its height and opacity */}
                  <div
                    className="overflow-hidden"
                    style={{
                      height: isOpen ? "auto" : "0",
                      opacity: isOpen ? 1 : 0,
                      transformOrigin: "top",
                      transform: isOpen ? "scaleY(1)" : "scaleY(0)",
                      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      padding: isOpen ? "16px 0" : "0",
                    }}
                  >
                    <p className="text-gray-500">{item.answer}</p>
                  </div>
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
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
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
              Ready to predict the future?
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              variants={fadeInUp}
            >
              Get a leg up on your college applications.
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
              Join the Waitlist
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
            Chance Me is a multi-agent prediction model that predicts your
            chances of getting into your dream college.
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

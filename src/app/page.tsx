"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Twitter, Instagram } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import TypedText from "@/components/TypedText";
import AdmissionDot, { TrialStatus } from "@/components/AdmissionDot";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  popIn,
  bounceIn,
} from "@/components/framer-animations";

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
        <AdmissionTrials />
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
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.section
      id="hero"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
      variants={fadeInUp}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerContainer}
        >
          <motion.div
            className="flex items-center gap-2"
            variants={bounceIn}
          >
            <Image
              src="/logo.png"
              alt="Chance Me Logo"
              width={150}
              height={150}
              className="md:block hidden object-contain hover:scale-110 transition-all duration-300 ease-in-out animate-float cursor-none"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))",
              }}
            />
          </motion.div>
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center rounded-lg bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 px-3 py-1 text-sm font-medium"
              variants={fadeInUp}
            >
              <span className="text-yellow-800">
                Made by Two Columbia Students
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center"
              variants={fadeInUp}
            >
              Get your application read by{" "}
              <motion.span
                className={`number-box ${isInView ? "animate-underline" : ""}`}
                variants={popIn}
                onViewportEnter={() => setIsInView(true)}
                onViewportLeave={() => setIsInView(false)}
                viewport={{ once: false, amount: 0.8 }}
              >
                1000
              </motion.span>{" "}
              Admissions Officers at <TypedText />
            </motion.h1>
            <motion.p
              className="max-w-[400px] mx-auto text-muted-foreground md:text-xl"
              variants={fadeInUp}
            >
              Multi-agent model that predicts your chances of getting in to your
              dream college
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
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
                    inline-flex items-center justify-center rounded-md text-md font-bold 
                    h-14 px-10 
                    text-black 
                    bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300
                    shadow-md shadow-yellow-500/30 
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-yellow-400/50 hover:scale-110
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2
                  "
                >
                  Join Waitlist
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
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
      className="w-full py-24 md:py-32"
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
            } gap-12 mt-8 w-full max-w-6xl mx-auto`}
            variants={staggerContainer}
            animate={showDescription ? "visible" : { opacity: 1 }}
          >
            {/* Grid of admission trial dots */}
            <motion.div
              className={`grid grid-cols-5 gap-8 w-full ${
                showDescription
                  ? "md:w-2/3 mx-auto md:mx-0"
                  : "md:max-w-3xl mx-auto"
              } p-10 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-100/10 flex-shrink-0 place-items-center`}
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
              {trials.map((trial) => (
                <motion.div
                  key={trial.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      scale: 0.5,
                      y: trial.id % 2 === 0 ? 20 : -20,
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300 + (trial.id % 5) * 20,
                        damping: 20,
                        mass: 1 + (trial.id % 3) * 0.2,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
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
                    isOtherDotSelected={
                      selectedTrialId !== null && selectedTrialId !== trial.id
                    }
                  />
                </motion.div>
              ))}
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

function CtaSection() {
  return (
    <motion.section
      id="get-started"
      className="w-full py-12 md:py-24 lg:py-32"
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
            className="flex flex-col gap-2 min-[400px]:flex-row"
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
              className="object-contain"
            />
            <span className="text-3xl font-bold">Chance Me</span>
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import TypedText from "@/components/TypedText";
import AdmissionDot, { TrialStatus, Officer } from "@/components/AdmissionDot";
import Navbar from "@/components/navbar";
export default function LandingPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: "url('/absbg.png')",
        backgroundPosition: "center 20%",
      }}
    >
      <Navbar />
      <main className="flex-1 mx-auto">
        <HeroSection />
        <AdmissionTrials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Chance Me Logo"
              width={150}
              height={150}
              className="object-contain hover:scale-110 transition-all duration-300 ease-in-out animate-float cursor-none"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))",
              }}
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center rounded-lg bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 px-3 py-1 text-sm font-medium">
              <span className="text-yellow-800">
                Made by 2 Columbia Students
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center">
              Get your application read by 1000 Admissions Officers at{" "}
              <TypedText />
            </h1>
            <p className="max-w-[400px] mx-auto text-muted-foreground md:text-xl">
              Multi-agent model that predicts your chances of getting in to your
              dream college
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
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
            </div>
          </div>
        </div>
      </div>
    </section>
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
      let boardOfficers = [firstRoundOfficer];
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
    <section
      id="admission-trials"
      className="w-full py-24 md:py-32"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            <span className="text-primary">Try Your Luck</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl flex items-center justify-center gap-2">
            See The Admission Process At Work
            {showDescription ? (
              <button
                onClick={toggleDescription}
                className="inline-flex p-1 rounded-full hover:bg-white/20"
                aria-label="Hide description"
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
              </button>
            ) : (
              <button
                onClick={toggleDescription}
                className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-medium hover:bg-white/20"
                aria-label="Show description"
              >
                ?
              </button>
            )}
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`flex flex-col md:flex-row ${
              showDescription
                ? "md:items-start"
                : "md:items-center justify-center"
            } gap-12 mt-8 w-full max-w-6xl mx-auto`}
          >
            {/* Grid of admission trial dots */}
            <div
              className={`grid grid-cols-5 gap-8 w-full ${
                showDescription
                  ? "md:w-2/3 mx-auto md:mx-0"
                  : "md:max-w-3xl mx-auto"
              } p-10 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-100/10 flex-shrink-0 place-items-center`}
            >
              {trials.map((trial) => (
                <AdmissionDot
                  key={trial.id}
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
              ))}
            </div>

            {/* Description (Right side) */}
            {showDescription && (
              <div className="mt-2 md:mt-0 md:w-1/3 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold">
                    Two-Round Admission Process
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6">
                  Each dot represents an applicant going through our admission
                  process:
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full bg-red-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Round 1 Rejection</p>
                      <p className="text-muted-foreground">
                        Application rejected by the first admission officer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full bg-blue-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">In Progress</p>
                      <p className="text-muted-foreground">
                        Application is still being reviewed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full bg-green-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Accepted</p>
                      <p className="text-muted-foreground">
                        Application approved by the board of officers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-2 font-medium">
                    Click on any dot to see detailed admission results
                  </p>
                  <p className="text-muted-foreground">
                    Hover over officers to learn more about them.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="get-started"
      className="w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to predict the future?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get a leg up on your college applications.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="gap-1 text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.7)] animate-pulse"
              onClick={() => window.open("https://tally.so/r/nGk2jj", "_blank")}
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#121212] text-white py-12 rounded-t-3xl relative overflow-hidden">
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

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Logo and info section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/logo.png"
              alt="Chance Me Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <span className="text-3xl font-bold">Chance Me</span>
          </div>
          <p className="text-gray-400 max-w-md">
            Chance Me is a multi-agent prediction model that predicts your
            chances of getting into your dream college.
          </p>

          {/* Social media */}
          <div className="flex gap-6 mt-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mt-8">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-gray-300">All services are online</span>
          </div>

          <div className="mt-4 text-gray-400">
            &copy; {new Date().getFullYear()} Chance Me. All rights reserved.
          </div>
        </div>

        {/* Links section - Commented out temporarily */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Legal column */}
        {/* <div>
            <h4 className="text-xl font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Refund policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div> */}

        {/* Links column */}
        {/* <div>
            <h4 className="text-xl font-bold mb-6">Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  Log in to Chance Me
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

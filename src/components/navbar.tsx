"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full px-6 py-4">
      <div
        className={`mx-auto rounded-xl border border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 transition-all duration-200 ${
          scrolled
            ? "py-2 max-w-[95%] md:max-w-[90%]"
            : "py-3 max-w-[98%] md:max-w-[96%]"
        }`}
      >
        <div className="container flex max-w-screen-2xl items-center px-4 md:px-8">
          <ScrollLink
            to="home"
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
            <span
              className={`font-bold text-black transition-all duration-200 ${
                scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
              }`}
            >
              <span className="hidden font-medium md:inline">Chance Me</span>
            </span>
          </ScrollLink>
          <nav className="flex flex-1 items-center space-x-8 text-sm font-medium text-gray-700 md:block mx-4">
            {/* {["Simulation", "Pricing"].map((section) => (
              <ScrollLink
                key={section}
                to={section}
                spy={true}
                smooth={true}
                offset={-100}
                duration={700}
                className={`cursor-pointer capitalize hover:text-yellow-400 transition-colors ${
                  section === "Pricing" ? "hidden sm:inline" : ""
                }`}
                activeClass="text-yellow-400"
              >
                {section}
              </ScrollLink>
            ))} */}
          </nav>
          <div className="flex items-center space-x-4">
            {/* <Link
              href="https://github.com/23jmo/ChanceMe"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="md:block hidden h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link> */}
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
            <Button
              size="sm"
              className="relative overflow-hidden bg-yellow-400/50 text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:bg-yellow-400/50 hover:scale-105 transition-all duration-200"
              onClick={() => window.open("https://tally.so/r/nGk2jj", "_blank")}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

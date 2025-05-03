"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
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
        className={`mx-auto rounded-xl border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
          scrolled
            ? "py-2 shadow-lg max-w-[95%] md:max-w-[90%]"
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
            <span
              className={`font-bold transition-all duration-200 ${
                scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
              }`}
            >
              <span className="md:hidden">🎲</span>
              <span className="hidden md:inline">Chance Me</span>
            </span>
          </ScrollLink>
          <nav className="flex flex-1 items-center space-x-8 text-sm font-medium md:block mx-4">
            {["features", "Pricing"].map((section) => (
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
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/23jmo/DayReplay"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
              >
                <Github className="md:block hidden h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="md:block hidden"
              onClick={() => {
                window.open("mailto:jym2117@columbia.edu", "_blank");
              }}
            >
              Contact
            </Button>
            <Button
              size="sm"
              className="relative overflow-hidden hover:animate-shine hover:scale-105 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-200"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

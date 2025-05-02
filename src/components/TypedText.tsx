"use client";

import { useEffect, useState } from "react";
import "./typing-animation.css";

const colleges = [
  "Harvard",
  "Columbia",
  "Princeton",
  "University of Michigan",
  "UC Davis",
  "UC Berkeley",
  "Stanford",
  "Cornell",
  "Dartmouth",
  "UChicago",
  "Georgia Tech",
  "MIT",
  "Yale",
  "Duke",
  "UCLA",
];

export default function TypedText() {
  // State to track the displayed text
  const [displayText, setDisplayText] = useState("");

  // State to track which college we're on
  const [collegeIndex, setCollegeIndex] = useState(0);

  // State to track if we're deleting or typing
  const [isDeleting, setIsDeleting] = useState(false);

  // Timing configuration
  const typingSpeed = 100; // ms per character for typing
  const deletingSpeed = 50; // ms per character for deleting
  const pauseTime = 2000; // ms to wait after typing before deleting

  // Effect to handle the typing animation
  useEffect(() => {
    // Get the current college name
    const currentCollege = colleges[collegeIndex];

    // Set the timeout for the next update
    const timeout = setTimeout(
      () => {
        // TYPING: If we're not deleting and haven't typed the full word yet
        if (!isDeleting && displayText !== currentCollege) {
          // Add the next character
          setDisplayText(currentCollege.substring(0, displayText.length + 1));
        }
        // PAUSING: If we've just finished typing and aren't deleting yet
        else if (!isDeleting && displayText === currentCollege) {
          // Wait, then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
        // DELETING: If we're deleting and still have text
        else if (isDeleting && displayText !== "") {
          // Remove the last character
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }
        // SWITCHING: If we're deleting and text is empty
        else if (isDeleting && displayText === "") {
          // Move to the next college
          setIsDeleting(false);
          setCollegeIndex((collegeIndex + 1) % colleges.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, collegeIndex]);

  return (
    <span className="typing-container">
      {" "}
      <span className="typed-content-wrapper">
        <span className="college-name">{displayText}</span>
        <span className="cursor"></span>
      </span>
    </span>
  );
}

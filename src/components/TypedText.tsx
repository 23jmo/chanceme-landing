"use client";

import { useEffect, useState } from "react";
import "./typing-animation.css";

// Updated colleges array to include names and colors
const colleges = [
  { name: "Harvard", color: "#A51C30" }, // Crimson
  { name: "Columbia", color: "#C4D8E2" }, // Light Blue
  { name: "Princeton", color: "#E87722" }, // Orange
  { name: "University of Michigan", color: "#FFCB05" }, // Maize
  { name: "UC Davis", color: "#022851" }, // Aggie Blue
  { name: "UC Berkeley", color: "#FDB515" }, // California Gold
  { name: "Stanford", color: "#8C1515" }, // Cardinal Red
  { name: "Cornell", color: "#B31B1B" }, // Carnelian Red
  { name: "Dartmouth", color: "#00693E" }, // Dartmouth Green
  { name: "UChicago", color: "#800000" }, // Maroon
  { name: "Georgia Tech", color: "#B3A369" }, // Old Gold
  { name: "MIT", color: "#A31F34" }, // Cardinal Red (Tech)
  { name: "Yale", color: "#00356B" }, // Yale Blue
  { name: "Duke", color: "#012169" }, // Duke Blue
  { name: "UCLA", color: "#2D68C4" }, // UCLA Blue
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
  const pauseTime = 1500; // ms to wait after typing before deleting

  // Effect to handle the typing animation
  useEffect(() => {
    // Get the current college object
    const currentCollege = colleges[collegeIndex];

    // Set the timeout for the next update
    const timeout = setTimeout(
      () => {
        // TYPING: If we're not deleting and haven't typed the full word yet
        if (!isDeleting && displayText !== currentCollege.name) {
          // Add the next character
          setDisplayText(
            currentCollege.name.substring(0, displayText.length + 1),
          );
        }
        // PAUSING: If we've just finished typing and aren't deleting yet
        else if (!isDeleting && displayText === currentCollege.name) {
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
          setDisplayText(""); // Ensure text is empty before typing next word
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, collegeIndex]);

  // Get the current color for styling
  const currentColor = colleges[collegeIndex].color;

  return (
    // Using a div container again for better block-level layout control
    <div>
      <span className="typed-content-wrapper">
        <span
          className="college-name"
          style={{
            color: currentColor,
            textShadow: `0 0 8px ${currentColor}66, 0 0 15px ${currentColor}44, 0 0 20px ${currentColor}22`,
          }}
        >
          {displayText}
        </span>
        <span
          className="cursor"
          style={{ backgroundColor: currentColor }}
        ></span>
      </span>
    </div>
  );
}

"use client";

import React from "react";

// College personal statement with enhanced glassmorphic design
const PersonalStatementCard = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 relative">
      {/* Background card, same size, offset down and left */}
      <div
        className="absolute top-4 -left-4 w-full h-full rounded-3xl bg-white/60 border border-gray-200 shadow-md"
        style={{ zIndex: 0, pointerEvents: "none" }}
        aria-hidden="true"
      ></div>

      {/* Foreground card */}
      <div className="relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl z-10">
        {/* Header */}
        <h2 className="text-sm font-medium text-gray-700 mb-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 inline-block">
          Draft 2
        </h2>

        {/* Text area with enhanced glassmorphic background */}
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 min-h-[350px] border border-white/25 relative overflow-hidden">
          {/* Text content with relative positioning */}
          <div className="relative z-10 space-y-4 text-sm leading-relaxed text-gray-800">
            {/* Strong sections - highlighted like text selection in green */}
            <p>
              <span className="bg-green-300/50 selection:bg-green-300/70 backdrop-blur-sm rounded px-1">
                Growing up in a small town where opportunities were scarce, I
                learned early that success requires both determination and
                creativity. When our school's debate team was disbanded due to
                budget cuts, I didn't accept defeat.
              </span>
            </p>

            {/* Weak section to remove - highlighted like text selection in red */}
            <p>
              <span className="bg-red-300/50 selection:bg-red-300/70 backdrop-blur-sm rounded px-1">
                I have always been passionate about many different things and I
                think that makes me a well-rounded person who would be great at
                college.
              </span>
            </p>

            {/* Another strong section */}
            <p>
              <span className="bg-green-300/50 selection:bg-green-300/70 backdrop-blur-sm rounded px-1">
                Instead, I organized informal debate sessions in our local
                library, recruiting classmates and eventually catching the
                attention of a retired English teacher who volunteered to coach
                us.
              </span>
            </p>

            {/* Weak/needs improvement section - highlighted like text selection in gray */}
            <p>
              <span className="bg-gray-300/50 selection:bg-gray-300/70 backdrop-blur-sm rounded px-1">
                This experience taught me valuable lessons about leadership and
                perseverance. I realized that challenges are opportunities in
                disguise.
              </span>
            </p>

            {/* Another section to remove - highlighted like text selection in red */}
            <p>
              <span className="bg-red-300/50 selection:bg-red-300/70 backdrop-blur-sm rounded px-1">
                My grades have always been pretty good and I work hard in
                school.
              </span>
            </p>

            {/* Strong conclusion - highlighted like text selection in green */}
            <p>
              <span className="bg-green-300/50 selection:bg-green-300/70 backdrop-blur-sm rounded px-1">
                By my senior year, our grassroots debate team had grown to
                fifteen members and placed second in the regional championship.
                More importantly, I discovered my passion for bringing people
                together to achieve common goals.
              </span>
            </p>

            {/* Final paragraph with mixed highlighting */}
            <p>
              <span className="bg-green-300/50 selection:bg-green-300/70 backdrop-blur-sm rounded px-1">
                This drive to build community and foster collaboration
              </span>{" "}
              is what I hope to bring to your university, where I plan to study
              communications and continue developing programs that empower
              others to find their voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalStatementCard;

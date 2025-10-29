"use client";

import React from "react";
import { RiFileTextLine, RiSchoolLine } from "react-icons/ri";

// Draft editor matching chance-me design
const PersonalStatementCard = () => {
  return (
    <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 w-[700px]">
      {/* Title */}
      <div className="mb-8">
        <input
          type="text"
          value="Personal Statement Draft"
          readOnly
          className="w-full bg-transparent border-none outline-none text-4xl font-bold text-gray-900 placeholder-gray-400 leading-tight cursor-default"
        />
      </div>

      {/* Metadata fields */}
      <div className="mb-8">
        {/* School field */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <RiSchoolLine className="text-lg text-gray-500" />
            School
          </div>
          <textarea
            value="Columbia University"
            readOnly
            className="w-full bg-transparent border-none outline-none resize-none text-gray-700 placeholder-gray-400 leading-relaxed overflow-hidden"
            rows={1}
          />
        </div>

        {/* Essay Prompt field */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <RiFileTextLine className="text-lg text-gray-500" />
            Essay Prompt
          </div>
          <textarea
            value="Please provide a statement that addresses your reasons for transferring and the objectives you hope to achieve."
            readOnly
            className="w-full bg-transparent border-none outline-none resize-none text-gray-700 placeholder-gray-400 leading-relaxed overflow-hidden"
            rows={2}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="mb-8">
        <div className="w-full bg-transparent border-none outline-none resize-none text-base text-gray-900 placeholder-gray-400 leading-relaxed font-normal min-h-[600px]">
          <div className="space-y-4">
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

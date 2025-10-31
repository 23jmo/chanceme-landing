"use client";

import React from "react";
import { RiFileTextLine, RiSchoolLine } from "react-icons/ri";

// Draft editor matching chance-me design
const PersonalStatementCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 w-[850px]" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)' }}>
      {/* macOS Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-30 py-12">
        {/* Title */}
        <div className="mb-4">
        <input
          type="text"
          value="Personal Statement Draft"
          readOnly
          className="w-full bg-transparent border-none outline-none text-2xl font-bold text-gray-900 placeholder-gray-400 leading-tight cursor-default"
        />
      </div>

      {/* Metadata fields */}
      <div className="mb-6">
        {/* School field */}
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <RiSchoolLine className="text-base text-gray-500" />
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
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <RiFileTextLine className="text-base text-gray-500" />
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
            {/* First paragraph - matches "Find Columbia clubs" comment (top-right) */}
            <p>
              <span className="bg-yellow-200/40 rounded px-1">
                Growing up in a small town where opportunities were scarce, I
                learned early that success requires both determination and
                creativity. When our school&apos;s debate team was disbanded due to
                budget cuts, I didn&apos;t accept defeat.
              </span>
            </p>

            {/* Second paragraph - matches "Make it more specific" comment (top-left) */}
            <p>
              <span className="bg-yellow-200/40 rounded px-1">
                I have always been passionate about many different things and I
                think that makes me a well-rounded person who would be great at
                college.
              </span>
            </p>

            {/* Third paragraph - no highlight */}
            <p>
              Instead, I organized informal debate sessions in our local
              library, recruiting classmates and eventually catching the
              attention of a retired English teacher who volunteered to coach
              us.
            </p>

            {/* Fourth paragraph - matches "Good flow" comment (middle-right) */}
            <p>
              <span className="bg-yellow-200/40 rounded px-1">
                This experience taught me valuable lessons about leadership and
                perseverance. I realized that challenges are opportunities in
                disguise.
              </span>
            </p>

            {/* Fifth paragraph - no highlight */}
            <p>
              My grades have always been pretty good and I work hard in
              school.
            </p>

            {/* Additional paragraph - no highlight */}
            <p>
              Through my involvement in debate and community organizing, I&apos;ve developed a particular interest in how effective communication shapes public discourse and drives social change. At Columbia, I&apos;m excited to explore courses in media studies and political communication that will deepen my understanding of these dynamics. The interdisciplinary approach to learning at Columbia aligns perfectly with my goal of understanding how different fields intersect to create meaningful impact.
            </p>

            {/* Sixth paragraph - matches "Strong conclusion" comment (bottom-left) */}
            <p>
              <span className="bg-yellow-200/40 rounded px-1">
                By my senior year, our grassroots debate team had grown to
                fifteen members and placed second in the regional championship.
                More importantly, I discovered my passion for bringing people
                together to achieve common goals.
              </span>
            </p>

            {/* Final paragraph - no highlight */}
            <p>
              This drive to build community and foster collaboration
              is what I hope to bring to your university, where I plan to study
              communications and continue developing programs that empower
              others to find their voice.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PersonalStatementCard;

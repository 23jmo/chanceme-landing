"use client";

import Image from "next/image";
import { useState } from "react";

// Define types for props and data
export type TrialStatus =
  | "accepted-round2"
  | "rejected-round1"
  | "rejected-round2"
  | "in-progress";

export type Officer = {
  name: string;
  image: string;
};

type AdmissionDotProps = {
  id: number;
  status: TrialStatus;
  firstRoundDecision: "accepted" | "rejected";
  secondRoundDecision: "accepted" | "rejected" | null;
  firstRoundOfficer: number;
  boardOfficers: number[];
  officers: Officer[];
  isSelected: boolean;
  onSelect: (id: number) => void;
  isOtherDotSelected: boolean;
};

export default function AdmissionDot({
  id,
  status,
  firstRoundDecision,
  secondRoundDecision,
  firstRoundOfficer,
  boardOfficers,
  officers,
  isSelected,
  onSelect,
  isOtherDotSelected,
}: AdmissionDotProps) {
  const [isHovered, setIsHovered] = useState(false);
  // const [hoveredOfficer, setHoveredOfficer] = useState<number | null>(null);

  // Function to determine dot color based on status
  const getDotColor = (status: TrialStatus) => {
    switch (status) {
      case "accepted-round2":
        return "bg-green-200";
      case "rejected-round1":
      case "rejected-round2":
        return "bg-red-200";
      case "in-progress":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  // Function to determine ring color based on status
  const getRingColor = (status: TrialStatus) => {
    switch (status) {
      case "accepted-round2":
        return "ring-green-500";
      case "rejected-round1":
      case "rejected-round2":
        return "ring-red-500";
      case "in-progress":
        return "ring-blue-500";
      default:
        return "ring-gray-500";
    }
  };

  // Handle click to expand
  const handleClick = () => {
    setIsHovered(false); // Clear hover state when clicking
    onSelect(id);
  };

  // Generate random feedback for officers
  const generateFeedback = (isPositive: boolean) => {
    const positiveFeedback = [
      "Strong academic record with rigorous courses.",
      "Compelling personal statement that showcases character.",
      "Impressive extracurricular achievements and leadership.",
      "Clear passion for the field of study.",
      "Well-written essays with unique perspective.",
      "Excellent recommendation letters highlighting potential.",
      "Demonstrated commitment to community service.",
      "Unique talents that add diversity to campus.",
    ];

    const negativeFeedback = [
      "Insufficient academic rigor in course selection.",
      "Personal statement lacks depth and authenticity.",
      "Limited extracurricular involvement or leadership.",
      "Unclear academic focus or career goals.",
      "Essays contain grammatical errors and lack polish.",
      "Recommendation letters lack specific examples.",
      "Minimal community engagement or service.",
      "Application appears rushed or incomplete.",
    ];

    const feedbackList = isPositive ? positiveFeedback : negativeFeedback;
    // Return 1-2 random feedback items
    const numItems = Math.floor(Math.random() * 2) + 1;
    const selectedIndices = new Set<number>();

    while (selectedIndices.size < numItems) {
      selectedIndices.add(Math.floor(Math.random() * feedbackList.length));
    }

    return Array.from(selectedIndices).map((index) => feedbackList[index]);
  };

  // Get feedback for first round officer
  const firstRoundFeedback = generateFeedback(
    firstRoundDecision === "accepted"
  );

  // Get feedback for board if application reached second round
  const boardFeedback = secondRoundDecision
    ? generateFeedback(secondRoundDecision === "accepted")
    : [];

  // Expanded dot view
  if (isSelected) {
    return (
      <div
        className="p-6 bg-white rounded-xl shadow-xl transition-all duration-300 w-full"
        style={{
          position: "relative",
          zIndex: 50, // Higher z-index to appear above other elements
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Application #{id}
            </h3>
            <button
              onClick={() => onSelect(-1)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
          </div>

          <div className="flex flex-col gap-6">
            {/* First Round Section */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800">Round 1 Review</h4>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Image
                      src={officers[firstRoundOfficer].image}
                      alt={officers[firstRoundOfficer].name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {officers[firstRoundOfficer].name}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        firstRoundDecision === "accepted"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {firstRoundDecision === "accepted"
                        ? "Approved"
                        : "Rejected"}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Feedback:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {firstRoundFeedback.map((feedback, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600"
                      >
                        {feedback}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Second Round Section (if applicable) */}
            {firstRoundDecision === "accepted" && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">Board Review</h4>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {boardOfficers.map((officerIndex, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={officers[officerIndex].image}
                          alt={officers[officerIndex].name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {officers[officerIndex].name}
                          </p>
                          {secondRoundDecision && (
                            <p
                              className={`text-xs font-bold ${
                                secondRoundDecision === "accepted"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {secondRoundDecision === "accepted"
                                ? "Approved"
                                : "Rejected"}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {secondRoundDecision && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Board Feedback:
                      </h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {boardFeedback.map((feedback, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600"
                          >
                            {feedback}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Final Decision Section */}
          <div className="mt-6">
            <div
              className={`p-4 rounded-lg border ${
                status === "accepted-round2"
                  ? "bg-green-50 border-green-200"
                  : status.includes("rejected")
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <h4
                className={`font-medium mb-2 ${
                  status === "accepted-round2"
                    ? "text-green-800"
                    : status.includes("rejected")
                    ? "text-red-800"
                    : "text-blue-800"
                }`}
              >
                Final Decision
              </h4>
              <p
                className={`text-sm ${
                  status === "accepted-round2"
                    ? "text-green-700"
                    : status.includes("rejected")
                    ? "text-red-700"
                    : "text-blue-700"
                }`}
              >
                {status === "accepted-round2" &&
                  "Congratulations! Your application was accepted. The admissions committee was impressed with your qualifications."}
                {status === "rejected-round1" &&
                  "Your application was rejected in the first round. The admissions officer identified areas that did not meet our current criteria."}
                {status === "rejected-round2" &&
                  "Your application passed the first round but was rejected by the board. While your application had notable strengths, it did not meet all the requirements for admission."}
                {status === "in-progress" &&
                  "Your application is still being reviewed. Our admissions team is carefully evaluating your qualifications."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        handleClick();
      }}
    >
      <div
        className={`
          w-12 h-12 rounded-full cursor-pointer flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${getDotColor(status)}
          ${
            isHovered
              ? `transform scale-125 ring-4 ring-opacity-80 ${getRingColor(
                  status
                )}`
              : ""
          }
          ${isOtherDotSelected ? "transform scale-75 opacity-50" : ""}
          sm:w-12 sm:h-12 w-10 h-10 
        `}
      >
        {/* ID number inside dot */}
        <span
          className={`${
            isOtherDotSelected ? "text-[14px]" : "text-[12px]"
          } sm:block font-semibold text-gray-600`}
          style={{ opacity: isOtherDotSelected ? 0.9 : 0.8 }}
        >
          {id}
        </span>

        {/* Wrapper for officer images with fade effect */}
        <div
          className={`
            absolute inset-0 rounded-full overflow-hidden 
            w-full h-full
            transition-opacity ease-in-out
            ${
              isHovered
                ? "opacity-100 duration-100" // Faster fade in
                : "opacity-0 duration-300 delay-300" // Remove delay, make fade-out faster
            }
          `}
        >
          {/* Officer image(s) rendering */}
          {status === "rejected-round2" ? (
            <div className="w-full h-full relative">
              {/* Ensure parent is relative */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={officers[boardOfficers[0]].image}
                  alt={officers[boardOfficers[0]].name}
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          ) : status === "rejected-round1" ? (
            <div className="w-full h-full">
              <Image
                src={officers[firstRoundOfficer].image}
                alt={officers[firstRoundOfficer].name}
                width={48}
                height={48}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : status === "accepted-round2" ? (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={officers[firstRoundOfficer].image}
                  alt={officers[firstRoundOfficer].name}
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          ) : (
            // In progress - show a placeholder or nothing
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={officers[0].image} // Use the first officer image
                  alt="In progress"
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full object-cover opacity-50"
                />
              </div>
            </div>
          )}
        </div>

        {/* Chat-like popup above the circle */}
        {isHovered && !isSelected && !isOtherDotSelected && (
          <div
            className={`absolute z-[1000] p-4 rounded-lg shadow-lg text-left min-w-[220px] 
              top-0 left-1/2 transform -translate-x-1/2 -translate-y-[120%] mb-4
              ${
                status === "accepted-round2"
                  ? "bg-green-50"
                  : status === "rejected-round1" || status === "rejected-round2"
                  ? "bg-red-50"
                  : "bg-gray-50"
              }
              before:content-[''] before:absolute before:left-1/2 before:top-full 
              before:transform before:-translate-x-1/2 before:border-8 
              before:border-t-solid before:border-r-transparent before:border-b-transparent before:border-l-transparent
              ${
                status === "accepted-round2"
                  ? "before:border-t-green-50"
                  : status === "rejected-round1" || status === "rejected-round2"
                  ? "before:border-t-red-50"
                  : "before:border-t-gray-50"
              }
            `}
          >
            <div className="space-y-2">
              <p>
                Round 1:{" "}
                <span
                  className={
                    firstRoundDecision === "accepted"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {firstRoundDecision === "accepted" ? "Accept" : "Reject"}
                </span>
              </p>

              {secondRoundDecision !== null && (
                <p>
                  Round 2: Board voted{" "}
                  <span
                    className={
                      secondRoundDecision === "accepted"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {secondRoundDecision === "accepted" ? "3/3" : "1/3"}
                  </span>{" "}
                  to admit
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

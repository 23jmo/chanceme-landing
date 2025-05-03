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
  const [hoveredOfficer, setHoveredOfficer] = useState<number | null>(null);

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

  // Expanded dot view
  if (isSelected) {
    return (
      <div
        className="col-span-5 row-span-3 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-xl transition-all duration-300 animate-in fade-in-0 zoom-in-95"
        style={{ gridRow: "span 3" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Application #{id}</h3>
            <button
              onClick={() => onSelect(-1)}
              className="p-1 rounded-full hover:bg-white/20"
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-sm font-medium text-white/80 mb-2">
                Round 1
              </h4>
              <div className="flex items-center gap-3">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredOfficer(firstRoundOfficer)}
                  onMouseLeave={() => setHoveredOfficer(null)}
                >
                  <Image
                    src={officers[firstRoundOfficer].image}
                    alt={officers[firstRoundOfficer].name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-white/30"
                  />
                  {hoveredOfficer === firstRoundOfficer && (
                    <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 rounded text-xs">
                      <p className="font-bold">
                        {officers[firstRoundOfficer].name}
                      </p>
                      <p className="text-white/70">Admissions Officer</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {officers[firstRoundOfficer].name}
                  </p>
                  <p
                    className={`text-xs mt-1 font-bold ${
                      firstRoundDecision === "accepted"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {firstRoundDecision === "accepted"
                      ? "Approved"
                      : "Rejected"}
                  </p>
                </div>
              </div>
            </div>

            {firstRoundDecision === "accepted" && (
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium text-white/80 mb-2">
                  Round 2 Board
                </h4>
                <div className="space-y-3">
                  {boardOfficers.map((officerIndex, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="relative"
                        onMouseEnter={() => setHoveredOfficer(officerIndex)}
                        onMouseLeave={() => setHoveredOfficer(null)}
                      >
                        <Image
                          src={officers[officerIndex].image}
                          alt={officers[officerIndex].name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover border-2 border-white/30"
                        />
                        {hoveredOfficer === officerIndex && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 rounded text-xs">
                            <p className="font-bold">
                              {officers[officerIndex].name}
                            </p>
                            <p className="text-white/70">Board Member</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium">
                          {officers[officerIndex].name}
                        </p>
                        {secondRoundDecision && (
                          <p
                            className={`text-xs mt-1 font-bold ${
                              secondRoundDecision === "accepted"
                                ? "text-green-400"
                                : "text-red-400"
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
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div
              className={`p-3 rounded-lg ${
                status === "accepted-round2"
                  ? "bg-green-900/20"
                  : status.includes("rejected")
                  ? "bg-red-900/20"
                  : "bg-blue-900/20"
              }`}
            >
              <h4 className="font-medium mb-1">Final Decision</h4>
              <p className="text-sm">
                {status === "accepted-round2" &&
                  "Congratulations! Your application was accepted."}
                {status === "rejected-round1" &&
                  "Your application was rejected in the first round."}
                {status === "rejected-round2" &&
                  "Your application passed the first round but was rejected by the board."}
                {status === "in-progress" &&
                  "Your application is still being reviewed."}
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
      onClick={handleClick}
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
        `}
      >
        {/* Wrapper for officer images with fade effect */}
        <div
          className={`
            absolute inset-0 rounded-full overflow-hidden 
            w-full h-full
            transition-opacity ease-in-out
            ${
              isHovered
                ? "opacity-100 duration-100" // Faster fade in
                : "opacity-0 duration-200" // Remove delay, make fade-out faster
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
        {isHovered && !isSelected && (
          <div
            className={`absolute z-50 p-4 rounded-lg shadow-lg text-left min-w-[220px] 
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

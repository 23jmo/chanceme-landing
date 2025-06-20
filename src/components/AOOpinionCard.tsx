import React, { useState } from "react";

// Type definitions for component props and data structures
interface AO {
  name: string;
  avatar: string;
}

interface Strength {
  text: string;
  type: "positive" | "negative" | "neutral";
}

interface AOOpinionCardProps {
  aos?: AO[];
  totalAOs?: number;
  opinion?: string;
  strengths?: Strength[];
}

// AO Opinion Card with clean, compact design
const AOOpinionCard = ({
  aos = [
    {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b8f1a999?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "David Martinez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Johnson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ],
  totalAOs = 45,
  opinion = "found this section compelling because it shows",
  strengths = [
    { text: "authentic voice", type: "positive" as const },
    { text: "specific examples", type: "positive" as const },
    { text: "clear growth", type: "positive" as const },
  ],
}: AOOpinionCardProps) => {
  // State for hover interactions with proper types
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredAO, setHoveredAO] = useState<number | null>(null);

  // Helper function to get styling for strength tags with proper typing
  const getStrengthColor = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-700 border-green-200";
      case "negative":
        return "bg-red-100 text-red-700 border-red-200";
      case "neutral":
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    // Fixed size container that scales as one entity
    <div
      className="w-80 h-32 transition-all duration-300 hover:scale-101"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clean, compact card with subtle glass effect */}
      <div
        className="w-full h-full bg-white/30 backdrop-blur-xl border border-gray-300/30 rounded-xl p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        // style={{
        //   backgroundColor: "rgba(255, 255, 255, 0.35)",
        //   backdropFilter: "blur(10px)",
        //   WebkitBackdropFilter: "blur(100px)",
        // }}
      >
        {/* Header with AO profiles and title - more compact */}
        <div className="flex items-center gap-2 mb-2">
          {/* Compact overlapping profile pictures */}
          <div className={`flex items-center transition-all duration-200 ${isHovered ? '-space-x-1' : '-space-x-2'}`}>
            {aos.slice(0, 3).map((ao, index) => (
              <div
                key={index}
                className="relative transition-all duration-200"
                onMouseEnter={() => setHoveredAO(index)}
                onMouseLeave={() => setHoveredAO(null)}
              >
                {/* Smaller, cleaner profile pictures */}
                <div className="w-6 h-6 rounded-full border border-white overflow-hidden bg-white shadow-sm transition-transform duration-200 hover:scale-125">
                  <img
                    src={ao.avatar}
                    alt={ao.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Compact tooltip */}
                {hoveredAO === index && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap z-10">
                    {ao.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Compact title */}
          <h4 className="text-xs font-medium text-gray-800 truncate">
            {aos[0]?.name || "Sarah Chen"} +{totalAOs - 1} others
          </h4>
        </div>

        {/* Compact opinion with inline tags */}
        <div className="text-xs text-gray-700 leading-relaxed">
          <span className="mr-1">{opinion}</span>
          {/* Compact inline strength tags */}
          {strengths.map((strength, index) => (
            <span
              key={index}
              className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium border mr-1 mb-1 ${getStrengthColor(
                strength.type
              )}`}
            >
              {strength.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AOOpinionCard;

"use client";

import { motion } from "framer-motion";
import {
  RiAddLine,
  RiGridLine,
  RiMenuLine,
  RiMoreLine,
  RiCalendarLine,
  RiFileTextLine,
} from "react-icons/ri";
import { staggerContainer, fadeInUp } from "./framer-animations";

interface Essay {
  title: string;
  wordCount: number;
}

interface SchoolCard {
  id: string;
  name: string;
  dueDate: string | null;
  status: string;
  statusColor: "gray" | "blue" | "green";
  essayCount: number;
  essays: Essay[];
  moreCount: number;
}

const mockSchools: SchoolCard[] = [
  {
    id: "1",
    name: "Harvard University",
    dueDate: "Dec 19",
    status: "Fall Tran",
    statusColor: "gray",
    essayCount: 10,
    essays: [
      { title: "Personal Statement", wordCount: 628 },
      { title: "Transfer Statement", wordCount: 450 },
    ],
    moreCount: 8,
  },
  {
    id: "2",
    name: "MIT",
    dueDate: "Jan 1",
    status: "RD - Re",
    statusColor: "green",
    essayCount: 6,
    essays: [
      { title: "Why Transfer to MIT?", wordCount: 300 },
      { title: "Transfer Statement", wordCount: 0 },
    ],
    moreCount: 4,
  },
  {
    id: "3",
    name: "Stanford University",
    dueDate: "Dec 15",
    status: "EA - Ear",
    statusColor: "blue",
    essayCount: 8,
    essays: [
      { title: "Why Transfer to Stanford?", wordCount: 250 },
      { title: "Personal Statement", wordCount: 650 },
    ],
    moreCount: 6,
  },
  {
    id: "4",
    name: "Yale University",
    dueDate: "Jan 2",
    status: "RD - Re",
    statusColor: "green",
    essayCount: 5,
    essays: [
      { title: "Personal Statement", wordCount: 650 },
      { title: "Why Yale?", wordCount: 200 },
    ],
    moreCount: 3,
  },
  {
    id: "5",
    name: "Princeton University",
    dueDate: "Nov 1",
    status: "EA - Ear",
    statusColor: "blue",
    essayCount: 7,
    essays: [
      { title: "Personal Statement", wordCount: 650 },
      { title: "Transfer Statement", wordCount: 500 },
    ],
    moreCount: 5,
  },
  {
    id: "6",
    name: "Columbia University",
    dueDate: "Jan 5",
    status: "RD - Re",
    statusColor: "green",
    essayCount: 9,
    essays: [
      { title: "Personal Statement", wordCount: 650 },
      { title: "Why Columbia?", wordCount: 300 },
    ],
    moreCount: 7,
  },
  {
    id: "7",
    name: "University of Pennsylvania",
    dueDate: "Nov 15",
    status: "EA - Ear",
    statusColor: "blue",
    essayCount: 4,
    essays: [
      { title: "Personal Statement", wordCount: 650 },
      { title: "Why UPenn?", wordCount: 150 },
    ],
    moreCount: 2,
  },
  {
    id: "8",
    name: "California Institute of Technology",
    dueDate: "Jan 3",
    status: "RD - Re",
    statusColor: "green",
    essayCount: 6,
    essays: [
      { title: "Why Transfer to Caltech?", wordCount: 400 },
      { title: "Transfer Statement", wordCount: 0 },
    ],
    moreCount: 4,
  },
  {
    id: "9",
    name: "Brown University",
    dueDate: "Jan 5",
    status: "RD - Re",
    statusColor: "green",
    essayCount: 5,
    essays: [
      { title: "Personal Statement", wordCount: 650 },
      { title: "Why Brown?", wordCount: 250 },
    ],
    moreCount: 3,
  },
];

const getStatusColorClasses = (color: "gray" | "blue" | "green") => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-700";
    case "green":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

export default function SchoolsGrid() {
  return (
    <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Schools</h2>
          
          {/* View Toggles and New Button */}
          <div className="flex items-center gap-4">
            {/* Segmented Control */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 shadow-sm border border-gray-200">
              <button className="px-3 py-1 bg-white text-orange-500 rounded-md shadow-sm transition-colors flex items-center gap-1.5">
                <RiGridLine className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Grid</span>
              </button>
              <button className="px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                <RiMenuLine className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">List</span>
              </button>
              <button className="px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
                  />
                </svg>
                <span className="text-xs font-medium">Expanded</span>
              </button>
            </div>

            {/* New Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-sm">
              <RiAddLine className="w-4 h-4" />
              <span className="text-sm font-medium">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-hidden p-4 min-h-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full auto-rows-[1fr]"
        >
          {mockSchools.map((school) => (
            <motion.div
              key={school.id}
              variants={fadeInUp}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-700 font-semibold text-xs">
                      {getInitial(school.name)}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {school.name}
                  </h3>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
                  <RiMoreLine className="w-4 h-4" />
                </button>
              </div>

              {/* Status Pills */}
              <div className="flex items-center justify-between gap-1.5 mb-2 flex-wrap">
                {school.dueDate ? (
                  <div className="px-2 py-1 bg-gray-100 rounded-full flex items-center gap-1">
                    <RiCalendarLine className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-700 leading-none">{school.dueDate}</span>
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-gray-100 rounded-full flex items-center gap-1">
                    <RiCalendarLine className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-700 leading-none">No due date</span>
                  </div>
                )}
                <div
                  className={`px-2 py-1 rounded-full flex items-center ${getStatusColorClasses(
                    school.statusColor
                  )}`}
                >
                  <span className="text-xs leading-none">{school.status}</span>
                </div>
              </div>

              {/* Essay Count */}
              <div className="flex items-center gap-1.5 mb-2">
                <RiFileTextLine className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-600">
                  {school.essayCount} {school.essayCount === 1 ? "essay" : "essays"}
                </span>
              </div>

              {/* Essay List */}
              {school.essayCount === 0 ? (
                <div className="space-y-1.5 pt-1">
                  <button className="text-xs text-orange-500 hover:text-orange-600 font-medium w-full text-left">
                    + New Essay
                  </button>
                  <button className="text-xs text-orange-500 hover:text-orange-600 font-medium w-full text-left">
                    + Import from Google Drive
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {school.essays.map((essay, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-700 truncate flex-1 min-w-0">
                        {essay.title}
                      </span>
                      <span className="text-gray-500 ml-2 flex-shrink-0">
                        {essay.wordCount}w
                      </span>
                    </div>
                  ))}
                  {school.moreCount > 0 && (
                    <button className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                      +{school.moreCount} more
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import {
  RiFolderLine,
  RiFileTextLine,
  RiSearchLine,
  RiAddLine,
  RiGridLine,
  RiMenuLine,
  RiMoreLine,
} from "react-icons/ri";
import { staggerContainer, fadeInUp } from "./framer-animations";

interface DraftItem {
  id: string;
  type: "folder" | "draft";
  name: string;
  school?: string;
  updated: string;
}

const mockData: DraftItem[] = [
  { id: "1", type: "folder", name: "Harvard Essays", school: undefined, updated: "10/31/2025" },
  { id: "2", type: "folder", name: "MIT Applications", school: undefined, updated: "10/28/2025" },
  { id: "3", type: "folder", name: "Stanford Essays", school: undefined, updated: "10/25/2025" },
  { id: "4", type: "folder", name: "Backup Drafts", school: undefined, updated: "10/15/2025" },
  { id: "5", type: "draft", name: "Why Harvard?", school: "Harvard University", updated: "1 day ago" },
  { id: "6", type: "draft", name: "Personal Statement", school: "Untagged", updated: "2 days ago" },
  { id: "7", type: "draft", name: "MIT Supplemental", school: "MIT", updated: "3 days ago" },
  { id: "8", type: "draft", name: "Why Stanford?", school: "Stanford University", updated: "1 week ago" },
  { id: "9", type: "draft", name: "Common App Essay", school: "Untagged", updated: "2 weeks ago" },
  { id: "10", type: "draft", name: "Yale Supplemental", school: "Yale University", updated: "3 weeks ago" },
  { id: "11", type: "draft", name: "Princeton Essay", school: "Princeton University", updated: "4 weeks ago" },
  { id: "12", type: "draft", name: "Draft Revision", school: "Untagged", updated: "1 month ago" },
];

export default function DraftsStorage() {
  return (
    <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">My Drafts</h2>
          <button className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm">
            <RiAddLine className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {/* View Toggles */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">
              <RiGridLine className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 bg-orange-500 text-white transition-colors">
              <RiMenuLine className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Icon */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search drafts and folders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Column Headers */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_auto] gap-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              School
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated
            </div>
            <div></div>
          </div>
        </div>

        {/* List Items */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="divide-y divide-gray-100"
        >
          {mockData.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeInUp}
              className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="grid grid-cols-[2fr_1.5fr_1fr_auto] gap-4 items-center">
                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  {item.type === "folder" ? (
                    <RiFolderLine className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <RiFileTextLine className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-900 truncate">{item.name}</span>
                </div>

                {/* School */}
                <div className="text-sm text-gray-600 truncate">
                  {item.school || "—"}
                </div>

                {/* Updated */}
                <div className="text-sm text-gray-600 truncate">
                  {item.updated}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                    <RiMoreLine className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}


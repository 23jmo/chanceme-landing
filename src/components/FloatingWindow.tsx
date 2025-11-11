"use client";

import React, { useState, useRef, useEffect } from "react";
import { RiFileTextLine, RiSchoolLine, RiUserLine, RiArrowUpLine, RiArrowDownSLine, RiArrowRightSLine, RiArrowRightLine, RiEyeLine, RiEyeOffLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { Clover } from "lucide-react";
import { motion } from "framer-motion";

interface ToolItem {
  type: "tool";
  id: string;
  toolName: string;
  status: "started" | "running" | "completed" | "failed";
  args?: Record<string, unknown>;
  result?: unknown;
  editSuggestion?: {
    original_text: string;
    suggested_text: string;
  };
  searchResults?: {
    query: string;
    results: Array<{
      title: string;
      url: string;
      snippet: string;
    }>;
  };
}

interface ChatMessage {
  type: "user" | "ai" | "tool";
  text?: string;
  timestamp: Date;
  toolItem?: ToolItem;
}

const FloatingWindow = () => {
  const [leftWidth, setLeftWidth] = useState(60); // Percentage of left panel
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample chat messages with tool calls
  const [messages] = useState<ChatMessage[]>([
    {
      type: "user",
      text: "Help me improve my opening paragraph",
      timestamp: new Date(Date.now() - 600000),
    },
    {
      type: "tool",
      toolItem: {
        type: "tool",
        id: "create_edit_suggestion",
        toolName: "create_edit_suggestion",
        status: "completed",
        args: {
          original_text: "Growing up in a small town where opportunities were scarce, I learned early that success requires both determination and creativity.",
          context: "Opening paragraph",
        },
        editSuggestion: {
          original_text: "Growing up in a small town where opportunities were scarce, I learned early that success requires both determination and creativity.",
          suggested_text: "Growing up in a small town where opportunities were scarce, I learned early that success requires both determination and creativity. When our school's debate team was disbanded due to budget cuts, I didn't accept defeat—I saw it as a chance to create something new, a lesson in resilience that shaped my approach to every challenge since.",
        },
      },
      timestamp: new Date(Date.now() - 500000),
    },
    {
      type: "ai",
      text: "I've suggested an edit to your opening paragraph to make it more vivid and engaging, emphasizing your resilience and proactive approach to challenges. This aligns well with Harvard's values of leadership and citizenship. Let me know how you feel about this direction or if you'd like further adjustments!",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 10) return "just now";
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Tool Call Card Component
  const ToolCallCard = ({ toolItem }: { toolItem: ToolItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(true);

    const getToolDisplayText = (name: string, status: ToolItem["status"]) => {
      const isActive = status === "started" || status === "running";
      switch (name) {
        case "create_edit_suggestion":
          return isActive ? "Creating edit suggestion..." : "Ran create_edit_suggestion";
        case "web_search":
          return isActive ? "Searching the web..." : "Searched the web";
        case "make_edit_suggestion":
          return isActive ? "Making edit suggestion..." : "Made edit suggestion";
        default:
          return isActive ? `Running ${name}...` : `Ran ${name}`;
      }
    };

    const getStatusStyles = () => {
      switch (toolItem.status) {
        case "started":
        case "running":
          return "text-gray-500 animate-pulse";
        case "completed":
          return "text-gray-500";
        case "failed":
          return "text-red-500";
      }
    };

    return (
      <div className="group">
        <div className="ml-6 pb-1 flex items-center gap-2">
          <span className={`text-xs italic ${getStatusStyles()}`}>
            {getToolDisplayText(toolItem.toolName, toolItem.status)}
          </span>
          {(toolItem.args || (toolItem.result !== undefined && toolItem.result !== null)) && toolItem.status === "completed" && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isExpanded ? (
                <RiArrowDownSLine className="w-3 h-3" />
              ) : (
                <RiArrowRightSLine className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {/* Tool debug info */}
        {isExpanded && toolItem.status === "completed" && (
          <div className="ml-6 mt-2 space-y-1 text-xs text-gray-600">
            {toolItem.args && (
              <div>
                <div className="font-medium text-gray-900">Arguments:</div>
                <pre className="bg-gray-50 rounded p-2 overflow-x-auto mt-1 text-gray-700 border border-gray-200">
                  {JSON.stringify(toolItem.args, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Edit Suggestion UI */}
        {(toolItem.toolName === "make_edit_suggestion" || toolItem.toolName === "create_edit_suggestion") && toolItem.editSuggestion && toolItem.status === "completed" && (
          <div className="ml-6 mt-2 max-w-[calc(100%-2rem)]">
            <div className="border border-gray-200 rounded p-2 bg-gray-50">
              <div className="text-xs font-medium text-gray-900 mb-2">Edit Suggestion</div>
              <div className="text-xs text-gray-700 mb-2 break-words">
                Replace <span className="font-medium">&ldquo;{toolItem.editSuggestion.original_text}&rdquo;</span> with{" "}
                <span className="font-medium">&ldquo;{toolItem.editSuggestion.suggested_text}&rdquo;</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 px-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <RiCheckLine className="w-3 h-3" />
                  Accept
                </button>
                <button className="flex-1 py-1.5 px-2 bg-gray-500 text-white text-xs font-medium rounded hover:bg-gray-600 transition-colors flex items-center justify-center gap-1">
                  <RiCloseLine className="w-3 h-3" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Web Search UI */}
        {toolItem.toolName === "web_search" && toolItem.searchResults && toolItem.status === "completed" && (
          <div className="ml-6 mt-1">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="text-xs text-gray-700 hover:text-gray-900 transition-colors text-left flex items-center gap-2"
            >
              <span className="italic text-gray-500 hover:cursor-pointer transition-colors duration-150 hover:text-gray-700">
                {toolItem.searchResults.results.length} results found for &ldquo;{toolItem.searchResults.query}&rdquo;
              </span>
              {isSearchExpanded ? (
                <RiEyeOffLine className="w-3 h-3" />
              ) : (
                <RiEyeLine className="w-3 h-3" />
              )}
            </button>
            {isSearchExpanded && (
              <div className="mt-2 flex flex-wrap gap-2">
                {toolItem.searchResults.results.slice(0, 3).map((result, index) => {
                  const getDomain = (url: string) => {
                    try {
                      const urlObj = new URL(url);
                      return urlObj.hostname.replace("www.", "");
                    } catch {
                      return url;
                    }
                  };
                  return (
                    <a
                      key={index}
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-700 transition-colors border border-gray-200"
                    >
                      <span>{getDomain(result.url)}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 30% and 70%
      const constrainedWidth = Math.max(30, Math.min(70, newLeftWidth));
      setLeftWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* macOS Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100%-49px)] relative min-h-[350px]">
        {/* Left Panel - Personal Statement */}
        <div
          className="border-r border-gray-200 overflow-y-auto bg-white flex flex-col scrollbar-hide"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="px-8 pt-6 pb-0 flex-1">
            {/* Title */}
            <div className="mb-4">
              <input
                type="text"
                value="Why Harvard?"
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
                  value="Harvard University"
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
                  value="Harvard has long been committed to educating citizens and citizen-leaders for our society. How do you hope to use your Harvard education in the future?"
                  readOnly
                  className="w-full bg-transparent border-none outline-none resize-none text-gray-700 placeholder-gray-400 leading-relaxed overflow-hidden"
                  rows={2}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="mb-0">
              <div className="w-full bg-transparent border-none outline-none resize-none text-base text-gray-900 placeholder-gray-400 leading-relaxed font-normal">
                <div className="space-y-4">
                  <p>
                    The first time I truly understood the power of interdisciplinary thinking was during my junior year, when I combined my passion for computer science with my interest in environmental policy. I had spent months developing a machine learning model to predict water quality issues in local rivers, but it wasn&apos;t until I presented my findings to the city council that I realized technology alone wasn&apos;t enough.
                  </p>

                  <p>
                    <span className="bg-yellow-200/40 rounded px-1">
                      What started as a coding project became a journey into understanding how data can inform policy decisions, how technical solutions must be accessible to communities, and how innovation requires bridging the gap between complex algorithms and real-world problems.
                    </span>
                  </p>

                  <p>
                    At Harvard, I want to explore the intersection of artificial intelligence and social justice, particularly how we can develop ethical frameworks for deploying technology that serves marginalized communities. The opportunity to work with professors who are leading research in algorithmic fairness and to collaborate with peers who bring diverse perspectives to technology challenges is exactly what I need to grow as both a technologist and a citizen.
                  </p>

                  <p>
                    <span className="bg-yellow-200/40 rounded px-1">
                      My experience has taught me that the most impactful innovations come from understanding problems from multiple angles. I&apos;ve learned to code not just for the sake of building software, but to create tools that can address systemic issues.
                    </span>
                  </p>

                  <p>
                    Through my work with a local nonprofit, I helped develop a mobile app that connects low-income families with food assistance programs. The technical challenge was interesting, but seeing how the app reduced the time families spent searching for resources from hours to minutes showed me the real value of what I was learning.
                  </p>

                  <p>
                    <span className="bg-yellow-200/40 rounded px-1">
                      This project reinforced my belief that technology should be a force for equity, not just efficiency. At Harvard, I want to deepen this understanding by studying both the technical and ethical dimensions of technology development.
                    </span>
                  </p>

                  <p>
                    I envision using my Harvard education to work at the intersection of technology and policy, developing solutions that are not only technically sound but also socially responsible. Whether through research in machine learning ethics, policy work on technology regulation, or building tools that directly serve underserved communities, I want to ensure that the technological revolution benefits everyone, not just those who can afford it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className={`w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize transition-colors flex items-center justify-center group self-stretch ${
            isResizing ? "bg-blue-400" : ""
          }`}
          onMouseDown={handleMouseDown}
          style={{ flexShrink: 0 }}
        >
          <div className="w-0.5 h-12 bg-gray-400 rounded-full group-hover:bg-gray-500 transition-colors" />
        </div>

        {/* Right Panel - Chat - Cursor UI Style */}
        <div
          className="flex flex-col bg-white overflow-hidden"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {/* Chat Header - Cursor UI Style */}
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RiArrowRightLine className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-700 font-medium">1 Edit</span>
              <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                Review
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all duration-200"
                title="Close"
              >
                <RiCloseLine className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all duration-200"
                title="Accept"
              >
                <RiCheckLine className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages - Cursor UI Style */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-white scrollbar-hide">
            {messages.map((message, index) => {
              // Handle tool items
              if (message.type === "tool" && message.toolItem) {
                const prevItem = messages[index - 1];
                const showAIHeader = prevItem?.type === "user";
                
                return (
                  <div key={message.toolItem.id || index}>
                    {showAIHeader && (
                      <div className="flex items-start gap-2 px-2 py-1 rounded transition-colors duration-200 mb-1">
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clover className="w-2.5 h-2.5 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-900 font-sans">
                              Agent
                            </span>
                            <span className="text-xs text-gray-500 font-sans">
                              {formatRelativeTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <ToolCallCard toolItem={message.toolItem} />
                  </div>
                );
              }

              const isUser = message.type === "user";
              const prevMessage = messages[index - 1];
              const showHeader =
                index === 0 || 
                prevMessage?.type === "tool" ||
                (prevMessage?.type !== undefined && prevMessage?.type !== message.type);

              return (
                <div key={index} className="group">
                  {/* Header */}
                  {showHeader && (
                    <div className="flex items-start gap-2 px-2 py-1 rounded transition-colors duration-200">
                      {/* Avatar */}
                      <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        {isUser ? (
                          <RiUserLine className="w-2.5 h-2.5 text-white" />
                        ) : (
                          <Clover className="w-2.5 h-2.5 text-white" strokeWidth={2} />
                        )}
                      </div>

                      {/* Header Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-900 font-sans">
                            {isUser ? "You" : "Agent"}
                          </span>
                          <span className="text-xs text-gray-500 font-sans">
                            {formatRelativeTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Content */}
                  {message.text && (
                    <div className="ml-6 text-xs text-gray-700 leading-relaxed font-sans mb-2">
                      {message.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Chat Input - Cursor Style */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                readOnly
              />
              <button
                disabled
                className="absolute right-2 bottom-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0"
                title="Send message"
              >
                <RiArrowUpLine className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingWindow;


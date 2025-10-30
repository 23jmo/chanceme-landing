import React, { useState } from "react";
import { RiCloseLine, RiCheckLine, RiUserLine, RiArrowUpLine, RiArrowDownSLine, RiArrowRightSLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Clover } from "lucide-react";

// Type definitions for floating comment
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

interface ReplyItem {
  type: "user" | "ai" | "tool";
  text?: string;
  author?: "user" | "ai";
  timestamp?: Date;
  toolItem?: ToolItem;
}

interface FloatingCommentProps {
  title?: string;
  replies?: ReplyItem[];
  position?: { top: number; left: number };
  isExpanded?: boolean;
  resolved?: boolean;
  scrollY?: number; // Scroll position for auto-expand
  commentTop?: number; // Absolute top position of comment in viewport
  expandThreshold?: number; // Scroll threshold for expansion (default: 400)
}

// Floating Comment Component matching chance-me design
const FloatingComment = ({
  title = "Comment",
  replies = [],
  position = { top: 0, left: 0 },
  isExpanded: controlledExpanded,
  resolved = false,
  scrollY = 0,
  commentTop,
  expandThreshold = 400,
}: FloatingCommentProps) => {
  // Auto-expand based on scroll: expand when scrolled past the comment, close when scrolled back up
  const isExpanded = controlledExpanded !== undefined 
    ? controlledExpanded 
    : commentTop !== undefined 
      ? scrollY > commentTop - expandThreshold// Expand when scrolled past the comment
      : false;

  const [replyText, setReplyText] = useState("");

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

    if (toolItem.type !== "tool") return null;

    return (
      <div className="group">
        <div className="ml-11 pb-1 flex items-center gap-2">
          <span className={`text-sm italic ${getStatusStyles()}`}>
            {getToolDisplayText(toolItem.toolName, toolItem.status)}
          </span>
          {(toolItem.args || (toolItem.result !== undefined && toolItem.result !== null)) && toolItem.status === "completed" && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isExpanded ? (
                <RiArrowDownSLine className="w-4 h-4" />
              ) : (
                <RiArrowRightSLine className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Tool debug info */}
        {isExpanded && toolItem.status === "completed" && (
          <div className="ml-11 mt-2 space-y-1 text-xs text-gray-600">
            {toolItem.args && (
              <div>
                <div className="font-medium text-gray-700">Arguments:</div>
                <pre className="bg-gray-50 rounded p-2 overflow-x-auto mt-1">
                  {JSON.stringify(toolItem.args, null, 2)}
                </pre>
              </div>
            )}
            {toolItem.result !== undefined && toolItem.result !== null && !toolItem.editSuggestion && !toolItem.searchResults && (
              <div>
                <div className="font-medium text-gray-700">Result:</div>
                <pre className="bg-gray-50 rounded p-2 overflow-x-auto max-h-32 overflow-y-auto mt-1">
                  {JSON.stringify(toolItem.result, null, 2) || ""}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Edit Suggestion UI */}
        {toolItem.toolName === "make_edit_suggestion" && toolItem.editSuggestion && toolItem.status === "completed" && (
          <div className="ml-11 mt-2 max-w-[calc(100%-2.75rem)]">
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="text-sm font-medium text-gray-700 mb-2">Edit Suggestion</div>
              <div className="text-sm text-gray-700 mb-3 break-words">
                Replace <span className="font-medium">&ldquo;{toolItem.editSuggestion.original_text}&rdquo;</span> with{" "}
                <span className="font-medium">&ldquo;{toolItem.editSuggestion.suggested_text}&rdquo;</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 px-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                  <RiCheckLine className="w-3.5 h-3.5" />
                  Accept
                </button>
                <button className="flex-1 py-2 px-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-1">
                  <RiCloseLine className="w-3.5 h-3.5" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Web Search UI */}
        {toolItem.toolName === "web_search" && toolItem.searchResults && toolItem.status === "completed" && (
          <div className="ml-11 mt-1">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors text-left flex items-center gap-2"
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors"
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

  return (
    <div
      className={`absolute ${
        isExpanded ? "z-[70]" : "z-60"
      }`}
      style={{
        top: 0,
        left: 0,
        transform: `translate3d(${position.left}px, ${position.top}px, 0) scale(${
          isExpanded ? 1 : 0.8
        })`,
        opacity: isExpanded ? 1 : 0.7,
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform, opacity",
      }}
    >
      {/* Comment Card */}
      <div
        className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-[280px] min-w-[280px] z-[1000] flex flex-col"
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 bg-gradient-to-r rounded-t-2xl flex-shrink-0 ${
            isExpanded ? "pt-3 pb-3 border-b border-gray-100" : "py-3"
          }`}
          style={{
            transition: "padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-700 truncate" title={title}>
              {title}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isExpanded && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle resolve (demo - no action)
                  }}
                  className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200 opacity-100 scale-100"
                  title="Resolve"
                >
                  <RiCheckLine className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete (demo - no action)
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200 opacity-100 scale-100"
                  title="Delete"
                >
                  <RiCloseLine className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content wrapper - flex container */}
        <div
          className={`overflow-hidden ${
            isExpanded 
              ? "flex flex-col flex-1 min-h-0 opacity-100" 
              : "max-h-0 opacity-0"
          }`}
          style={{
            transition: isExpanded 
              ? "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s"
              : "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            maxHeight: isExpanded ? "24rem" : "0",
          }}
        >
          {/* Content */}
          <div
            className={`comment-scrollbar ${
              isExpanded ? "mt-3 opacity-100 flex-1 overflow-y-auto" : "mt-0 opacity-0 overflow-hidden"
            }`}
            style={{ 
              transition: isExpanded
                ? "margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s"
                : "margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="mb-3 pr-6">
              {/* Conversation Display */}
              <div className="space-y-1">
                {replies.map((reply, index) => {
                  // Check if next item is a tool and current is user, to show AI header before tool
                  const nextItem = replies[index + 1];
                  const showAIHeaderBeforeTool = 
                    reply.type === "user" && 
                    nextItem?.type === "tool";

                  // Handle tool items
                  if (reply.type === "tool" && reply.toolItem) {
                    const prevItem = replies[index - 1];
                    const showAIHeader = prevItem?.type === "user";
                    
                    return (
                      <div key={reply.toolItem.id || index}>
                        {showAIHeader && (
                          <div className="flex items-start gap-3 px-3 py-1 rounded-lg hover:bg-gray-50/50 transition-colors duration-200 mb-1">
                            {/* Avatar */}
                            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <Clover className="w-3 h-3 text-gray-600" strokeWidth={2} />
                            </div>
                            {/* Header Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900 font-sans">
                                  Agent
                                </span>
                                <span className="text-xs text-gray-500 font-sans">
                                  now
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <ToolCallCard toolItem={reply.toolItem} />
                      </div>
                    );
                  }

                  // Handle user/AI messages
                  const isUser = reply.author === "user";
                  // Show header if first item, or if previous item was a tool or different author
                  const prevItem = replies[index - 1];
                  const showHeader = 
                    index === 0 || 
                    prevItem?.type === "tool" ||
                    (prevItem?.author !== reply.author);

                  return (
                    <div key={index} className="group">
                      {/* Header */}
                      {showHeader && (
                        <div className="flex items-start gap-3 px-3 py-1 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                          {/* Avatar */}
                          <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            {isUser ? (
                              <RiUserLine className="w-3 h-3 text-gray-600" />
                            ) : (
                              <Clover className="w-3 h-3 text-gray-600" strokeWidth={2} />
                            )}
                          </div>

                          {/* Header Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-900 font-sans">
                                {isUser ? "You" : "Agent"}
                              </span>
                              <span className="text-xs text-gray-500 font-sans">
                                {reply.timestamp ? formatRelativeTime(reply.timestamp) : "now"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Message Content */}
                      {reply.text && (
                        <div className="ml-11 text-sm text-gray-700 leading-relaxed font-sans mb-2">
                          {reply.text}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Reply Input - Only when expanded */}
          <div
            className={`flex-shrink-0 bg-white flex items-center gap-1.5 px-3 py-3 rounded-b-2xl border-t border-gray-100 ${
              isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
            }`}
            style={{
              transition: isExpanded
                ? "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, height 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s"
                : "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* User Avatar */}
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <RiUserLine className="w-2.5 h-2.5 text-gray-500" />
            </div>

            {/* Input Container */}
            <div className="flex-1 bg-[#f2f2f6] rounded-md p-1.5 flex justify-center items-center gap-1.5 min-h-[20px]">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && replyText.trim()) {
                    e.preventDefault();
                    // Handle submit (demo - no action)
                    setReplyText("");
                  }
                }}
              />

              {/* Send Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (replyText.trim()) {
                    // Handle submit (demo - no action)
                    setReplyText("");
                  }
                }}
                disabled={!replyText.trim()}
                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 flex-shrink-0"
                title="Send comment"
              >
                <RiArrowUpLine className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Connector */}
      <div className="absolute top-6 -left-2 w-2 h-0.5 bg-gradient-to-r from-gray-300 to-transparent rounded-full" />
    </div>
  );
};

// Main AOOpinionCard Component - now renders floating comments
interface AOOpinionCardProps {
  aos?: Array<{ name: string; avatar: string }>;
  totalAOs?: number;
  opinion?: string;
  strengths?: Array<{ text: string; type: "positive" | "negative" | "neutral" }>;
  // New props for floating comment
  commentTitle?: string;
  commentReplies?: ReplyItem[];
  position?: { top: number; left: number };
  isExpanded?: boolean;
  scrollY?: number;
  commentTop?: number;
  expandThreshold?: number;
}

const AOOpinionCard = ({
  commentTitle,
  commentReplies = [],
  position = { top: 0, left: 0 },
  isExpanded,
  scrollY,
  commentTop,
  expandThreshold,
}: AOOpinionCardProps) => {
  return (
    <FloatingComment
      title={commentTitle}
      replies={commentReplies}
      position={position}
      isExpanded={isExpanded}
      scrollY={scrollY}
      commentTop={commentTop}
      expandThreshold={expandThreshold}
    />
  );
};

export default AOOpinionCard;

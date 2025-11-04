"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Clover } from "lucide-react";
import { RiUserLine } from "react-icons/ri";

// Custom hook for typewriter effect
function useTypewriter(targetText: string, charsPerSecond: number = 18) {
  const [displayText, setDisplayText] = useState("");
  const isCompleteRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const completionPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  } | null>(null);

  const startTyping = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setDisplayText("");
    isCompleteRef.current = false;
    let currentIndex = 0;

    return new Promise<void>((resolve, reject) => {
      completionPromiseRef.current = { resolve, reject };

      intervalRef.current = setInterval(() => {
        if (currentIndex < targetText.length) {
          setDisplayText(targetText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          isCompleteRef.current = true;
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (completionPromiseRef.current) {
            completionPromiseRef.current.resolve();
            completionPromiseRef.current = null;
          }
        }
      }, 1000 / charsPerSecond);
    });
  }, [targetText, charsPerSecond]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (completionPromiseRef.current) {
      completionPromiseRef.current.reject();
      completionPromiseRef.current = null;
    }
    setDisplayText("");
    isCompleteRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (completionPromiseRef.current) {
        completionPromiseRef.current.reject();
      }
    };
  }, []);

  return { displayText, startTyping, reset };
}

export default function CommentModeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [clickRipple, setClickRipple] = useState(false);
  const sequenceRunningRef = useRef(false);

  // Animation controls
  const highlightControls = useAnimationControls();
  const buttonControls = useAnimationControls();
  const commentBubbleControls = useAnimationControls();
  const cursorControls = useAnimationControls();
  const paragraphControls = useAnimationControls();

  // Typewriter hooks
  const promptTypewriter = useTypewriter(
    "Make 'leadership' concrete. Suggest a specific action + measurable result.",
    18
  );
  const replyTypewriter = useTypewriter(
    "Consider: 'I scheduled and led 18 after‑school sessions, coordinating 12 mentors; participating students raised their algebra averages by 14% over one quarter.'",
    40
  );

  const [showAddCommentButton, setShowAddCommentButton] = useState(false);
  const [showCommentBubble, setShowCommentBubble] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showAgentReply, setShowAgentReply] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [commentPosition, setCommentPosition] = useState({ top: 0, left: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  // Check if component is in view
  const isInView = useInView(containerRef, {
    amount: 0.3,
    once: false,
  });

  // Auto-resize textarea and calculate cursor position
  useEffect(() => {
    if (!inputRef.current || !inputFocused) return;
    const textarea = inputRef.current;
    const text = promptTypewriter.displayText || "";

    // Auto-resize
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    const style = window.getComputedStyle(textarea);
    const paddingLeft = parseFloat(style.paddingLeft) || 8;
    const paddingTop = parseFloat(style.paddingTop) || 6;
    const contentWidth = textarea.offsetWidth - paddingLeft - (parseFloat(style.paddingRight) || 8);

    // Build a mirror element that wraps identical to the textarea
    const mirror = document.createElement("div");
    mirror.style.position = "absolute";
    mirror.style.visibility = "hidden";
    mirror.style.whiteSpace = "pre-wrap";
    mirror.style.wordWrap = "break-word";
    mirror.style.fontSize = style.fontSize;
    mirror.style.fontFamily = style.fontFamily;
    mirror.style.fontWeight = style.fontWeight;
    mirror.style.lineHeight = style.lineHeight;
    mirror.style.letterSpacing = style.letterSpacing;
    mirror.style.width = `${contentWidth}px`;

    // Insert the text and a caret span at the end
    mirror.textContent = text;
    const caretSpan = document.createElement("span");
    caretSpan.textContent = "\u200b"; // zero-width space to mark caret end
    mirror.appendChild(caretSpan);
    document.body.appendChild(mirror);

    const mirrorRect = mirror.getBoundingClientRect();
    const caretRect = caretSpan.getBoundingClientRect();

    // Compute caret position relative to textarea padding box
    const top = paddingTop + Math.max(0, caretRect.top - mirrorRect.top + 2);
    const left = paddingLeft + Math.min(contentWidth - 2, Math.max(0, caretRect.left - mirrorRect.left));

    setCursorPosition({ top, left });

    document.body.removeChild(mirror);
  }, [promptTypewriter.displayText, inputFocused]);

  // Get position relative to container
  const getRelativePosition = useCallback(
    (element: HTMLElement | null) => {
      if (!element || !containerRef.current) return { x: 0, y: 0 };
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      return {
        x: elementRect.left - containerRect.left + elementRect.width / 2,
        y: elementRect.top - containerRect.top + elementRect.height / 2,
      };
    },
    []
  );

  // Get button center position for cursor
  const getButtonCenterPosition = useCallback(() => {
    if (!buttonRef.current || !containerRef.current) return { x: 0, y: 0 };
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    return {
      x: buttonRect.left - containerRect.left + buttonRect.width / 2,
      y: buttonRect.top - containerRect.top + buttonRect.height / 2,
    };
  }, []);

  // Animation sequence
  useEffect(() => {
    if (!isInView) {
      // Reset everything when out of view
      sequenceRunningRef.current = false;
      paragraphControls.set({ opacity: 0 });
      highlightControls.set({ width: "0%" });
      buttonControls.set({ opacity: 0, scale: 0.8 });
      commentBubbleControls.set({ opacity: 0, scale: 0.8 });
      cursorControls.set({ x: -100, y: -100 });
      setShowAddCommentButton(false);
      setShowCommentBubble(false);
      setShowCursor(false);
      setInputFocused(false);
      promptTypewriter.reset();
      replyTypewriter.reset();
      setShowTypingIndicator(false);
      setShowAgentReply(false);
      return;
    }

    if (sequenceRunningRef.current) return;
    sequenceRunningRef.current = true;

    const runSequence = async () => {
      // Reset states
      setShowAddCommentButton(false);
      setShowCommentBubble(false);
      setShowCursor(false);
      setShowTypingIndicator(false);
      setShowAgentReply(false);
      setInputFocused(false);
      promptTypewriter.reset();
      replyTypewriter.reset();

      // 1. Fade in paragraph
      await paragraphControls.start({
        opacity: 1,
        transition: { duration: 0.25 },
      });

      // 2. Sweep highlight - animate background size from left to right
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for render
      await highlightControls.start({
        backgroundSize: "100% 100%",
        transition: { duration: 0.7, ease: "easeOut" },
      });

      // 3. Show Add Comment button
      // Calculate button position - centered horizontally on sentence
      if (sentenceRef.current && containerRef.current) {
        const sentenceRect = sentenceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        // Button will be ~100px wide, so center it on the sentence
        const buttonWidth = 100; // Approximate button width
        setButtonPosition({
          top: sentenceRect.top - containerRect.top - 35,
          left: sentenceRect.left - containerRect.left + (sentenceRect.width / 2) - (buttonWidth / 2), // Center horizontally
        });
      }
      setShowAddCommentButton(true);
      // Wait for button to render and position, then recalculate with actual width
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (buttonRef.current && sentenceRef.current && containerRef.current) {
        const sentenceRect = sentenceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          top: sentenceRect.top - containerRect.top - 35,
          left: sentenceRect.left - containerRect.left + (sentenceRect.width / 2) - (buttonRect.width / 2), // Center with actual width
        });
      }
      await buttonControls.start({
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.25,
        },
      });

      // 4. Move cursor to button and click
      await new Promise((resolve) => setTimeout(resolve, 200));
      const buttonPos = getButtonCenterPosition();
      // Set initial cursor position before showing it
      cursorControls.set({ x: buttonPos.x - 150, y: buttonPos.y });
      setShowCursor(true);
      // Wait a moment for cursor to appear
      await new Promise((resolve) => setTimeout(resolve, 50));
      // Move cursor to button center (cursor is 20px, so center is 10px offset)
      await cursorControls.start({
        x: buttonPos.x,
        y: buttonPos.y,
        transition: { duration: 0.9, ease: "easeInOut" },
      });

      // Pause at button
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Click animation - slight downward press
      await cursorControls.start({
        x: buttonPos.x,
        y: buttonPos.y + 3,
        transition: { duration: 0.1, ease: "easeOut" },
      });

      // Click ripple
      setClickRipple(true);
      
      // Return to original position
      await cursorControls.start({
        x: buttonPos.x,
        y: buttonPos.y,
        transition: { duration: 0.15, ease: "easeIn" },
      });

      setTimeout(() => setClickRipple(false), 400);

      // Hide button after click
      await buttonControls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
      });
      setShowAddCommentButton(false);

      // 5. Show comment bubble
      // Calculate position relative to highlighted sentence - appear directly to the right
      if (sentenceRef.current && containerRef.current) {
        const sentenceRect = sentenceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setCommentPosition({
          top: sentenceRect.top - containerRect.top + sentenceRect.height / 2 - 40, // Center vertically on sentence
          left: sentenceRect.right - containerRect.left + 16, // 16px to the right of sentence
        });
      }
      setShowCommentBubble(true);
      // Wait for bubble to render
      await new Promise((resolve) => setTimeout(resolve, 50));
      await commentBubbleControls.start({
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.3,
        },
      });

      // 6. Move cursor to input
      await new Promise((resolve) => setTimeout(resolve, 300));
      const inputPos = getRelativePosition(inputRef.current);
      await cursorControls.start({
        x: inputPos.x - 10,
        y: inputPos.y - 10,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      // Focus flash and hide mouse cursor
      await new Promise((resolve) => setTimeout(resolve, 200));
      setShowCursor(false);
      setInputFocused(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 7. Type prompt
      await promptTypewriter.startTyping();

      // Wait a bit before agent response
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 8. Show typing indicator
      setShowTypingIndicator(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 9. Hide indicator and show agent reply
      setShowTypingIndicator(false);
      setShowAgentReply(true);
      await replyTypewriter.startTyping();

      // 10. Hold and fade out
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await paragraphControls.start({
        opacity: 0.5,
        transition: { duration: 0.5 },
      });

      // 11. Reset and loop
      await new Promise((resolve) => setTimeout(resolve, 1500));
      sequenceRunningRef.current = false;
      if (isInView) {
        runSequence();
      }
    };

    runSequence();
  }, [
    isInView,
    highlightControls,
    buttonControls,
    commentBubbleControls,
    cursorControls,
    paragraphControls,
    getRelativePosition,
    getButtonCenterPosition,
    promptTypewriter,
    replyTypewriter,
  ]);

  const paragraph =
    "During junior year, I co-founded a tutoring club to support ninth graders struggling in algebra. We met after school to review homework, create practice sets, and pair mentors with students. I learned leadership by organizing weekly sessions and collaborating with teachers to track progress.\n\n" +
    "The club grew from just five students to over thirty participants by the end of the year. We created a structured curriculum that covered everything from basic algebraic concepts to advanced problem-solving techniques. Each mentor was paired with two to three students, allowing for personalized attention and support.\n\n" +
    "I took on the responsibility of coordinating schedules, communicating with parents, and organizing fundraising events to purchase supplies. This experience taught me that effective leadership requires not just vision, but also the ability to manage logistics, build relationships, and adapt to challenges.\n\n" +
    "When we faced difficulties finding meeting space, I reached out to the local community center and negotiated a partnership that benefited both our club and their after-school programs. The success of our tutoring club demonstrated that with dedication and creative problem-solving, students can create meaningful opportunities for themselves and others.";

  const highlightedSentence =
    "I learned leadership by organizing weekly sessions and collaborating with teachers to track progress.";

  const parts = paragraph.split(highlightedSentence);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden ml-10 md:ml-16"
    >
      {/* Paragraph - Absolutely positioned to the left with max-width and white background */}
      <motion.div
        ref={paragraphRef}
        animate={paragraphControls}
        initial={{ opacity: 0 }}
        className="absolute left-0 top-0 px-8 md:px-12 py-6 md:py-12 overflow-hidden z-10 bg-white rounded-lg border border-gray-200 shadow-sm"
        style={{
          maxWidth: "calc(100% - 400px)", // Leave room for comment bubble
          height: "82%", // Make it shorter
        }}
      >
        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            value="Personal Statement Draft"
            readOnly
            className="w-full bg-transparent border-none outline-none text-2xl font-bold text-gray-900 placeholder-gray-400 leading-tight cursor-default"
          />
        </div>

        {/* Main content */}
        <div className="mb-8">
          <div className="w-full bg-transparent border-none outline-none resize-none text-base text-gray-900 placeholder-gray-400 leading-relaxed font-normal">
            {(() => {
              // Split the full paragraph into paragraphs by \n\n
              const fullText = parts[0] + highlightedSentence + parts[1];
              const paragraphs = fullText.split('\n\n');
              
              return paragraphs.map((para, paraIdx) => {
                const containsHighlight = para.includes(highlightedSentence);
                
                if (containsHighlight) {
                  // Split this paragraph at the highlighted sentence
                  const highlightIndex = para.indexOf(highlightedSentence);
                  const beforeHighlight = para.substring(0, highlightIndex);
                  const afterHighlight = para.substring(highlightIndex + highlightedSentence.length);
                  
                  return (
                    <p key={paraIdx} className="mb-4">
                      {beforeHighlight}
                      <motion.span
                        ref={sentenceRef}
                        animate={highlightControls}
                        initial={{ 
                          backgroundSize: "0% 100%",
                        }}
                        style={{
                          backgroundImage: "linear-gradient(to right, rgba(253, 230, 138, 0.4), rgba(253, 230, 138, 0.4))",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "left center",
                          padding: "2px 4px",
                          borderRadius: "2px",
                          boxDecorationBreak: "clone",
                          WebkitBoxDecorationBreak: "clone",
                        }}
                      >
                        {highlightedSentence}
                      </motion.span>
                      {afterHighlight}
                    </p>
                  );
                }
                
                return (
                  <p key={paraIdx} className="mb-4">
                    {para}
                  </p>
                );
              });
            })()}
          </div>
        </div>
      </motion.div>

      {/* Add Comment Button */}
      {showAddCommentButton && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={buttonControls}
          className="absolute px-2 py-1 md:px-3 md:py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors z-20"
          style={{
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
            transition: "left 0.2s ease-out",
          }}
        >
          Add Comment
        </motion.button>
      )}

      {/* Floating Comment Bubble */}
      {showCommentBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={commentBubbleControls}
          className="absolute z-40 w-80 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            top: `${commentPosition.top}px`,
            left: `${commentPosition.left}px`,
            maxWidth: "calc(100% - 20px)", // Ensure it doesn't overflow container
          }}
        >
          {/* Comment Connector */}
          <div className="absolute top-6 -left-2 w-2 h-0.5 bg-gradient-to-r from-gray-300 to-transparent rounded-full" />
          
          <div className="flex flex-col">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900">Comment</h3>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-96">
              {/* User prompt */}
              <div className="space-y-1">
                <div className="flex items-start gap-2 px-2 py-1">
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <RiUserLine className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-900 font-sans">You</span>
                      <span className="text-xs text-gray-500 font-sans">now</span>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={promptTypewriter.displayText}
                      readOnly
                      className={`w-full px-2 py-1.5 text-xs border rounded-md transition-all bg-gray-50 resize-none overflow-hidden ${
                        inputFocused
                          ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50 bg-white"
                          : "border-gray-300"
                      }`}
                      placeholder="Type your comment..."
                      style={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        minHeight: "32px",
                        height: "auto",
                      }}
                      rows={1}
                    />
                    {inputFocused && (
                      <span
                        className="absolute w-0.5 h-3 bg-gray-800 pointer-events-none"
                        style={{
                          top: `${cursorPosition.top}px`,
                          left: `${cursorPosition.left}px`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              {showTypingIndicator && (
                <div className="flex items-center space-x-2 text-gray-500 text-xs ml-6">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <span>Agent is typing...</span>
                </div>
              )}

              {/* Agent reply */}
              {showAgentReply && (
                <div className="space-y-1">
                  <div className="flex items-start gap-2 px-2 py-1">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clover className="w-2.5 h-2.5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-900 font-sans">Agent</span>
                        <span className="text-xs text-gray-500 font-sans">now</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-xs text-gray-700 leading-relaxed font-sans">
                    <p aria-live="polite">{replyTypewriter.displayText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Fake Cursor - Mouse Pointer */}
      {showCursor && (
        <motion.div
          animate={cursorControls}
          initial={{ x: -100, y: -100 }}
          className="absolute pointer-events-none z-50"
          style={{
            width: "20px",
            height: "20px",
            transform: "translate(-2px, -2px)",
            cursor: "pointer",
          }}
        >
          {/* Mouse pointer SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="white"
              stroke="#2563eb"
              strokeWidth="1.5"
            />
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#2563eb"
              fillOpacity="0.2"
            />
          </svg>
          {clickRipple && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-500"
              style={{
                transform: "translate(-3px, -3px)",
              }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}


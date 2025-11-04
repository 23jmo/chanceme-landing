"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const [display, setDisplay] = useState(value);

  // Subscribe to spring value changes
  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  const prevValueRef = useRef(value);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    if (value !== prevValue) {
      prevValueRef.current = value;
      motionValue.set(value);
    }
  }, [value, motionValue]);

  return (
    <span className={className}>
      ${display}
    </span>
  );
}


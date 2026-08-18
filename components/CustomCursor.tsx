"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<{
    variant: "default" | "work" | "link";
    text: string;
    visible: boolean;
  }>({
    variant: "default",
    text: "view work",
    visible: false,
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!cursorState.visible) {
        setCursorState((prev) => ({ ...prev, visible: true }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const workArea = target.closest("[data-cursor='work']");
      const link = target.closest("a, button, [role='button']");

      if (workArea) {
        setCursorState({
          variant: "work",
          text: "view work",
          visible: true,
        });
      } else if (link) {
        setCursorState({
          variant: "link",
          text: "",
          visible: true,
        });
      } else {
        setCursorState({
          variant: "default",
          text: "",
          visible: true,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, cursorState.visible]);

  if (!mounted || !cursorState.visible) {
    return null;
  }

  const isWork = cursorState.variant === "work";
  const isLink = cursorState.variant === "link";

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-center select-none"
      style={{
        left: springX,
        top: springY,
      }}
      animate={{
        width: isWork ? 96 : isLink ? 24 : 10,
        height: isWork ? 96 : isLink ? 24 : 10,
        backgroundColor: isWork ? "#3A4A16" : isLink ? "rgba(58, 74, 22, 0.2)" : "#3A4A16",
        scale: isWork ? 1 : isLink ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {isWork && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex flex-col items-center justify-center text-[#F0EFE9] p-2"
        >
          <svg
            className="w-8 h-5 mb-1"
            viewBox="0 0 45 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.6466 13.3979C32.8541 13.3979 25.712 9.10371 22.228 1.00019"
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M43.6466 13.398C32.8541 13.3979 25.712 17.6922 22.228 25.7957"
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M42.8208 13.398L1 13.3979"
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[11px] font-medium tracking-tight uppercase">
            {cursorState.text}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic Cyber-Cursor
 * A high-performance custom cursor engine with weighted physics and target snapping.
 */
export default function Cursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Core Dot Physics: Fast and precise
  const dotSpringConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Trailing Ring Physics: Heavier mass for buttery-smooth lag
  const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Disable on mobile/touch devices
    const checkMobile = () => setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Optimized event delegation for target detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect links, buttons, and custom magnetic classes
      const isInteractable = target.closest('a, button, .cursor-magnetic, [role="button"]') !== null;
      setIsHovering(isInteractable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Trailing Reactive Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          borderColor: isHovering ? "rgba(232, 121, 249, 0.4)" : "rgba(34, 211, 238, 0.2)",
          backgroundColor: isHovering ? "rgba(232, 121, 249, 0.05)" : "rgba(34, 211, 238, 0)",
        }}
        className="fixed top-0 left-0 rounded-full border-[1.5px] shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-colors duration-500 ease-out"
      />

      {/* 2. Kinetic Core Core */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.7 : (isHovering ? 1.8 : 1),
          backgroundColor: isHovering ? "#e879f9" : "#22d3ee",
          boxShadow: isHovering 
            ? "0 0 25px rgba(232, 121, 249, 1)" 
            : "0 0 15px rgba(34, 211, 238, 0.8)",
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full z-10 transition-colors duration-300 pointer-events-none"
      />

      {/* 3. Crosshair Details (appears on hover) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
          rotate: isHovering ? 90 : 0,
        }}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-fuchsia-500/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-fuchsia-500/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-fuchsia-500/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-fuchsia-500/50" />
      </motion.div>
    </div>
  );
}

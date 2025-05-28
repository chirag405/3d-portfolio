"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const SpotlightCard = ({
  children,
  className = "",
  containerClassName = "",
  spotlightSize = 400,
  spotlightColor = "rgba(129, 94, 255, 0.15)",
  background = "bg-indigo-800",
  border = true,
  hoveredScale = 1.02,
  glowEffect = false,
  pulseEffect = false,
}) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateMousePosition = (ev) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    mousePosition.current = { x, y };
  };

  const updateAnimation = () => {
    if (!containerRef.current || !isMounted) return;

    const { x, y } = mousePosition.current;
    mouse.current.x = x;
    mouse.current.y = y;

    const spotlight = containerRef.current.querySelector(".spotlight");
    if (spotlight) {
      spotlight.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent)`;
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerSize.current.width = rect.width;
      containerSize.current.height = rect.height;
      mousePosition.current.x = rect.width / 2;
      mousePosition.current.y = rect.height / 2;
    }

    window.addEventListener("resize", () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerSize.current.width = rect.width;
        containerSize.current.height = rect.height;
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    if (isHovered) {
      const loop = () => {
        updateAnimation();
        animationFrame = requestAnimationFrame(loop);
      };
      animationFrame = requestAnimationFrame(loop);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered, spotlightColor, spotlightSize]);
  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        glowEffect && "shadow-lg hover:shadow-2xl backdrop-blur-sm",
        containerClassName
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={updateMousePosition}
      whileHover={{ scale: hoveredScale }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Spotlight background */}
      <div className={cn("absolute inset-0 spotlight", background)} />

      {/* Glow effect */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-50 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.current.x}px ${mousePosition.current.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Pulse effect */}
      {pulseEffect && isHovered && (
        <motion.div
          className="absolute inset-0 -z-20"
          animate={{
            boxShadow: [
              `0 0 0 3px ${spotlightColor.replace("0.15", "0.05")}`,
              `0 0 0 6px ${spotlightColor.replace("0.15", "0.025")}`,
              `0 0 0 12px ${spotlightColor.replace("0.15", "0.0125")}`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      )}

      <div
        className={cn(
          "relative h-full w-full flex flex-col",
          border ? "border border-indigo-500/10" : "",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

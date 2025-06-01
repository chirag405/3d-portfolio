"use client";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Meteors = ({ number, className }) => {
  const meteors = new Array(number || 10).fill(true); // Reduced default number of meteors
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 10; // Reduced default meteor count for position calculation
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px", // Start just above the container
              left: position + "px",
              animationDelay: Math.random() * (0.6 - 0.1) + 0.1 + "s", // Random delay between 0.1-0.6s
              animationDuration: Math.floor(Math.random() * (10 - 3) + 3) + "s", // Random duration between 3-10s (faster and fade earlier)
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};

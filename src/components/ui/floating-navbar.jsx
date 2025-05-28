"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress, scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const direction = current - lastScrollY;
    const isAtTop = current < 100; // Show when near top of page
    const isScrollingUp = direction < 0;

    // Show navbar when:
    // 1. At the top of the page (first page)
    // 2. Scrolling up
    setVisible(isAtTop || isScrollingUp);
    setLastScrollY(current);
  });

  return (
    <AnimatePresence mode="wait">
      {" "}
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {" "}
        {navItems.map((navItem, idx) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className="relative text-white items-center flex space-x-1 hover:text-electric-purple transition-colors"
            target={navItem.link.startsWith("http") ? "_blank" : "_self"}
            rel={
              navItem.link.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}{" "}
        <a
          href="#contact"
          className="border text-sm font-medium relative border-electric-purple text-white px-4 py-2 rounded-full hover:bg-electric-purple hover:bg-opacity-20 transition-colors"
        >
          <span>Contact Me</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-electric-purple to-transparent h-px" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

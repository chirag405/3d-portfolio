import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import computerAnim from "../assets/lottie/computer.json";

const LottieHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex items-center justify-center"
      >
        {" "}
        <div
          className={`${
            isMobile ? "w-[450px] h-[450px]" : "w-[850px] h-[850px]"
          }`}
        >
          <Lottie
            animationData={computerAnim}
            autoplay
            loop
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LottieHero;

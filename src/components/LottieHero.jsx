import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import computerAnim from "../assets/lottie/computer.json";
import { isMobileDevice, isVerySmallScreen } from "../utils/mobileUtils";

const LottieHero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVerySmall, setIsVerySmall] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
      setIsVerySmall(isVerySmallScreen());
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render at all on mobile or very small screens
  if (isMobile || isVerySmall) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex items-center justify-center"
      >
        {" "}
        <div className="w-[850px] h-[850px]">
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

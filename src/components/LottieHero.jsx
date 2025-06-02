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

  // Always render the animation regardless of device type
  // Only adjust size for mobile devices
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex items-center justify-end pr-10 md:pr-20"
      >
        {" "}
        <div
          className={`${
            isMobile || isVerySmall
              ? "w-[400px] h-[400px]"
              : "w-[700px] h-[700px]"
          }`}
        >
          <Lottie
            animationData={computerAnim}
            autoplay
            loop
            className="w-full h-full"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
              progressiveLoad: true,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LottieHero;

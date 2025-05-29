import React, { useState, useEffect, Suspense, lazy } from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { personalInfo } from "../constants";
import { useWebGL } from "../utils/WebGLContext";
import { BackgroundBeams } from "./ui/background-beams";
const LottieHero = lazy(() => import("./LottieHero"));
import { isMobileDevice, isVerySmallScreen } from "../utils/mobileUtils";

const Hero = () => {
  const { ref, shouldRender } = useWebGL("computers");
  const [isMobile, setIsMobile] = useState(false);
  const [isVerySmall, setIsVerySmall] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
      setIsVerySmall(isVerySmallScreen());
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen mx-auto overflow-hidden"
    >
      {" "}
      {/* Background Beams effect - disable on very small screens */}
      {!isVerySmall && (
        <div className="absolute inset-0 w-full h-full z-0">
          <BackgroundBeams className="opacity-60" />
        </div>
      )}
      <div
        className={`${styles.paddingX} absolute top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 inset-0 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-electric-purple" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="text-electric-purple">{personalInfo.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            A {personalInfo.role}, <br className="sm:block hidden" />
            building web and mobile applications
          </p>{" "}
        </div>{" "}
      </div>
      {/* Completely remove Lottie animation on mobile/small screens */}
      {shouldRender && !isMobile && !isVerySmall && ( <Suspense fallback={null}> <LottieHero /> </Suspense> )}
      <div className="absolute xs:bottom-2 bottom-12 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

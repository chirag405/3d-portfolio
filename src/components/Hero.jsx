import { motion } from "framer-motion";
import { styles } from "../styles";
import { BackgroundBeams } from "./ui/background-beams";
import LottieHero from "./LottieHero";
import { isVerySmallScreen } from "../utils/mobileUtils";
import { useEffect, useState } from "react";
import { useWebGL } from "../utils/WebGLContext";
import { personalInfo } from "../constants";
const Hero = () => {
  const [isVerySmall, setIsVerySmall] = useState(false);
  const { shouldRender } = useWebGL("computers", 1);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsVerySmall(isVerySmallScreen());
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">{personalInfo.name}</span>
          </h1>
 <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            A {personalInfo.role}, <br className="sm:block hidden" />
            building web and mobile applications
          </p>{" "}
        </div>
      </div>

      {/* Always render LottieHero */}
      <LottieHero />

      {/* ComputersCanvas removed */}

      {/* Always render BackgroundBeams */}
      <BackgroundBeams />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
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

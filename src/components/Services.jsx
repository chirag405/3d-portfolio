import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { navigationPaths } from "../constants";
import { SpotlightCard } from "./ui/spotlight-card";
import Lottie from "lottie-react";
import { isMobileDevice, isVerySmallScreen } from "../utils/mobileUtils";

// Import Lottie animations
import webDevAnim from "../assets/lottie/web-development.json";
import mobileDevAnim from "../assets/lottie/mobile-development.json";
import generativeaiAnim from "../assets/lottie/generative-ai.json";
import backendDevAnim from "../assets/lottie/backend-development.json";

const services = [
  {
    title: "Web Development",
    description:
      "I build responsive, scalable web applications using modern technologies like React, Next.js, and tailored backend solutions.",
    animation: webDevAnim,
    gradient: "from-blue-600 to-cyan-400",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "Mobile Development",
    description:
      "I create cross-platform mobile applications with React Native and Flutter that provide native-like experiences.",
    animation: mobileDevAnim,
    gradient: "from-orange-600 to-amber-400",
    spotlightColor: "rgba(249, 115, 22, 0.15)",
  },
  {
    title: "Generative AI",
    description:
      "I develop innovative AI solutions leveraging LLMs, computer vision, and generative models to create intelligent applications.",
    animation: generativeaiAnim, // Keep using the same Lottie animation as requested
    gradient: "from-pink-600 to-rose-400",
    spotlightColor: "rgba(236, 72, 153, 0.15)",
  },
  {
    title: "Backend Development",
    description:
      "I develop robust server-side applications using Node.js, Express, and various database technologies.",
    animation: backendDevAnim,
    gradient: "from-emerald-600 to-green-400",
    spotlightColor: "rgba(16, 185, 129, 0.15)",
  },
];

const ServiceCard = ({
  index,
  title,
  description,
  animation,
  gradient,
  spotlightColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    setIsMobile(isMobileDevice() || isVerySmallScreen());
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5 * index, 0.75)}
      className="mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SpotlightCard
        containerClassName="w-full sm:w-[350px]"
        className="p-8 min-h-[320px] flex flex-col items-center justify-center"
        spotlightColor={spotlightColor}
        background={`bg-gradient-to-b ${gradient} bg-opacity-5`}
        hoveredScale={1.05}
        glowEffect={true}
        pulseEffect={isHovered}
        spotlightSize={450}
      >
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            className="w-36 h-36 mb-6 relative"
            animate={
              !isMobile && isHovered
                ? {
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {!isMobile ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={animation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            ) : (
              <div
                className={`w-full h-full rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
              >
                <div className="text-white text-4xl font-bold">
                  {title.split(" ")[0][0]}
                </div>
              </div>
            )}
          </motion.div>

          <h3 className="text-white text-[24px] font-bold text-center">
            {title}
          </h3>
          <p className="mt-4 text-secondary text-[15px] text-center leading-relaxed">
            {description}
          </p>

          <motion.div
            className="mt-6 opacity-0"
            animate={isHovered ? { opacity: 1, y: 5 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${gradient} bg-opacity-20 text-white text-sm cursor-pointer hover:bg-opacity-30 transition-all duration-300`}
            >
              Learn More
            </div>
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I offer</p>
        <h2 className={styles.sectionHeadText}>Services.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={`service-${index}`} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, navigationPaths.services || "services");

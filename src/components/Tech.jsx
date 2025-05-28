import React from "react";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import * as SimpleIcons from "simple-icons";

const TechCard = ({ technology }) => {
  // Get simple icon for the technology if available
  const getSimpleIcon = (name) => {
    // Convert technology name to SimpleIcons format (lowercase, no spaces)
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    // Try different variations of the name
    const variations = [
      formattedName,
      formattedName.replace("js", ""),
      formattedName + "js",
      formattedName.replace(".", ""),
    ];

    for (const variant of variations) {
      const iconKey = Object.keys(SimpleIcons).find(
        (key) => key.toLowerCase() === `si${variant}`
      );
      if (iconKey) return SimpleIcons[iconKey];
    }
    return null;
  };

  const icon = getSimpleIcon(technology.name);
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-tertiary/30 backdrop-blur-sm rounded-lg border border-tertiary/40">
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        {icon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="w-12 h-12"
            fill={`#${icon.hex}`}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <img
            src={technology.icon}
            alt={technology.name}
            className="w-12 h-12 object-contain"
          />
        )}
      </div>
      <h3 className="text-white text-center font-medium text-sm">
        {technology.name}
      </h3>
    </div>
  );
};

const Tech = () => {
  // Transform technologies into the format expected by InfiniteMovingCards
  const techItems = technologies.map((tech) => ({
    name: tech.name,
    quote: <TechCard technology={tech} />,
    title: "",
  }));

  return (
    <>
      <motion.div variants={textVariant()} className="mb-10">
        <p className={styles.sectionSubText}>Technologies I work with</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>{" "}
      <div className="relative overflow-hidden">
        {" "}
        <InfiniteMovingCards
          items={techItems}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="py-4"
        />
        {/* Create a second moving row going in the opposite direction */}
        <div className="mt-8">
          <InfiniteMovingCards
            items={[...techItems].reverse()}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");

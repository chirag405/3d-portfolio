import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { styles } from "../styles";
import { personalInfo, projects } from "../constants";
import { demo } from "../assets";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { Meteors } from "./ui/meteors";
import { isMobileDevice, isVerySmallScreen } from "../utils/mobileUtils";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  hosted_link,
}) => {
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

  // Use regular div on mobile instead of 3D card
  if (isMobile || isVerySmall) {
    return (
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className="w-full sm:w-auto flex justify-center"
      >
        <div className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full max-w-sm min-h-[400px] flex flex-col">
          {/* Project Image */}
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
            <img
              src={image || demo}
              alt={`${name} preview`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Title */}
          <h3 className="text-white font-bold text-[20px] mb-2">{name}</h3>

          {/* Project Description */}
          <p className="text-secondary text-[14px] leading-[18px] mb-4 flex-grow">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.map((tag) => (
              <span
                key={tag.name}
                className={`text-[12px] font-medium px-2 py-1 rounded ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* Action Link */}
          {hosted_link && (
            <a
              href={hosted_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-electric-purple hover:bg-electric-purple/80 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center text-sm font-medium"
            >
              View Project
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="w-full sm:w-auto flex justify-center"
    >
      <CardContainer className="w-full max-w-sm p-2">
        <CardBody className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full h-full min-h-[400px] flex flex-col">
          {/* Project Image with hover effect */}
          <CardItem
            translateZ={50}
            className="relative w-full h-[200px] sm:h-[230px] cursor-pointer overflow-hidden flex-shrink-0"
            onClick={() => window.open(hosted_link, "_blank")}
          >
            <img
              src={typeof image === "object" ? image.src : image}
              alt="project-image"
              className="w-full h-full object-cover rounded-2xl transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 flex justify-end m-2 sm:m-3 card-img_hover">
              <CardItem
                translateZ={70}
                onClick={() => window.open(hosted_link, "_blank")}
                className="black-gradient w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-electric-purple hover:bg-opacity-70 transition-colors duration-300"
              >
                <img
                  src={demo}
                  alt="source-code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </CardItem>
            </div>
          </CardItem>

          {/* Project title and description */}
          <CardItem translateZ={40} className="mt-4 sm:mt-5 flex-grow">
            <h3 className="text-white font-bold text-[20px] sm:text-[24px] leading-tight">
              {name}
            </h3>
            <p className="mt-2 text-secondary text-[13px] sm:text-[14px] leading-relaxed">
              {description}
            </p>
          </CardItem>

          {/* Project tags */}
          <CardItem
            translateZ={60}
            className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2"
          >
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[12px] sm:text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const Works = () => {
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

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {personalInfo.projectsIntro}
        </motion.p>
      </div>{" "}
      <div className="mt-20 flex flex-wrap gap-7 relative">
        {/* Add subtle meteors in background - disable on mobile */}
        {!isMobile && !isVerySmall && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <Meteors number={5} className="opacity-30" />
          </div>
        )}

        {/* Project cards */}
        <div className="relative z-10 flex flex-wrap gap-4 sm:gap-7 w-full justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

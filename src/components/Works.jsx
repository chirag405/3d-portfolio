import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { styles } from "../styles";
import { personalInfo, projects } from "../constants";
import { demo } from "../assets";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { Meteors } from "./ui/meteors";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  hosted_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <CardContainer className="w-full">
        <CardBody className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full">
          {/* Project Image with hover effect */}
          <CardItem
            translateZ={50}
            className="relative w-full h-[230px] cursor-pointer overflow-hidden"
            onClick={() => window.open(hosted_link, "_blank")}
          >
            <img
              src={typeof image === "object" ? image.src : image}
              alt="project-image"
              className="w-full h-full object-cover rounded-2xl transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <CardItem
                translateZ={70}
                onClick={() => window.open(hosted_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-electric-purple hover:bg-opacity-70 transition-colors duration-300"
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
          <CardItem translateZ={40} className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </CardItem>

          {/* Project tags */}
          <CardItem translateZ={60} className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
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
      </div>

      <div className="mt-20 flex flex-wrap gap-7 relative">
        {/* Add subtle meteors in background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Meteors number={5} className="opacity-30" />
        </div>

        {/* Project cards */}
        <div className="relative z-10 flex flex-wrap gap-7 w-full justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

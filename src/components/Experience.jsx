import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { experiences, navigationPaths } from "../constants";
import { Timeline } from "./ui/timeline";
import { Meteors } from "./ui/meteors";

const Experience = () => {
  // Format experiences for Aceternity UI Timeline
  const timelineData = experiences.map((experience) => ({
    title: experience.date,
    content: (
      <div className="bg-tertiary p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full flex justify-center items-center"
              style={{ background: experience.iconBg }}
            >
              <img
                src={experience.icon}
                alt={experience.company_name}
                className="w-[60%] h-[60%] object-contain"
              />
            </div>
            <div>
              <h3 className="text-white text-[22px] font-bold">
                {experience.title}
              </h3>
              <p className="text-secondary text-[16px] font-semibold">
                {experience.company_name}
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-5 ml-5 list-disc space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 relative">
        {/* Add subtle meteors in background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Meteors number={5} className="opacity-30" />
        </div>
        <div className="relative z-10">
          <Timeline data={timelineData} />
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, navigationPaths.work);

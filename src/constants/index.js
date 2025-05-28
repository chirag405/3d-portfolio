import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  nextJs,
  reactjs,
  tailwind,
  nodejs,
  mysql,
  git,
  flutter,
  langchain,
  tensorflow,
  streamlit,
  supabase,
  cplusplus,
  saywhat,
  upcraft,
  toolx,
  plateai,
  chatalytic,
  pilpal,
  polmitra,
  linkedIn,
  github,
  zustand,
} from "../assets";

// Import icon for Expense Tracker project
import { FaWallet } from "react-icons/fa";

// Create a placeholder image for Expense Tracker project
const expenseTrackerImg =
  "https://via.placeholder.com/400x230?text=Expense+Tracker";

const navigationPaths = {
  home: "/",
  about: "about",
  work: "work",
  contact: "contact",
};

export const navLinks = [
  {
    id: navigationPaths.about,
    title: "About",
  },
  {
    id: navigationPaths.work,
    title: "Work",
  },
  {
    id: navigationPaths.contact,
    title: "Contact",
  },
];

const services = [
  {
    title: "React Developer",
    icon: web,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "React Native Developer",
    icon: backend,
  },
  {
    title: "AI ML Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "LangChain",
    icon: langchain,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextJs,
  },
  {
    name: "Tensorflow",
    icon: tensorflow,
  },
  {
    name: "Zustand",
    icon: zustand,
  },

  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Streamlit",
    icon: streamlit,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Supabase",
    icon: supabase,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Flutter Developer Intern",
    company_name: "Higroove Systems",
    company_website: "https://higroovesystems.com/",
    icon: flutter,
    iconBg: "#E6DEDD",
    date: "June 2024 - Sept 2024",
    points: [
      "Reduced AP response calls and response time by 40% using Hive local database for efficient storage and retrieval.",
      "Optimized background processes and battery usage with BloC.",
      "Developed 5 fully functional Flutter apps.",
      "Collaborated with Android team to build native features using Kotlin.",
    ],
  },
];

const projects = [
  {
    name: "SayWhat",
    description:
      "Built a real-time party game featuring AI-powered scoring, turn-based play, timed answers, and a live voting system. Added features like automatic host switching, player reconnection support, and smooth tab reload handling. Achieved 300+ daily users through engaging scenarios and fun AI-generated replies.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "zustand",
        color: "pink-text-gradient",
      },
      {
        name: "grok",
        color: "orange-text-gradient",
      },
    ],
    image: saywhat, // Replace with your actual image import
    hosted_link: "https://www.saywhat.quest/", // Replace with actual link
  },
  {
    name: "UpCraft",
    description:
      "Developed an AI-powered tool for generating resumes and cover letters with industry-specific recommendations. Included an interview preparation system with over 50 mock quizzes and personalized feedback. Automated document generation workflows using Inngest, reducing processing time by 40%.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "postgresql",
        color: "green-text-gradient",
      },
      {
        name: "inngest",
        color: "pink-text-gradient",
      },
      {
        name: "clerk",
        color: "purple-text-gradient",
      },
      {
        name: "gemini",
        color: "orange-text-gradient",
      },
    ],
    image: upcraft, // Replace with your actual image import
    hosted_link: "https://up-craft-181t.vercel.app/", // Replace with actual link
  },
  {
    name: "ToolX",
    description:
      "Created a tool that converts YouTube videos into AI chatbots by using the transcript as context. Enabled users to auto-generate scripts, titles, and thumbnails based on video content. Integrated live YouTube metrics (views, likes, comments) into the chatbot interaction flow.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "convex",
        color: "green-text-gradient",
      },
      {
        name: "gcp",
        color: "pink-text-gradient",
      },
      {
        name: "dalle",
        color: "purple-text-gradient",
      },
      {
        name: "vercel-ai-sdk",
        color: "orange-text-gradient",
      },
    ],
    image: toolx, // Replace with your actual image import
    hosted_link: "https://tool-x-weld.vercel.app/", // Replace with actual link
  },
  {
    name: "Plate-AI",
    description:
      "An intelligent number plate detection system that uses YOLO8 for object detection and Tesseract for OCR. The application can detect and extract number plates from images, videos, and live camera feeds with high accuracy and real-time processing capabilities.",
    tags: [
      {
        name: "yolo8",
        color: "blue-text-gradient",
      },
      {
        name: "react",
        color: "green-text-gradient",
      },
      {
        name: "tesseract",
        color: "pink-text-gradient",
      },
      {
        name: "opencv",
        color: "purple-text-gradient",
      },
    ],
    image: plateai, // Replace with your actual image import
    hosted_link: "https://auto-plate-capture.vercel.app/", // Replace with actual link
  },
  {
    name: "Chatalytic",
    description:
      "A Streamlit-based application that provides beautiful analysis of your WhatsApp and Telegram chats. Features comprehensive data visualization with charts, insights, message statistics, activity patterns, and sentiment analysis to help users understand their communication habits.",
    tags: [
      {
        name: "streamlit",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "pandas",
        color: "pink-text-gradient",
      },
      {
        name: "plotly",
        color: "purple-text-gradient",
      },
    ],
    image: chatalytic, // Replace with your actual image import
    hosted_link: "https://chatalytic.streamlit.app/", // Replace with actual link
  },
  {
    name: "PilPal - Medicine Reminder",
    description:
      "PilPal is a React Native app designed to help users manage their medications efficiently. Features local storage, biometric authentication, push notifications, calendar view, and a comprehensive medicine tracker to ensure users never miss a dose.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "biometric-auth",
        color: "green-text-gradient",
      },
      {
        name: "notifications",
        color: "pink-text-gradient",
      },
      {
        name: "local-storage",
        color: "purple-text-gradient",
      },
    ],
    image: pilpal, // Replace with your actual image import
    hosted_link: "https://your-pilpal-link.com/", // Replace with actual link
  },
  {
    name: "Expense Tracker",
    description:
      "A comprehensive expense tracking application built with Flutter that helps users monitor their spending habits, categorize expenses, set budgets, and generate detailed financial reports. Features intuitive UI, data visualization, and multi-currency support.",
    tags: [
      {
        name: "flutter",
        color: "blue-text-gradient",
      },
      {
        name: "dart",
        color: "green-text-gradient",
      },
      {
        name: "sqlite",
        color: "pink-text-gradient",
      },
      {
        name: "charts",
        color: "purple-text-gradient",
      },
    ],
    image: expenseTrackerImg, // Using placeholder image
    hosted_link: "https://github.com/chirag405/expense-tracker", // Replace with actual link
  },
  {
    name: "PolMitra",
    description:
      "PolMitra is a powerful Flutter and Firebase-based platform designed to streamline political management. Consists of PolMitra Admin for politicians to manage activities, polls, and attendance, and PolMitra User for karyakartas to engage in events, participate in polls, and stay updated.",
    tags: [
      {
        name: "flutter",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "real-time-db",
        color: "pink-text-gradient",
      },
      {
        name: "cloud-functions",
        color: "purple-text-gradient",
      },
    ],
    image: polmitra, // Replace with your actual image import
    hosted_link:
      "https://github.com/chirag405/polmitra-admin/releases/tag/v1.0.0", // Replace with actual link
  },
];

const personalInfo = {
  name: "Chirag",
  fullName: "Chirag Singh",
  email: "@gmail.com",
  role: "Software Developer",
  about: `I'm a passionate and curious developer driven by the desire to build meaningful digital experiences. With a strong foundation in full-stack development, I specialize in creating mobile apps using Flutter and React Native, as well as dynamic web applications with Next.js.
I’ve worked on diverse projects ranging from AI-powered tools and chat analytics to productivity platforms and real-time systems. My focus is on combining clean design, efficient code, and innovative ideas to solve real-world problems.`,
  projectsIntro: `Following projects showcases my skills and experience through
  real-world examples of my work. Each project is briefly described with
  live demos. It reflects my ability to solve complex problems, work
  with different technologies, and manage projects effectively.`,
};

const publicUrls = {
  resume:
    "https://drive.google.com/file/d/1yn5kb1VK-erDRs9o_7AxOaxqkawUrrIV/view?usp=sharing",
  socialProfiles: {
    linkedin: {
      title: "linkedin",
      link: "https://www.linkedin.com/in/chirag404",
      icon: linkedIn,
    },
    github: {
      title: "github",
      link: "https://github.com/chirag405",
      icon: github,
    },
  },
};

export {
  services,
  technologies,
  experiences,
  projects,
  navigationPaths,
  personalInfo,
  publicUrls,
};

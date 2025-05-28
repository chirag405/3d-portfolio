import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import {
  navLinks,
  navigationPaths,
  personalInfo,
  publicUrls,
} from "../constants";
import { FloatingNav } from "./ui/floating-navbar";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY - lastScrollY;
      const isAtTop = currentScrollY < 100;
      const isScrollingUp = direction < 0;

      // Show navbar when at top or scrolling up
      setVisible(isAtTop || isScrollingUp);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Format navLinks for FloatingNav
  const floatingNavItems = [
    ...navLinks.map((link) => ({
      name: link.title,
      link: `#${link.id}`,
      icon: <span className="text-electric-purple">•</span>,
    })),
    {
      name: "Resume",
      link: publicUrls.resume,
      icon: <span className="text-electric-purple">•</span>,
    },
  ];

  return (
    <>
      {/* Original navbar for mobile */}
      <nav
        className={`${
          styles.paddingX
        } py-5 w-full flex items-center fixed top-0 z-20 bg-primary sm:hidden transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to={navigationPaths.home}
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              {personalInfo.name} &nbsp;
              <span className="lg:block hidden">| {personalInfo.role}</span>
            </p>
          </Link>

          <div className="flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } absolute top-20 right-0 black-gradient mx-4 my-2 p-6 rounded-xl z-10 min-w-[140px]`}
            >
              <ul className="list-none flex flex-col gap-4 justify-end items-start">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-white" : "text-secondary"
                    } text-[18px] font-medium cursor-pointer hover:text-white`}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(!toggle);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}{" "}
                <li
                  className={`text-secondary text-[18px] font-medium cursor-pointer hover:text-white`}
                >
                  <a
                    href={publicUrls.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating navbar for desktop */}
      <div className="hidden sm:block">
        <FloatingNav
          navItems={floatingNavItems}
          className="border border-tertiary dark:border-tertiary rounded-full dark:bg-black-100 bg-primary shadow-card"
        />
      </div>
    </>
  );
};

export default Navbar;

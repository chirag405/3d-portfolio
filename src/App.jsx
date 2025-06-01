import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  HireMe,
} from "./components";
import { Meteors } from "./components/ui/meteors";
import { isVerySmallScreen } from "./utils/mobileUtils";
import { useEffect, useState } from "react";

const App = () => {
  const [isVerySmall, setIsVerySmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsVerySmall(isVerySmallScreen());
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          {/* Always render StarsCanvas and Meteors */}
          <StarsCanvas />
          <Meteors number={15} />
        </div>
        <HireMe />
      </div>
    </BrowserRouter>
  );
};

export default App;

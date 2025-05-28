import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/canvas";
import HireMe from "./components/HireMe";
import Services from "./components/Services";
import { WebGLProvider } from "./utils/WebGLContext";
import { Meteors } from "./components/ui/meteors"; // Import Meteors component

const App = () => {
  return (
    <BrowserRouter>
      <WebGLProvider>
        <div className="relative z-0 bg-primary overflow-hidden">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>{" "}
          <About />
          <Experience />
          <Tech />
          <Services />
          <Works />
          <div className="relative z-0">
            <Contact />
            {/* <StarsCanvas /> */}
          </div>
          <HireMe />
          {/* Add meteors effect in the background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <Meteors number={20} />
          </div>
        </div>
      </WebGLProvider>
    </BrowserRouter>
  );
};

export default App;

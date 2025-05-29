import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Meteors } from "./components/ui/meteors";
import ErrorBoundary from "./components/ErrorBoundary";
import { useMobileOptimization } from "./utils/mobileUtils";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mobileOptimization = useMobileOptimization();
  const { isMobile } = mobileOptimization;

  useEffect(() => {
    // Allow time for mobile detection and initial setup
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Portfolio Loading...</h1>
          <p className="text-gray-400">Optimizing for your device...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={
          <div className="min-h-screen bg-primary flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Portfolio Loading...</h1>
              <p className="text-gray-400">
                {isMobile
                  ? "Optimizing for mobile experience..."
                  : "Loading 3D experience..."}
              </p>
            </div>
          </div>
        }
      >
        <WebGLProvider>
          <div className="relative z-0 bg-primary overflow-hidden">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <ErrorBoundary fallbackComponentName="Navbar">
                <Navbar />
              </ErrorBoundary>
              <ErrorBoundary fallbackComponentName="Hero">
                <Hero />
              </ErrorBoundary>
            </div>
            <ErrorBoundary fallbackComponentName="About">
              <About />
            </ErrorBoundary>
            <ErrorBoundary fallbackComponentName="Experience">
              <Experience />
            </ErrorBoundary>
            <ErrorBoundary fallbackComponentName="Tech">
              <Tech />
            </ErrorBoundary>
            <ErrorBoundary fallbackComponentName="Services">
              <Services />
            </ErrorBoundary>
            <ErrorBoundary fallbackComponentName="Works">
              <Works />
            </ErrorBoundary>
            <div className="relative z-0">
              <ErrorBoundary fallbackComponentName="Contact">
                <Contact />
              </ErrorBoundary>{" "}
              {/* Only render stars on desktop or high-performance mobile */}
              {(!isMobile || mobileOptimization.enableAnimations) && (
                <ErrorBoundary fallbackComponentName="StarsCanvas">
                  <StarsCanvas />
                </ErrorBoundary>
              )}
            </div>
            <ErrorBoundary fallbackComponentName="HireMe">
              <HireMe />
            </ErrorBoundary>
            {/* Add meteors effect in the background - reduce count on mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <ErrorBoundary fallbackComponentName="Meteors">
                <Meteors number={isMobile ? 10 : 20} />
              </ErrorBoundary>
            </div>
          </div>
        </WebGLProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;

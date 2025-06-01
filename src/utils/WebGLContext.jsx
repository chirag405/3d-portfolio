import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { supportsWebGL } from "./mobileUtils";

const WebGLContext = createContext();

export const useWebGL = (canvasId, priority = 0) => {
  const context = useContext(WebGLContext);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && context) {
      // Register this canvas with the WebGL context
      context.registerCanvas(canvasId, ref, priority);

      return () => {
        // Unregister on unmount
        context.unregisterCanvas(canvasId);
      };
    }
  }, [canvasId, context, priority]);

  // Return both the ref and whether this canvas should render
  return {
    ref,
    shouldRender: context ? context.shouldRender(canvasId) : true,
  };
};

export const WebGLProvider = ({ children }) => {
  const [canvases, setCanvases] = useState({});
  const [activeCanvas, setActiveCanvas] = useState(null);
  const [hasWebGL, setHasWebGL] = useState(true); // Assume WebGL is supported initially

  // Check for WebGL support on mount
  useEffect(() => {
    setHasWebGL(supportsWebGL());
  }, []);

  // Register a canvas with the context
  const registerCanvas = (id, ref, priority = 0) => {
    setCanvases((prev) => ({
      ...prev,
      [id]: { ref, priority, visible: false, active: false },
    }));
  };

  // Unregister a canvas
  const unregisterCanvas = (id) => {
    setCanvases((prev) => {
      const newCanvases = { ...prev };
      delete newCanvases[id];
      return newCanvases;
    });
  };

  // Update canvas visibility based on intersection observer
  const updateCanvasVisibility = (id, isVisible) => {
    setCanvases((prev) => {
      if (!prev[id]) return prev;

      return {
        ...prev,
        [id]: { ...prev[id], visible: isVisible },
      };
    });
  };

  // Determine if a canvas should render
  const shouldRender = (id) => {
    // If WebGL is not supported, don't render any 3D canvas
    if (!hasWebGL) return false;

    // Always render if this is the active canvas
    if (activeCanvas === id) return true;

    // Otherwise, don't render
    return false;
  };

  // Effect to determine the active canvas based on visibility and priority
  useEffect(() => {
    // Find the highest priority visible canvas
    const visibleCanvases = Object.entries(canvases).filter(
      ([_, canvas]) => canvas.visible
    );

    if (visibleCanvases.length === 0) {
      setActiveCanvas(null);
      return;
    }

    // Sort by priority (highest first)
    visibleCanvases.sort((a, b) => b[1].priority - a[1].priority);

    // Set the highest priority canvas as active
    const highestPriorityId = visibleCanvases[0][0];
    setActiveCanvas(highestPriorityId);

    // Update active status in canvases state
    setCanvases((prev) => {
      const newCanvases = { ...prev };
      Object.keys(newCanvases).forEach((id) => {
        newCanvases[id] = {
          ...newCanvases[id],
          active: id === highestPriorityId,
        };
      });
      return newCanvases;
    });
  }, [canvases]);

  // Set up intersection observers for all canvas refs
  useEffect(() => {
    const observers = {};

    // Create observers for each canvas
    Object.entries(canvases).forEach(([id, { ref }]) => {
      if (ref.current && !observers[id]) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              updateCanvasVisibility(id, entry.isIntersecting);
            });
          },
          { threshold: 0.1 } // 10% visibility is enough to consider it "visible"
        );

        observer.observe(ref.current);
        observers[id] = observer;
      }
    });

    // Cleanup observers on unmount
    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, [canvases]);

  const value = {
    registerCanvas,
    unregisterCanvas,
    shouldRender,
    activeCanvas,
    hasWebGL,
  };

  return (
    <WebGLContext.Provider value={value}>{children}</WebGLContext.Provider>
  );
};

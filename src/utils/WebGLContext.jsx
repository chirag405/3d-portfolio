import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context to manage WebGL canvas visibility
const WebGLContext = createContext({
  registerCanvas: () => {},
  unregisterCanvas: () => {},
  isCanvasActive: () => false,
});

// Priority order for Canvas components (higher number = higher priority)
const CANVAS_PRIORITIES = {
  computers: 3, // Hero section - highest priority
  ball: 1, // Tech section - lowest priority
  earth: 2, // Contact section - medium priority
  stars: 0, // Background - lowest priority
};

export const WebGLProvider = ({ children }) => {
  // Keep track of all registered canvases
  const [activeCanvases, setActiveCanvases] = useState({});
  // Track which canvas is currently visible
  const [visibleCanvases, setVisibleCanvases] = useState({});

  // Register a new canvas with a unique ID
  const registerCanvas = (id, type, isVisible = false) => {
    setActiveCanvases((prev) => ({
      ...prev,
      [id]: { type, priority: CANVAS_PRIORITIES[type] || 0 },
    }));

    if (isVisible) {
      setVisibleCanvases((prev) => ({
        ...prev,
        [id]: { type, priority: CANVAS_PRIORITIES[type] || 0 },
      }));
    }
  };

  // Unregister a canvas when it unmounts
  const unregisterCanvas = (id) => {
    setActiveCanvases((prev) => {
      const newCanvases = { ...prev };
      delete newCanvases[id];
      return newCanvases;
    });

    setVisibleCanvases((prev) => {
      const newVisible = { ...prev };
      delete newVisible[id];
      return newVisible;
    });
  };

  // Update a canvas's visibility
  const updateCanvasVisibility = (id, isVisible) => {
    if (isVisible) {
      setVisibleCanvases((prev) => ({
        ...prev,
        [id]: activeCanvases[id],
      }));
    } else {
      setVisibleCanvases((prev) => {
        const newVisible = { ...prev };
        delete newVisible[id];
        return newVisible;
      });
    }
  };

  // Determine if a canvas should be active based on its ID and visibility
  const isCanvasActive = (id) => {
    // If there are no visible canvases, allow any registered canvas
    if (Object.keys(visibleCanvases).length === 0) {
      return activeCanvases[id] !== undefined;
    }

    // Find the highest priority visible canvas
    const highestPriorityCanvas = Object.entries(visibleCanvases).reduce(
      (highest, [currentId, data]) => {
        return !highest || data.priority > highest.priority
          ? { id: currentId, priority: data.priority }
          : highest;
      },
      null
    );

    // Only activate the highest priority canvas
    return highestPriorityCanvas && highestPriorityCanvas.id === id;
  };

  return (
    <WebGLContext.Provider
      value={{
        registerCanvas,
        unregisterCanvas,
        updateCanvasVisibility,
        isCanvasActive,
      }}
    >
      {children}
    </WebGLContext.Provider>
  );
};

// Custom hook for components to use the WebGL context
export const useWebGL = (type) => {
  const {
    registerCanvas,
    unregisterCanvas,
    updateCanvasVisibility,
    isCanvasActive,
  } = useContext(WebGLContext);
  const [id] = useState(`${type}-${Math.random().toString(36).substr(2, 9)}`);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  // Set up intersection observer to detect when component is in viewport
  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        setIsVisible(isNowVisible);
        updateCanvasVisibility(id, isNowVisible);
      },
      { threshold: 0.1 } // Consider visible when 10% in viewport
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, id, updateCanvasVisibility]);

  // Register canvas on mount, unregister on unmount
  useEffect(() => {
    registerCanvas(id, type);
    return () => unregisterCanvas(id);
  }, [id, type, registerCanvas, unregisterCanvas]);

  // Check if this canvas should be active
  const shouldRender = isCanvasActive(id);

  return { ref: setRef, shouldRender, isVisible };
};

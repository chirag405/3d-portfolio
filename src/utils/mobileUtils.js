// Mobile detection and compatibility utilities
import React from "react";

/**
 * Comprehensive mobile device detection
 */
export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  // Check for touch support
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Check screen width - more aggressive detection for mobile
  const isSmallScreen = window.innerWidth <= 768;
  const isVerySmallScreen = window.innerWidth <= 480; // Target smallest screens specifically

  // Check user agent for mobile patterns
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(navigator.userAgent);

  // Check for mobile-specific APIs
  const hasMobileAPIs =
    "orientation" in window || "DeviceOrientationEvent" in window;

  return hasTouch && (isSmallScreen || isMobileUA || hasMobileAPIs);
};

/**
 * Check if device is very small screen (for most aggressive optimizations)
 */
export const isVerySmallScreen = () => {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 480 || (isMobileDevice() && window.innerWidth <= 640)
  );
};

/**
 * Check if device supports WebGL
 */
export const supportsWebGL = () => {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
};

/**
 * Check WebGL context capabilities
 */
export const getWebGLCapabilities = () => {
  if (!supportsWebGL()) {
    return { supported: false };
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return { supported: false };

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const capabilities = {
      supported: true,
      renderer: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "Unknown",
      vendor: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : "Unknown",
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      extensions: gl.getSupportedExtensions(),
    };

    canvas.remove();
    return capabilities;
  } catch (e) {
    console.warn("Error checking WebGL capabilities:", e);
    return { supported: false, error: e.message };
  }
};

/**
 * Check if device has performance limitations
 */
export const hasPerformanceLimitations = () => {
  if (typeof window === "undefined") return true;

  // Check memory (if available)
  const memory = navigator.deviceMemory;
  const hasLowMemory = memory && memory < 4; // Less than 4GB

  // Check CPU cores (if available)
  const cores = navigator.hardwareConcurrency;
  const hasLowCores = cores && cores < 4; // Less than 4 cores

  // Check if running on low-end mobile
  const isLowEndMobile = isMobileDevice() && (hasLowMemory || hasLowCores);

  // Check for slow connection
  const connection = navigator.connection;
  const hasSlowConnection =
    connection &&
    (connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g" ||
      connection.saveData);

  return isLowEndMobile || hasSlowConnection;
};

/**
 * Get optimal settings for current device
 */
export const getOptimalSettings = () => {
  if (typeof window === "undefined") {
    // Return safe defaults for SSR
    return {
      enableWebGL: false,
      enableAnimations: false,
      enableComplexEffects: false,
      pixelRatio: 1,
      shadowQuality: "low",
      particleCount: 0,
      frameRate: 30,
      enableAntialiasing: false,
      enablePostProcessing: false,
      enable3DEffects: false,
      enableParallax: false,
      enableHoverEffects: false,
      preloadAssets: false,
      lazyLoadComponents: true,
      reducedMotion: true,
    };
  }

  const mobile = isMobileDevice();
  const webglSupported = supportsWebGL();
  const lowPerformance = hasPerformanceLimitations();

  return {
    // Canvas settings
    enableWebGL: webglSupported && !lowPerformance,
    enableAnimations: !lowPerformance,
    enableComplexEffects: !mobile && !lowPerformance,

    // Quality settings
    pixelRatio: mobile
      ? Math.min(window.devicePixelRatio, 2)
      : window.devicePixelRatio,
    shadowQuality: lowPerformance ? "low" : mobile ? "medium" : "high",
    particleCount: lowPerformance ? 5 : mobile ? 10 : 20,

    // Performance settings
    frameRate: lowPerformance ? 30 : 60,
    enableAntialiasing: !mobile && !lowPerformance,
    enablePostProcessing: !mobile && !lowPerformance,

    // Interaction settings
    enable3DEffects: !mobile,
    enableParallax: !mobile && !lowPerformance,
    enableHoverEffects: !mobile,

    // Loading settings
    preloadAssets: !lowPerformance,
    lazyLoadComponents: mobile || lowPerformance,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
  };
};

/**
 * Monitor performance and adjust settings dynamically
 */
export class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.callbacks = [];
    this.isMonitoring = false;
  }

  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.monitor();
  }

  stop() {
    this.isMonitoring = false;
  }

  monitor() {
    if (!this.isMonitoring) return;

    const now = performance.now();
    this.frameCount++;

    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;

      // Notify callbacks of FPS change
      this.callbacks.forEach((callback) => callback(this.fps));
    }

    requestAnimationFrame(() => this.monitor());
  }

  onFPSChange(callback) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) this.callbacks.splice(index, 1);
    };
  }

  getFPS() {
    return this.fps;
  }

  isPerformancePoor() {
    return this.fps < 30;
  }
}

/**
 * Safe component wrapper that handles mobile compatibility
 */
export const createMobileSafeComponent = (
  Component,
  fallbackComponent = null
) => {
  return function MobileSafeComponent(props) {
    const [shouldRender, setShouldRender] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const settings = getOptimalSettings();

      // Don't render complex components on low-performance devices
      if (!settings.enableComplexEffects && props.complex) {
        setShouldRender(false);
      }
    }, [props.complex]);

    if (error && fallbackComponent) {
      return React.createElement(fallbackComponent, props);
    }

    if (!shouldRender && fallbackComponent) {
      return React.createElement(fallbackComponent, props);
    }

    if (!shouldRender) {
      return null;
    }

    try {
      return React.createElement(Component, props);
    } catch (err) {
      console.error("Mobile safe component error:", err);
      setError(err);
      return fallbackComponent
        ? React.createElement(fallbackComponent, props)
        : null;
    }
  };
};

/**
 * Hook for responsive behavior
 */
export const useMobileOptimization = () => {
  const [settings, setSettings] = React.useState(() => getOptimalSettings());
  const [performanceMonitor] = React.useState(() => new PerformanceMonitor());

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSettings = () => {
      setSettings(getOptimalSettings());
    };

    // Listen for orientation changes
    window.addEventListener("orientationchange", updateSettings);
    window.addEventListener("resize", updateSettings);

    // Monitor performance
    performanceMonitor.start();
    const unsubscribe = performanceMonitor.onFPSChange((fps) => {
      if (fps < 20) {
        // Performance is very poor, disable heavy features
        setSettings((prev) => ({
          ...prev,
          enableAnimations: false,
          enableComplexEffects: false,
          particleCount: Math.max(prev.particleCount - 5, 0),
        }));
      }
    });

    return () => {
      window.removeEventListener("orientationchange", updateSettings);
      window.removeEventListener("resize", updateSettings);
      performanceMonitor.stop();
      unsubscribe();
    };
  }, [performanceMonitor]);

  return {
    ...settings,
    performanceMonitor,
    isMobile: typeof window !== "undefined" ? isMobileDevice() : false,
    webglSupported: typeof window !== "undefined" ? supportsWebGL() : false,
    hasLimitations:
      typeof window !== "undefined" ? hasPerformanceLimitations() : true,
  };
};

import React from "react";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Optional: Report error to analytics service
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Mobile-friendly fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-tertiary/30 rounded-lg border border-tertiary/40"
        >
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              {this.props.title || "Something went wrong"}
            </h3>
            <p className="text-secondary text-sm mb-4">
              {this.props.message ||
                "This component failed to load. Please refresh the page or try again later."}
            </p>
            {this.props.showRetry && (
              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                className="bg-electric-purple hover:bg-electric-purple/80 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Only show detailed error in development */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 w-full max-w-lg">
              <summary className="text-red-400 cursor-pointer text-sm">
                View Error Details (Development Only)
              </summary>
              <div className="mt-2 p-3 bg-red-900/20 rounded border border-red-500/30 text-xs font-mono text-red-300 overflow-auto max-h-40">
                <div className="mb-2">
                  <strong>Error:</strong>{" "}
                  {this.state.error && this.state.error.toString()}
                </div>
                <div>
                  <strong>Stack:</strong>
                  <pre className="mt-1 whitespace-pre-wrap">
                    {this.state.errorInfo &&
                      this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </div>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;

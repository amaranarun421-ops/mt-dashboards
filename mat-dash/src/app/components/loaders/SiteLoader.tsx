"use client";

import { useEffect, useState } from "react";
import PremiumSpinner from "./PremiumSpinner";

/**
 * Site Starting Loader - Shows on initial page load
 * Modern premium design with smooth fade out animation
 * - Fixed positioning centered in viewport
 * - Hides all content while loading
 */
const SiteLoader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hide body content while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    }

    // Minimum display time for smooth UX
    const minDisplayTime = 800;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        setFadeOut(true);
        // Remove from DOM after fade animation
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 400);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        document.body.style.overflow = "";
      };
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <>
      {/* Hide content while loading and define animations */}
      <style jsx global>{`
        body > *:not(#site-loader) {
          visibility: hidden !important;
        }
        @keyframes site-loader-bar {
          0%, 100% {
            transform: scaleX(0.3);
            opacity: 0.3;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>

      <div
        id="site-loader"
        className={`fixed inset-0 z-99999 flex items-center justify-center bg-background transition-opacity duration-400 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vh",
        }}
        aria-live="polite"
        aria-busy="true"
        role="status"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse delay-700" />
        </div>

        {/* Loader content - centered in viewport */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Logo or Brand */}
          <div className="mb-4">
            <div className="text-4xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              mtverse
            </div>
          </div>

          {/* Premium Spinner */}
          <PremiumSpinner size="lg" variant="default" showText={false} />

          {/* Loading text with animation */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-primary animate-pulse">
              Loading your experience...
            </p>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-1 w-8 rounded-full bg-primary/30"
                  style={{
                    animation: `site-loader-bar 1.5s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteLoader;

// Made with Bob

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Components
import ParticlesBg from "./components/ParticlesBg";
import Navbar from "./components/Navbar";
import PageIndicators from "./components/PageIndicators";
import PageTransition from "./components/PageTransition";

// Sections
import HeroAbout from "./sections/HeroAbout";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import CodingProfiles from "./sections/CodingProfiles";
import Resume from "./sections/Resume";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [transitionTarget, setTransitionTarget] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track scroll intersection for active link highlighting
  useEffect(() => {
    const sections = [
      "about",
      "projects",
      "skills",
      "coding",
      "resume",
      "cta",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger active update when section occupies center 20%
      threshold: 0,
    };

    const observerCallback = (entries) => {
      // If we are currently executing a transition, ignore intersection events to prevent flicker.
      if (transitionTarget) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [transitionTarget]);

  const handleNavigate = (targetId) => {
    if (activeSection === targetId || isTransitioning) return;
    setIsTransitioning(true);
    setTransitionTarget(targetId);
  };

  return (
    <div className="fullpage-container">
      {/* Background gradients */}
      <div className="bg-gradients">
        <div className="blur-orb orb-cyan" />
        <div className="blur-orb orb-purple" />
        <div className="blur-orb orb-pink" />
      </div>

      <ParticlesBg />

      {/* Floating navigation overlay */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main stacked sections in scrollable flow */}
      <main>
        <HeroAbout />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Resume />
        <CTA onNavigate={handleNavigate} />
        <Contact />
      </main>

      {/* Side Dot pagination indicators */}
      <PageIndicators activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Premium Full-screen Page Transition overlay */}
      <AnimatePresence mode="wait" onExitComplete={() => setIsTransitioning(false)}>
        {transitionTarget && (
          <PageTransition
            targetSection={transitionTarget}
            onCovered={() => {
              const el = document.getElementById(transitionTarget);
              if (el) {
                const html = document.documentElement;
                const originalScrollBehavior = html.style.scrollBehavior;

                // Temporarily disable smooth scrolling on the html root
                html.style.scrollBehavior = "auto";

                // Scroll to target element instantly (hidden behind overlay)
                el.scrollIntoView({ behavior: "auto" });
                setActiveSection(transitionTarget);

                // Restore scroll behavior and release overlay
                setTimeout(() => {
                  html.style.scrollBehavior = originalScrollBehavior || "smooth";
                  setTransitionTarget(null);
                }, 50);
              } else {
                setTransitionTarget(null);
                setIsTransitioning(false);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}




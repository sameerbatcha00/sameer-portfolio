import { useState, useEffect, useRef } from "react";
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

  // Maintain refs for scroll listeners to prevent stale React state closures
  const activeSectionRef = useRef(activeSection);
  const isTransitioningRef = useRef(isTransitioning);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

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
      if (isTransitioningRef.current) return;

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
  }, []);

  const handleNavigate = (targetId) => {
    if (activeSectionRef.current === targetId || isTransitioningRef.current) return;
    isTransitioningRef.current = true; // Lock synchronously to block rapid successive event triggers
    setIsTransitioning(true);
    setTransitionTarget(targetId);
  };

  // Capture mouse wheel scroll and mobile touch swipe gestures to trigger page transitions
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

    let touchStartY = 0;
    let scrollTimeout = null;
    let accumulatedDelta = 0;

    const handleScrollTransition = (direction) => {
      if (isTransitioningRef.current) return;

      const currentIndex = sections.indexOf(activeSectionRef.current);
      let targetIndex = currentIndex;

      if (direction === "down" && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (direction === "up" && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }

      if (targetIndex !== currentIndex) {
        handleNavigate(sections[targetIndex]);
      }
    };

    const handleWheel = (e) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Check if we are scrolling inside an internally scrollable container
      let target = e.target;
      while (target && target !== document.body) {
        if (target.nodeType === 1) {
          const isScrollable = target.scrollHeight > target.clientHeight;
          const overflow = window.getComputedStyle(target).overflowY;
          const hasScrollStyle = overflow === "auto" || overflow === "scroll";
          
          if (isScrollable && hasScrollStyle) {
            const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 5;
            const isAtTop = target.scrollTop <= 5;
            
            if (e.deltaY > 0 && !isAtBottom) {
              // Let the internal container scroll down natively
              return;
            }
            if (e.deltaY < 0 && !isAtTop) {
              // Let the internal container scroll up natively
              return;
            }
            break;
          }
        }
        target = target.parentNode;
      }

      // Prevent native window scroll at boundary levels
      e.preventDefault();

      // Reset accumulator if user changes direction
      const currentSign = Math.sign(e.deltaY);
      const prevSign = Math.sign(accumulatedDelta);
      if (prevSign !== 0 && currentSign !== prevSign) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += e.deltaY;

      // Clear accumulator if scroll has paused for 250ms
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 250);

      // Trigger transition only when deliberate delta is reached
      const DELIBERATE_THRESHOLD = 150; 
      if (Math.abs(accumulatedDelta) >= DELIBERATE_THRESHOLD) {
        const direction = accumulatedDelta > 0 ? "down" : "up";
        accumulatedDelta = 0; // Reset immediately
        if (scrollTimeout) clearTimeout(scrollTimeout);

        const currentEl = document.getElementById(activeSectionRef.current);
        if (currentEl) {
          const rect = currentEl.getBoundingClientRect();
          if (direction === "down") {
            if (rect.bottom <= window.innerHeight + 15) {
              handleScrollTransition("down");
            }
          } else {
            if (rect.top >= -15) {
              handleScrollTransition("up");
            }
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;

      // Increased threshold to 100px displacement for mobile touch gestures
      if (Math.abs(diffY) > 100) {
        // Check if swiping inside an internally scrollable container
        let target = e.target;
        while (target && target !== document.body) {
          if (target.nodeType === 1) {
            const isScrollable = target.scrollHeight > target.clientHeight;
            const overflow = window.getComputedStyle(target).overflowY;
            const hasScrollStyle = overflow === "auto" || overflow === "scroll";
            
            if (isScrollable && hasScrollStyle) {
              const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 5;
              const isAtTop = target.scrollTop <= 5;

              if (diffY > 0 && !isAtBottom) {
                // Swiping up -> Scrolling down (inside container)
                return;
              }
              if (diffY < 0 && !isAtTop) {
                // Swiping down -> Scrolling up (inside container)
                return;
              }
              break;
            }
          }
          target = target.parentNode;
        }

        const currentEl = document.getElementById(activeSectionRef.current);
        if (currentEl) {
          const rect = currentEl.getBoundingClientRect();

          if (diffY > 0) {
            // Swiping up -> Scrolling down
            if (rect.bottom <= window.innerHeight + 15) {
              e.preventDefault();
              touchStartY = touchEndY;
              handleScrollTransition("down");
            }
          } else {
            // Swiping down -> Scrolling up
            if (rect.top >= -15) {
              e.preventDefault();
              touchStartY = touchEndY;
              handleScrollTransition("up");
            }
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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
                const originalSnap = html.style.scrollSnapType;
                const originalScrollBehavior = html.style.scrollBehavior;

                // Temporarily disable scroll snapping & smooth scrolling on the html root
                html.style.scrollSnapType = "none";
                html.style.scrollBehavior = "auto";

                // Scroll to target element instantly (hidden behind overlay)
                el.scrollIntoView({ behavior: "auto" });
                setActiveSection(transitionTarget);

                // Restore scroll behavior and release overlay
                setTimeout(() => {
                  html.style.scrollSnapType = originalSnap || "y mandatory";
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



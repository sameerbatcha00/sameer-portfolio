import { useState, useEffect } from "react";

// Components
import ParticlesBg from "./components/ParticlesBg";
import Navbar from "./components/Navbar";
import PageIndicators from "./components/PageIndicators";

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
      <Navbar activeSection={activeSection} />

      {/* Main stacked sections in scrollable flow */}
      <main>
        <HeroAbout />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Resume />
        <CTA />
        <Contact />
      </main>

      {/* Side Dot pagination indicators */}
      <PageIndicators activeSection={activeSection} />
    </div>
  );
}

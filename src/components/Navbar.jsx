import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Coding", id: "coding" },
  { label: "Resume", id: "resume" },
  { label: "CTA", id: "cta" },
  { label: "Contact", id: "contact" },
];

const overlayVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 20,
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { ease: "easeInOut", duration: 0.3 }
  }
};

const linkVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 90, damping: 14 }
  }
};

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar-header">
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNavClick("about"); }}>
          SAMEER<span>BATCHA</span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="active-dot" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-menu-header">
              <span className="nav-logo">
                SAMEER<span>BATCHA</span>
              </span>
              <button
                className="menu-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={26} />
              </button>
            </div>

            <div className="mobile-menu-container">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  variants={linkVariants}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                >
                  <span className="link-number">0{idx + 1}.</span> {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
          padding: 18px 4%;
          transition: all 0.3s ease;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .nav-logo {
          font-size: 1.4rem;
          font-weight: 800;
          text-decoration: none;
          color: var(--text-primary);
          letter-spacing: 1px;
          transition: transform 0.3s ease;
        }

        .nav-logo span {
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 12px;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .active-dot {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--accent-cyan);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-cyan);
        }

        .nav-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 6px;
          transition: transform 0.2s ease;
        }

        .nav-mobile-toggle:hover {
          transform: scale(1.1);
        }

        .theme-toggle-btn {
          display: none;
        }

        /* Mobile Overlay Styling */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background: rgba(4, 2, 16, 0.97);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          padding: 24px 6%;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 50px;
        }

        .menu-close-btn {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 6px;
          transition: transform 0.2s ease;
        }

        .menu-close-btn:hover {
          transform: scale(1.1);
        }

        .mobile-menu-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }

        .mobile-nav-link {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 2rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          width: 100%;
        }

        .link-number {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--accent-cyan);
          font-weight: 500;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: white;
          transform: translateX(10px);
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
          .nav-mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}

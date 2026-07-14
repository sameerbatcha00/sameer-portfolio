import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Coding", id: "coding" },
  { label: "Resume", id: "resume" },
  { label: "CTA", id: "cta" },
  { label: "Contact", id: "contact" },
];

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
      {isOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          border: 1px solid var(--glass-border);
          background: var(--card-bg);
          margin-left: 8px;
        }

        .theme-toggle-btn:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          transform: scale(1.08);
        }

        .mobile-controls {
          display: none;
          align-items: center;
          gap: 12px;
        }

        /* Mobile Overlay Styling */
        .mobile-menu-overlay {
          position: fixed;
          top: 72px; /* Height of header */
          left: 0;
          width: 100vw;
          height: calc(100vh - 72px);
          height: calc(100dvh - 72px);
          background: var(--mobile-overlay-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 99;
          animation: fadeInOverlay 0.3s forwards ease-out;
        }

        .mobile-menu-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          width: 100%;
        }

        .mobile-nav-link {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 1.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: slideUpLink 0.4s forwards ease-out;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--text-primary);
          transform: scale(1.1);
          text-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpLink {
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

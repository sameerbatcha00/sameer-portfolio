const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Coding Profiles", id: "coding" },
  { label: "Resume Hub", id: "resume" },
  { label: "Work Proposal", id: "cta" },
  { label: "Get In Touch", id: "contact" },
];

export default function PageIndicators({ activeSection, onNavigate }) {
  const handleIndicatorClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="indicators-container">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleIndicatorClick(item.id)}
          className={`indicator-dot-wrapper ${activeSection === item.id ? "active" : ""}`}
          aria-label={`Go to slide ${item.label}`}
        >
          <span className="tooltip">{item.label}</span>
          <span className="dot" />
        </button>
      ))}

      <style>{`
        .indicators-container {
          position: fixed;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 90;
        }

        .indicator-dot-wrapper {
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 4px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(42, 36, 33, 0.15);
          border: 1px solid rgba(42, 36, 33, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .indicator-dot-wrapper:hover .dot {
          background: var(--accent-cyan);
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(197, 168, 128, 0.4);
        }

        .indicator-dot-wrapper.active .dot {
          background: var(--accent-purple);
          transform: scale(1.5);
          box-shadow: 0 0 15px rgba(44, 41, 36, 0.2);
        }

        .tooltip {
          position: absolute;
          right: 28px;
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 5px 12px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 6px;
          opacity: 0;
          pointer-events: none;
          transform: translateX(10px);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(120, 110, 95, 0.08);
        }

        .indicator-dot-wrapper:hover .tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .indicators-container {
            right: 15px;
            bottom: 20px;
            top: auto;
            transform: none;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            pointer-events: none;
          }
          
          .indicator-dot-wrapper {
            pointer-events: auto;
          }

          .tooltip {
            display: none; /* Hide tooltips on mobile devices */
          }
          
          .dot {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  );
}

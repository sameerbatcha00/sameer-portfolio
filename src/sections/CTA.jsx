import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CTA({ onNavigate }) {
  const handleContactClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-slide" id="cta">
      <motion.div
        className="glass-panel cta-panel"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
      >
        <div className="cta-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="cta-glow-backdrop"
          />

          <h2 className="cta-heading">
            Let's Build Responsive, High-Performance Web Solutions
          </h2>
          
          <p className="cta-description">
            I am currently open to web development opportunities, frontend engineering internships, or project collaborations. If you are looking for a developer who can construct accessible layouts, translate Figma prototypes, and implement clean backend logic, let's connect!
          </p>

          <div className="cta-action-row">
            <button
              onClick={handleContactClick}
              className="btn-glow cta-main-btn"
              aria-label="Hire Me and scroll to Contact"
            >
              Hire Me <FiArrowRight size={18} />
            </button>
            
            <button
              onClick={handleContactClick}
              className="btn-outline cta-secondary-btn"
              aria-label="Contact Me and scroll to Contact"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .cta-panel {
          max-width: 800px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-container {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-glow-backdrop {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, rgba(141, 123, 104, 0.1) 50%, transparent 70%);
          z-index: -1;
          filter: blur(40px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .cta-heading {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          background: linear-gradient(to right, var(--text-primary), var(--accent-blue), var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.6;
        }

        .cta-action-row {
          display: flex;
          gap: 20px;
          margin-top: 12px;
        }

        @media (max-width: 576px) {
          .cta-action-row {
            flex-direction: column;
            width: 100%;
          }
          
          .cta-main-btn, .cta-secondary-btn {
            width: 100%;
          }
          
          .cta-heading {
            font-size: 1.8rem;
          }
        }

        /* Motion blur button override */
        .cta-main-btn {
          font-size: 1.1rem;
          padding: 16px 36px;
          box-shadow: 0 4px 20px rgba(155, 81, 224, 0.5);
          filter: backdrop-filter(blur(0px));
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .cta-main-btn:hover {
          filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.6)) blur(0.2px); /* Subtle blur simulates motion speed */
          box-shadow: 0 0 35px rgba(155, 81, 224, 0.8);
          transform: translateY(-3px) scale(1.05);
        }
      `}</style>
    </section>
  );
}

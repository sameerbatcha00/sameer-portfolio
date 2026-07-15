import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const displayNames = {
  about: "ABOUT ME",
  projects: "PROJECTS",
  skills: "MY SKILLS",
  coding: "CODING PROFILES",
  resume: "RESUME HUB",
  cta: "COLLABORATE",
  contact: "GET IN TOUCH",
};

export default function PageTransition({ targetSection, onCovered }) {
  const [showText, setShowText] = useState(false);
  const title = displayNames[targetSection] || "NAVIGATING";

  useEffect(() => {
    // Show text slightly after the liquid transition starts covering the screen
    const timer = setTimeout(() => {
      setShowText(true);
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  const pathVariants = {
    initial: {
      d: "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z",
    },
    animate: {
      d: [
        "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z",
        "M 0 100 Q 50 0 100 100 L 100 0 L 0 0 Z",
        "M 0 100 Q 50 100 100 100 L 100 0 L 0 0 Z",
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.45, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: [
        "M 0 100 Q 50 100 100 100 L 100 0 L 0 0 Z",
        "M 0 0 Q 50 100 100 0 L 100 0 L 0 0 Z",
        "M 0 0 Q 50 0 100 0 L 100 0 L 0 0 Z",
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.55, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        ease: "easeIn",
        duration: 0.25,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="page-transition-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <svg className="transition-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="transition-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-purple)" />
            <stop offset="50%" stopColor="var(--accent-pink)" />
            <stop offset="100%" stopColor="var(--accent-cyan)" />
          </linearGradient>
        </defs>
        <motion.path
          variants={pathVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          fill="url(#transition-gradient)"
          onAnimationComplete={(definition) => {
            // Trigger scroll/state change when curtain is fully covering (at the end of "animate")
            if (definition === "animate") {
              onCovered();
            }
          }}
        />
      </svg>

      {showText && (
        <motion.div
          className="transition-content"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="transition-loader">
            <span className="loader-dot" />
            <span className="loader-dot" />
            <span className="loader-dot" />
          </div>
          <h2 className="transition-title">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{ display: "inline-block", marginRight: char === " " ? "12px" : "1px" }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      )}

      <style>{`
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 9999;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .transition-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .transition-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #FAF6EE;
          font-family: var(--font-sans);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .transition-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: 4px;
          margin: 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .transition-loader {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
        }

        .loader-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FAF6EE;
          opacity: 0.6;
          animation: loaderPulse 1.2s infinite ease-in-out;
        }

        .loader-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loader-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loaderPulse {
          0%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .transition-title {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </motion.div>
  );
}

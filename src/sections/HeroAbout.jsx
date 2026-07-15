import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 35,
      damping: 15,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const photoVariants = {
  hidden: { scale: 0.75, rotate: -10, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14, delay: 0.6 },
  },
};

export default function HeroAbout() {
  const achievements = [
    { number: "8.06 CGPA", text: "B.E. Computer Science" },
    { number: "Py-Expo", text: "Project Showcased" },
    { number: "Trichy", text: "Home Location" },
  ];

  return (
    <section className="section-slide" id="about">
      <motion.div
        className="glass-panel hero-panel"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
      >
        <div className="hero-grid">
          {/* Profile Photo Area (Comes first/left) */}
          <motion.div
            variants={photoVariants}
            className="hero-photo-container"
          >
            <div className="photo-wrapper">
              <img src="/profile.jpg" alt="Sameer Batcha R" className="profile-img" />
              <div className="photo-glow-border" />
            </div>
          </motion.div>

          {/* Text Content & Information */}
          <div className="hero-text-content">
            <motion.div variants={itemVariants} className="hero-greeting">
              <span>Welcome to my Portfolio</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-name">
              Sameer Batcha R
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-title">
              Full Stack Web Developer & UI/UX Designer
            </motion.div>

            <motion.p variants={itemVariants} className="section-subtitle hero-desc">
              I am a driven and enthusiastic Computer Science Engineering student at KGISL Institute of Technology. Experienced in crafting responsive frontend interfaces with HTML/CSS/JS and building dynamic backend logic with Python and Java, focused on user-centric design.
            </motion.p>

            {/* Achievements Cards */}
            <motion.div variants={itemVariants} className="achievements-row">
              {achievements.map((ach, idx) => (
                <div key={idx} className="achievement-card">
                  <div className="ach-num">{ach.number}</div>
                  <div className="ach-txt">{ach.text}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero-panel {
          max-width: 1100px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 40px;
          align-items: center;
        }

        .hero-text-content {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .hero-greeting {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .hero-name {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--text-primary) 40%, var(--accent-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-title {
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 20px;
          border-left: 3px solid var(--accent-purple);
          padding-left: 12px;
        }

        .hero-desc {
          margin-bottom: 30px;
          max-width: 580px;
        }

        .achievements-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .achievement-card {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(212, 196, 172, 0.25);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .achievement-card:hover {
          background: rgba(255, 255, 255, 0.6);
          border-color: var(--accent-cyan);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(120, 110, 95, 0.05);
        }

        .ach-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-cyan);
          text-shadow: 0 0 10px rgba(197, 168, 128, 0.15);
        }

        .ach-txt {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 4px;
          font-weight: 500;
        }

        .hero-photo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .photo-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 30px;
          overflow: hidden;
          border: 2.5px solid rgba(212, 196, 172, 0.3);
          box-shadow: 0 15px 35px rgba(120, 110, 95, 0.12), 0 0 25px rgba(197, 168, 128, 0.1);
          transition: transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
        }

        .photo-wrapper:hover {
          transform: scale(1.03) rotate(1deg);
          border-color: var(--accent-cyan);
          box-shadow: 0 20px 40px rgba(120, 110, 95, 0.18), 0 0 30px rgba(197, 168, 128, 0.25);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .photo-wrapper:hover .profile-img {
          transform: scale(1.08);
        }

        .photo-glow-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          box-shadow: inset 0 0 25px rgba(197, 168, 128, 0.15);
          pointer-events: none;
          background: linear-gradient(135deg, rgba(197, 168, 128, 0.1) 0%, transparent 100%);
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .hero-text-content {
            align-items: center;
            text-align: center;
          }
          
          .hero-name {
            font-size: 2.8rem;
          }
          
          .hero-title {
            border-left: none;
            padding-left: 0;
            border-bottom: 2px solid var(--accent-purple);
            padding-bottom: 8px;
          }
          
          .photo-wrapper {
            width: 250px;
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .achievements-row {
            grid-template-columns: 1fr;
            gap: 12px;
            width: 100%;
          }
          
          .hero-name {
            font-size: 2.1rem;
          }
          
          .photo-wrapper {
            width: 200px;
            height: 200px;
          }
          
          .achievement-card {
            padding: 12px;
          }
        }
      `}</style>
    </section>
  );
}

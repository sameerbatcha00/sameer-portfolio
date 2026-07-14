import { motion } from "framer-motion";
import { SiHtml5, SiCss, SiJavascript, SiBootstrap, SiFigma, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FiLayout, FiEye, FiSettings } from "react-icons/fi";

const skillCategories = [
  {
    title: "Frontend & UI Frameworks",
    skills: [
      { name: "HTML5 / Semantic Layouts", level: 95, icon: <SiHtml5 size={20} color="#e34f26" /> },
      { name: "CSS3 / Custom Styling", level: 90, icon: <SiCss size={20} color="#1572b6" /> },
      { name: "JavaScript / ES6+", level: 88, icon: <SiJavascript size={20} color="#f7df1e" /> },
      { name: "Bootstrap Framework", level: 82, icon: <SiBootstrap size={20} color="#7952b3" /> },
    ],
  },
  {
    title: "Design & UX Prototyping",
    skills: [
      { name: "UI/UX Designing", level: 85, icon: <FiLayout size={20} color="#00f2fe" /> },
      { name: "Figma Prototyping", level: 80, icon: <SiFigma size={20} color="#f24e1e" /> },
      { name: "Responsive Usability & Access", level: 84, icon: <FiEye size={20} color="#ff007f" /> },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python Programming", level: 80, icon: <SiPython size={20} color="#3776ab" /> },
      { name: "Java Core", level: 75, icon: <FaJava size={20} color="#007396" /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Skills() {
  return (
    <section className="section-slide" id="skills">
      <motion.div
        className="glass-panel skills-panel"
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">Technical Expertise</h2>
        
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              className="skills-category-group"
              variants={itemVariants}
            >
              <h3 className="category-title">{cat.title}</h3>
              
              <div className="category-list">
                {cat.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item-container">
                    <div className="skill-meta">
                      <div className="skill-label">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="skill-track">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        variants={{
                          hidden: { width: 0 },
                          visible: {
                            width: `${skill.level}%`,
                            transition: {
                              duration: 1.2,
                              ease: "easeOut",
                              delay: idx * 0.12,
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .skills-panel {
          max-width: 1050px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          text-align: left;
        }

        @media (max-width: 992px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .skills-category-group {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .skills-category-group:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .category-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skill-item-container {
          display: flex;
          flex-direction: column;
        }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .skill-label {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .skill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .skill-percentage {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        .skill-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
          box-shadow: 0 0 8px var(--accent-blue);
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}

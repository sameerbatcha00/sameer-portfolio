import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projectsData = [
  {
    id: 1,
    title: "Language Translator System",
    category: "Python",
    desc: "Developed a technical backend program showcased at the Py-Expo exhibition, executing system scripting, algorithms, and custom interface elements.",
    tags: ["Python", "Backend Logic", "Py-Expo"],
    github: "https://github.com/sameerbatcha00",
    demo: "https://github.com/sameerbatcha00",
    color: "var(--accent-cyan)",
  },
  {
    id: 2,
    title: "Symposium Event Management System",
    category: "Frontend,Backend",
    desc: "Designed and built multiple web page interfaces utilizing semantic HTML5, modern CSS layouts, and interactive JavaScript, optimized for speed and access.",
    tags: ["HTML5", "CSS3", "JavaScript", "Mobile-First"],
    github: "https://github.com/sameerbatcha00/SEMS.git",
    demo: "https://github.com/sameerbatcha00",
    color: "var(--accent-pink)",
  },
  {
    id: 3,
    title: "Figma UI/UX Prototypes",
    category: "UI/UX",
    desc: "Created visual guidelines, low-fidelity wireframes, and high-fidelity prototype flows in Figma, applying grid systems and accessibility standards.",
    tags: ["Figma", "UI/UX Design", "Wireframes", "Typography"],
    github: "https://github.com/sameerbatcha00",
    demo: "https://github.com/sameerbatcha00",
    color: "var(--accent-purple)",
  },
  {
    id: 4,
    title: "AI BOT",
    category: "python",
    desc: "I like AI and Machine Learning , so i developed a AI BOT using Python",
    tags: ["python", "AI", "Machine Learning", "html"],
    github: "https://github.com/sameerbatcha00/AI_Bot.git",
    demo: "https://github.com/sameerbatcha00",
    color: "var(--accent-blue)",
  },
  {
    id: 5,
    title: "calculator",
    category: "frontend",
    desc: "i like to make simple and useful projects for people , so i made a simple calculator for people",
    tags: ["javascript", "html", "css"],
    github: "https://github.com/sameerbatcha00/calculator.git",
    demo: "https://github.com/sameerbatcha00",
    color: "var(--accent-blue)",
  },
];

const categories = ["All", "Frontend", "Backend", "UI/UX", "Python"];

// 3D Tilt Card Component
function TiltCard({ project }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current.getBoundingClientRect();

    // Calculate normalized pointer coordinates (-0.5 to 0.5)
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;

    // Scale coordinates to rotation angles (e.g. max 15 degrees)
    setCoords({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card project-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
        borderTop: isHovered ? `1px solid ${project.color}` : "1px solid var(--card-border)",
        boxShadow: isHovered ? `0 10px 30px rgba(120, 110, 95, 0.12), 0 0 20px ${project.color}1e` : "none"
      }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        <div className="proj-cat" style={{ color: project.color }}>
          {project.category}
        </div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.desc}</p>

        <div className="proj-tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="proj-actions">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-btn" aria-label="GitHub Repository">
            <FiGithub size={18} /> Repo
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-btn" aria-label="Live Demo">
            <FiExternalLink size={18} /> Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "All") return true;
    const projectCats = p.category.toLowerCase().split(",").map((c) => c.trim());
    return projectCats.includes(activeFilter.toLowerCase());
  });

  return (
    <section className="section-slide" id="projects">
      <motion.div
        className="glass-panel projects-panel"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
      >
        <h2 className="section-title">Featured Work</h2>

        {/* Category Filters */}
        <div className="filters-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .projects-panel {
          max-width: 1100px;
        }

        .filters-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid var(--glass-border);
          padding: 8px 18px;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover, .filter-btn.active {
          color: var(--text-primary);
          background: rgba(197, 168, 128, 0.2);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(197, 168, 128, 0.15);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          text-align: left;
          max-height: 45vh;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: var(--accent-cyan) transparent;
        }

        .projects-grid::-webkit-scrollbar {
          width: 5px;
        }

        .projects-grid::-webkit-scrollbar-track {
          background: transparent;
        }

        .projects-grid::-webkit-scrollbar-thumb {
          background: var(--accent-cyan);
          border-radius: 4px;
        }

        .project-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--card-bg);
          cursor: grab;
        }

        .project-card:active {
          cursor: grabbing;
        }

        .proj-cat {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .proj-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .proj-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .proj-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 3px 10px;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .proj-actions {
          display: flex;
          gap: 16px;
        }

        .proj-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--btn-outline-border);
          color: var(--text-primary);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .proj-btn:hover {
          background: rgba(197, 168, 128, 0.1);
          border-color: var(--accent-cyan);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            max-height: 45vh;
          }
        }
      `}</style>
    </section>
  );
}

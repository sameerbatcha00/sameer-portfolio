import { motion } from "framer-motion";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FiCode, FiExternalLink } from "react-icons/fi";

const profiles = [
  {
    name: "GitHub",
    icon: <SiGithub size={40} color="#2A2421" />,
    url: "https://github.com/sameerbatcha00",
    tagline: "Personal web apps & open source",
    stats: [
      { label: "Repositories", value: "12+" },
      { label: "Showcase Projects", value: "3" },
      { label: "Total Commits (YTD)", value: "240+" },
    ],
    color: "var(--accent-blue)",
  },
  {
    name: "LeetCode",
    icon: <SiLeetcode size={40} color="#ffa116" />,
    url: "https://leetcode.com/u/sameerbatcha123/",
    tagline: "Algorithms & problem solving",
    stats: [
      { label: "Problems Solved", value: "50" },
      { label: "Rank Percentile", value: "Top 100%" },
      { label: "Coding Languages", value: "Python, Java" },
    ],
    color: "#ffa116",
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export default function CodingProfiles() {
  return (
    <section className="section-slide" id="coding">
      <motion.div
        className="glass-panel coding-panel"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 35, damping: 15 }}
      >
        <h2 className="section-title">Coding Profiles</h2>
        
        <motion.div
          className="profiles-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {profiles.map((profile, idx) => (
            <motion.a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              variants={cardVariants}
              className="glass-card profile-card"
              style={{
                borderColor: `rgba(255, 255, 255, 0.05)`,
              }}
              whileHover={{
                y: -8,
                borderColor: profile.color,
                boxShadow: `0 8px 30px rgba(120, 110, 95, 0.08), 0 0 15px ${profile.color}11`,
              }}
            >
              <div className="profile-header">
                <div className="profile-brand">
                  <span className="profile-icon">{profile.icon}</span>
                  <div>
                    <h3 className="profile-name">{profile.name}</h3>
                    <p className="profile-tagline">{profile.tagline}</p>
                  </div>
                </div>
                <FiExternalLink className="link-arrow" size={18} />
              </div>

              <div className="profile-stats">
                {profile.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="stat-row">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value" style={{ color: profile.color }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .coding-panel {
          max-width: 1050px;
        }

        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          text-align: left;
          max-width: 760px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .profiles-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .profile-card {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--card-bg);
          height: 100%;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .profile-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-icon {
          background: var(--card-bg);
          padding: 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--card-border);
        }

        .profile-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .profile-tagline {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .link-arrow {
          color: var(--text-muted);
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .profile-card:hover .link-arrow {
          color: var(--text-primary);
          transform: translate(2px, -2px);
        }

        .profile-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid var(--card-border);
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .stat-label {
          color: var(--text-secondary);
        }

        .stat-value {
          font-family: var(--font-mono);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}

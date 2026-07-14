import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

const articlesData = [
  {
    id: 1,
    title: "Crafting High-Performance Responsive Grid Layouts in CSS",
    date: "July 08, 2026",
    readTime: "6 min read",
    snippet: "Deep dive into CSS grid layouts, flex alignment, and custom variables to achieve seamless responsive interfaces without heavy dependencies.",
    category: "CSS",
    url: "#",
  },
  {
    id: 2,
    title: "Strengthening Backend Operations with Python and Java APIs",
    date: "June 24, 2026",
    readTime: "5 min read",
    snippet: "Analyzing procedural operations, object-oriented principles, and data management pipelines to build clean REST API servers.",
    category: "Backend",
    url: "#",
  },
  {
    id: 3,
    title: "Designing for Accessibility: Practical UI/UX Principles",
    date: "May 12, 2026",
    readTime: "8 min read",
    snippet: "Exploring typography hierarchy, contrast configurations, interactive hover responses, and screen reader labels to optimize visual accessibility.",
    category: "UI/UX",
    url: "#",
  },
];

export default function Articles({ isActive }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 700); // Shimmer duration
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="section-slide" id="articles">
      <motion.div
        className="glass-panel articles-panel"
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">Featured Articles</h2>

        {loading ? (
          /* Shimmer Skeleton Loader */
          <div className="articles-list skeleton-wrapper">
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="shimmer-sweep" />
                <div className="skeleton-bar title-bar" />
                <div className="skeleton-bar meta-bar" />
                <div className="skeleton-bar text-bar-1" />
                <div className="skeleton-bar text-bar-2" />
              </div>
            ))}
          </div>
        ) : (
          /* Real Article List */
          <motion.div
            className="articles-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articlesData.map((article) => (
              <motion.a
                href={article.url}
                key={article.id}
                variants={itemVariants}
                className="glass-card article-card"
                whileHover={{
                  x: 10,
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.04)"
                }}
              >
                <div className="article-meta">
                  <span className="article-cat">{article.category}</span>
                  <span className="article-dot">•</span>
                  <span>{article.date}</span>
                  <span className="article-dot">•</span>
                  <span>{article.readTime}</span>
                </div>

                <div className="article-title-row">
                  <h3 className="article-title">{article.title}</h3>
                  <FiArrowRight className="title-arrow" size={20} />
                </div>

                <p className="article-snippet">{article.snippet}</p>

                <div className="article-link-label">
                  <FiBookOpen size={16} /> Read Article
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>

      <style>{`
        .articles-panel {
          max-width: 950px;
        }

        .articles-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }

        .article-card {
          text-decoration: none;
          color: inherit;
          background: rgba(10, 5, 30, 0.35);
          display: block;
          transition: all 0.3s ease;
          border-color: rgba(255, 255, 255, 0.03);
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          font-family: var(--font-sans);
          font-weight: 500;
        }

        .article-cat {
          color: var(--accent-cyan);
          text-transform: uppercase;
          font-family: var(--font-mono);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .article-dot {
          color: var(--text-muted);
        }

        .article-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .article-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          line-height: 1.3;
        }

        .title-arrow {
          color: var(--text-muted);
          transform: translateX(-5px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .article-card:hover .title-arrow {
          color: var(--accent-cyan);
          transform: translateX(0);
          opacity: 1;
        }

        .article-snippet {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .article-link-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        /* Skeleton Loader Styles */
        .skeleton-wrapper {
          position: relative;
        }

        .skeleton-card {
          height: 160px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        .skeleton-bar {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .title-bar {
          width: 60%;
          height: 22px;
        }

        .meta-bar {
          width: 30%;
          height: 14px;
        }

        .text-bar-1 {
          width: 90%;
          height: 16px;
        }

        .text-bar-2 {
          width: 75%;
          height: 16px;
          margin-bottom: 0;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

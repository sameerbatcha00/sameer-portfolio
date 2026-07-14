import { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiCheck, FiAward, FiBook } from "react-icons/fi";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    if (downloading || downloaded) return;

    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);

      // Trigger native browser download of the copied resume.pdf file
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Sameer_Batcha_R_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset feedback status after 3 seconds
      setTimeout(() => {
        setDownloaded(false);
      }, 3000);
    }, 1200);
  };

  const careerSteps = [
    {
      year: "2023 - 2027",
      title: "Bachelor of Engineering in Computer Science",
      company: "KGISL Institute of Technology | Coimbatore, TN",
      desc: "Pursuing B.E. CSE with a current CGPA of 8.06. Dedicated to continuous learning and building user-centric web applications.",
    },
    {
      year: "2023",
      title: "Higher Secondary Education (Class of 2023)",
      company: "Government Model Boys Hr. Sec. School | Thuvarankurichy",
      desc: "Completed schooling with a score of 80%.",
    },
    {
      year: "Independent",
      title: "Frontend Developer & Personal Projects",
      company: "Web Development Portfolio",
      desc: "Designed and developed multiple responsive interfaces using HTML, CSS, and JavaScript. Applied UI/UX design standards to ensure visual clarity.",
    },
    {
      year: "Py-Expo",
      title: "Independent Programming Projects",
      company: "Technical Project Showcase",
      desc: "Developed a technical backend and scripting program showcased at Py-Expo. Built backend operations with Python and Java.",
    },
  ];

  return (
    <section className="section-slide" id="resume">
      <motion.div
        className="glass-panel resume-panel"
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">Resume Hub</h2>

        <div className="resume-grid">
          {/* Left Column: Timeline */}
          <div className="timeline-col">
            <h3 className="sub-header"><FiBook size={18} /> Education & Projects</h3>
            <div className="timeline-track">
              {careerSteps.map((step, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-bullet" />
                  <div className="node-year">{step.year}</div>
                  <h4 className="node-title">{step.title}</h4>
                  <div className="node-company">{step.company}</div>
                  <p className="node-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Download Card */}
          <div className="download-col">
            <h3 className="sub-header"><FiAward size={18} /> Credentials</h3>
            
            <motion.div
              className="glass-card mock-resume-card"
              whileHover={{ y: -6 }}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(155,81,224,0.05) 100%)",
                borderColor: "rgba(155, 81, 224, 0.15)"
              }}
            >
              <div className="resume-preview-header">
                <div className="preview-avatar">SB</div>
                <div>
                  <h4 className="preview-name">Sameer Batcha R</h4>
                  <p className="preview-tag">Full Stack Developer</p>
                </div>
              </div>
              
              <div className="resume-bullets">
                <div className="bullet-row">
                  <span className="bullet-dot" /> HTML / CSS / JS / Bootstrap
                </div>
                <div className="bullet-row">
                  <span className="bullet-dot" /> UI / UX Design & Figma
                </div>
                <div className="bullet-row">
                  <span className="bullet-dot" /> Python & Java Programming
                </div>
                <div className="bullet-row">
                  <span className="bullet-dot" /> Mobile Responsive Layouts
                </div>
              </div>

              {/* Download Button */}
              <a
                href="#"
                onClick={handleDownload}
                className={`btn-glow resume-dl-btn ${downloaded ? "success" : ""}`}
              >
                {downloading ? (
                  <>
                    <span className="spinner" /> Generating PDF...
                  </>
                ) : downloaded ? (
                  <>
                    <FiCheck size={18} /> Completed!
                  </>
                ) : (
                  <>
                    <FiDownload size={18} /> Download CV
                  </>
                )}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .resume-panel {
          max-width: 1000px;
        }

        .resume-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .resume-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .sub-header {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Timeline Styles */
        .timeline-track {
          border-left: 2px solid var(--card-border);
          padding-left: 20px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .timeline-node {
          position: relative;
        }

        .timeline-bullet {
          position: absolute;
          left: -27px;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 2px solid var(--accent-purple);
          box-shadow: 0 0 8px var(--accent-purple);
        }

        .node-year {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .node-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .node-company {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .node-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Download Card Styles */
        .mock-resume-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .resume-preview-header {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 16px;
        }

        .preview-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .preview-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .preview-tag {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .resume-bullets {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bullet-row {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-cyan);
        }

        .resume-dl-btn {
          width: 100%;
        }

        .resume-dl-btn.success {
          background: #00c853;
          box-shadow: 0 4px 15px rgba(0, 200, 83, 0.4);
        }

        /* Spinner */
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

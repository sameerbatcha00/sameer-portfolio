import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaGithub, FaYoutube, FaTwitter } from "react-icons/fa";
import { FiSend, FiCheck, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const socialLinks = [
  { icon: <FaGithub size={20} />, url: "https://github.com/sameerbatcha00", color: "#24292e", name: "GitHub" },
  { icon: <FaLinkedinIn size={20} />, url: "https://linkedin.com/in/sameer-batcha", color: "#0077b5", name: "LinkedIn" },
  { icon: <FaInstagram size={20} />, url: "https://instagram.com", color: "#e1306c", name: "Instagram" },
  { icon: <FaTwitter size={20} />, url: "https://twitter.com", color: "#1da1f2", name: "Twitter" },
  { icon: <FaYoutube size={20} />, url: "https://youtube.com", color: "#ff0000", name: "YouTube" },
];

export default function Contact() {
  // Form State
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success'

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email format is invalid";
    }
    if (!form.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sameerbatcha852@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="section-slide" id="contact">
      <motion.div
        className="glass-panel contact-panel"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 35, damping: 15 }}
      >
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-grid">
          {/* Info & Social Column */}
          <div className="contact-info-col">
            <h3 className="contact-subtitle">Connection Hub</h3>
            <p className="contact-desc">
              Have a web application to build, a design mock-up to implement, or looking to collaborate on a software project? Send a message and let's get started.
            </p>

            <div className="contact-details">
              <div className="detail-item">
                <FiMail className="detail-icon" />
                <span>sameerbatcha852@gmail.com</span>
              </div>
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <span>+91 90257 61675</span>
              </div>
              <div className="detail-item">
                <FiMapPin className="detail-icon" />
                <span>Trichy, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="socials-container">
              <h4 className="socials-header">Follow Me</h4>
              <div className="social-icons-row">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="social-icon-btn"
                    aria-label={`Link to ${social.name}`}
                    whileHover={{
                      y: -6,
                      scale: 1.15,
                      backgroundColor: social.color,
                      borderColor: social.color,
                      boxShadow: `0 0 15px ${social.color}`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                /* Success State Animation */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="success-box"
                >
                  <div className="success-icon-wrapper">
                    <FiCheck size={40} color="#C5A880" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. I've received your submission and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-outline reset-btn"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="contact-form"
                  noValidate
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="John Doe"
                    />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell me about your project details..."
                    />
                    {errors.message && <div className="error-text">{errors.message}</div>}
                  </div>

                  {status === "error" && (
                    <div className="error-alert">
                      Failed to send message. Please try again or email sameerbatcha852@gmail.com directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-glow submit-btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="spinner" /> Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} /> Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        .error-alert {
          background: rgba(255, 0, 127, 0.08);
          border: 1px solid var(--accent-pink);
          color: #ff4d94;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          text-align: center;
        }

        .contact-panel {
          max-width: 1050px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .contact-subtitle {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .contact-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .detail-icon {
          color: var(--accent-cyan);
          font-size: 1.1rem;
        }

        /* Social Icons Styles */
        .socials-container {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 24px;
        }

        .socials-header {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .social-icons-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-icon-btn:hover {
          color: var(--text-primary);
        }

        /* Success Box Styles */
        .success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          height: 100%;
          border: 1px dashed rgba(197, 168, 128, 0.4);
          border-radius: 16px;
          background: rgba(253, 251, 247, 0.6);
        }

        .success-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(197, 168, 128, 0.1);
          border: 1px solid rgba(197, 168, 128, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 20px rgba(197, 168, 128, 0.15);
        }

        .success-box h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .success-box p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
          max-width: 320px;
        }

        .reset-btn {
          font-size: 0.9rem;
          padding: 8px 20px;
        }

        .submit-btn {
          width: 100%;
          margin-top: 10px;
        }

        /* Spinner inside form button */
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

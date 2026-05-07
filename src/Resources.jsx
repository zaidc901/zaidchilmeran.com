import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiYoutube } from "react-icons/fi";

const resources = [
  {
    title: "Guide for First-Year Medical Students",
    desc: "A comprehensive guide covering the essentials for navigating your first year of medical school.",
  },
  {
    title: "FA Football Coach Guide",
    desc: "A guide to football coaching certifications and progression pathways.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6 },
  },
};

function SmallLabel({ children }) {
  return <div className="small-label">{children}</div>;
}

function DecorativeCluster({ position = "right" }) {
  return (
    <div className={`decor-cluster ${position}`}>
      <span className="decor-dot"></span>
      <span className="decor-line"></span>
      <span className="decor-ring"></span>
      <span className="decor-plus">+</span>
    </div>
  );
}

export default function Resources() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          padding: 0;
          font-family: Inter, sans-serif;
          background: #f6faff;
          color: #08172b;
          overflow-x: hidden;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -3;
          background:
            radial-gradient(circle at 12% 8%, rgba(37,99,235,0.13), transparent 28%),
            radial-gradient(circle at 88% 14%, rgba(14,165,233,0.10), transparent 28%),
            radial-gradient(circle at 72% 90%, rgba(250,204,21,0.09), transparent 30%),
            #f6faff;
        }

        body::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          background-image:
            linear-gradient(rgba(37,99,235,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.032) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(circle at center, black 18%, transparent 78%);
        }

        a { text-decoration: none; color: inherit; }

        section {
          position: relative;
          padding: 42px 5vw;
          border-bottom: 1px solid rgba(8,23,43,0.07);
          overflow: hidden;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 62px;
          z-index: 100;
          padding: 0 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(8,23,43,0.08);
        }

        .brand {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links a {
          font-size: 13px;
          font-weight: 700;
        }

        .projects-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          line-height: 1;
        }

        .projects-arrow {
          font-size: 10px;
        }

        .nav-dropdown {
          position: relative;
          padding-bottom: 22px;
          margin-bottom: -22px;
        }

        .nav-dropdown > a {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 700;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: -12px;
          min-width: 190px;
          padding: 10px;
          border-radius: 14px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(8,23,43,0.08);
          box-shadow: 0 14px 34px rgba(37,99,235,0.12);
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(4px);
          transition: 0.18s ease;
          pointer-events: none;
        }

        .dropdown-menu a {
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
        }

        .dropdown-menu a:hover {
          background: rgba(37,99,235,0.08);
          color: #2563eb;
        }

        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .nav-icons {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nav-icons a {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
        }

        .small-label {
          font-size: 12px;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .resources-page {
          padding-top: 118px;
          min-height: 100vh;
        }

        .resources-title h1 {
          font-size: clamp(64px, 8vw, 120px);
          line-height: 0.9;
          letter-spacing: -0.08em;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .resources-title p {
          font-size: 20px;
          color: #5b6f88;
          line-height: 1.5;
          max-width: 620px;
        }

        .resources-list {
  display: grid;
  grid-template-columns: repeat(2, 340px);
  gap: 28px;
  margin-top: 42px;
}

        .resource-tile {
  display: flex;
  flex-direction: column;

  border-radius: 28px;
  overflow: hidden;

  background: rgba(255,255,255,0.84);
  border: 1px solid rgba(8,23,43,0.08);

  box-shadow: 0 10px 32px rgba(37,99,235,0.06);

  transition: 0.28s ease;
}

.resource-tile:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(37,99,235,0.12);
}

        .resource-image {
  aspect-ratio: 3 / 4;
  width: 100%;
  max-height: 420px;
  overflow: hidden;
}

.resource-content {
  padding: 24px;
}

        .coming-soon {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 800;

  color: #2563eb;

  background:
    linear-gradient(
      to bottom,
      rgba(37,99,235,0.10) 0%,
      rgba(59,130,246,0.08) 55%,
      rgba(255,255,255,0.95) 100%
    );
}

        .resource-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .resource-content p {
  color: #5b6f88;
  font-size: 15px;
  line-height: 1.6;
}

        .resource-content h2 {
          font-size: clamp(22px, 2.1vw, 32px);
          font-weight: 800;
          line-height: 1.12;
          margin-bottom: 14px;
        }

        .resource-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .resource-tag {
          color: #2563eb;
          background: rgba(37,99,235,0.08);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
        }

        .resource-btn {
          position: absolute;
          right: 22px;
          bottom: 22px;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.12);
          color: #2563eb;
          font-size: 13px;
          font-weight: 800;
        }

        @media (max-width: 1000px) {
          .nav-links {
            display: none;
          }

          .resource-tile {
            grid-template-columns: 1fr;
          }

          .resources-list {
  grid-template-columns: 1fr;
}

          .resource-content p {
            padding-right: 0;
          }

          .resource-btn {
            position: static;
            width: fit-content;
            margin-top: 16px;
          }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="brand">Zaid Chilmeran</a>

        <div className="nav-right">
          <div className="nav-links">
            <a href="/#/?section=home">Home</a>
            <a href="/#/?section=about">About</a>
            <a href="/#/?section=certificates">Certificates</a>

            <div className="nav-dropdown">
              <a href="/#/?section=projects" className="projects-link">
                Projects
                <span className="projects-arrow">▾</span>
              </a>

              <div className="dropdown-menu">
                <a href="/#/research">Research</a>
                <a href="/#/resources">Resource Library</a>
              </div>
            </div>

            <a href="/#/?section=contact">Contact</a>
          </div>

          <div className="nav-icons">
            <a href="mailto:zaid@zaidchilmeran.com"><FiMail size={16} /></a>
            <a href="https://www.linkedin.com/in/zaid-c-2443a7369/" target="_blank" rel="noreferrer"><FiLinkedin size={16} /></a>
            <a href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer"><FiYoutube size={16} /></a>
          </div>
        </div>
      </nav>

      <main className="resources-page">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          <div className="resources-title">
            <SmallLabel>04 — Resource Library</SmallLabel>

            <h1>Resources</h1>

            <p>
              A growing collection of guides, notes, and educational resources.
            </p>
          </div>

          <div className="resources-list">
            {resources.map((resource, index) => (
              <a
                href={resource.link}
                className="resource-tile"
                key={index}
              >
                <div className="resource-image">
                  <div className="coming-soon">
  Coming soon!
</div>
                </div>

                <div className="resource-content">
                  <h2>{resource.title}</h2>
                  <p>{resource.desc}</p>

                </div>
              </a>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiYoutube } from "react-icons/fi";

const researchPapers = [
  {
    image: "/Concussion.png",
    title: "Concussion injuries in sports and instrumented mouthguards",
    desc: "Explores sports-related concussions and the role of instrumented mouthguards in impact monitoring and athlete safety.",
    date: "2025",
    category: "Concussions",
    link: "https://pubmed.ncbi.nlm.nih.gov/40236943/",
  },
  {
    image: "/Septic Arthritis.png",
    title: "The impact of comorbidities on the prognosis of patients with septic arthritis",
    desc: "Examines how comorbidities influence outcomes, prognosis, and clinical risk in septic arthritis patients.",
    date: "2025",
    category: "Septic Arthritis",
    link: "https://pubmed.ncbi.nlm.nih.gov/40606458/",
  },
  {
    image: "/Sarcoidosis.png",
    title: "A review of sarcoidosis etiology, diagnosis and treatment",
    desc: "Reviews the causes, diagnosis, and treatment approaches for sarcoidosis.",
    date: "2025",
    category: "Sarcoidosis",
    link: "https://pubmed.ncbi.nlm.nih.gov/40078389/",
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

export default function Research() {
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

        .nav-links a.active {
          color: #2563eb;
        }

        .nav-icons {
          display: flex;
          align-items: center;
          gap: 14px;
        }

       .projects-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  line-height: 1;
}

.projects-arrow {
  font-size: 10px;
  transform: translateY(0px);
}

.nav-dropdown {
  display: flex;
  align-items: center;
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
  white-space: nowrap;
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

        .nav-icons a {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          transition: 0.2s ease;
        }

        .nav-icons a:hover {
          background: rgba(37,99,235,0.08);
        }

        .small-label {
          font-size: 12px;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 16px;
          text-align: left;
          position: relative;
          z-index: 3;
        }

        .decor-cluster {
          position: absolute;
          width: 130px;
          height: 110px;
          pointer-events: none;
          z-index: 0;
          opacity: 0.75;
        }

        .decor-cluster.right {
          top: 115px;
          right: 6vw;
        }

        .decor-cluster.left {
          top: 125px;
          left: 7vw;
        }

        .decor-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(250,204,21,0.58);
          top: 12px;
          left: 18px;
        }

        .decor-line {
          position: absolute;
          width: 64px;
          height: 5px;
          border-radius: 999px;
          background: rgba(250,204,21,0.78);
          top: 44px;
          left: 44px;
          transform: rotate(-18deg);
        }

        .decor-ring {
          position: absolute;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid rgba(37,99,235,0.25);
          right: 4px;
          bottom: 12px;
        }

        .decor-plus {
          position: absolute;
          font-size: 30px;
          font-weight: 500;
          color: rgba(37,99,235,0.32);
          left: 2px;
          bottom: 10px;
        }

        .soft-panel {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 42px;
          background: linear-gradient(135deg, rgba(255,255,255,0.65), rgba(219,234,254,0.45));
          border: 1px solid rgba(37,99,235,0.08);
          transform: rotate(10deg);
          z-index: 0;
          pointer-events: none;
        }

        .research-page {
          padding-top: 118px;
          min-height: 100vh;
        }

        .research-hero {
          position: relative;
          padding-bottom: 48px;
        }

        .research-hero .soft-panel {
          right: -70px;
          top: 90px;
          width: 230px;
          height: 230px;
        }

        .research-title {
          position: relative;
          z-index: 2;
          max-width: 780px;
        }

        .research-title h1 {
          font-size: clamp(64px, 8vw, 120px);
          line-height: 0.9;
          letter-spacing: -0.08em;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .research-title p {
          font-size: 20px;
          color: #5b6f88;
          line-height: 1.5;
          letter-spacing: -0.04em;
          max-width: 620px;
        }

        .research-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
          position: relative;
          z-index: 2;
        }

        .research-tile {
        position: relative;
          display: grid;
          grid-template-columns: 34% 1fr auto;
          gap: 28px;
          align-items: center;
          padding: 18px;
          border-radius: 24px;
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(8,23,43,0.08);
          box-shadow: 0 10px 32px rgba(37,99,235,0.06);
          transition: 0.28s ease;
        }

        .research-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(37,99,235,0.11);
          border-color: rgba(37,99,235,0.18);
        }

        .research-image {
          height: 190px;
          border-radius: 18px;
          overflow: hidden;
          background: #dbeafe;
        }

        .research-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .research-content h2 {
          font-size: clamp(22px, 2.1vw, 32px);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1.12;
          margin-bottom: 12px;
        }

        .research-content p {
        padding-right: 140px;
          color: #5b6f88;
          font-size: 15px;
          line-height: 1.5;
          letter-spacing: -0.025em;
          max-width: 640px;
          margin-bottom: 16px;
        }

        .research-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .research-date {
          color: #5b6f88;
          font-size: 13px;
          font-weight: 700;
        }

        .research-tag {
          color: #2563eb;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.10);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
        }

        .research-btn {
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

  transition: 0.2s ease;
}

.research-btn:hover {
  background: rgba(37,99,235,0.14);
  transform: translateY(-2px);
}

        .coming-soon {
          text-align: center;
          color: #5b6f88;
          font-size: 15px;
          font-weight: 700;
          margin-top: 30px;
        }

        @media (max-width: 1000px) {
          .nav-links {
            display: none;
          }

          .research-tile {
            grid-template-columns: 1fr;
          }

          .research-image {
            height: 220px;
          }

          .research-btn {
            width: fit-content;
          }
        }
      `}</style>

      <nav className="nav">
  <a href="/" className="brand">Zaid Chilmeran</a>

  <div className="nav-right">
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/#about">About</a>
      <a href="/#certificates">Certificates</a>
      <div className="nav-dropdown">
  <a href="/#projects" className="projects-link">
  Projects
  <span className="projects-arrow">▾</span>
</a>

  <div className="dropdown-menu">
    <a href="/#/research">Research</a>
    <a href="/#/resources">Resource Library</a>
  </div>
</div>
      <a href="/#contact">Contact</a>
    </div>

    <div className="nav-icons">
      <a href="mailto:zaid@zaidchilmeran.com"><FiMail size={16} /></a>
      <a href="https://www.linkedin.com/in/zaid-c-2443a7369/" target="_blank" rel="noreferrer"><FiLinkedin size={16} /></a>
      <a href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer"><FiYoutube size={16} /></a>
    </div>
  </div>
</nav>

      <main className="research-page">
        <motion.section
          className="research-hero"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="soft-panel"></div>
          <DecorativeCluster />

          <div className="research-title">
            <SmallLabel>03 — Research</SmallLabel>

            <h1>Research</h1>

            <p>
              A collection of my research work, publications, and contributions across medicine.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="research-list"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {researchPapers.map((paper, i) => (
            <a
              href={paper.link}
              target="_blank"
              rel="noreferrer"
              className="research-tile"
              key={i}
            >
              <div className="research-image">
                <img src={paper.image} alt={paper.title} />
              </div>

              <div className="research-content">
                <h2>{paper.title}</h2>
                <p>{paper.desc}</p>

                <div className="research-meta">
                  <span className="research-date">{paper.date}</span>
                  <span className="research-tag">{paper.category}</span>
                </div>
              </div>

              <span className="research-btn">View in PubMed →</span>
            </a>
          ))}

          <div className="coming-soon">More research coming soon.</div>
        </motion.section>
      </main>
    </>
  );
}
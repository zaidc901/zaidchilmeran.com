import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiYoutube } from "react-icons/fi";

const certificates = [
  {
    image: "/Google.png",
    title: "Google AI Essentials",
    sub: "Google · May 2026",
  },

  {
    image: "/FA.png",
    title: "EE Playmaker",
    sub: "The Football Association · Sep 2024",
  },

  {
    image: "/FA.png",
    title: "Introduction to Coaching Football",
    sub: "The Football Association · Oct 2024",
  },

  {
    image: "/FA.png",
    title: "Introduction to Talent Identification",
    sub: "The Football Association · Oct 2024",
  },

  {
    image: "/FA.png",
    title: "Introduction to First Aid in Football",
    sub: "The Football Association · Sep 2024",
  },

  {
    image: "/FA.png",
    title: "Additional FA Certifications",
    sub: "Safeguarding, Equality & Diversity, Disability Football & more",
  },
];

const research = [
  {
    image: "/Concussion.png",
    title: "Concussion injuries in sports and instrumented mouthguards",
    desc: "Explores sports-related concussions and the role of instrumented mouthguards in impact monitoring.",
    link: "https://pubmed.ncbi.nlm.nih.gov/40236943/",
  },
  {
    image: "/Septic Arthritis.png",
    title: "The impact of comorbidities on the prognosis of patients with septic arthritis",
    desc: "Examines how comorbidities influence outcomes and prognosis in septic arthritis patients.",
    link: "https://pubmed.ncbi.nlm.nih.gov/40606458/",
  },
  {
    image: "/Sarcoidosis.png",
    title: "A review of sarcoidosis etiology, diagnosis and treatment",
    desc: "Reviews the etiology, diagnosis, and treatment approaches for sarcoidosis.",
    link: "https://pubmed.ncbi.nlm.nih.gov/40078389/",
  },
];

const pdfs = [
  {
    image: "/MedGuideCover.jpg",
    title: "Guide for First-Year Medical Students",
    desc: "A comprehensive guide covering the essentials for navigating your first year of medical school.",
  },
  {
    image: "/FootballGuideCover.jpg",
    title: "FA Football Coach Guide",
    desc: "A guide to football coaching certifications and progression pathways.",
  },
  {
    image: "/PlaceholderCover.jpg",
    title: "Placeholder Title",
    desc: "Description of the resource will go here once it is ready to share.",
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

function YTIcon({ size = 28 }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="7" fill="#FF0000" />
      <polygon points="16,8 28,14 16,20" fill="white" />
    </svg>
  );
}

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

export default function App() {

  const location = useLocation();

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const section = params.get("section");

  if (section) {
    setTimeout(() => {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
}, [location]);

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

        .brand { font-size: 17px; font-weight: 800; letter-spacing: -0.05em; }

        .nav-right { display: flex; align-items: center; gap: 28px; }

        .nav-links { display: flex; align-items: center; gap: 28px; }

        .nav-links a { font-size: 13px; font-weight: 700; }

        .nav-icons { display: flex; align-items: center; gap: 14px; }

        .nav-icons a {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          transition: 0.2s ease;
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

        .nav-icons a:hover { background: rgba(37,99,235,0.08); }

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
          top: 94px;
          right: 7vw;
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

        .hero {
          min-height: 88vh;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 5.5vw;
          padding-top: 90px;
        }

        .hero .soft-panel {
          right: 6vw;
          top: 150px;
        }

        .hero .decor-cluster {
          right: 34vw;
          top: 155px;
        }

        .kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border-radius: 999px;
          background: white;
          border: 1px solid rgba(37,99,235,0.18);
          color: #2563eb;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 34px;
          position: relative;
          z-index: 2;
        }

        .kicker::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg,#2563eb,#0ea5e9);
        }

        .hero-name {
          text-align: left;
          font-size: clamp(68px, 9vw, 130px);
          line-height: 0.9;
          letter-spacing: -0.08em;
          font-weight: 800;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .hero-sub {
          font-size: 22px;
          color: #5b6f88;
          margin-bottom: 34px;
          letter-spacing: -0.04em;
          position: relative;
          z-index: 2;
          text-align: left;
        }

        .hero-actions { display: flex; gap: 16px; position: relative; z-index: 2; }

        .btn {
          height: 56px;
          padding: 0 28px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 15px;
          transition: 0.2s ease;
        }

        .btn:hover { transform: translateY(-2px); }

        .btn-primary {
          background: linear-gradient(135deg,#2563eb,#0ea5e9);
          color: white;
        }

        .btn-secondary {
          background: white;
          border: 1px solid rgba(8,23,43,0.12);
        }

        .hero-photo-wrap {
          width: clamp(230px, 26vw, 345px);
          aspect-ratio: 1;
          border-radius: 34px;
          overflow: hidden;
          background: #dbeafe;
          border: 1px solid rgba(37,99,235,0.12);
          box-shadow: 0 20px 60px rgba(37,99,235,0.15);
          transform: translateX(-36px);
          position: relative;
          z-index: 2;
        }

        .hero-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about {
          text-align: center;
        }

        .about .soft-panel {
          left: 50%;
          top: 158px;
          transform: translateX(-50%) rotate(8deg);
          width: 420px;
          height: 180px;
          border-radius: 50px;
        }

        .about h2,
        .section-title h2,
        .contact-inner h2 {
          font-size: clamp(48px,5vw,72px);
          font-weight: 800;
          letter-spacing: -0.065em;
          line-height: 1;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }

        .about-sub,
        .section-title p {
          color: #5b6f88;
          margin-bottom: 38px;
          font-size: 17px;
          position: relative;
          z-index: 2;
        }

        .about-card {
          max-width: 920px;
          margin: 0 auto;
          padding: 38px 54px;
          border-radius: 28px;
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(8,23,43,0.08);
          box-shadow: 0 16px 48px rgba(37,99,235,0.08);
          font-size: 20px;
          line-height: 1.7;
          color: #405774;
          position: relative;
          z-index: 2;
        }

        .section-title {
          margin-bottom: 34px;
          position: relative;
          z-index: 2;
        }

        .certificates .decor-cluster {
          right: 6vw;
          top: 115px;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 20px;
          position: relative;
          z-index: 2;
        }

#about,
#certificates,
#projects,
#contact {
  scroll-margin-top: 65px;
}

        .cert-card,
        .mini-card,
        .youtube-box {
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(8,23,43,0.08);
          box-shadow: 0 10px 32px rgba(37,99,235,0.05);
        }

        .cert-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px;
  border-radius: 18px;
  min-height: 120px;
  text-align: left;
}

        .cert-image {
  width: 52px;
  height: 52px;
  object-fit: contain;
  flex-shrink: 0;
}

        .cert-card h3,
        .mini-card h4,
        .video-info h4 {
          display: block;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 6px;
          letter-spacing: -0.04em;
          text-align: left;
        }

        .cert-card span,
        .mini-card p,
        .video-info p {
          color: #5b6f88;
          font-size: 13px;
          line-height: 1.4;
          text-align: left;
        }

        .projects .decor-cluster {
          right: 6vw;
          top: 115px;
        }

        .projects .soft-panel {
          left: -70px;
          bottom: 80px;
          width: 210px;
          height: 210px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 34px;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        .projects-grid > div {
          display: flex;
          flex-direction: column;
        }

        .project-column-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .project-column-head h3 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.05em;
          text-align: left;
        }

        .project-youtube-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .view-link {
          color: #2563eb;
          font-size: 13px;
          font-weight: 800;
        }

        .mini-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .mini-card {
          display: grid;
          grid-template-columns: 42% 1fr;
          min-height: 128px;
          border-radius: 18px;
          overflow: hidden;
          flex: 1;
          text-align: left;
          padding: 0;
        }

        .cover-wrap {
          position: relative;
          min-height: 128px;
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          overflow: hidden;
        }

        .cover-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cover-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.88));
        }

        .cover-placeholder {
          width: 100%;
          height: 100%;
          min-height: 128px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          font-weight: 800;
          font-size: 13px;
          text-align: center;
          padding: 16px;
        }

        .mini-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .youtube-box {
          padding: 18px;
          border-radius: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .youtube-channel {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          font-weight: 800;
          font-size: 18px;
        }

        

        .play {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          padding-left: 4px;
        }

        .youtube-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.video-card {
  overflow: hidden;
  border-radius: 18px;
  background: white;
  border: 1px solid rgba(8,23,43,0.08);
  transition: 0.25s ease;
}

.video-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(37,99,235,0.10);
}

.video-thumb {
  aspect-ratio: 16/9;
  background: linear-gradient(135deg,#eef7ff,#dbeeff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-info {
  padding: 14px;
}

.video-info h4 {
  font-size: 13px;
  margin-bottom: 6px;
}

.video-info p {
  font-size: 11px;
  line-height: 1.35;
}

.view-all-center {
  margin-top: 18px;
  text-align: center;
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  align-self: center;
  transition: 0.2s ease;
  text-decoration: none;
}

.view-all-center:hover {
  transform: translateY(-2px);
  opacity: 0.85;
}

        .contact .decor-cluster {
          right: 5vw;
          top: 40px;
          opacity: 0.45;
          transform: scale(0.9);
        }

        .contact .soft-panel {
          right: -140px;
          bottom: -40px;
          opacity: 0.45;
          transform: rotate(12deg);
        }

        .contact-inner {
          max-width: 900px;
          margin: 0 auto;
          margin-top: 34px;
          padding: 46px;
          border-radius: 28px;
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(8,23,43,0.08);
          box-shadow: 0 16px 48px rgba(37,99,235,0.08);
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .contact-inner p {
          color: #5b6f88;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .contact-icons {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
        }

        .ic {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          border-radius: 16px;
          background: white;
          border: 1px solid rgba(37,99,235,0.12);
          text-align: left;
        }

        .ic strong {
          display: block;
          color: #08172b;
          font-size: 14px;
        }

        .ic span {
          display: block;
          color: #64748b;
          font-size: 12px;
          margin-top: 2px;
        }
        
.section-animate {
  opacity: 0;
  transform: translateY(34px);
  animation: sectionFadeUp 0.85s ease forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 28%;
}

@keyframes sectionFadeUp {
  from {
    opacity: 0;
    transform: translateY(34px);
    filter: blur(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

        @media (max-width: 1000px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-name {
            text-align: center;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-photo-wrap {
            transform: none;
            justify-self: center;
          }

          .projects-grid,
          .cert-grid,
          .contact-icons {
            grid-template-columns: 1fr;
          }

          .mini-card {
            grid-template-columns: 38% 1fr;
          }

          .nav-links {
            display: none;
          }
        }
      `}</style>

      <nav className="nav">
        <a href="#home" className="brand">Zaid Chilmeran</a>

        <div className="nav-right">
          <div className="nav-links">
            <a href="/#/?home">Home</a>
            <a href="/#/?about">About</a>
            <a href="/#/?certificates">Certificates</a>
            <div className="nav-dropdown">
  <a href="/#/?projects" className="projects-link">
  Projects
  <span className="projects-arrow">▾</span>
</a>

  <div className="dropdown-menu">
    <a href="/#/research">Research</a>
    <a href="/#/resources">Resource Library</a>
  </div>
</div>
            <a href="/#/?contact">Contact</a>
          </div>

          <div className="nav-icons">
            <a href="mailto:zaid@zaidchilmeran.com"><FiMail size={16} /></a>
            <a href="https://www.linkedin.com/in/zaid-c-2443a7369/" target="_blank" rel="noreferrer"><FiLinkedin size={16} /></a>
            <a href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer"><FiYoutube size={16} /></a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="soft-panel"></div>
        <DecorativeCluster />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{ textAlign: "left" }}
        >
          <div className="kicker">Personal Portfolio</div>

          <h1 className="hero-name">
            Zaid
            <br />
            Chilmeran
          </h1>

          <p className="hero-sub">Medical student, researcher, and creator.</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#about">Explore Portfolio</a>
            <a className="btn btn-secondary" href="#contact">Contact</a>
          </div>
        </motion.div>

        <motion.div className="hero-photo-wrap" variants={fadeUp} initial="hidden" whileInView="visible">
          <img src="/Profile.jpeg" alt="Zaid Chilmeran" />
        </motion.div>
      </section>

      <motion.section
        id="about" className="section-offset"
        className="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="soft-panel"></div>
        <DecorativeCluster position="left" />
        <DecorativeCluster position="right" />

        <SmallLabel>01 — About</SmallLabel>

        <h2>Who I Am</h2>

        <p className="about-sub">A calm snapshot of my academic and creative direction.</p>

        <p className="about-card">
          I am a medical student aspiring to do as many interesting things as possible, ranging from research and medical education to passion projects like YouTube videos. I enjoy learning deeply, creating useful resources, and helping others navigate their own academic and professional journeys.
        </p>
      </motion.section>

      <motion.section
        id="certificates" className="section-offset"
        className="certificates"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <DecorativeCluster />

        <div className="section-title">
          <SmallLabel>02 — Certificates</SmallLabel>
          <h2>Certificates</h2>
          <p>A collection of my achievements and completed certifications.</p>
        </div>

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <div className="cert-card" key={i}>
              <img
                src={cert.image}
                alt={cert.title}
                className="cert-image"
              />
              <div>
                <h3>{cert.title}</h3>
                <span>{cert.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects" className="section-offset"
        className="projects"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="soft-panel"></div>
        <DecorativeCluster />

        <div className="section-title">
          <SmallLabel>03 — Projects</SmallLabel>
          <h2>Projects</h2>
          <p>Research, content creation, and resources I've built.</p>
        </div>

        <div className="projects-grid">
          <div>
            <div className="project-column-head">
              <h3>Research Publications</h3>
              <a className="view-link" href="/#/research">
                View all →
              </a>
            </div>

            <div className="mini-stack">
              {research.map((item, i) => (
                <a
                  className="mini-card"
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="cover-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="cover-placeholder" style={{ display: "none" }}>
                      Research Image
                    </div>
                  </div>

                  <div className="mini-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="project-column-head">
              <h3 className="project-youtube-title">
                <YTIcon size={28} />
                YouTube
              </h3>

              <a className="view-link" href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer">
                Visit channel →
              </a>
            </div>

            <div className="youtube-box">

  <a
    className="youtube-channel"
    href="https://www.youtube.com/@ZaidTVYoutube"
    target="_blank"
    rel="noreferrer"
  >
    <img
      src="/YTProfile.jpg"
      alt="ZaidTVYoutube"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />

    @ZaidTVYoutube
  </a>

  <div className="youtube-grid">

    {[1,2,3].map((video) => (
      <a
        key={video}
        className="video-card"
        href="https://www.youtube.com/@ZaidTVYoutube"
        target="_blank"
        rel="noreferrer"
      >

        <div className="video-thumb">
          <div className="play">▶</div>
        </div>

        <div className="video-info">
          <h4>Coming soon!</h4>
          <p>Coming soon!</p>
        </div>

      </a>
    ))}

  </div>

  <a
    className="view-all-center"
    href="https://www.youtube.com/@ZaidTVYoutube"
    target="_blank"
    rel="noreferrer"
  >
    View all videos →
  </a>

</div>
          </div>

          <div>
            <div className="project-column-head">
              <h3>Resource Library</h3>
              <a className="view-link" href="/#/resources">
                View all →
              </a>
            </div>

            <div className="mini-stack">
              {pdfs.map((pdf, i) => (
                <div className="mini-card" key={i}>
                  <div className="cover-wrap">
                    <img
                      src={pdf.image}
                      alt={pdf.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="cover-placeholder" style={{ display: "none" }}>
                      Coming soon!
                    </div>
                  </div>

                  <div className="mini-content">
                    <h4>{pdf.title}</h4>
                    <p>{pdf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact" className="section-offset"
        className="contact"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="soft-panel"></div>
        <DecorativeCluster position="left" />

        <SmallLabel>04 — Contact</SmallLabel>
        
        <div className="contact-inner">

          <h2>Let's connect.</h2>

          <p>
            Open to collaborations, questions, and conversations.
            <br />
            Reach out through any of the platforms below.
          </p>

          <div className="contact-icons">
            <a href="mailto:zaid@zaidchilmeran.com" className="ic">
              <FiMail size={20} />
              <div>
                <strong>Email</strong>
                <span>zaid@zaidchilmeran.com</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/zaid-c-2443a7369/" target="_blank" rel="noreferrer" className="ic">
              <FiLinkedin size={20} />
              <div>
                <strong>LinkedIn</strong>
                <span>Zaid Chilmeran</span>
              </div>
            </a>

            <a href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer" className="ic">
              <FiYoutube size={20} />
              <div>
                <strong>YouTube</strong>
                <span>@ZaidTVYoutube</span>
              </div>
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
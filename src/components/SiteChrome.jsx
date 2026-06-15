import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiLinkedin, FiMail, FiMenu, FiX } from "react-icons/fi";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const homeLinks = [
    ["Home", "home"],
    ["About", "about"],
    ["Certificates", "certificates"],
    ["Research", "research"],
    ["Projects", "projects"],
    ["Contact", "contact"],
  ];

  return (
    <header className="site-header">
      <Link className="brand" to="/?section=home" aria-label="Zaid Chilmeran home" onClick={closeMenu}>
        <span className="brand-mark">ZC</span>
        <span>Zaid Chilmeran</span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        <div className="nav-links">
          {homeLinks.map(([label, section]) => (
            <Link key={section} to={`/?section=${section}`} onClick={closeMenu}>{label}</Link>
          ))}
          <Link to="/resources" onClick={closeMenu}>Resources</Link>
        </div>

        <div className="nav-socials">
          <a href="mailto:zaidchilmeran@outlook.com" aria-label="Email Zaid"><FiMail /></a>
          <a href="https://www.linkedin.com/in/zaidchilmeran/" target="_blank" rel="noreferrer" aria-label="Zaid on LinkedIn"><FiLinkedin /></a>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-kicker">Personal site and archive</span>
        <p>Zaid Chilmeran</p>
      </div>
      <div className="footer-links">
        <a href="mailto:zaidchilmeran@outlook.com">Email <FiArrowUpRight /></a>
        <a href="https://www.linkedin.com/in/zaidchilmeran/" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a>
      </div>
      <span className="footer-copy">Copyright 2026</span>
    </footer>
  );
}

export function SiteLayout({ children }) {
  return (
    <div className="site-shell">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

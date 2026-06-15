import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiArrowDown, FiArrowUpRight, FiFileText, FiLinkedin, FiMail } from "react-icons/fi";
import { Reveal, SectionLabel, SiteLayout } from "./components/SiteChrome.jsx";
import { certificates, researchPapers, resources } from "./data.js";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section") || "home";
    const frame = requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.search]);

  return (
    <SiteLayout>
      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <Reveal>
              <SectionLabel>Medical student / Researcher / Creator</SectionLabel>
              <h1>Building at the intersection of <span>medicine and ideas.</span></h1>
              <p className="hero-intro">
                I am Zaid Chilmeran, a medical student exploring research, education,
                technology and creative projects with practical value.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/?section=projects">
                  Explore my work <FiArrowDown />
                </Link>
                <a className="button button-quiet" href="mailto:zaidchilmeran@outlook.com">
                  Start a conversation <FiArrowUpRight />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="portrait-card" delay={0.08}>
            <div className="portrait-frame">
              <img src="/Profile.jpeg" alt="Portrait of Zaid Chilmeran" />
            </div>
            <div className="portrait-caption">
              <span>Currently</span>
              <strong>Learning, researching and making useful things.</strong>
            </div>
          </Reveal>

          <div className="hero-proof" aria-label="Portfolio highlights">
            <div><strong>3</strong><span>Published papers</span></div>
            <div><strong>8+</strong><span>Certifications</span></div>
            <div><strong>4</strong><span>Areas of interest</span></div>
          </div>
        </section>

        <section id="about" className="section-shell about-section">
          <Reveal className="section-heading split-heading">
            <div>
              <SectionLabel>01 / About</SectionLabel>
              <h2>Curiosity with direction.</h2>
            </div>
            <p>
              My work moves between clinical learning, academic research, football,
              digital products and communication. The common thread is simple:
              understand a problem clearly, then make something useful.
            </p>
          </Reveal>

          <div className="interest-grid">
            {[
              ["Medicine", "Developing clinical knowledge and a thoughtful approach to patient-centred care."],
              ["Research", "Contributing to accessible, evidence-led work across medical topics."],
              ["Education", "Turning complex information into clear resources people can actually use."],
              ["Digital projects", "Exploring product thinking, analytics and interface design through practical tools."],
            ].map(([title, copy], index) => (
              <Reveal className="interest-card" key={title} delay={index * 0.04}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certificates" className="section-shell certificates-section">
          <Reveal className="section-heading">
            <SectionLabel>02 / Learning</SectionLabel>
            <h2>Certificates and continued development.</h2>
            <p>A selection of courses and qualifications across technology, marketing and football.</p>
          </Reveal>

          <div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <Reveal className="certificate-card" key={certificate.title} delay={(index % 4) * 0.03}>
                <img src={certificate.image} alt="" aria-hidden="true" />
                <div>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.issuer}</p>
                </div>
                <span>{certificate.date}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="research" className="section-shell research-home-section">
          <Reveal className="section-heading split-heading">
            <div>
              <SectionLabel>03 / Research</SectionLabel>
              <h2>Published work grounded in evidence.</h2>
            </div>
            <p>Medical publications exploring clinical outcomes, sports-related concussion and complex disease.</p>
          </Reveal>

          <div className="featured-grid research-featured-grid">
            {researchPapers.map((paper) => (
              <Reveal className="featured-card" key={paper.title}>
                <div className="featured-image"><img src={paper.image} alt="" /></div>
                <div className="featured-content">
                  <div className="card-meta"><span>{paper.category}</span><span>{paper.year}</span></div>
                  <h3>{paper.title}</h3>
                  <p>{paper.description}</p>
                  <div className="card-links">
                    <a href={paper.pubmed} target="_blank" rel="noreferrer">PubMed <FiArrowUpRight /></a>
                    <a href={paper.pdf} download>PDF <FiFileText /></a>
                  </div>
                </div>
              </Reveal>
            ))}

          </div>

          <Reveal className="section-end-link">
            <Link to="/research">View all research <FiArrowUpRight /></Link>
          </Reveal>
        </section>

        <section id="projects" className="section-shell work-section">
          <Reveal className="section-heading split-heading">
            <div>
              <SectionLabel>04 / Projects and resources</SectionLabel>
              <h2>Digital tools made for real use.</h2>
            </div>
            <p>Practical products and developing resources across football, education and digital venture modelling.</p>
          </Reveal>

          <div className="project-showcase-grid">
            <Reveal className="featured-card featured-card-wide featured-card-dark">
              <div className="featured-image"><img src={resources[0].image} alt="ZaidTacticsBoard tactical studio" /></div>
              <div className="featured-content">
                <div className="card-meta"><span>{resources[0].category}</span><span>Live</span></div>
                <h3>{resources[0].title}</h3>
                <p>{resources[0].description}</p>
                <a className="text-link" href={resources[0].externalLink} target="_blank" rel="noreferrer">Visit zaidtacticsboard.com <FiArrowUpRight /></a>
              </div>
            </Reveal>

            <Reveal className="featured-card featured-card-dark">
              <div className="featured-image"><img src={resources[3].image} alt="Digital venture calculator interface" /></div>
              <div className="featured-content">
                <div className="card-meta"><span>Interactive tool</span><span>Live</span></div>
                <h3>{resources[3].title}</h3>
                <p>{resources[3].description}</p>
                <Link className="text-link" to={resources[3].link}>Open simulator <FiArrowUpRight /></Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="work-directory">
            <div><span>Explore the resource library</span><p>Browse live projects and developing educational resources.</p></div>
            <div className="directory-links">
              <Link to="/resources">Resources <FiArrowUpRight /></Link>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section-shell contact-section">
          <Reveal className="contact-card">
            <SectionLabel>05 / Contact</SectionLabel>
            <h2>Have an idea worth exploring?</h2>
            <p>I am open to thoughtful collaborations, research conversations and interesting projects.</p>
            <div className="contact-actions">
              <a className="button button-light" href="mailto:zaidchilmeran@outlook.com"><FiMail /> zaidchilmeran@outlook.com</a>
              <a className="button button-outline-light" href="https://www.linkedin.com/in/zaidchilmeran/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            </div>
          </Reveal>
        </section>
      </main>
    </SiteLayout>
  );
}

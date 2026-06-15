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
              <SectionLabel>Personal portfolio / 2026</SectionLabel>
              <h1>Hi, I&apos;m Zaid.<br /><span>Welcome to my corner of the internet.</span></h1>
              <p className="hero-intro">
                I&apos;m a medical student with interests in research, football, education
                and technology. This is where I keep the things I&apos;ve worked on and the
                subjects I&apos;m learning more about.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/?section=projects">
                  Browse the site <FiArrowDown />
                </Link>
                <a className="button button-quiet" href="mailto:zaidchilmeran@outlook.com">
                  Email me <FiArrowUpRight />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="portrait-card" delay={0.08}>
            <div className="portrait-frame">
              <img src="/Profile.jpeg" alt="Portrait of Zaid Chilmeran" />
            </div>
            <div className="portrait-caption">
              <span>About this site</span>
              <strong>A personal archive of research, projects and interests.</strong>
            </div>
          </Reveal>

          <div className="hero-proof" aria-label="Main interests">
            <div><span>Medicine</span></div>
            <div><span>Research</span></div>
            <div><span>Football</span></div>
            <div><span>Digital projects</span></div>
          </div>
        </section>

        <section id="about" className="section-shell about-section">
          <Reveal className="section-heading split-heading">
            <div>
              <SectionLabel>01 / About</SectionLabel>
              <h2>A few things I spend time on.</h2>
            </div>
            <p>
              Medicine is the main path. Alongside it, I enjoy research, football,
              writing and building small digital projects. They do not always overlap,
              but each one has shaped how I think and work.
            </p>
          </Reveal>

          <div className="interest-grid">
            {[
              ["Medicine", "Studying medicine and building the clinical foundation for the work I hope to do in the future."],
              ["Research", "Working on medical papers and learning how good questions become useful evidence."],
              ["Football", "Following the game, learning about coaching and exploring the tactical side of football."],
              ["Digital projects", "Making small tools and websites when an idea feels worth trying."],
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
            <h2>Courses and qualifications.</h2>
            <p>Some of the courses I have completed outside my medical degree.</p>
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
              <h2>Research I&apos;ve worked on.</h2>
            </div>
            <p>Published papers across sports medicine, infectious disease and rheumatology.</p>
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
              <h2>Things I&apos;ve built and collected.</h2>
            </div>
            <p>A mix of live projects and resources I&apos;m still putting together.</p>
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
            <div><span>Resource library</span><p>Live projects, guides and a few works in progress.</p></div>
            <div className="directory-links">
              <Link to="/resources">Resources <FiArrowUpRight /></Link>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section-shell contact-section">
          <Reveal className="contact-card">
            <SectionLabel>05 / Contact</SectionLabel>
            <h2>Say hello.</h2>
            <p>If you would like to ask about something on the site, the easiest way to reach me is by email.</p>
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

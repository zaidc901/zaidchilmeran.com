import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiClock, FiGrid } from "react-icons/fi";
import { Reveal, SectionLabel, SiteLayout } from "./components/SiteChrome.jsx";
import { resources } from "./data.js";

const icons = [FiBookOpen, FiGrid, FiArrowUpRight];

export default function Resources() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <SiteLayout>
      <main className="inner-page">
        <section className="section-shell page-hero">
          <Reveal>
            <SectionLabel>Resource library</SectionLabel>
            <h1>Useful things, clearly made.</h1>
            <p>A growing collection of educational guides and interactive tools.</p>
          </Reveal>
        </section>

        <section className="section-shell archive-section">
          <div className="resource-grid">
            {resources.map((resource, index) => {
              const Icon = icons[index];
              const content = (
                <>
                  <div className={`resource-visual ${resource.image ? "has-image" : ""}`}>
                    {resource.image ? <img src={resource.image} alt="" /> : <Icon />}
                  </div>
                  <div className="resource-body">
                    <div className="card-meta"><span>{resource.category}</span><span>{resource.status}</span></div>
                    <h2>{resource.title}</h2>
                    <p>{resource.description}</p>
                    <span className="resource-cta">
                      {resource.link ? <>Open project <FiArrowUpRight /></> : <><FiClock /> Coming soon</>}
                    </span>
                  </div>
                </>
              );

              return (
                <Reveal className="resource-reveal" key={resource.title} delay={index * 0.05}>
                  {resource.externalLink ? (
                    <a className="resource-card" href={resource.externalLink} target="_blank" rel="noreferrer">{content}</a>
                  ) : resource.link ? (
                    <Link className="resource-card" to={resource.link}>{content}</Link>
                  ) : (
                    <article className="resource-card is-upcoming">{content}</article>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

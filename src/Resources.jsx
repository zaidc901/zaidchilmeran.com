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
            <h1>Projects and resources.</h1>
            <p>Things I have built, alongside guides and notes that are still in progress.</p>
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
                      {resource.externalLink ? <>Visit website <FiArrowUpRight /></> : resource.link ? <>Open project <FiArrowUpRight /></> : <><FiClock /> In progress</>}
                    </span>
                  </div>
                </>
              );

              return (
                <Reveal className={`resource-reveal ${resource.externalLink ? "resource-reveal-featured" : ""}`} key={resource.title} delay={index * 0.05}>
                  {resource.externalLink ? (
                    <a className="resource-card resource-card-featured" href={resource.externalLink} target="_blank" rel="noreferrer">{content}</a>
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

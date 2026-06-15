import { useEffect } from "react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { Reveal, SectionLabel, SiteLayout } from "./components/SiteChrome.jsx";
import { researchPapers } from "./data.js";

export default function Research() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <SiteLayout>
      <main className="inner-page">
        <section className="section-shell page-hero">
          <Reveal>
            <SectionLabel>Research archive</SectionLabel>
            <h1>Research.</h1>
            <p>Papers I have worked on across sports medicine, infectious disease and rheumatology.</p>
          </Reveal>
        </section>

        <section className="section-shell archive-section">
          <div className="archive-list">
            {researchPapers.map((paper, index) => (
              <Reveal className="research-row" key={paper.title} delay={index * 0.04}>
                <div className="research-number">0{index + 1}</div>
                <div className="research-cover"><img src={paper.image} alt="" /></div>
                <div className="research-copy">
                  <div className="card-meta"><span>{paper.category}</span><span>{paper.year}</span></div>
                  <h2>{paper.title}</h2>
                  <p>{paper.description}</p>
                </div>
                <div className="research-links">
                  <a href={paper.pubmed} target="_blank" rel="noreferrer">View on PubMed <FiArrowUpRight /></a>
                  <a href={paper.pdf} download>Download PDF <FiDownload /></a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

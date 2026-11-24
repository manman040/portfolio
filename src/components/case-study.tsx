import { SiteLink as Link } from "./site-link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { portfolio } from "@/data/portfolio";
import { ProjectPreview } from "./project-preview";
import { Tags } from "./ui";
import { Reveal, ScrollProgress } from "./reveal";
import { ProjectGallery } from "./project-gallery";
import { ProjectRoadmap, ProjectStory } from "./project-story";

export function CaseStudy({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  return (
    <>
      <ScrollProgress />
      <header className="site-header">
        <div className="nav-shell">
          <Link
            href="/"
            className="logo"
            aria-label={`${portfolio.name}, home`}
          >
            {portfolio.initials}
            <span>.</span>
          </Link>
          <Link className="case-back" href="/#projects">
            <ArrowLeft size={16} /> All projects
          </Link>
        </div>
      </header>
      <main id="main" className="page-shell case-study">
        <Reveal>
          <p className="eyebrow">
            PROJECT / {project.number} · {project.category}
          </p>
          <h1>{project.title}</h1>
          <p className="case-lead">{project.description}</p>
          <Tags items={project.stack} />
          <div className="case-actions">
            <a
              href={project.github}
              className="button primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore source <ArrowUpRight size={17} />
            </a>
            <Link href="/#contact" className="button secondary">
              Talk about this project <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
        <Reveal className="case-visual">
          <ProjectPreview id={project.id} />
        </Reveal>
        <div className="case-content">
          <CaseSection number="01" title="The project">
            <p>{project.overview}</p>
            <h3>Problem & motivation</h3>
            <p>{project.motivation}</p>
            {project.story && <ProjectStory story={project.story} />}
          </CaseSection>
          <CaseSection number="02" title="My role & contributions">
            <p>{project.role}</p>
            <ul>
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection
            number="03"
            title={
              project.story ? "Application features" : "Implemented features"
            }
          >
            {project.story && (
              <p className="feature-provenance">
                From my final FYP report, with related source code linked below.
              </p>
            )}
            <ul>
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection number="04" title="Technical implementation">
            <div className="implementation-grid">
              {project.implementation.map((item) => (
                <article className="card implementation-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </CaseSection>
          <CaseSection number="05" title="Challenges & decisions">
            {project.challenges.map((item) => (
              <div className="case-decision" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </CaseSection>
          <CaseSection number="06" title="Visuals & project scope">
            {project.screenshots?.length ? (
              <>
                <p className="gallery-intro">
                  Screenshots from my final Urban Drive project report. They show
                  the FYP version, which may differ from the current
                  repositories. Select any image to enlarge it.
                </p>
                <ProjectGallery screenshots={project.screenshots} />
              </>
            ) : (
              <div className="card screenshot-placeholder">
                <span className="eyebrow">APPLICATION SCREENSHOTS</span>
                <h3>Screen captures to come.</h3>
                <p>
                  I’ll add application screenshots here. The preview above is{" "}
                  {project.id === "steelfit"
                    ? "the project logo"
                    : "a placeholder illustration"}
                  .
                </p>
              </div>
            )}
            <p className="case-scope">{project.scope}</p>
            {project.story && <ProjectRoadmap items={project.story.roadmap} />}
          </CaseSection>
          <CaseSection number="07" title="Explore the repositories">
            <div className="repository-list">
              {project.repositories.map((repo) => (
                <a
                  className="card repository-card"
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="eyebrow">{repo.label}</span>
                  <h3>
                    {repo.name}
                    <ArrowUpRight size={20} />
                  </h3>
                  <p>{repo.description}</p>
                </a>
              ))}
            </div>
            <details className="case-sources">
              <summary>Source code references</summary>
              <p>
                {project.story
                  ? "This case study draws on my final Urban Drive project report, my pilot, and the source code below."
                  : "This case study draws on the source code below."}
              </p>
              <ul>
                {project.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label} <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </CaseSection>
        </div>
        <nav className="case-bottom-nav" aria-label="Project navigation">
          <Link href="/#projects">
            <ArrowLeft size={17} /> Back to selected work
          </Link>
          <Link href={`/projects/${nextProject.slug}`}>
            <span>
              Next project<strong>{nextProject.title}</strong>
            </span>
            <ArrowRight size={20} />
          </Link>
        </nav>
      </main>
      <footer className="page-shell footer">
        <p>
          © {new Date().getFullYear()} {portfolio.name}.
        </p>
        <Link href="/#contact">
          Let’s talk <ArrowUpRight size={14} />
        </Link>
      </footer>
    </>
  );
}

function CaseSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-section">
      <Reveal heading>
        <p className="eyebrow">{number} / CASE STUDY</p>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

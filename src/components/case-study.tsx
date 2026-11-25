import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Circle } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { Project } from "@/data/projects";
import { ProjectGallery } from "./project-gallery";
import { ProjectPreview } from "./project-preview";
import { Reveal, ScrollProgress } from "./reveal";
import { SiteLink as Link } from "./site-link";
import { Tags } from "./ui";

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
          <Link href="/" className="logo">
            {portfolio.initials}
            <span>.</span>
            <span className="sr-only"> {portfolio.name}, home</span>
          </Link>
          <Link className="case-back" href="/#projects">
            <ArrowLeft size={16} /> All projects
          </Link>
        </div>
      </header>
      <main id="main" className="page-shell case-study">
        <Reveal>
          <p className="project-category">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="project-state">{project.statusLabel}</p>
          <p className="case-lead">{project.description}</p>
          <div className="case-actions">
            <a
              href={project.github}
              className="button primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source code <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
        <Reveal className="case-visual">
          <ProjectPreview project={project} />
        </Reveal>
        <div className="case-content">
          <CaseSection title="Project overview">
            <p>{project.overview}</p>
            {project.audience && (
              <div className="case-columns">
                {project.audience.map((item) => (
                  <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
            {project.pilot && (
              <p className="case-pilot">
                <strong>Pilot:</strong> {project.pilot.users} users and{" "}
                {project.pilot.drivers} drivers. These are participation figures
                from my own pilot.
              </p>
            )}
          </CaseSection>
          <CaseSection title="Problem and objective">
            <p>{project.problem}</p>
            <p>
              <strong>Objective:</strong> {project.objective}
            </p>
          </CaseSection>
          <CaseSection title="Technologies used">
            <Tags items={project.stack} />
          </CaseSection>
          <CaseSection title="Key features">
            {project.featuresNote && <p>{project.featuresNote}</p>}
            <List items={project.features} />
          </CaseSection>
          <CaseSection title="My contributions">
            <p>{project.role}</p>
            <List items={project.contributions} />
          </CaseSection>
          <CaseSection title="Implementation details">
            <div className="case-columns">
              {project.implementation.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </CaseSection>
          {project.screenshots && (
            <CaseSection title="Screenshots">
              <p>
                From my final project report. They show the FYP version, which
                may differ from the linked repositories.
              </p>
              <ProjectGallery screenshots={project.screenshots} />
            </CaseSection>
          )}
          <CaseSection title="Project status">
            <div className="status-columns">
              <div>
                <h3>{project.status.doneTitle}</h3>
                <ul>
                  {project.status.done.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="is-open">
                <h3>{project.status.openTitle}</h3>
                <ul>
                  {project.status.open.map((item) => (
                    <li key={item}>
                      <Circle size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p>{project.status.note}</p>
            {project.learned && (
              <p>
                <strong>What I learned:</strong> {project.learned}
              </p>
            )}
          </CaseSection>
          <CaseSection title="GitHub links">
            <div className="repository-list">
              {project.repositories.map((repo) => (
                <a
                  className="card repository-card"
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>
                    {repo.name}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </h3>
                  <p>{repo.description}</p>
                </a>
              ))}
            </div>
            <details className="case-sources">
              <summary>Source files behind this page</summary>
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
            <ArrowLeft size={17} /> All projects
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
          © {new Date().getFullYear()} {portfolio.name}
        </p>
        <Link href="/#contact">Contact</Link>
      </footer>
    </>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="case-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

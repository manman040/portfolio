import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
} from "lucide-react";
import { experience, portfolio, projects, skills } from "@/data/portfolio";
import { Github, Linkedin } from "./brand-icons";
import { ContactHub } from "./contact-hub";
import { DeveloperCard } from "./developer-card";
import { ProjectPreview } from "./project-preview";
import { Reveal } from "./reveal";
import { SiteLink as Link } from "./site-link";
import { SkillIcons } from "./skill-icons";
import { Destination, SectionHeading, Tags } from "./ui";

export function Hero() {
  return (
    <section id="home" className="hero">
      <Reveal className="hero-copy">
        <p className="availability">
          <span className="status-dot" />
          {portfolio.availability}
        </p>
        <h1>
          {portfolio.name}
          <span className="hero-title">{portfolio.headline}</span>
        </h1>
        <p className="hero-description">{portfolio.intro}</p>
        <div className="hero-actions">
          <a href="#projects" className="button primary">
            View projects <ArrowRight size={17} />
          </a>
          <Destination
            href={portfolio.resume}
            className="button secondary"
            download={portfolio.resumeFileName}
          >
            <ArrowDownToLine size={16} /> Download résumé
          </Destination>
        </div>
        <div className="hero-links">
          <Destination href={portfolio.github}>
            <Github size={16} /> GitHub
          </Destination>
          <Destination href={portfolio.linkedin}>
            <Linkedin size={16} /> LinkedIn
          </Destination>
          <span>
            <MapPin size={16} /> {portfolio.location}
          </span>
        </div>
      </Reveal>
      <Reveal className="hero-visual hero-namecard" delay={0.12}>
        <DeveloperCard />
      </Reveal>
      <dl className="hero-facts">
        <div>
          <dt>Education</dt>
          <dd>
            {portfolio.education.qualification}, CGPA {portfolio.education.cgpa}
          </dd>
        </div>
        <div>
          <dt>Development</dt>
          <dd>
            Native Android (Java) and Flutter projects, plus a six-month
            Laravel and Flutter internship
          </dd>
        </div>
        <div>
          <dt>Current role</dt>
          <dd>Application support for manufacturing systems at Jabil</dd>
        </div>
      </dl>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        title="Projects"
        description="Academic and personal projects. Each case study separates what is built from what isn’t."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal
            className={`card project-card project-${project.id}`}
            key={project.id}
            delay={(index % 2) * 0.06}
          >
            <ProjectPreview project={project} />
            <div className="project-body">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="project-state">{project.statusLabel}</p>
              <p>{project.description}</p>
              <ul className="project-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Tags items={project.stack} />
              <div className="project-links">
                <Link
                  className="button primary"
                  href={`/projects/${project.slug}`}
                >
                  <span>
                    View case study
                    <span className="sr-only">: {project.title}</span>
                  </span>
                  <ArrowRight size={17} />
                </Link>
                <Destination
                  href={project.github}
                  className="button secondary"
                >
                  <Github size={16} /> Source
                  <span className="sr-only"> code for {project.title}</span>
                </Destination>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading title="Experience" />
      <div className="experience-list">
        {experience.map((role) => (
          <Reveal className="experience-row" key={role.title}>
            <article className="experience-card">
              <h3>{role.title}</h3>
              <p className="company">{role.company}</p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>
                    <Check size={14} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {role.contributedProjects.length > 0 && (
                <dl className="internship-projects">
                  {role.contributedProjects.map((project) => (
                    <div key={project.title}>
                      <dt>{project.title}</dt>
                      <dd>{project.description}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
            <p className="experience-date">
              {role.date}
              {role.current && (
                <span className="current-label">Current role</span>
              )}
            </p>
            <a
              href={role.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`company-logo-tile logo-theme-${role.logoTheme}`}
              aria-label={`Visit ${role.logoAlt} website (opens in a new tab)`}
            >
              <ArrowUpRight
                className="company-link-arrow"
                size={18}
                aria-hidden="true"
              />
              <Image src={role.logo} alt="" width={180} height={150} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        title="Skills"
        description="Technologies I’ve used, and where I used them."
      />
      <div className="skills-grid">
        {skills.map((group) =>
          group.tracks ? (
            <Reveal className="card skill-card skill-card-wide" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-tracks">
                {group.tracks.map((track) => (
                  <div
                    className={`skill-track skill-track-${track.kind}`}
                    key={track.title}
                  >
                    <h4>{track.title}</h4>
                    <SkillIcons items={track.items} />
                    <p>{track.usedIn}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal className="card skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <SkillIcons items={group.items ?? []} />
              <p>{group.usedIn}</p>
            </Reveal>
          ),
        )}
      </div>
    </section>
  );
}

export function About() {
  const { education, career } = portfolio;
  return (
    <section id="about" className="section">
      <SectionHeading title="About" />
      <div className="about-layout">
        <Reveal className="card about-text">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl>
            <div>
              <dt>Looking for</dt>
              <dd>{career.roles}</dd>
            </div>
            <div>
              <dt>Work arrangement</dt>
              <dd>{career.workArrangement}</dd>
            </div>
            <div>
              <dt>Start date</dt>
              <dd>{career.notice}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal className="card education-summary" delay={0.05}>
          <h3>Education</h3>
          <p className="education-name">{education.qualification}</p>
          <p>{education.institution}</p>
          <p>{education.completed}</p>
          <p className="education-cgpa">
            <strong>{education.cgpa}</strong> CGPA
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <SectionHeading
        title="Contact"
        description="Email me directly or use the form."
      />
      <div className="contact-layout">
        <Reveal className="contact-links">
          <Destination
            href={portfolio.email ? `mailto:${portfolio.email}` : null}
          >
            <Mail size={19} />
            <span>
              Email<small>{portfolio.email}</small>
            </span>
          </Destination>
          <Destination href={portfolio.linkedin}>
            <Linkedin size={19} />
            <span>
              LinkedIn<small>aiman-jamili</small>
            </span>
          </Destination>
          <Destination href={portfolio.github}>
            <Github size={19} />
            <span>
              GitHub<small>manman040</small>
            </span>
          </Destination>
          <Destination
            href={portfolio.resume}
            download={portfolio.resumeFileName}
          >
            <ArrowDownToLine size={19} />
            <span>
              Résumé<small>Download PDF</small>
            </span>
          </Destination>
        </Reveal>
        <ContactHub />
      </div>
    </section>
  );
}

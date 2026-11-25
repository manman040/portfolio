import { DeveloperCard } from "./developer-card";
import { ContactHub } from "./contact-hub";
import { SiteLink as Link } from "./site-link";
import { Github, Linkedin } from "./brand-icons";
import Image from "next/image";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  experience,
  portfolio,
  projects,
  skills,
} from "@/data/portfolio";
import { Destination, SectionHeading, Tags } from "./ui";
import { Reveal } from "./reveal";
import { SkillIcons } from "./skill-icons";
import { ProjectPreview } from "./project-preview";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <Reveal>
          <p className="availability">
            <span className="status-dot" />
            {portfolio.availability}
          </p>
          <p className="hero-hello">
            Hey, I’m Aiman <span className="wave">✳</span>
          </p>
          <h1>
            Thoughtful code.
            <br />
            <span>Real-world impact.</span>
          </h1>
          <p className="hero-role">{portfolio.headline}</p>
          <p className="hero-description">{portfolio.intro}</p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">
              Explore my work <ArrowUpRight size={18} />
            </a>
            <Destination
              href={portfolio.resume}
              className="button secondary"
              download
            >
              <ArrowDownToLine size={16} /> Résumé
            </Destination>
          </div>
          <div className="hero-meta">
            <span>
              <MapPin size={14} />
              {portfolio.location}
            </span>
            <span className="meta-divider" />
            <div className="hero-socials">
              <Destination href={portfolio.github}>
                <Github size={14} />
                <span className="sr-only">GitHub</span>
              </Destination>
              <Destination href={portfolio.linkedin}>
                <Linkedin size={14} />
                <span className="sr-only">LinkedIn</span>
              </Destination>
              <Destination
                href={portfolio.email ? `mailto:${portfolio.email}` : null}
              >
                <Mail size={14} />
                <span className="sr-only">Email</span>
              </Destination>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-visual hero-namecard" delay={0.12}>
        <DeveloperCard />
      </Reveal>
      <div className="hero-bottom">
        <span>CURIOUS MIND. BUILDER AT HEART.</span>
        <a href="#about">
          A little more about me <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        number="01"
        label="THE PERSON BEHIND THE CODE"
        title="A builder, always learning."
        description="Practical experience. A curious mindset. A drive to make things work better."
      />
      <div className="about-grid">
        <Reveal className="card about-bio">
          <div className="card-icon">
            <Braces size={22} />
          </div>
          <h3>More than writing code.</h3>
          <p>{portfolio.biography}</p>
          <div className="card-foot">
            <GraduationCap size={16} /> Computer Technology <span>→</span>{" "}
            Aspiring developer
          </div>
        </Reveal>
        <Reveal className="card location-card" delay={0.05}>
          <div className="location-globe">
            <Globe2 size={134} strokeWidth={0.6} />
            <span className="globe-point" />
          </div>
          <p className="eyebrow">BASED IN</p>
          <h3>{portfolio.location}</h3>
          <p>Local roots. A world of possibilities.</p>
          <span className="location-time">MYT · UTC +08:00</span>
        </Reveal>
        <Reveal className="card focus-card">
          <span className="card-label">
            <Sparkles size={15} /> THE NEXT CHAPTER
          </span>
          <h3>
            Building my foundations.
            <br />
            Expanding my possibilities.
          </h3>
          <div className="focus-items">
            {[
              "Web development",
              "Backend development",
              "Mobile applications",
              "Engineering fundamentals",
            ].map((item, index) => (
              <span key={item}>
                <span>0{index + 1}</span>
                {item}
                <ArrowUpRight size={14} />
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal className="card drive-card" delay={0.05}>
          <span className="quote-mark">“</span>
          <p>
            Turning ideas into
            <br />
            <span>functional applications.</span>
            <br />
            One problem at a time.
          </p>
          <span className="card-label">WHAT DRIVES ME</span>
        </Reveal>
        <Reveal className="card education-card">
          <span className="card-label">
            <GraduationCap size={16} /> EDUCATION
          </span>
          <h3>{portfolio.education.qualification}</h3>
          <p>{portfolio.education.institution}</p>
          <p className="education-date">
            {portfolio.education.cgpa} · {portfolio.education.completed} ·{" "}
            {portfolio.education.graduation}
          </p>
        </Reveal>
        <Reveal className="card journey-card">
          <span className="card-label">THE JOURNEY SO FAR</span>
          <div className="journey">
            <span>
              <Code2 size={19} />
              <strong>Development intern</strong>
              <small>Learning by building</small>
            </span>
            <ArrowRight className="journey-arrow" size={19} />
            <span>
              <Terminal size={19} />
              <strong>Application support</strong>
              <small>Understanding real systems</small>
            </span>
            <ArrowRight className="journey-arrow" size={19} />
            <span className="journey-next">
              <Sparkles size={19} />
              <strong>Software developer</strong>
              <small>The next chapter</small>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  const icons = [Braces, Layers3, Database, Terminal];
  return (
    <section id="skills" className="section">
      <SectionHeading
        number="02"
        label="MY TOOLKIT"
        title="The tools behind the work."
        description="Technologies I’ve used across web and mobile development, backend integration, and application support."
      />
      <div className="skills-grid">
        {skills.map((group, index) => {
          const Icon = icons[index];
          return (
            <Reveal
              className="card skill-card"
              key={group.title}
              delay={index * 0.04}
            >
              <div className="skill-top">
                <Icon size={23} />
                <span>{group.code}</span>
              </div>
              <h3>{group.title}</h3>
              <SkillIcons items={group.items} />
            </Reveal>
          );
        })}
      </div>
      <p className="section-note">
        <span className="status-dot" /> Always adding to the toolkit. Always
        strengthening the fundamentals.
      </p>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        number="03"
        label="SELECTED WORK"
        title="Ideas, turned into applications."
        description="Independent and academic work. Explore the implementation behind the featured projects."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal
            className={`card project-card project-${project.id}`}
            key={project.id}
            delay={(index % 2) * 0.06}
          >
            <ProjectPreview id={project.id} />
            <div className="project-body">
              <div className="project-category">
                <span>{project.category}</span>
                <span>/{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Tags items={project.stack} />
              <details className="project-details">
                <summary>
                  My contribution <span>+</span>
                </summary>
                <ul>
                  {project.contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
              <div className="project-links">
                <Destination
                  href={project.github}
                  className="button secondary"
                >
                  <Github size={16} /> Source
                </Destination>
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
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="section-note">
        Previews include screenshots from my FYP report, project artwork, and a
        placeholder where screenshots are still to come. Internship contributions are listed separately under
        Experience.
      </p>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        number="04"
        label="EXPERIENCE"
        title="Grounded in real-world work."
        description="From developing web and mobile applications to helping keep production applications running."
      />
      <div className="experience-list">
        {experience.map((role) => (
          <Reveal className="experience-row" key={role.title}>
            <article className="card experience-card">
              <div className="role-heading">
                <div>
                  <p className="company">{role.company}</p>
                  <h3>{role.title}</h3>
                  <p className="role-subtitle">{role.subtitle}</p>
                </div>
              </div>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>
                    <Check size={14} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {role.contributedProjects.length > 0 && (
                <div className="internship-projects">
                  <h4>Projects contributed to</h4>
                  <p className="contribution-context">
                    Team contributions during my internship at {role.company}.
                  </p>
                  {role.contributedProjects.map((project) => (
                    <div key={project.title}>
                      <strong>{project.title}</strong>
                      <p>{project.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
            <div className="experience-date">
              <span>{role.date}</span>
              {role.current && (
                <span className="current-label">CURRENT ROLE</span>
              )}
            </div>
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
              <Image
                src={role.logo}
                alt={`${role.logoAlt} logo`}
                width={180}
                height={150}
                sizes="(max-width: 640px) 110px, 180px"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <Reveal className="card contact-card">
        <div className="contact-glow" />
        <p className="eyebrow">
          <span className="status-dot" /> LET’S BUILD SOMETHING USEFUL
        </p>
        <h2>
          Have an opportunity
          <br />
          <span>in mind?</span>
        </h2>
        <p>
          I’m looking for {portfolio.career.roles} opportunities in{" "}
          {portfolio.career.location}. {portfolio.career.workArrangement}.
        </p>
        <p className="contact-availability">{portfolio.career.notice}.</p>
        <Destination
          href={portfolio.email ? `mailto:${portfolio.email}` : null}
          className="button primary"
        >
          <Mail size={17} /> Say hello <ArrowUpRight size={17} />
        </Destination>
        <div className="contact-links">
          <Destination href={portfolio.github}>
            <Github size={16} /> GitHub
          </Destination>
          <Destination href={portfolio.linkedin}>
            <Linkedin size={16} /> LinkedIn
          </Destination>
          <Destination href={portfolio.resume} download>
            <ArrowDownToLine size={16} /> Résumé
          </Destination>
        </div>
        {(!portfolio.email || !portfolio.resume) && (
          <p className="contact-note">
            Missing contact details and résumé will be added here soon.
          </p>
        )}
      </Reveal>
      <ContactHub />
    </section>
  );
}

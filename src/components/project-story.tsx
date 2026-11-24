import type { Project } from "@/data/projects";
import { ArrowDown, ArrowRight } from "lucide-react";

export function ProjectStory({
  story,
}: {
  story: NonNullable<Project["story"]>;
}) {
  return (
    <div className="project-story">
      <p className="project-status">
        <span className="status-dot" /> {story.status}
      </p>
      {story.pilot && (
        <div className="pilot-summary">
          <div>
            <strong>{story.pilot.users}</strong>
            <span>Users in the pilot</span>
          </div>
          <div>
            <strong>{story.pilot.drivers}</strong>
            <span>Drivers in the pilot</span>
          </div>
          <p>Participation figures from my own pilot.</p>
        </div>
      )}
      <div className="audience-grid">
        {story.audience.map((role) => (
          <article className="card audience-card" key={role.title}>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
          </article>
        ))}
      </div>
      <h3 className="story-subheading">One journey, three connected roles.</h3>
      <ol className="journey-steps">
        {story.journey.map((step, index) => (
          <li key={step.title}>
            <span className="journey-step-number">0{index + 1}</span>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            {index < story.journey.length - 1 && (
              <ArrowRight
                className="journey-step-arrow"
                size={18}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
      <h3 className="story-subheading">
        From requirements to a working project.
      </h3>
      <p className="story-process-label">
        Development process · SDLC Waterfall
      </p>
      <ol className="process-list">
        {story.process.map((step, index) => (
          <li key={step.title}>
            <span>
              0{index + 1}
              <ArrowDown size={14} aria-hidden="true" />
            </span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="card reflection-card">
        <h3>What I learned</h3>
        <p>{story.reflection}</p>
      </div>
    </div>
  );
}

export function ProjectRoadmap({
  items,
}: {
  items: NonNullable<Project["story"]>["roadmap"];
}) {
  return (
    <div className="project-roadmap">
      <p className="eyebrow">FUTURE WORK · PROPOSED IN THE FINAL REPORT</p>
      <h3 className="story-subheading">Where I would take it next.</h3>
      <div className="roadmap-grid">
        {items.map((item) => (
          <article className="card" key={item.title}>
            <span className="roadmap-label">PROPOSED</span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

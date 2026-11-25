import Image from "next/image";
import { Check, Circle } from "lucide-react";
import type { Project } from "@/data/projects";
import { publicPath } from "@/lib/paths";

export function ProjectPreview({ project }: { project: Project }) {
  if (project.id === "drive")
    return (
      <div className="project-preview preview-drive">
        <Image
          src={publicPath("/projects/urban-drive/rider-dashboard.webp")}
          alt="Urban Drive rider screen for choosing a pickup location"
          width={438}
          height={974}
        />
        <Image
          src={publicPath("/projects/urban-drive/booking-preview.webp")}
          alt="Urban Drive booking preview with route, fare, and passenger package"
          width={416}
          height={926}
        />
      </div>
    );
  if (project.id === "steelfit")
    return (
      <div className="project-preview preview-steelfit">
        <Image
          src={publicPath("/projects/steelfit-logo.webp")}
          alt="SteelFit project logo"
          width={250}
          height={200}
        />
      </div>
    );
  return (
    <div className="project-preview preview-status">
      <p>Development status</p>
      <ul>
        {project.status.done.map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            <span>
              <span className="sr-only">Built: </span>
              {item}
            </span>
          </li>
        ))}
        <li className="is-open">
          <Circle size={15} aria-hidden="true" />
          <span>
            <span className="sr-only">Not built yet: </span>
            Customer service requests
          </span>
        </li>
      </ul>
    </div>
  );
}

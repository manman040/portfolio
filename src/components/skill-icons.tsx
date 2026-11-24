import Image from "next/image";
import {
  Braces,
  Bug,
  Code2,
  Database,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { publicPath } from "@/lib/paths";

const logos: Record<string, string> = {
  Dart: "dart",
  PHP: "php",
  Java: "java",
  JavaScript: "javascript",
  HTML: "html5",
  CSS: "css3",
  Flutter: "flutter",
  Laravel: "laravel",
  Android: "android",
  MySQL: "mysql",
  "Microsoft SQL Server": "microsoftsqlserver",
  Firebase: "firebase",
  Git: "git",
  GitHub: "github",
  "VS Code": "vscode",
  "Android Studio": "androidstudio",
  Postman: "postman",
  Figma: "figma",
  Composer: "composer",
  XAMPP: "xampp",
  Laragon: "laragon",
  PuTTY: "putty",
};

// Skills without a brand logo.
const symbols: Record<string, LucideIcon> = {
  SQL: Database,
  "REST APIs": Network,
  "JSON integration": Braces,
  RBAC: ShieldCheck,
  "Database design": Workflow,
  Debugging: Bug,
};

export function SkillIcons({ items }: { items: string[] }) {
  return (
    <ul className="skill-icons">
      {items.map((item) => {
        const logo = logos[item];
        const Symbol = symbols[item] ?? Code2;
        return (
          <li key={item}>
            <span className={`skill-icon ${logo ? `skill-logo-${logo}` : ""}`}>
              {logo ? (
                <Image
                  src={publicPath(`/skills/${logo}.svg`)}
                  alt=""
                  width={34}
                  height={34}
                />
              ) : (
                <Symbol size={30} strokeWidth={1.6} aria-hidden="true" />
              )}
            </span>
            <span className="skill-name">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

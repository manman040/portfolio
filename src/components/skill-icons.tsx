import Image from "next/image";
import {
  Code2,
  Database,
  LayoutTemplate,
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
  Supabase: "supabase",
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
  "XML Layouts": LayoutTemplate,
  "REST APIs": Network,
  RBAC: ShieldCheck,
  "Database design": Workflow,
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
                  width={20}
                  height={20}
                />
              ) : (
                <Symbol size={18} strokeWidth={1.8} aria-hidden="true" />
              )}
            </span>
            <span className="skill-name">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

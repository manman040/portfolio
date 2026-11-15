import { publicPath } from "@/lib/paths";
// Replace null destinations with your real URLs. Missing links render as labeled placeholders.
export const portfolio = {
  name: "Aiman Farhan",
  initials: "AF",
  portrait: null as string | null,
  headline: "Software Developer | Flutter | Web & Backend Development",
  location: "Penang, Malaysia",
  availability: "Open to Software Development Opportunities",
  intro:
    "I build intuitive mobile applications, thoughtful web experiences, and practical software solutions. Currently in application support, working towards my next chapter in software development.",
  biography:
    "I enjoy turning an idea into something people can actually use. From independently building my college e-hailing project to developing Flutter applications during my internship and supporting manufacturing applications today, I’m building a grounded understanding of how software works in the real world.",
  education: {
    qualification: "Diploma In Computer Technology",
    institution: "Institut Kemahiran Tinggi Perda-Tech",
    completed: "Completed September 2026",
    graduation: "Graduation November 2027",
  },
  career: {
    roles: "Software Developer & Application Developer",
    location: "Penang",
    workArrangement: "Open to on-site and remote roles",
    notice: "Start date subject to notice period with current employer",
  },
  email: "aimanjamili46@gmail.com" as string | null,
  github: "https://github.com/manman040" as string | null,
  linkedin: "https://www.linkedin.com/in/aiman-f-958947363" as string | null,
  resume: publicPath("/resume.pdf") as string | null,
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || null) as string | null,
};
export const navigation = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];
export const skills = [
  {
    title: "Languages",
    code: "01",
    items: ["Dart", "PHP", "Java", "JavaScript", "SQL"],
  },
  {
    title: "Frameworks & development",
    code: "02",
    items: ["Flutter", "Laravel", "Android", "REST APIs", "HTML", "CSS"],
  },
  {
    title: "Data & developer tools",
    code: "03",
    items: [
      "MySQL",
      "Firebase",
      "Git",
      "GitHub",
      "VS Code",
      "Android Studio",
      "Postman",
    ],
  },
];
export { projects } from "./projects";
export const experience = [
  {
    date: "Sep 2026 — Present",
    title: "Industrial Engineering Technician",
    subtitle: "Application Support",
    company: "Jabil Circuit · Batu Kawan, Penang",
    logo: publicPath("/companies/jabil.svg"),
    logoAlt: "Jabil",
    website: "https://www.jabil.com/",
    logoTheme: "light",
    contributedProjects: [],
    current: true,
    points: [
      "Support manufacturing applications across production lines and troubleshoot application and station configuration issues.",
      "Work with eVA for PC and equipment registration/configuration, and JemsMM for station and route configuration.",
      "Investigate recurring issues and possible root causes, escalate software issues to development teams, and collaborate with engineers to maintain operational continuity.",
    ],
  },
  {
    date: "Jan 2026 — Jun 2026",
    title: "Software Development Intern",
    subtitle: "Mobile application development",
    company: "Myrich Dynasty Network SDN. BHD",
    logo: publicPath("/companies/mdn.png"),
    logoAlt: "Myrich Dynasty Network",
    website: "https://mdnsb.com/",
    logoTheme: "dark",
    contributedProjects: [
      {
        title: "Penang Smart Kariah",
        description:
          "Infaq & Wakaf module, dynamic forms, API integration, and Zakat UI/UX contributions.",
      },
      {
        title: "GoMasjid / GoMasjidPro",
        description:
          "Flutter development, donation-related functionality, integration, and debugging as part of the team.",
      },
    ],
    current: false,
    points: [
      "Contributed to Flutter development on Penang Smart Kariah and GoMasjid / GoMasjidPro as part of the internship team.",
      "Developed Penang Smart Kariah’s Infaq & Wakaf module, including dynamic donation forms and input validation. Integrated PHP backend APIs and MySQL-related functionality.",
      "Participated in debugging and application testing, and contributed to Zakat module UI/UX.",
    ],
  },
];

import { publicPath } from "@/lib/paths";
// Replace null destinations with your real URLs. Missing links render as labeled placeholders.
export const portfolio = {
  name: "Aiman Farhan",
  initials: "AF",
  // Made with: node scripts/prepare-portrait.mjs <photo>. Use null for the monogram.
  portrait: "/portrait" as string | null,
  headline: "Junior Software Developer",
  location: "Penang, Malaysia",
  availability: "Open to software development roles",
  intro:
    "Computer Technology graduate with hands-on experience in native Android development with Java, cross-platform apps with Flutter, and web development with PHP and Laravel, gained through academic projects and a six-month programming internship. I currently support manufacturing applications at Jabil.",
  about: [
    "For my final year project, I independently built an e-hailing app for my college, from the requirements and Figma screens to the Flutter app, Firebase data, and PHP admin panel. During my internship I worked with a development team on Laravel web modules, Flutter mobile modules, REST APIs, and MySQL databases.",
    "Native Android with Java is an important part of my background. In SteelFit I worked with Android Studio, XML layouts, activities and their lifecycle, navigation between screens, and a SQL Server connection. It’s the area I most want to strengthen, alongside Flutter.",
    "In my current role I support in-house manufacturing applications and troubleshoot station issues on the production floor. I’m looking for a software development role where I can keep developing these skills through practical engineering work.",
  ],
  education: {
    qualification: "Diploma in Computer Technology",
    institution: "Institut Kemahiran Tinggi Perda-Tech",
    completed: "Completed June 2026",
    cgpa: "3.82",
  },
  career: {
    roles:
      "Junior software developer, Android or mobile application developer, application developer, and graduate software engineer roles",
    workArrangement: "On-site in Penang, or remote",
    notice: "Subject to notice period with current employer",
  },
  email: "aimanjamili46@gmail.com" as string | null,
  github: "https://github.com/manman040" as string | null,
  linkedin: "https://www.linkedin.com/in/aiman-jamili" as string | null,
  resume: publicPath("/resume.pdf") as string | null,
  resumeFileName: "Aiman-Farhan-Resume.pdf",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || null) as string | null,
};
export const navigation = [
  "Projects",
  "Experience",
  "Skills",
  "About",
  "Contact",
];
export type SkillTrack = {
  title: string;
  kind?: "android" | "flutter";
  items: string[];
  usedIn: string;
};
export type SkillGroup = {
  title: string;
  usedIn?: string;
  items?: string[];
  tracks?: SkillTrack[];
};
export const skills: SkillGroup[] = [
  {
    title: "Mobile development",
    tracks: [
      {
        title: "Native Android",
        kind: "android",
        items: ["Java", "Android Studio", "XML Layouts"],
        usedIn:
          "SteelFit: Java activities, XML layouts, Intent-based navigation, RecyclerView lists, and SQL Server access through JDBC.",
      },
      {
        title: "Cross-platform",
        kind: "flutter",
        items: ["Flutter", "Dart"],
        usedIn:
          "Urban Drive, ReadyTech, and the Flutter mobile modules in my internship.",
      },
    ],
  },
  {
    title: "Web development",
    usedIn:
      "PHP and Laravel in my internship, PHP in Urban Drive’s admin panel.",
    items: ["PHP", "Laravel", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Database & backend",
    usedIn:
      "MySQL and REST APIs in my internship, Firebase in Urban Drive, SQL Server in SteelFit, Supabase in ReadyTech.",
    items: [
      "SQL",
      "MySQL",
      "Microsoft SQL Server",
      "Firebase",
      "Supabase",
      "REST APIs",
      "RBAC",
      "Database design",
    ],
  },
  {
    title: "Tools",
    usedIn: "Git, GitHub, and Figma in my internship.",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Figma",
      "Composer",
      "XAMPP",
      "Laragon",
      "PuTTY",
    ],
  },
];
export { projects } from "./projects";
export const experience = [
  {
    date: "Sep 2026 – Present",
    title: "Industrial Engineering Technician (Application Support)",
    company: "Jabil Circuit · Batu Kawan, Penang",
    logo: publicPath("/companies/jabil.svg"),
    logoAlt: "Jabil",
    website: "https://www.jabil.com/",
    logoTheme: "light",
    contributedProjects: [],
    current: true,
    points: [
      "Provide application support for in-house manufacturing systems across multiple production lines.",
      "Register and configure PCs, station equipment, and production routes.",
      "Troubleshoot daily station issues, perform initial root cause analysis, and escalate unresolved software issues to the development team.",
    ],
  },
  {
    date: "Jan 2026 – Jun 2026",
    title: "Programmer (Internship)",
    company: "Myrich Dynasty Network SDN. BHD",
    logo: publicPath("/companies/mdn.webp"),
    logoAlt: "Myrich Dynasty Network",
    website: "https://mdnsb.com/",
    logoTheme: "dark",
    contributedProjects: [
      {
        title: "Penang Smart Kariah",
        description:
          "Developed the Infaq & Wakaf module with dynamic donation forms and input validation. Worked on Smart ID, Organization Chart, Announcements, Mosque Information, and Committee Management, API integration, and Zakat UI/UX.",
      },
      {
        title: "GoMasjid / GoMasjidPro",
        description:
          "Flutter development, donation functionality, integration, and debugging.",
      },
      {
        title: "MasjidPro Dashboard",
        description:
          "Built the Committee Management and Committee Report modules, IC search, and mosque categorisation, and improved dashboard data workflows.",
      },
      {
        title: "Sistem Pengurusan Bersepadu (MAINPP)",
        description:
          "Enhanced the Facility, Asset, Appointments, Complaints and Suggestions, Notifications, Documentation, Transfers, and Member Management modules, and revamped the UI/UX.",
      },
    ],
    current: false,
    points: [
      "Developed and enhanced Laravel web and Flutter mobile modules across four production systems, as part of a development team.",
      "Built RESTful APIs to connect the Laravel (PHP) backend with the Flutter app, and worked on MySQL database structures and queries.",
      "Implemented role-based access control and data validation, designed UI/UX in Figma, and tested and debugged features.",
    ],
  },
];

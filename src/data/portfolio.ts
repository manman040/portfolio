import { publicPath } from "@/lib/paths";
// Replace null destinations with your real URLs. Missing links render as labeled placeholders.
export const portfolio = {
  name: "Aiman Farhan",
  initials: "AF",
  // Set to "/portrait" after running: node scripts/prepare-portrait.mjs <photo>
  portrait: null as string | null,
  headline: "Software Developer | Laravel | Flutter | Web & Backend Development",
  location: "Penang, Malaysia",
  availability: "Open to Software Development Opportunities",
  intro:
    "I build intuitive mobile applications, thoughtful web experiences, and practical software solutions. Currently in application support, working towards my next chapter in software development.",
  biography:
    "I enjoy turning an idea into something people can actually use. From independently building my college e-hailing project to developing Laravel and Flutter modules during my internship and supporting manufacturing applications today, I’m building a grounded understanding of how software works in the real world.",
  education: {
    qualification: "Diploma in Computer Technology",
    institution: "Institut Kemahiran Tinggi Perda-Tech",
    completed: "Completed June 2026",
    graduation: "Convocation November 2027",
    cgpa: "CGPA 3.82",
  },
  career: {
    roles: "Software Developer, Application Developer, Junior Developer, and Programmer",
    location: "Penang",
    workArrangement: "Open to on-site and remote roles",
    notice: "Start date subject to notice period with current employer",
  },
  email: "aimanjamili46@gmail.com" as string | null,
  github: "https://github.com/manman040" as string | null,
  linkedin: "https://www.linkedin.com/in/aiman-jamili" as string | null,
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
    items: ["Dart", "PHP", "Java", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks & development",
    code: "02",
    items: [
      "Flutter",
      "Laravel",
      "Android",
      "REST APIs",
      "JSON integration",
      "RBAC",
      "Debugging",
    ],
  },
  {
    title: "Data",
    code: "03",
    items: ["MySQL", "Microsoft SQL Server", "Firebase", "Database design"],
  },
  {
    title: "Developer tools",
    code: "04",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Android Studio",
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
export const otherProjects = [
  {
    title: "CarRental",
    category: "Semester 4 project · Car rental web application",
    description:
      "A web application with CRUD features for vehicles, rental bookings, and customers, with form validation.",
    stack: ["PHP", "HTML", "Microsoft SQL Server", "XAMPP"],
  },
];
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
      "Provide application support for in-house manufacturing systems, including PC, station equipment, and production route configuration.",
      "Investigate recurring issues and possible root causes, escalate software issues to development teams, and collaborate with engineers to maintain operational continuity.",
    ],
  },
  {
    date: "Jan 2026 — Jun 2026",
    title: "Programmer (Internship)",
    subtitle: "Laravel web and Flutter mobile development",
    company: "Myrich Dynasty Network SDN. BHD",
    logo: publicPath("/companies/mdn.webp"),
    logoAlt: "Myrich Dynasty Network",
    website: "https://mdnsb.com/",
    logoTheme: "dark",
    contributedProjects: [
      {
        title: "Penang Smart Kariah",
        description:
          "Infaq & Wakaf, Smart ID, Organization Chart, Announcements, Mosque Information, and Committee Management modules, with API integration and Zakat UI/UX contributions.",
      },
      {
        title: "GoMasjid / GoMasjidPro",
        description:
          "Flutter development, donation-related functionality, integration, and debugging as part of the team.",
      },
      {
        title: "MasjidPro Dashboard",
        description:
          "Committee Management and Committee Report modules, IC search, mosque categorisation, and dashboard data workflow improvements.",
      },
      {
        title: "Sistem Pengurusan Bersepadu (MAINPP)",
        description:
          "Enhancements to the Facility, Asset, Appointments, Complaints and Suggestions, Notifications, Documentation, Transfers, and Member Management modules, with UI/UX revamp work.",
      },
    ],
    current: false,
    points: [
      "Developed and enhanced Laravel web and Flutter mobile modules as part of the internship team.",
      "Developed Penang Smart Kariah’s Infaq & Wakaf module, including dynamic donation forms and input validation. Built RESTful APIs to connect the Laravel (PHP) backend with the Flutter app, and worked on MySQL database structures and queries.",
      "Implemented role-based access control and data validation, designed UI/UX in Figma, and tested and debugged features.",
    ],
  },
];

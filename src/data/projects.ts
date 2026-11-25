import { publicPath } from "@/lib/paths";

type Entry = { title: string; description: string };
export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  statusLabel: string;
  description: string;
  highlights: string[];
  stack: string[];
  github: string;
  overview: string;
  audience?: Entry[];
  pilot?: { users: number; drivers: number };
  problem: string;
  objective: string;
  features: string[];
  featuresNote?: string;
  role: string;
  contributions: string[];
  implementation: Entry[];
  screenshots?: ProjectScreenshot[];
  status: {
    doneTitle: string;
    done: string[];
    openTitle: string;
    open: string[];
    note: string;
  };
  learned?: string;
  repositories: {
    name: string;
    label: string;
    url: string;
    description: string;
  }[];
  sources: { label: string; url: string }[];
};

export type ProjectScreenshot = {
  src: string;
  title: string;
  caption: string;
  group: "Rider" | "Driver" | "Admin";
  width: number;
  height: number;
};

const github = "https://github.com/manman040";
export const projects: Project[] = [
  {
    id: "drive",
    slug: "urban-drive",
    title: "Urban Drive / PerdaRide",
    category: "Final year project · E-hailing",
    statusLabel: "Academic project, tried in a small pilot",
    description:
      "A campus e-hailing system that replaces WhatsApp ride bookings with connected rider, driver, and admin screens. I built it independently and tried it with 15 users and 5 drivers.",
    highlights: [
      "Rider and driver app in Flutter, with Firebase accounts, bookings, ride status, and chat",
      "PHP admin panel for driver applications, rides, fares, and commissions",
      "Node.js service for driver commission payments through ToyyibPay",
    ],
    stack: ["Flutter", "Dart", "PHP", "Firebase", "Mapbox", "Node.js", "Express"],
    github: `${github}/PerdaRide-App`,
    overview:
      "Urban Drive is my final year project for Institut Kemahiran Tinggi Perda-Tech. It covers ride booking, driver trip management, and web-based administration. PerdaRide is my related Flutter remake of the mobile app, and it is the version in the linked repository.",
    audience: [
      {
        title: "Riders",
        description:
          "Choose locations, review the fare and passenger capacity, request a ride, and follow its status.",
      },
      {
        title: "Drivers",
        description:
          "Apply for approval, accept bookings, update trip stages, and review earnings and commissions.",
      },
      {
        title: "Administrators",
        description:
          "Review driver applications, monitor rides, set fares, and manage records in a web dashboard.",
      },
    ],
    pilot: { users: 15, drivers: 5 },
    problem:
      "Campus rides were arranged manually through WhatsApp. Requests went unread, details were incomplete, bookings overlapped, and payments were hard to track.",
    objective:
      "Give riders, drivers, and administrators one place to book, manage, and review trips.",
    featuresNote:
      "Based on my final report, with related source code linked below.",
    features: [
      "Pickup and drop-off selection, route preview, estimated fare, payment method, and passenger capacity.",
      "Driver registration with document submission and approval, booking acceptance, arrival, ride start, and completion.",
      "Ride status updates, rider–driver chat, trip history, notifications, and driver earnings.",
      "Web administration for rides, driver applications, fares, commission deadlines, users, feedback, and reports.",
      "Driver commission payments through ToyyibPay.",
    ],
    role: "Sole developer, from requirements to the final report.",
    contributions: [
      "Documented the WhatsApp booking problems, compared existing e-hailing interfaces, and planned the work with a Gantt chart, following a waterfall process.",
      "Designed the Figma screens, rider/driver/admin flowcharts, and data model.",
      "Built the mobile app in Flutter and Dart, including map-based location selection.",
      "Integrated Firebase Authentication and Realtime Database for accounts, bookings, and ride status.",
      "Built the PHP admin interface and connected the ToyyibPay payment service.",
      "Tested on Android devices and emulators, ran the pilot, and wrote the report.",
    ],
    implementation: [
      {
        title: "Two drivers, one booking",
        description:
          "In PerdaRide, accepting a booking runs as a Firebase transaction. It only succeeds while the booking is pending and has no driver, so a second driver can’t overwrite the first.",
      },
      {
        title: "Shared booking data",
        description:
          "BookingRepository keeps booking writes and live streams in one place. The admin ride page reads the same booking fields, normalizes statuses, and looks up rider and driver names.",
      },
      {
        title: "Commission payments",
        description:
          "The Flutter app asks the Node.js/Express service to create a bill, checks the response, and opens the ToyyibPay page. The service handles provider callbacks and records payments in Firebase.",
      },
    ],
    screenshots: [
      {
        src: publicPath("/projects/urban-drive/rider-dashboard.webp"),
        title: "Choose a pickup",
        caption:
          "Rider dashboard with location detection and destination search. Final report, Figure 3.8.1.",
        group: "Rider",
        width: 438,
        height: 974,
      },
      {
        src: publicPath("/projects/urban-drive/booking-preview.webp"),
        title: "Review the journey",
        caption:
          "Route, estimated fare, payment method, and passenger package before booking. Final report, Figure 3.8.3.",
        group: "Rider",
        width: 416,
        height: 926,
      },
      {
        src: publicPath("/projects/urban-drive/driver-bookings.webp"),
        title: "Accept a request",
        caption:
          "Booking details with pickup, destination, fare, and accept/reject actions. Final report, Figure 3.7.5.",
        group: "Driver",
        width: 272,
        height: 605,
      },
      {
        src: publicPath("/projects/urban-drive/driver-arrival.webp"),
        title: "Arrive at pickup",
        caption:
          "Driver trip stage with route context, start-ride action, and passenger chat. Final report, Figure 3.7.6.",
        group: "Driver",
        width: 272,
        height: 606,
      },
      {
        src: publicPath("/projects/urban-drive/ride-completed.webp"),
        title: "Complete the ride",
        caption:
          "Completed trip state and journey details. Final report, Figure 3.7.6.",
        group: "Driver",
        width: 272,
        height: 606,
      },
      {
        src: publicPath("/projects/urban-drive/admin-dashboard.webp"),
        title: "Monitor operations",
        caption:
          "The report’s web dashboard with ride and revenue summaries. On-screen figures are captured UI content, not portfolio impact metrics. Final report, Figure 3.9.2.",
        group: "Admin",
        width: 914,
        height: 490,
      },
    ],
    status: {
      doneTitle: "Implemented",
      done: [
        "Rider and driver mobile app",
        "PHP web admin panel",
        "ToyyibPay commission payment flow",
        "Small pilot with students and drivers",
      ],
      openTitle: "Proposed, not built",
      open: [
        "More accurate location and timelier notifications while waiting for a driver",
        "Detailed transaction history and daily/monthly earnings summaries",
        "More e-wallet, FPX, or card payment options",
        "Emergency assistance during a trip",
      ],
      note: "This was an academic project. It hasn’t been released commercially, I didn’t measure performance gains, and there is no public demo.",
    },
    learned:
      "Analysing requirements before designing screens, keeping rider and driver data synchronized, and planning implementation time. Formal test results and measuring the pilot’s impact would be good next steps.",
    repositories: [
      {
        name: "PerdaRide-App",
        label: "Mobile application",
        url: `${github}/PerdaRide-App`,
        description:
          "Flutter remake with rider and driver features and Firebase repositories.",
      },
      {
        name: "AdminUrbanDrive",
        label: "Admin / PHP backend",
        url: `${github}/AdminUrbanDrive`,
        description:
          "PHP administration pages for the related Urban Drive / PerdaRide data.",
      },
      {
        name: "urbandrive-toyyibpay",
        label: "Payment integration",
        url: `${github}/urbandrive-toyyibpay`,
        description:
          "Node.js/Express commission payment service using ToyyibPay and Firebase.",
      },
    ],
    sources: [
      {
        label: "Mobile dependencies",
        url: `${github}/PerdaRide-App/blob/main/flutter_application_1/pubspec.yaml`,
      },
      {
        label: "Booking repository",
        url: `${github}/PerdaRide-App/blob/main/flutter_application_1/lib/features/booking/data/booking_repository.dart`,
      },
      {
        label: "Mobile payment service",
        url: `${github}/PerdaRide-App/blob/main/flutter_application_1/lib/features/driver/data/toyyibpay_service.dart`,
      },
      {
        label: "Admin ride management",
        url: `${github}/AdminUrbanDrive/blob/main/AdminUrbanDrive/pages/rides-management.php`,
      },
      {
        label: "Payment backend",
        url: `${github}/urbandrive-toyyibpay/blob/main/index.js`,
      },
    ],
  },
  {
    id: "readytech",
    slug: "readytech",
    title: "ReadyTech",
    category: "Personal project · IT service marketplace",
    statusLabel: "In early development",
    description:
      "An IT repair marketplace for customers and technicians. Accounts, device management, the database, and the admin console are built. Customer service requests are not built yet.",
    highlights: [
      "Flutter app with sign-up, sign-in, and device management, using BLoC and dependency injection",
      "PostgreSQL rules on Supabase for row-level security and job status changes",
      "Next.js admin console for technician verification, jobs, disputes, and pricing",
    ],
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
    ],
    github: `${github}/readytech`,
    overview:
      "ReadyTech is a personal project for requesting IT repair from nearby technicians. The repository holds a Flutter app, a Supabase backend, and a Next.js admin console.",
    problem:
      "In an IT repair, the customer and the technician have little way to check each other’s claims about the fault, the price, or the work done.",
    objective:
      "Coordinate repairs with clear roles, controlled status changes, and an administrator who can review the records.",
    features: [
      "Sign-up as a customer or technician, sign-in, password reset, email verification, and session restore.",
      "Customer device list and add-device screens.",
      "Job status rules stored in PostgreSQL and enforced by a database trigger.",
      "Database functions for ranking technicians and accepting a job.",
      "Admin console with technician approval, document review, job and dispute handling, catalogue, pricing, and an audit log.",
    ],
    role: "Personal project covering the Flutter app, database, and admin console.",
    contributions: [
      "Flutter app structure with repositories, BLoC state management, routing, and dependency injection.",
      "Supabase migrations for the schema, row-level security, job lifecycle, and matching.",
      "Next.js admin console that signs in as an ordinary Supabase user and calls restricted database functions.",
      "Dart, Vitest, and SQL tests in the repository.",
    ],
    implementation: [
      {
        title: "App structure",
        description:
          "Uses flutter_bloc, get_it, go_router, and supabase_flutter. The auth repository and AuthBloc keep session handling separate from the screens.",
      },
      {
        title: "Job status rules",
        description:
          "Allowed transitions and who may make them are stored in a table. A database trigger checks every write, so the rules don’t depend on the UI.",
      },
      {
        title: "Job acceptance",
        description:
          "Job acceptance is serialized in the database, so technicians can’t both take one job. I haven’t load-tested it under concurrent requests.",
      },
    ],
    status: {
      doneTitle: "Built",
      done: [
        "Accounts and authentication",
        "Customer device management",
        "Database schema, security rules, and job lifecycle",
        "Admin console",
      ],
      openTitle: "Not built yet",
      open: [
        "Reporting a problem and creating a service request in the app",
        "Technician availability and job requests in the app",
        "Live tracking, notifications, and chat screens",
        "Diagnosis, quotation, payment, and review screens",
      ],
      note: "ReadyTech isn’t a public service, and there is no demo yet. The README also describes later phases that are still planned.",
    },
    repositories: [
      {
        name: "readytech",
        label: "Application, backend & admin",
        url: `${github}/readytech`,
        description:
          "Monorepo with app/, supabase/, admin/, and supporting documentation.",
      },
    ],
    sources: [
      {
        label: "Project README and status",
        url: `${github}/readytech/blob/main/README.md`,
      },
      {
        label: "Flutter dependencies",
        url: `${github}/readytech/blob/main/app/pubspec.yaml`,
      },
      {
        label: "Authentication state",
        url: `${github}/readytech/blob/main/app/lib/features/auth/bloc/auth_bloc.dart`,
      },
      {
        label: "Lifecycle migration",
        url: `${github}/readytech/blob/main/supabase/migrations/20260101001100_lifecycle.sql`,
      },
      {
        label: "Matching migration",
        url: `${github}/readytech/blob/main/supabase/migrations/20260101001300_matching.sql`,
      },
      {
        label: "Technician admin actions",
        url: `${github}/readytech/blob/main/admin/src/app/(console)/technicians/actions.ts`,
      },
    ],
  },
  {
    id: "steelfit",
    slug: "steelfit",
    title: "SteelFit",
    category: "Semester 4 project · Native Android",
    statusLabel: "Academic prototype",
    description:
      "A native Android gym app written in Java with XML layouts and SQL Server. It covers login, registration, adding trainers, and browsing a trainer list.",
    highlights: [
      "Login with separate user and admin screens",
      "Trainer list loaded from SQL Server on a background thread",
      "Add-trainer form with a duplicate-name check",
    ],
    stack: ["Java", "Android", "XML layouts", "SQL Server", "JDBC"],
    github: `${github}/SteelFit`,
    overview:
      "SteelFit is a Semester 4 project built with native Android activities and XML layouts, connected to SQL Server.",
    problem:
      "A coursework exercise: a mobile interface for finding gym trainers.",
    objective:
      "Practise native Android development: screen navigation, list rendering, forms, and database access.",
    features: [
      "Registration and login that check user records in SQL Server.",
      "Different screens for users and administrators, based on the stored role.",
      "Trainer list showing name, age, specialization, experience, and photo.",
      "Admin form to add a trainer, with a check for existing names.",
    ],
    role: "Academic project. This page covers what is in the public Java and layout files.",
    contributions: [
      "Java activities and XML layouts.",
      "Login, registration, and add-trainer database operations with prepared statements.",
      "Trainer list using RecyclerView and a custom adapter.",
    ],
    implementation: [
      {
        title: "Native Android UI",
        description:
          "Java activities with AndroidX, Material components, XML layouts, and RecyclerView.",
      },
      {
        title: "SQL Server access",
        description:
          "Uses the jTDS driver and JDBC prepared statements. BookingActivity loads trainers on a background thread, then updates the list on the UI thread.",
      },
      {
        title: "Trainer photos",
        description:
          "BookingAdapter decodes image bytes from the database and shows them in the list.",
      },
    ],
    status: {
      doneTitle: "Implemented in the public code",
      done: [
        "Registration and login",
        "User and admin navigation",
        "Trainer list",
        "Adding a trainer",
      ],
      openTitle: "Unfinished in the public code",
      open: [
        "Saving a booking",
        "Viewing bookings (layout only)",
        "Managing trainers (layout only)",
        "Saving the selected trainer photo",
      ],
      note: "Booking worked in my own copy of the app, but that code isn’t in the public repository, so I don’t list it as implemented here. I don’t have screenshots of the app.",
    },
    repositories: [
      {
        name: "SteelFit",
        label: "Native Android application",
        url: `${github}/SteelFit`,
        description:
          "Java activities, Android XML layouts, Gradle configuration, and existing project artwork.",
      },
    ],
    sources: [
      {
        label: "Android dependencies",
        url: `${github}/SteelFit/blob/master/app/build.gradle`,
      },
      {
        label: "Trainer retrieval",
        url: `${github}/SteelFit/blob/master/app/src/main/java/com/kelasandroidappsirhafizee/steelfit/BookingActivity.java`,
      },
      {
        label: "Trainer adapter",
        url: `${github}/SteelFit/blob/master/app/src/main/java/com/kelasandroidappsirhafizee/steelfit/BookingAdapter.java`,
      },
      {
        label: "Booking screen scope",
        url: `${github}/SteelFit/blob/master/app/src/main/java/com/kelasandroidappsirhafizee/steelfit/ViewBooking.java`,
      },
    ],
  },
];

import { publicPath } from "@/lib/paths";
export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  github: string;
  overview: string;
  motivation: string;
  role: string;
  contributions: string[];
  features: string[];
  implementation: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  scope: string;
  repositories: {
    name: string;
    label: string;
    url: string;
    description: string;
  }[];
  sources: { label: string; url: string }[];
  story?: {
    status: string;
    pilot?: { users: number; drivers: number };
    audience: { title: string; description: string }[];
    journey: { title: string; description: string }[];
    process: { title: string; description: string }[];
    roadmap: { title: string; description: string }[];
    reflection: string;
  };
  screenshots?: ProjectScreenshot[];
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
    number: "01",
    title: "Urban Drive / PerdaRide",
    category: "Independent final year project · E-hailing",
    description:
      "A campus e-hailing project built to replace scattered WhatsApp bookings with connected rider, driver, and admin workflows. Developed independently and tried in a small student/driver pilot.",
    stack: [
      "Flutter",
      "Dart",
      "PHP",
      "Firebase",
      "Mapbox",
      "Node.js",
      "Express",
    ],
    github: `${github}/PerdaRide-App`,
    overview:
      "Urban Drive is my independently developed final year project for Institut Kemahiran Tinggi Perda-Tech. It brings campus ride booking, driver trip management, and web-based administration into one project. It was tried in a small student/driver pilot. The final report documents the academic application; the linked repositories include the related PerdaRide Flutter remake, PHP admin panel, and ToyyibPay service.",
    motivation:
      "Campus transport bookings were arranged manually through WhatsApp, leaving ride details scattered across messages. Unread requests, incomplete information, overlapping bookings, and difficult-to-track payment records motivated a central place to book, manage, and review journeys.",
    role: "Independent developer responsible for requirements, interface design, mobile and web implementation, backend integration, testing, and the final project report.",
    contributions: [
      "Translated campus booking problems into separate rider, driver, and administrator workflows.",
      "Designed interfaces in Figma and built the mobile application using Flutter and Dart, including map-based pickup and destination selection.",
      "Integrated Firebase Authentication and Realtime Database for accounts, bookings, ride status, and driver data.",
      "Built the PHP web admin interface and connected the ToyyibPay commission-payment service.",
      "Tested the application using Android devices/emulators and Firebase tools, and documented the design, implementation, and findings.",
    ],
    features: [
      "Rider pickup and drop-off selection, route preview, estimated fare, payment-method selection, and passenger-capacity options.",
      "Driver registration with document submission and approval status, booking acceptance, arrival, start-ride, and completion screens.",
      "Ride-status updates, rider–driver chat, trip history, notifications, and driver earnings views.",
      "Web administration for ride monitoring, driver applications, fare settings, commission deadlines, users, feedback, and reports.",
      "ToyyibPay commission-payment flow, supported by bill-creation and callback code in the related service.",
    ],
    implementation: [
      {
        title: "Mobile application",
        description:
          "The report documents Flutter/Dart screens for riders and drivers and Mapbox-based location functionality. Firebase Authentication handles accounts; Realtime Database synchronizes bookings and trip data. In the related PerdaRide remake, BookingRepository centralizes booking writes and streams.",
      },
      {
        title: "Admin and backend",
        description:
          "The report’s web administration interface uses HTML, CSS, and PHP. The related AdminUrbanDrive repository contains session-gated pages for rides, driver applications, users, fares, and commissions. Its ride-management code reads the mobile booking schema.",
      },
      {
        title: "Payment service",
        description:
          "The report shows a driver commission-payment flow through ToyyibPay. The related Node.js/Express service creates bills, receives callbacks, and writes Firebase payment records. Rider fare choices and driver commission settlement are separate flows.",
      },
    ],
    challenges: [
      {
        title: "Turning chat-based requests into a clear journey",
        description:
          "The report identifies incomplete messages, unread requests, and unstructured records as the initial problems. The application introduces explicit pickup, destination, fare, passenger-capacity, and trip-status screens instead of relying on a message thread.",
      },
      {
        title: "Keeping booking data consistent",
        description:
          "The admin ride page explicitly handles the mobile app’s userId, driverId, pickupAddress, fareLabel, and createdAt fields, normalizes statuses, and resolves names from user and driver records.",
      },
      {
        title: "Connecting mobile payments to the backend",
        description:
          "The Flutter payment service serializes a bill request, checks HTTP status, validates the returned payment URL, and launches the external payment page. The Express service handles provider callbacks separately.",
      },
    ],
    scope:
      "This was an academic project that I tried in a small pilot with 15 users and 5 drivers. The features and screenshots come from my final project report, and the linked repositories include a related Flutter remake. It hasn’t been released commercially, and I didn’t measure performance gains. There is no public demo.",
    story: {
      status: "FYP · Small student/driver pilot",
      pilot: { users: 15, drivers: 5 },
      audience: [
        {
          title: "Riders",
          description:
            "Choose locations, review the fare and passenger capacity, request a ride, and follow its status.",
        },
        {
          title: "Drivers",
          description:
            "Apply for approval, accept suitable bookings, update trip stages, and review earnings and commissions.",
        },
        {
          title: "Administrators",
          description:
            "Review driver applications, monitor rides, configure fares, and manage records through a web dashboard.",
        },
      ],
      journey: [
        {
          title: "Choose a journey",
          description:
            "Select pickup and destination, review the route and estimated fare, and choose a capacity and payment method.",
        },
        {
          title: "Accept a booking",
          description:
            "A driver reviews the request, pickup and drop-off details, fare, and passenger package before accepting.",
        },
        {
          title: "Manage the ride",
          description:
            "Progress through arrival, ride start, and completion, with status updates and rider–driver communication.",
        },
        {
          title: "Review the records",
          description:
            "Drivers review trip and earning records; administrators monitor rides, fares, and commissions.",
        },
      ],
      process: [
        {
          title: "Analyse & plan",
          description:
            "Documented WhatsApp booking problems, compared existing e-hailing interfaces, defined objectives, and planned the work using a Gantt chart.",
        },
        {
          title: "Design",
          description:
            "Prepared Figma interface designs, rider/driver/admin flowcharts, and a conceptual data model before implementation.",
        },
        {
          title: "Build & test",
          description:
            "Implemented the mobile and web interfaces, integrated Firebase and payment services, and tested with Android devices/emulators and Firebase Console.",
        },
        {
          title: "Demonstrate & reflect",
          description:
            "Prepared the final report and assessment demonstration. A small student/driver pilot provided experience beyond the development environment.",
        },
      ],
      roadmap: [
        {
          title: "More dependable ride updates",
          description:
            "Improve location accuracy and notification timeliness, particularly while riders are waiting for a driver.",
        },
        {
          title: "Clearer payment history",
          description:
            "Provide more detailed transaction records and clearer daily/monthly earnings summaries.",
        },
        {
          title: "Broader payment options",
          description:
            "Evaluate additional e-wallet, FPX, or card options. These are ideas for future work and aren’t built yet.",
        },
        {
          title: "Emergency assistance",
          description:
            "Explore an emergency-help action and define how assistance would be requested and handled during a trip.",
        },
      ],
      reflection:
        "The report highlights the value of analysing requirements before designing screens, keeping rider and driver data synchronized, and planning implementation time. It covers what the application does; formal test results and measuring the pilot’s impact would be good next steps.",
    },
    screenshots: [
      {
        src: publicPath("/projects/urban-drive/rider-dashboard.png"),
        title: "Choose a pickup",
        caption:
          "Rider dashboard with location detection and destination search. Final report, Figure 3.8.1.",
        group: "Rider",
        width: 438,
        height: 974,
      },
      {
        src: publicPath("/projects/urban-drive/booking-preview.png"),
        title: "Review the journey",
        caption:
          "Route, estimated fare, payment method, and passenger package before booking. Final report, Figure 3.8.3.",
        group: "Rider",
        width: 416,
        height: 926,
      },
      {
        src: publicPath("/projects/urban-drive/driver-bookings.png"),
        title: "Accept a request",
        caption:
          "Booking details with pickup, destination, fare, and accept/reject actions. Final report, Figure 3.7.5.",
        group: "Driver",
        width: 272,
        height: 605,
      },
      {
        src: publicPath("/projects/urban-drive/driver-arrival.png"),
        title: "Arrive at pickup",
        caption:
          "Driver trip stage with route context, start-ride action, and passenger chat. Final report, Figure 3.7.6.",
        group: "Driver",
        width: 272,
        height: 606,
      },
      {
        src: publicPath("/projects/urban-drive/ride-completed.png"),
        title: "Complete the ride",
        caption:
          "Completed trip state and journey details. Final report, Figure 3.7.6.",
        group: "Driver",
        width: 272,
        height: 606,
      },
      {
        src: publicPath("/projects/urban-drive/admin-dashboard.png"),
        title: "Monitor operations",
        caption:
          "The report’s web dashboard with ride and revenue summaries. On-screen figures are captured UI content, not portfolio impact metrics. Final report, Figure 3.9.2.",
        group: "Admin",
        width: 914,
        height: 490,
      },
    ],
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
    number: "02",
    title: "ReadyTech",
    category: "Personal project · IT service marketplace",
    description:
      "A Flutter and Supabase project for IT service requests, with authentication, database-enforced job workflows, technician matching functions, and a Next.js admin console.",
    stack: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
    ],
    github: `${github}/readytech`,
    overview:
      "ReadyTech explores an on-demand IT service marketplace connecting customers and technicians. Its repository separates a Flutter application, a Supabase backend, and a Next.js administrator console. It’s at the foundation stage, with a broader repair-service lifecycle planned around it.",
    motivation:
      "Explore how customers and technicians can coordinate service requests with explicit roles, controlled status changes, and reviewable administration.",
    role: "Personal development project. This case study covers what’s in my public repository; ReadyTech hasn’t been released as a live marketplace.",
    contributions: [
      "Built a Flutter application organized around repositories, BLoC state management, routing, and dependency injection.",
      "Implemented Supabase database migrations and backend functions for the service domain.",
      "Developed a Next.js admin console with technician-document review and status actions.",
    ],
    features: [
      "Authentication session restoration, sign-out, and profile resolution in a central AuthBloc.",
      "PostgreSQL service-status transition rules and trigger-based enforcement.",
      "Database functions for technician ranking and serialized job acceptance.",
      "Admin actions for technician approval, rejection, suspension, and document review.",
    ],
    implementation: [
      {
        title: "Flutter client",
        description:
          "The app uses flutter_bloc, get_it, go_router, and supabase_flutter. Its auth repository and AuthBloc separate session handling from presentation.",
      },
      {
        title: "Supabase backend",
        description:
          "SQL migrations define the service domain, lifecycle transitions, row-level security, matching, storage, and realtime configuration. Matching logic is implemented in PostgreSQL functions.",
      },
      {
        title: "Administration",
        description:
          "The Next.js console uses server actions and Supabase RPCs for administrative operations, including technician and verification decisions.",
      },
    ],
    challenges: [
      {
        title: "Preventing invalid job transitions",
        description:
          "The lifecycle migration stores allowed state transitions and actors, then checks writes through a database trigger rather than relying solely on UI controls.",
      },
      {
        title: "Avoiding competing job assignments",
        description:
          "The matching migration implements server-side ranking and serialized acceptance logic. I haven’t load-tested its behavior under concurrent requests.",
      },
    ],
    scope:
      "ReadyTech is still in development and isn’t a public service. The end-to-end repair features described in the README are planned for later phases. There is no public demo to link yet.",
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
    number: "03",
    title: "SteelFit",
    category: "Academic project · Native Android",
    description:
      "A Java Android gym-trainer application exploring account access, trainer discovery, and SQL Server data integration, with booking-related UI scaffolding.",
    stack: ["Java", "Android", "XML layouts", "SQL Server", "JDBC"],
    github: `${github}/SteelFit`,
    overview:
      "SteelFit is a semester project built with native Android activities and XML layouts. It has login and registration screens, trainer-list retrieval, profile-image rendering, and interfaces intended for trainer booking and management.",
    motivation:
      "Explore a mobile interface for finding gym trainers while practising Android screen navigation, list rendering, and database-backed functionality.",
    role: "Academic application development project. This summary covers what’s in the public Java and layout files.",
    contributions: [
      "Developed Java Android activities and XML-based interfaces.",
      "Implemented database-backed trainer-list retrieval and RecyclerView presentation.",
      "Worked with account-access screens and trainer-selection navigation.",
    ],
    features: [
      "Login flow with database-backed account checks.",
      "Trainer-list queries returning name, specialization, experience, and image data.",
      "RecyclerView adapter binding trainer details and decoding stored image bytes.",
      "Booking-related navigation passing trainer identifiers between activities.",
    ],
    implementation: [
      {
        title: "Native Android UI",
        description:
          "Java activities use AndroidX, Material components, XML layouts, and RecyclerView to display trainer information.",
      },
      {
        title: "Database integration",
        description:
          "The Gradle configuration includes jTDS, and the booking activity queries SQL Server trainer records using JDBC prepared statements. Database work runs on a background thread before updating the UI.",
      },
      {
        title: "Project boundaries",
        description:
          "ViewBooking and ManageTrainer contain layout scaffolding; the public code doesn’t include a complete, saved booking workflow.",
      },
    ],
    challenges: [
      {
        title: "Displaying database records on Android",
        description:
          "BookingActivity collects trainer rows on a background thread and updates its list on the UI thread. BookingAdapter decodes profile images from database byte arrays.",
      },
    ],
    scope:
      "SteelFit is an academic prototype. In the public code, the booking and management screens are scaffolding and don’t form a complete reservation system.",
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

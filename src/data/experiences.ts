import type { Experience } from "@/types/portfolio";

// ---------------------------------------------------------------------------
// Experience data
//
// Each entry drives both the /experience index card and its detail page.
// `template` selects which page template renders the entry — see
// src/components/templates/*.
//
// To add a new experience:
//   1. Add an object below with a unique `slug`.
//   2. Pick a `template`: "technical-system" | "commercial-product" | "engineering-workflow".
//   3. Fill in the fields required by that template (see src/types/portfolio.ts).
//   4. The route /experience/[slug] and the homepage/experience-index cards
//      pick it up automatically — no routing changes needed.
// ---------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    slug: "obvs",
    template: "technical-system",
    organization: "OBVS",
    role: "Full-Stack Developer",
    dates: "March 2025 – June 2025",
    location: "Remote",
    shortDescription: "Modernized internal volunteer management platform",
    technologies: ["React", "Flask", "PostgreSQL", "Redis", "WebSocket", "Docker", "AWS"],
    githubLink: { label: "GitHub", href: "#", isPlaceholder: true, icon: "github" },
    liveDemoLink: { label: "Live demo", href: "http://3.21.164.240/login", icon: "external" },
    summary: "Modernization of an existing internal volunteer management platform for Oak Bay Volunteer Services.",
    overview: [
      {
        id: "background",
        title: "Background",
        body: "Oak Bay Volunteer Services had been relying on an aging internal management system that no longer supported the organization's evolving operational needs.",
      },
      {
        id: "why-redesign",
        title: "Why a redesign",
        body: "Instead of building an entirely new product from scratch, the goal of this project was to redesign and modernize the existing platform while preserving its core operational purpose.",
      },
      {
        id: "what-improved",
        title: "What was improved",
        body: "The new platform centralized volunteer management, coordinator workflows, donations, reporting, and real-time operational communication into one modern administrative system.",
      },
      {
        id: "my-role",
        title: "My role",
        body: "I contributed across frontend, backend, database, real-time communication, security, deployment, and overall system integration.",
      },
    ],
    challenges: [
      {
        title: "Manual volunteer notifications",
        summary:
          "Staff members had to manually send emails or SMS messages to volunteers because the previous system did not provide an integrated notification mechanism.",
      },
      {
        title: "Slow donation lookup",
        summary:
          "As donation records continued to grow, searching historical donation information became increasingly slow and inefficient.",
      },
      {
        title: "Fragmented administration workflow",
        summary:
          "Volunteer management, donations, reporting, and operational tasks were spread across disconnected workflows, increasing administrative effort.",
      },
      {
        title: "Outdated user experience",
        summary:
          "The previous administrative interface no longer supported an efficient workflow for daily operations and required modernization.",
      },
    ],
    solutions: [
      {
        title: "Modern Administrative Dashboard",
        problemSolved: "Fragmented administration workflow",
        description:
          "A React-based administrative dashboard that consolidated volunteer management, coordinator operations, donations, reporting, and administrative tools into one consistent interface.",
        screenshot: { id: "dashboard", kind: "image", alt: "Administrative dashboard screenshot", src: "/images/obvs_dashboard.png" },
        technologies: ["React", "Flask", "REST API"],
      },
      {
        title: "Real-time Notification System",
        problemSolved: "Manual volunteer notifications",
        description:
          "A WebSocket-based notification system that pushes volunteer and coordinator updates the moment they happen, replacing manual emails and texts.",
        architecture: {
          nodes: [
            { id: "react", label: "React", sublabel: "Client", tier: 0 },
            { id: "websocket", label: "WebSocket", sublabel: "Persistent connection", tier: 1 },
            { id: "flask", label: "Flask", sublabel: "Application server", tier: 2 },
            { id: "redis", label: "Redis Pub/Sub", sublabel: "Event broadcast", tier: 3 },
            { id: "clients", label: "Connected Clients", sublabel: "All active sessions", tier: 4 },
          ],
          connections: [
            { from: "react", to: "websocket" },
            { from: "websocket", to: "flask" },
            { from: "flask", to: "redis" },
            { from: "redis", to: "clients" },
          ],
        },
        explanationPoints: [
          "WebSocket replaced repeated polling, pushing updates to volunteers and coordinators the moment an event occurred.",
          "Redis Pub/Sub synchronized events across multiple Gunicorn workers, so a message published on one worker reached clients connected to any other.",
          "The frontend automatically recovered application state after reconnection, so a dropped connection never resulted in stale or missing data.",
        ],
        whyThisDesign:
          "WebSocket removed the latency and server load of constant polling, and Redis Pub/Sub was the simplest way to keep real-time events consistent once the app ran behind multiple Gunicorn workers instead of a single process.",
        technologies: ["WebSocket", "Redis Pub/Sub", "Flask"],
      },
      {
        title: "Performance Optimization",
        problemSolved: "Slow donation lookup",
        description:
          "Donation history lookups slowed as records accumulated, because common search fields weren't indexed and PostgreSQL had to scan entire tables for each query.",
        architecture: {
          nodes: [
            { id: "before", label: "Sequential Scan", sublabel: "Before — scans every row", tier: 0 },
            { id: "after", label: "Index Scan", sublabel: "After — targeted lookup", tier: 1 },
          ],
          connections: [{ from: "before", to: "after", label: "Added index + query rewrite" }],
        },
        explanationPoints: [
          "Added targeted indexes on the columns donation searches filtered and sorted by.",
          "Used EXPLAIN ANALYZE to identify full table scans and rewrote slow queries around the new indexes.",
          "Reduced lookup time on large donation histories, keeping search responsive as records grew.",
        ],
        technologies: ["PostgreSQL", "Indexes", "EXPLAIN ANALYZE"],
      },
      {
        title: "Production-ready Deployment",
        problemSolved: "Reliable day-to-day operation",
        description:
          "Every service ran as a container defined in Docker Compose and deployed to a single AWS EC2 instance behind Nginx and Gunicorn, with authentication, access control, and health checks keeping the system secure and observable in production.",
        architecture: {
          nodes: [
            { id: "internet", label: "Internet", tier: 0 },
            { id: "nginx", label: "Nginx", sublabel: "Reverse proxy", tier: 1 },
            { id: "gunicorn", label: "Gunicorn", sublabel: "WSGI server", tier: 2 },
            { id: "flask", label: "Flask", sublabel: "Application", tier: 3 },
            { id: "postgres", label: "PostgreSQL", sublabel: "Primary data store", tier: 4 },
            { id: "redis-deploy", label: "Redis", sublabel: "Pub/Sub + cache", tier: 4 },
            { id: "compose", label: "Docker Compose", sublabel: "Orchestration", tier: 5 },
            { id: "ec2", label: "AWS EC2", sublabel: "Host", tier: 6 },
          ],
          connections: [
            { from: "internet", to: "nginx" },
            { from: "nginx", to: "gunicorn" },
            { from: "gunicorn", to: "flask" },
            { from: "flask", to: "postgres" },
            { from: "flask", to: "redis-deploy" },
            { from: "postgres", to: "compose" },
            { from: "redis-deploy", to: "compose" },
            { from: "compose", to: "ec2" },
          ],
        },
        explanationPoints: [
          "Docker Compose packaged the API, database, and Redis as reproducible containers, making deployment and rollback predictable.",
          "JWT authentication and role-based access control (RBAC) restricted actions to the appropriate coordinator or administrator role.",
          "CSRF protection and environment-based configuration kept secrets and database URLs out of the codebase across environments.",
          "Health check endpoints let Nginx and the deployment process detect and recover from an unhealthy container automatically.",
        ],
        technologies: ["Docker", "Nginx", "AWS EC2", "JWT", "RBAC"],
      },
    ],
    metrics: [
      { label: "Concurrent users supported", value: "80+" },
      { label: "Real-time update latency", value: "Sub-second" },
      { label: "Database query performance improvement", value: "30%" },
    ],
    resultsSummary:
      "The completed platform replaced a fragmented set of manual workflows with a single real-time administrative system — giving Oak Bay Volunteer Services faster donation lookups, instant volunteer notifications, and a consolidated dashboard for day-to-day operations.",
    gallery: [
      { id: "dashboard", kind: "image", src: "/images/obvs_dashboard.png", alt: "OBVS administrative dashboard", caption: "Administrative dashboard — volunteers, coordinators, donations, and reporting in one view." },
      { id: "volunteer-management", kind: "image", src: "/images/obvs_volunteers.png", alt: "OBVS volunteer management page", caption: "Volunteer management — coordinator workflows for scheduling and tracking volunteers." },
      { id: "donation-management", kind: "image", src: "/images/obvs_donations.png", alt: "OBVS donation management page", caption: "Donation management — indexed search across historical donation records." },
      { id: "notification-workflow", kind: "image", src: "/images/obvs_notifications.png", alt: "OBVS notification center", caption: "Notification workflow — real-time WebSocket updates delivered to volunteers and staff." },
      { id: "reports", kind: "image", src: "/images/obvs_reports.png", alt: "OBVS reports dashboard", caption: "Reports — donation trends, volunteer activity, and service request metrics in one operational view." },
    ],
  },

  {
    slug: "oppo",
    template: "commercial-product",
    organization: "OPPO",
    role: "Android Framework Engineer",
    dates: "Dates will be added.",
    location: "Location will be added.",
    shortDescription:
      "Built Android framework features supporting device security, system initialization, and activation workflows for ColorOS.",
    technologies: ["Android", "Java", "Android Framework", "System Services"],
    platformTagline: "ColorOS Platform",
    roleSummary:
      "Android Framework Engineer on OPPO's ColorOS platform team, focused on device security, system initialization, and activation workflows.",
    proprietaryNotice:
      "Some implementation details have been omitted because this work was completed on proprietary commercial products.",
    productIntro: {
      image: { id: "coloros-intro", kind: "image", alt: "ColorOS product introduction", src: "/images/oppo_coloros.png" },
      title: "ColorOS",
      description:
        "ColorOS is OPPO's customized Android operating system. It powers smartphones, tablets, foldables, smart devices, and cross-device experiences throughout the OPPO ecosystem.",
      officialLink: { label: "Official website", href: "https://www.oppo.com/en/coloros16/", icon: "external" },
    },
    background: [
      {
        id: "role",
        title: "My Role",
        body: "As an Android Framework Engineer on the ColorOS platform team, my responsibilities spanned Android framework development, platform-level system functionality, device security features, and cross-device connectivity — supporting phones, tablets, PCs, and TVs. I contributed to both new feature development and UI modernization for newer Android platform releases, working closely with Product Managers, UI/UX designers, and QA engineers throughout.",
      },
    ],
    features: [
      {
        slug: "device-lock-workflow",
        name: "Device Lock Workflow",
        background:
          "Device theft and unauthorized resale are an ongoing risk for any consumer phone manufacturer, particularly when a device changes SIM cards or is reactivated outside its original account.",
        requirementLabel: "Business Requirement",
        requirement: "Prevent unauthorized device usage after SIM replacement or activation changes.",
        contribution:
          "I implemented framework-level logic that runs during system boot and SIM state changes, coordinating between initialization, carrier validation, and the device lock state.",
        technicalApproachLabel: "High-level Technical Implementation",
        technicalApproach:
          "The feature hooks into the Android framework's boot and SIM-ready lifecycle events, validates carrier and activation state against secure device records, and triggers a lock state with a corresponding user notification when validation fails.",
        outcome:
          "Reduced the window during which a lost or stolen device could be reactivated on another carrier account, without adding noticeable delay to normal boot and setup flows.",
        workflow: [
          { id: "boot", label: "Boot" },
          { id: "framework-init", label: "Framework Initialization" },
          { id: "sim-ready", label: "SIM Ready" },
          { id: "carrier-validation", label: "Carrier Validation" },
          { id: "device-lock", label: "Device Lock" },
          { id: "user-notification", label: "User Notification" },
        ],
      },
      {
        slug: "unauthorized-sim-detection",
        name: "Unauthorized SIM Detection",
        background:
          "Beyond the initial activation check, the system needed to react any time a SIM was swapped after setup, not just at first boot.",
        requirementLabel: "Business Requirement",
        requirement:
          "Detect and respond to SIM changes that may indicate unauthorized device use, after the device has already been activated.",
        contribution:
          "I built the framework service that listens for SIM state broadcasts and re-runs the security verification pipeline used during activation.",
        technicalApproachLabel: "High-level Technical Implementation",
        technicalApproach:
          "A broadcast receiver observes SIM state changes and hands off to a framework service, which re-validates the new SIM against stored security state before deciding whether to lock the device.",
        outcome:
          "Closed a gap where a device could pass activation but later have its SIM swapped without any further validation.",
        workflow: [
          { id: "sim-changed", label: "SIM Changed" },
          { id: "broadcast-receiver", label: "Broadcast Receiver" },
          { id: "framework-service", label: "Framework Service" },
          { id: "security-verification", label: "Security Verification" },
          { id: "device-lock", label: "Device Lock" },
        ],
      },
      {
        slug: "o-plus-connect",
        name: "O+ Connect",
        productIntro: {
          image: { id: "oconnect-intro", kind: "image", alt: "O+ Connect product introduction", src: "/images/oconnect.png" },
          title: "O+ Connect",
          description:
            "O+ Connect is OPPO's cross-device ecosystem platform, enabling seamless collaboration between phones, tablets, PCs, and TVs — including device discovery, cross-device login, nearby connection, notification synchronization, clipboard sharing, and file transfer.",
          officialLink: { label: "Official website", href: "https://connect.oppo.com/#/", icon: "external" },
        },
        background:
          "Modern users increasingly expect seamless interaction between their multiple personal devices. Cross-device continuity became an important product direction for improving productivity and user experience across the OPPO ecosystem.",
        requirementLabel: "Business Requirement",
        requirement:
          "Provide a consistent cross-device experience across phones, tablets, PCs, and TVs, while ensuring reliable discovery, pairing, and collaboration between devices.",
        contribution:
          "I developed Android framework features supporting OPPO's cross-device ecosystem, working across phones, tablets, PCs, and TV devices. I supported multiple cross-device capabilities including cross-device login, device discovery, nearby connection, notification synchronization, clipboard sharing, and file transfer, and participated in UI modernization for tablet connectivity features when adapting to newer Android platform versions. Throughout, I collaborated closely with Product Managers, UI/UX designers, and QA engineers.",
        technicalApproachLabel: "High-level Technical Overview",
        technicalApproach:
          "Multiple Android devices cooperate to establish trusted connections, enabling seamless discovery, pairing, and collaboration across the ecosystem — from unlocking a tablet with a nearby phone to sharing files, clipboard content, and notifications between devices.",
        outcome:
          "Improved cross-device user experience and consistency across device categories, supported ecosystem expansion to tablets and larger-screen devices, and delivered redesigned tablet interaction experiences for newer Android releases.",
        architecture: {
          nodes: [
            { id: "phones", label: "Phones", tier: 0 },
            { id: "tablets", label: "Tablets", tier: 0 },
            { id: "pcs", label: "PCs", tier: 0 },
            { id: "tvs", label: "TVs", tier: 0 },
            { id: "oconnect", label: "O+ Connect", sublabel: "Cross-device platform", tier: 1 },
            { id: "login", label: "Cross-device Login", tier: 2 },
            { id: "discovery", label: "Device Discovery", tier: 2 },
            { id: "nearby", label: "Nearby Connection", tier: 2 },
            { id: "notification-sync", label: "Notification Sync", tier: 2 },
            { id: "clipboard", label: "Clipboard Sharing", tier: 2 },
            { id: "file-transfer", label: "File Transfer", tier: 2 },
          ],
          connections: [
            { from: "phones", to: "oconnect" },
            { from: "tablets", to: "oconnect" },
            { from: "pcs", to: "oconnect" },
            { from: "tvs", to: "oconnect" },
            { from: "oconnect", to: "login" },
            { from: "oconnect", to: "discovery" },
            { from: "oconnect", to: "nearby" },
            { from: "oconnect", to: "notification-sync" },
            { from: "oconnect", to: "clipboard" },
            { from: "oconnect", to: "file-transfer" },
          ],
        },
      },
    ],
  },

  {
    slug: "oneplus",
    template: "commercial-product",
    organization: "OnePlus",
    role: "Android Software Engineer",
    dates: "Dates will be added.",
    location: "Location will be added.",
    shortDescription:
      "Improved accessibility experiences and system applications through RTT, Contacts, and Phone feature development.",
    technologies: ["Android", "Kotlin", "Accessibility"],
    platformTagline: "System Applications & Accessibility",
    roleSummary:
      "Android Software Engineer on OnePlus's system applications team, improving accessibility, Contacts, and Phone experiences.",
    proprietaryNotice:
      "Some implementation details have been omitted because this work was completed on proprietary commercial products.",
    background: [
      {
        id: "focus",
        title: "Focus area",
        body: "OnePlus develops Android system applications and accessibility experiences used across its device lineup.",
      },
      {
        id: "role",
        title: "My role",
        body: "I worked on accessibility features and core system applications, improving how people with hearing or speech impairments communicate and how everyday users interact with Contacts and Phone.",
      },
    ],
    features: [
      {
        slug: "rtt-accessibility",
        name: "RTT Accessibility",
        productIntro: {
          image: { id: "rtt-intro", kind: "image", alt: "Real-Time Text product introduction", src: "/images/oneplus_rtt.png" },
          title: "Real-Time Text (RTT)",
          description:
            "RTT is an accessibility feature that lets users communicate by typing text during a live phone call, streamed character by character as it's typed. It was developed for T-Mobile carrier customization.",
          officialLink: {
            label: "Official website",
            href: "https://www.t-mobile.com/responsibility/consumer-info/accessibility-policy",
            icon: "external",
          },
        },
        background:
          "Real-Time Text (RTT) transmits a call's text character by character as it's typed, instead of waiting for a full message, which matters most for callers who are deaf, hard of hearing, or speech-impaired.",
        requirementLabel: "User Problem",
        requirement:
          "Callers with hearing or speech impairments needed a way to communicate during a live call without relying on a separate relay service.",
        contribution:
          "I implemented the RTT accessibility feature within the Phone application, integrating it with the system's call and accessibility services.",
        technicalApproachLabel: "Technical Approach",
        technicalApproach:
          "RTT was integrated at the call and accessibility-service layer so text could stream in real time alongside a normal voice or text-relay call, following Android's accessibility service conventions.",
        outcome:
          "Gave users who are deaf, hard of hearing, or speech-impaired a built-in way to communicate over a call in real time, without a third-party relay app.",
      },
      {
        slug: "rcs-messaging",
        name: "RCS Messaging",
        productIntro: {
          image: { id: "rcs-intro", kind: "image", alt: "RCS Messaging product introduction", src: "/images/rcs.avif" },
          title: "RCS Messaging",
          description:
            "RCS Messaging is T-Mobile's enhanced messaging experience, supporting richer communication features beyond traditional SMS — including rich messaging, read receipts, typing indicators, high-quality media sharing, and group messaging.",
          officialLink: {
            label: "Official website",
            href: "https://www.t-mobile.com/support/plans-features/advanced-messaging",
            icon: "external",
          },
        },
        background:
          "T-Mobile was expanding Rich Communication Services (RCS) to improve the default messaging experience on Android devices. The objective was to provide users with a more modern messaging experience while maintaining compatibility with carrier requirements.",
        requirementLabel: "Business Requirement",
        requirement:
          "Ensure that RCS capabilities are correctly exposed throughout the system experience so users can easily understand and manage their messaging capabilities.",
        contribution:
          "I implemented Contacts and Phone application support for RCS status presentation, developing the UI and application logic for displaying RCS availability and RCS messaging indicators. I also added RCS-related settings and feature toggles within the Android Settings application, working closely with Product Managers, UI/UX designers, and QA engineers throughout development and validation.",
        technicalApproachLabel: "High-level Technical Overview",
        technicalApproach:
          "The implementation coordinated multiple system applications — Settings, Contacts, and Phone — to deliver a consistent RCS experience across calling, contacts, and settings.",
        outcome:
          "Improved user awareness of RCS capabilities, delivered a more consistent messaging experience across system applications, and supported carrier customization requirements for T-Mobile devices.",
        workflow: [
          { id: "carrier-config", label: "Carrier Configuration" },
          { id: "system-config", label: "System Configuration" },
          { id: "settings-toggle", label: "Settings Toggle" },
          { id: "contacts-phone-ui", label: "Contacts & Phone UI" },
          { id: "rcs-experience", label: "RCS Messaging Experience" },
        ],
      },
    ],
    responsibilities: {
      title: "Engineering Contributions",
      items: [
        {
          title: "Accessibility",
          summary: "Built and refined accessibility features like RTT that make core apps usable for people with hearing or speech impairments.",
        },
        {
          title: "System Applications",
          summary: "Worked within the Contacts and Phone system applications shipped on every device.",
        },
        {
          title: "User Experience",
          summary: "Balanced feature requirements against everyday usability for apps used by nearly every device owner.",
        },
        {
          title: "Cross-functional Collaboration",
          summary: "Partnered with design, QA, and accessibility stakeholders to validate features before release.",
        },
      ],
    },
  },

  {
    slug: "uvic-research",
    template: "engineering-workflow",
    organization: "University of Victoria",
    role: "Research Assistant",
    dates: "Dates will be added.",
    location: "Victoria, BC",
    shortDescription:
      "Designed and completed an engineering simulation workflow platform that centralizes COMSOL simulation data, documentation, and research records for nanophotonics research.",
    technologies: ["Python", "MATLAB", "COMSOL Multiphysics", "React", "Docker", "AWS", "GitHub Actions", "YAML"],
    focusTagline: "Research Assistant · Nanophotonics Research",
    summary:
      "This work combined computational nanophotonics research, COMSOL-based electromagnetic simulation, scientific data processing, research workflow automation, technical knowledge management, and semantic retrieval with AI-assisted research search. I designed and completed an Engineering Simulation Workflow Platform to centralize simulation data, technical documentation, and research records.",
    background: [
      {
        id: "research-focus",
        title: "Research focus",
        body: "The research modelled how surface roughness on whispering-gallery-mode microdisk cavities scatters light and degrades optical performance — work that depended on running and interpreting large numbers of COMSOL electromagnetic simulations.",
      },
      {
        id: "original-workflow",
        title: "Original workflow",
        body: "Simulation inputs, output files, plots, technical notes, and research records were distributed across different tools and directories. COMSOL simulations generated complex scientific datasets, and reproducing a previous experiment meant manually reconnecting simulation parameters, files, analysis scripts, and documentation. Locating a past configuration or result depended heavily on manual data organization.",
      },
    ],
    researchProblem: {
      scientificChallenge:
        "Understand how sidewall and top-surface roughness affects scattering loss and the quality factor of whispering-gallery-mode optical microcavities.",
      engineeringChallenge:
        "Create a structured and reproducible system for managing simulation configurations, generated datasets, plots, technical documentation, and historical research results.",
    },
    platform: {
      description:
        "I designed and completed a reusable engineering platform that centralized the research group's simulation configurations, COMSOL-generated results, processed scientific datasets, plots and exported files, experiment metadata, technical documentation, and historical research records.",
      capabilities: [
        "Simulation configurations and COMSOL-generated results",
        "Processed scientific datasets, plots, and exported files",
        "Experiment metadata and technical documentation",
        "Historical research records",
        "Automated data ingestion",
        "Semantic retrieval",
        "AI-assisted search",
      ],
      note: "The platform has been completed. The codebase is currently being refined and documented before public release.",
    },
    myRole: {
      summary:
        "I was responsible for the complete design and implementation of the platform, connecting its architecture directly to the requirements discovered during the optical microcavity research.",
      items: [
        "Analyzed the original research and simulation workflow.",
        "Identified data-management and reproducibility problems.",
        "Designed the full system architecture.",
        "Defined the research data model.",
        "Designed and implemented automated ingestion pipelines.",
        "Built data-processing workflows for simulation outputs.",
        "Implemented semantic retrieval and AI-assisted search workflows.",
        "Integrated simulation data, documentation, and research records into one platform.",
        "Containerized the application and its supporting services.",
        "Established reproducible deployment and configuration practices.",
        "Maintained data processing and application infrastructure using Docker, AWS, GitHub Actions, and YAML.",
      ],
    },
    architecture: {
      nodes: [
        { id: "researcher", label: "Researcher", tier: 0 },
        { id: "matlab-python", label: "MATLAB / Python Automation", tier: 0 },
        { id: "web-interface", label: "Web Interface", sublabel: "React", tier: 1 },
        { id: "comsol", label: "COMSOL Multiphysics", sublabel: "Simulation engine", tier: 1 },
        { id: "api-layer", label: "Application / API Layer", tier: 2 },
        { id: "sim-outputs", label: "Simulation Outputs", sublabel: "Params, fields, geometry, CSV, plots", tier: 2 },
        { id: "orchestration", label: "Workflow Orchestration", tier: 3 },
        { id: "ingestion", label: "Data Ingestion and Processing", tier: 4 },
        { id: "repository", label: "Structured Research Repository", tier: 5 },
        { id: "retrieval", label: "Semantic Retrieval / AI-assisted Search", tier: 6 },
      ],
      connections: [
        { from: "researcher", to: "web-interface" },
        { from: "matlab-python", to: "comsol" },
        { from: "web-interface", to: "api-layer" },
        { from: "comsol", to: "sim-outputs" },
        { from: "api-layer", to: "orchestration" },
        { from: "sim-outputs", to: "orchestration" },
        { from: "orchestration", to: "ingestion" },
        { from: "ingestion", to: "repository" },
        { from: "repository", to: "retrieval" },
      ],
    },
    infrastructure: ["Docker", "AWS", "GitHub Actions", "YAML"],
    workflow: {
      stages: [
        { id: "geometry", label: "Define Geometry and Optical Parameters" },
        { id: "roughness", label: "Generate Statistical Surface Roughness" },
        { id: "simulation", label: "Run 3D COMSOL Simulation" },
        { id: "extraction", label: "Extract Electromagnetic and Scattering Results" },
        { id: "compare", label: "Process and Compare Data" },
        { id: "store", label: "Store Results, Documentation, and Research Records" },
        { id: "retrieve", label: "Retrieve Historical Knowledge Through Search" },
      ],
      overview:
        "Each run generated Gaussian-distributed surface profiles using a controlled root-mean-square roughness height and correlation length, so results could be compared consistently across configurations.",
    },
    platformOutcome: [
      "Centralized simulation data, documentation, and research records.",
      "Reduced reliance on manual file organization.",
      "Improved reproducibility of engineering workflows.",
      "Enabled structured access to historical simulation results.",
      "Supported automated data ingestion and processing.",
      "Enabled semantic retrieval and AI-assisted research search.",
      "Established a reusable engineering workflow for future simulation projects.",
      "Reduced manual data-management effort by approximately 40% by centralizing simulation data, technical documentation, and research records.",
    ],
    researchOutcome: {
      summary:
        "The completed research produced a three-dimensional full-wave electromagnetic modelling framework for studying surface-roughness-induced scattering in whispering-gallery-mode microdisk cavities.",
      findings: [
        "Surface roughness degrades optical cavity quality factor.",
        "The research examined roughness on multiple cavity surfaces.",
        "Statistical roughness profiles were generated with controlled parameters.",
        "The modelling approach enabled detailed analysis of scattering effects.",
        "The results were compared with established semi-analytical models.",
        "The work provides guidance for fabrication optimization and future predictive modelling.",
      ],
    },
    publication: {
      title: "Optical Microcavity Surface Roughness Modelling",
      author: "Heming Qin",
      institution: "University of Victoria",
      description:
        "A three-dimensional full-wave electromagnetic modelling framework implemented in COMSOL Multiphysics to investigate how surface roughness affects scattering loss and the quality factor of whispering-gallery-mode microdisk cavities.",
      link: {
        label: "View Research",
        href: "https://dspace.library.uvic.ca/items/816fa476-c186-4ee2-868b-34cb5a68de79",
        icon: "external",
      },
    },
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((experience) => experience.slug === slug);
}

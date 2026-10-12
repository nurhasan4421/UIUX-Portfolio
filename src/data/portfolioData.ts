export interface Project {
  id: string;
  title: string;
  category: string;
  tag: string;
  summary: string;
  description: string;
  image: string;
  video?: string;
  dribbbleUrl: string;
  tools: string[];
  year: string;
  featured?: boolean;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface PhilosophyCard {
  id: string;
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "Nur Hasan",
  role: "UI/UX Product Designer",
  degree: "BSc in Computer Science & Engineering",
  location: "Dhaka, Bangladesh",
  email: "nurhasan90446@gmail.com",
  dribbble: "https://dribbble.com/nurhasan4421",
  github: "https://github.com",
  agency: "White Desk",
  tagline: "Bridging human emotion with engineering precision.",
  bioShort: "I create clean, user-centered digital products that blend flawless functionality with high-contrast monochrome aesthetics. With a computer science background, I build scalable design systems that developers can ship effortlessly.",
};

export const PROJECTS: Project[] = [
  {
    id: "amibachelor",
    title: "AmiBachelor Mobile App",
    category: "Mobile App • Fintech & Housing",
    tag: "Live Production App",
    summary: "Complete student living, shared mess management, and digital ledger app.",
    description: "Designed from ground up to solve daily living hurdles for thousands of bachelor students and shared housemates in Bangladesh. Includes room rental discovery, shared meal calculation, instant budgeting, and a seamless bilingual interface.",
    image: "https://cdn.dribbble.com/userupload/47537103/file/db9f80b2889673bb0b5ecbad833d016d.jpeg",
    dribbbleUrl: "https://dribbble.com/shots/27322305-AmiBechalor-App-Develop-design-on-live",
    tools: ["Figma", "User Flow", "Mobile UX", "Design Systems", "Fintech"],
    year: "2025",
    featured: true,
  },
  {
    id: "cellfin-redesign",
    title: "Cellfin App Modern Redesign",
    category: "Fintech • Digital Banking",
    tag: "Motion & UX Concept",
    summary: "Reimagining the premier Islamic banking app for speed and clarity.",
    description: "A total rethink of Cellfin's information architecture. Solved dense menu structures with an intuitive bottom navigation, instant biometric transfer triggers, smart card switching, and tactile haptic feedback micro-animations.",
    image: "https://cdn.dribbble.com/userupload/47536875/file/still-3717ae949ab989f5666d1e6146b17bb9.png",
    video: "https://cdn.dribbble.com/userupload/47536875/file/large-7bb8284c59c266928d5bb10df04eb228.mp4",
    dribbbleUrl: "https://dribbble.com/shots/27322231-Cellfin-App-redesign-concept",
    tools: ["Banking UX", "Motion Design", "Architecture", "Micro-Interactions"],
    year: "2025",
    featured: true,
  },
  {
    id: "anonymous-investor",
    title: "Anonymous Investor Hub",
    category: "Web App • SaaS Platform",
    tag: "Private Equity & Web3",
    summary: "Confidential syndicate dealrooms and angel investor analytics.",
    description: "A luxury dark-mode web application built for private equity syndicates. Founders present validated metrics without disclosing company identities until NDAs are digitally signed, backed by live valuation charts and instant commitment flows.",
    image: "https://cdn.dribbble.com/userupload/47199948/file/584d1a8efd32edaeb3a4ec8a3ca96c8c.png",
    dribbbleUrl: "https://dribbble.com/shots/27224612-Anonymous-Investor-Hub-web-UI-UX",
    tools: ["Web Platform", "SaaS Dashboard", "Dark Mode", "High-Fidelity"],
    year: "2024",
    featured: true,
  },
  {
    id: "ecommerce-web",
    title: "E-Commerce Web Experience",
    category: "E-Commerce • Modern Storefront",
    tag: "Direct-to-Consumer Shop",
    summary: "Editorial aesthetics paired with zero-friction checkout mechanics.",
    description: "High-end product showcase with ultra-fast search-as-you-type, multi-attribute variants, sticky drawer cart, and fluid responsive grid that adapts gracefully across ultra-wide desktops down to mobile screens.",
    image: "https://cdn.dribbble.com/userupload/47200040/file/019b9047688493c2493b08516efd5468.png",
    dribbbleUrl: "https://dribbble.com/shots/27224630-E-commerce-web-ui",
    tools: ["E-Commerce UX", "Fluid Grid", "Responsive Web", "Checkout Optimization"],
    year: "2024",
  },
  {
    id: "kids-juice",
    title: "Kids Juice E-Commerce UI",
    category: "Brand Web UI • D2C Nutrition",
    tag: "Interactive Brand UI",
    summary: "Playful, accessible, and delightful storefront for healthy juice subscriptions.",
    description: "Combines high visual accessibility and trust cues for parents with vibrant interactive elements. Custom flavor builder, recurring bundle subscriptions, and transparent ingredient breakdowns.",
    image: "https://cdn.dribbble.com/userupload/46891147/file/9d6d211e01055a6352502d69883dcc1f.png",
    dribbbleUrl: "https://dribbble.com/shots/27132359-Kids-Juice-buying-web-UI",
    tools: ["Branding", "Visual Hierarchy", "Accessibility", "Micro-copy"],
    year: "2024",
  },
  {
    id: "isp-dashboard",
    title: "ISP Network Operations Dashboard",
    category: "B2B SaaS • Enterprise Tool",
    tag: "Network Telemetry UI",
    summary: "Mission-critical internet provider infrastructure management suite.",
    description: "Transforms complex networking data — fiber latency, packet drops, customer billing bandwidth throttling, and support dispatching — into a clean, scannable interface engineered for high-stress operations teams.",
    image: "https://cdn.dribbble.com/userupload/46890510/file/dbe06320f3228579e9e870813439d867.png",
    dribbbleUrl: "https://dribbble.com/shots/27132144-ISP-Dashboard-Web-Design-UI",
    tools: ["Telemetry UI", "Data Visualization", "Figma Components", "Complex States"],
    year: "2024",
  },
];

export const PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    id: "card-1",
    number: "01",
    title: "CS Engineering Foundation",
    description: "With a formal Computer Science and Engineering degree, I understand DOM tree mechanics, state life-cycles, API payloads, and design-token systems. Developers love working with my Figma files.",
    highlight: "Zero Dev Hand-Off Friction",
  },
  {
    id: "card-2",
    number: "02",
    title: "Monochrome Brutalist Craft",
    description: "Restricting the palette to high-contrast black and white strips away cheap decorative distractions. It forces typography hierarchy, negative space, and rhythm to carry the message.",
    highlight: "Substance Over Ornament",
  },
  {
    id: "card-3",
    number: "03",
    title: "Kinetic Micro-Interactions",
    description: "Static screens fail to communicate how an interface breathes. I design physics-inspired transitions, tactile spring curves, and progressive scroll-driven cues that make every click rewarding.",
    highlight: "Alive & Responsive Touch",
  },
  {
    id: "card-4",
    number: "04",
    title: "Conversion-Focused UX",
    description: "A gorgeous design that fails to convert is useless. Every button placement, form field reduction, and visual weight decision is engineered to drive user clarity and measurable client outcomes.",
    highlight: "Clarity That Drives Revenue",
  },
];

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Product UI/UX Design",
    description: "End-to-end design for web applications, mobile apps (iOS & Android), and SaaS platforms from early wireframes to pixel-perfect delivery.",
    deliverables: ["User Journey Maps", "High-Fidelity Figma Files", "Interactive Prototypes", "Developer Specifications"],
  },
  {
    number: "02",
    title: "Design Systems & Token Architecture",
    description: "Scalable component libraries built with Figma auto-layout, atomic design methodology, dark/light theme tokens, and documented style guides.",
    deliverables: ["Tokenized Color & Typography", "Auto-Layout Components", "Interactive Variants", "Style Guide Documentation"],
  },
  {
    number: "03",
    title: "UX Audit & Conversion Optimization",
    description: "In-depth heuristic evaluation of your existing application to eliminate drop-offs, streamline onboarding funnels, and boost user engagement.",
    deliverables: ["Friction Analysis", "Heuristic Scorecard", "Redesigned Key Flows", "A/B Testing Roadmap"],
  },
  {
    number: "04",
    title: "Motion & Interaction Design",
    description: "Physics-calibrated micro-animations, scroll-driven narratives, and dynamic transitions that transform ordinary software into unforgettable digital craft.",
    deliverables: ["Lottie / MP4 Animations", "Spring Curve Specs", "Micro-interaction Demos", "Component State Animations"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Lead Product & UI/UX Designer",
    company: "White Desk Agency",
    location: "Dhaka, Bangladesh",
    description: "Spearheading UI/UX strategy, brand identities, and high-converting web apps for international clients across fintech, e-commerce, and SaaS verticals.",
  },
  {
    period: "2024",
    role: "UI/UX & Mobile Experience Lead",
    company: "AmiBachelor App",
    location: "Dhaka, Bangladesh",
    description: "Architected complete user flows and mobile interface for live student mess budgeting and housing discovery app with thousands of active student users.",
  },
  {
    period: "2022 — 2023",
    role: "UI/UX Designer & Frontend Collaborator",
    company: "Freelance & Digital Products",
    location: "Remote",
    description: "Collaborated directly with startup founders and indie hackers to turn nascent wireframes into validated, production-ready product experiences.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Nur Hasan is one of the rare designers who genuinely understands both aesthetic beauty and technical implementation. His Figma tokens and auto-layout structures cut our frontend build time in half.",
    author: "Mahmudur R.",
    role: "Lead Software Architect",
    project: "AmiBachelor Mobile",
  },
  {
    quote: "Working with Nur on our fintech redesign was transformative. His sharp eye for contrast and effortless motion animations gave our product the premium, enterprise-grade feel we needed.",
    author: "Zubayer Ahmed",
    role: "Fintech Product Manager",
    project: "Cellfin Modern Concept",
  },
  {
    quote: "Nur's monochrome design sensibility is world-class. He doesn't just make things look sleek — every single pixel is backed by deep reasoning and user behavioral psychology.",
    author: "Farhan Kabir",
    role: "Startup Founder",
    project: "Anonymous Investor Hub",
  },
];

export const profile = {
  name: "Vinay Agarwal",
  role: "Full Stack & Web3 Developer",
  tagline:
    "I build systems that touch a chain — DeFi platforms, decentralized storage, and the plumbing underneath them.",
  location: "Jaipur, India",
  education: "B.Tech Computer Science, JECRC University — 3rd year, CGPA 8.2/10",
  email: "vinayagarwal302@gmail.com",
  linkedin: "https://linkedin.com/in/vinay-agarwal",
  github: "https://github.com/vinay27112",
  leetcode: "https://leetcode.com/vinay27112",
};

export const projects = [
  {
    id: "yieldmind",
    name: "YieldMind",
    tagline: "AI-powered DeFi yield optimization & risk management",
    period: "May – Jun 2026",
    status: "in-progress",
    statusLabel: "In active development",
    stack: [
      "MERN",
      "Python / FastAPI",
      "Solidity",
      "Hardhat",
      "Kafka",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "OpenZeppelin",
      "Sepolia",
    ],
    summary:
      "An 8-service event-driven backend behind three smart contracts — YieldVault, RiskOracle, and AlertRegistry — deployed on Sepolia with OpenZeppelin's AccessControl, ReentrancyGuard, and Pausable. Services communicate over Kafka; an AI microservice exposes risk-scoring and strategy-recommendation endpoints.",
    details: [
      "Three Solidity contracts deployed on Sepolia with role-gated deposit(), withdraw(), and rebalance() functions.",
      "8-service architecture (Node.js/Express + Python/FastAPI) communicating over Kafka.",
      "AI microservice (FastAPI + Groq/Gemini) for risk scoring and strategy recommendations.",
      "React + wagmi frontend for live wallet interaction with the deployed contracts.",
    ],
    github: "https://github.com/vinay27112/yieldMind",
    live: null,
  },
  {
    id: "chainvault",
    name: "ChainVault",
    tagline: "Decentralized document storage, verifiable on-chain",
    period: "Feb – Apr 2026",
    status: "live",
    statusLabel: "Live",
    stack: ["MERN", "Solidity", "IPFS / Pinata", "Hardhat", "Ethers.js v6", "Sepolia"],
    summary:
      "Documents are pinned to IPFS and their CIDs registered on a Solidity contract deployed to Sepolia — anyone can verify a document's authenticity by CID, no login required.",
    details: [
      "DocumentRegistry contract on Sepolia — registerDocument(), getMyDocuments(), verifyCID().",
      "Pinata integration for IPFS pinning and CID generation.",
      "Node.js + Express REST backend with MongoDB.",
      "Public verification page — check any document's authenticity without an account.",
    ],
    github: "https://github.com/vinay27112/chainvault_minor-project",
    live: "https://chainvault-minor-project.vercel.app",
  },
  {
    id: "resume-reviewer",
    name: "Resume Reviewer",
    tagline: "AI-powered interview prep & resume platform",
    period: "Jun 2026",
    status: "live",
    statusLabel: "Live",
    stack: ["MERN", "JWT", "Gemini API", "Puppeteer", "MongoDB Atlas"],
    summary:
      "Parses a resume against a job description using Gemini, surfaces skill gaps, and generates an ATS-optimized resume as a dynamic PDF through a Puppeteer pipeline.",
    details: [
      "JWT authentication with token blacklisting and HTTP-only cookies.",
      "AI-powered resume parsing and skill-gap detection via the Gemini API.",
      "Puppeteer-based AI-to-PDF pipeline for ATS-optimized resume generation.",
      "4-layer React frontend — service layer, context state, custom hooks, protected routes.",
    ],
    github: "https://github.com/vinay27112/resume_reviewer",
    live: "https://resume-reviewer-psi.vercel.app",
  },
  {
    id: "express-auth",
    name: "Express Auth",
    tagline: "Standalone JWT authentication API",
    period: "2026",
    status: "live",
    statusLabel: "Live",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
    summary:
      "A self-contained authentication service — httpOnly-cookie sessions, bcrypt hashing, and OTP-driven email verification and password reset, built as reusable infrastructure.",
    details: [
      "httpOnly-cookie JWT sessions with bcrypt password hashing.",
      "OTP-driven email verification and password reset via Nodemailer, with 10-minute expiry windows.",
      "Minimal React frontend covering the full auth flow end to end.",
    ],
    github: "https://github.com/vinay27112/express_auth",
    live: "https://express-auth.vercel.app",
  },
];

export const experience = {
  company: "NuraBytes",
  role: "Full Stack Developer Intern",
  period: "Jan 2026 – Apr 2026",
  stack: ["React", "Redux Toolkit", "Axios", "JWT", "TailwindCSS", "GSAP / Framer Motion"],
  points: [
    "Built and maintained authentication flows on the company's production client platform using JWT cookie-based sessions.",
    "Developed a Notion-style internal admin panel with hierarchical content roadmaps and circular-reference detection.",
    "Built responsive, animated UI across a multi-industry client platform spanning Healthcare, Finance, Technology, Energy, and Government.",
  ],
};

export const skills = {
  Languages: ["JavaScript (ES6+)", "Solidity", "Java", "Python"],
  "Full stack": ["React", "Redux Toolkit", "Vite", "TailwindCSS", "Node.js", "Express.js", "REST APIs"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  Blockchain: ["Solidity", "Hardhat", "Ethers.js v6", "IPFS / Pinata", "Sepolia", "MetaMask", "OpenZeppelin"],
  "AI integration": ["Gemini API", "Groq API"],
  Tools: ["Git", "GitHub", "Postman", "Docker", "Vercel", "Render"],
};

export const achievements = [
  "Solved 50+ problems on LeetCode; active GitHub with 5+ repositories.",
  "be10x — AI Tools & ChatGPT Workshop (Sep 2025).",
  "SpringPad — Stock Market Using AI Workshop (Aug 2025).",
  "upGrad — Certifications in Blockchain Development, Frontend Development, and Backend Development.",
];

export const certificates = [
  { label: "be10x — AI Tools Workshop", file: "/certificates/be10x-ai-tools.pdf" },
  { label: "SpringPad — Stock Market Using AI", file: "/certificates/springpad-stock-market-ai.pdf" },
];

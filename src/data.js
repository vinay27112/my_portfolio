export const profile = {
  name: "Vinay Agarwal",
  role: "Full Stack & Web3 Developer",
  tagline1:
    "Full stack by training, Web3 by curiosity. I build things that actually deploy — three live projects, real Sepolia transactions, zero vaporware.",
  tagline2:
    "I got into software because I liked seeing things work. That's stayed true — from a DeFi platform with eight microservices to a document vault that verifies files on-chain, I build things that run, not just things that look finished in a screenshot.",
  location: "Jaipur, India",
  tagline3:
    "I'm a third-year CS student who'd rather ship something real than talk about it — three of my projects are live right now, not just on GitHub. I work across the stack: React and Node on one end, Solidity and Sepolia on the other, with AI wired in wherever it earns its place.",
  education:
    "B.Tech Computer Science, JECRC University — 3rd year, CGPA 8.2/10",
  email: "vinayagarwal302@gmail.com",
  linkedin: "https://linkedin.com/in/vinay-agarwal27",
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
    readme: `
# YieldMind

AI-powered DeFi yield optimization and risk management platform. An
8-service event-driven backend behind three Solidity contracts deployed on
Sepolia, with an AI microservice for risk scoring and strategy
recommendations.

**Status:** In active development — architecture and contracts are built and
Sepolia-deployed, but not live-hosted (see [Deployment status](#deployment-status)).
**Repo:** https://github.com/vinay27112/yieldMind

---

## How it works

A user connects a wallet (via wagmi/viem on the frontend) and deposits funds
through the \`execution-service\`, which submits transactions to the
\`YieldVault\` contract on Sepolia. Behind the scenes, the \`ai-service\` scores
risk and recommends strategies using Groq/Gemini, \`price-feed-service\` and
\`protocol-service\` keep live market data flowing, and everything
communicates asynchronously over **Kafka** rather than direct service-to-service
HTTP calls — so, for example, a price update published by
\`price-feed-service\` can be consumed by both \`ai-service\` (to re-score risk)
and \`notification-service\` (to alert a user) without those two services
knowing about each other.

## Architecture

\`\`\`
services/
  auth-service/          Node.js — user accounts, JWT sessions
  wallet-service/         Node.js — wallet linking, on-chain balance reads
  protocol-service/       Node.js — tracks supported DeFi protocols & yield rates
  price-feed-service/     Node.js — ingests & normalizes live asset prices
  execution-service/      Node.js — signs & submits deposit/withdraw/rebalance txns
  ai-service/              Python/FastAPI — risk scoring & strategy recs (Groq/Gemini)
  analytics-service/       Python/FastAPI — aggregates historical performance
  notification-service/    Node.js — Kafka consumer, dispatches email alerts
contracts/                Solidity (Hardhat) — YieldVault, RiskOracle, AlertRegistry
frontend/                 React + wagmi + viem + recharts
\`\`\`

### Smart contracts (deployed on Sepolia)

| Contract | Purpose |
|---|---|
| \`YieldVault.sol\` | \`deposit()\`, \`withdraw()\`, \`rebalance()\` — role-gated via OpenZeppelin AccessControl, guarded with ReentrancyGuard and Pausable |
| \`RiskOracle.sol\` | On-chain risk scoring |
| \`AlertRegistry.sol\` | User-configured alert thresholds |
| \`MockERC20.sol\` / \`MockProtocol.sol\` | Test doubles for local/testnet development |

Deployed addresses are tracked in \`contracts/ignition/deployed-addresses.json\`.

### Inter-service communication

All 8 services + Kafka are wired together via the root \`docker-compose.yml\`
for local development. There is no API gateway in front of them — the
frontend currently calls each service's port directly (see Frontend section).

## Environment variables

Every service has its own \`.env\`. Keys actually used, by service:

**auth-service**
\`\`\`
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
\`\`\`

**execution-service**
\`\`\`
PORT=
MONGODB_URI=
SEPOLIA_RPC_URL=
PRIVATE_KEY=            # signer wallet that submits on-chain transactions
YIELD_VAULT_ADDRESS=
MOCK_USDC_ADDRESS=
MOCK_AAVE_ADDRESS=
MOCK_COMPOUND_ADDRESS=
KAFKA_BROKERS=
\`\`\`

**analytics-service**
\`\`\`
PORT=
DATABASE_URL=
KAFKA_BROKERS=
\`\`\`

*(wallet-service, protocol-service, price-feed-service, ai-service, and
notification-service each have their own \`.env\` too — check each service's
folder directly; most need at minimum \`PORT\`, \`KAFKA_BROKERS\`, and a
database connection string, with \`ai-service\` additionally needing a
Groq/Gemini API key.)*

**frontend**
\`\`\`
Currently hardcoded per-service URLs in src/services/api.js, e.g.:
AUTH_URL = http://localhost:3001
WALLET_URL = http://localhost:3002
AI_URL = http://localhost:5001
EXECUTION_URL = http://localhost:3005
PROTOCOL_URL = http://localhost:3004
ANALYTICS_URL = http://localhost:5002
\`\`\`
Should be moved to \`VITE_*\` env vars before any real deployment — see
Known limitations.

> **Security note:** two \`.env\` files (execution-service, analytics-service)
> were previously committed to this repo with real credentials (a wallet
> private key and a database connection string). Those files have since
> been untracked and \`.gitignore\` added, and the exposed credentials should
> be treated as compromised and rotated if that hasn't already happened.
> Never commit a real \`.env\` — only commit \`.env.example\` files with keys
> but empty values.

## Running locally

\`\`\`bash
docker-compose up --build
\`\`\`
This brings up Kafka and all 8 services together. Each service also has its
own Dockerfile and can be run individually with \`docker build\` + \`docker run\`
if you only need one.

Frontend, separately:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Docker

Every service has its own \`Dockerfile\`, and the root \`docker-compose.yml\`
orchestrates all 8 services plus a Kafka broker for local development. This
part is fully built out and working.

## Kubernetes

**Status: not yet built.** This is the main piece of outstanding
infrastructure work. Planned approach, once resumed:

- One \`Deployment\` + \`Service\` pair per microservice (8 total), following
  the same pattern: a \`ConfigMap\` for non-sensitive config (ports, timeouts),
  a \`Secret\` for credentials (created via \`kubectl create secret\`, never
  committed to git — Kubernetes Secrets are base64-encoded, not encrypted,
  so committing one is exactly as unsafe as committing a \`.env\`).
- A Kafka deployment (likely via a Helm chart like Bitnami's, rather than
  hand-rolled manifests, given Kafka's operational complexity).
- All resources scoped to a single \`yieldmind\` namespace.

No manifests exist in this repo yet.

## Deployment status

**Not deployed.** Given the architecture — 8 independent services, no API
gateway, and a Kafka broker — a full live deployment isn't a practical use
of free-tier hosting. The contracts themselves *are* live on Sepolia (real,
verifiable transactions), and every service runs correctly locally via
Docker Compose; this is presented as a completed, working architecture
rather than a hosted demo.

If a partial live demo is ever wanted, the realistic path is deploying just
\`auth-service\` + \`execution-service\` + \`frontend\` (enough for a deposit
flow against the real contracts), with the rest of the architecture
documented rather than hosted.

## Known limitations

- No API gateway — frontend calls all 6 relevant services directly by URL,
  currently hardcoded to \`localhost\`. Needs a gateway (or at minimum,
  env-var-driven URLs) before any real deployment.
- No Kubernetes manifests (see above).
- No automated tests for the smart contracts — verified manually against
  Sepolia rather than via a Hardhat test suite. \`contracts/test/Lock.js\` is
  leftover Hardhat boilerplate unrelated to the actual contracts and should
  be replaced with real tests for YieldVault/RiskOracle/AlertRegistry.
- No automated tests for any of the 8 services.
    `,
  },
  {
    id: "chainvault",
    name: "ChainVault",
    tagline: "Decentralized document storage, verifiable on-chain",
    period: "Feb – Apr 2026",
    status: "live",
    statusLabel: "Live",
    stack: [
      "MERN",
      "Solidity",
      "IPFS / Pinata",
      "Hardhat",
      "Ethers.js v6",
      "Sepolia",
    ],
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
    readme: `
# ChainVault

Decentralized document storage — files are pinned to IPFS and their content
hash (CID) is registered on a Solidity smart contract deployed to Sepolia.
Anyone can verify a document's authenticity by CID, without an account.

**Live:** https://chainvault-minor-project.vercel.app
**Repo:** https://github.com/vinay27112/chainvault_minor-project

---

## How it works

1. A logged-in user uploads a file with a title/description.
2. The backend pins the file to IPFS via Pinata and gets back a CID.
3. The backend (using its own signer wallet, not the user's) calls
   \`DocumentRegistry.registerDocument()\` on Sepolia, permanently recording
   the CID on-chain against that user's address.
4. Anyone — logged in or not — can visit the Verify page, paste a CID, and
   the backend calls \`verifyCID()\` on the contract to confirm the document
   is genuinely registered, who owns it, and when.

Auth itself is plain email/password + JWT (not wallet-based) — the wallet
is only used server-side to pay gas for the on-chain registration.

## Architecture

\`\`\`
frontend/   React + Redux + Tailwind — Login, Register, Dashboard,
            Upload, Verify pages
backend/    Node.js + Express REST API
contracts/  Solidity (Hardhat) — DocumentRegistry.sol
\`\`\`

### Backend routes

**Auth** (\`/api/auth\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | \`/register\` | – | Create account |
| POST | \`/login\` | – | Log in, sets JWT cookie |
| POST | \`/logout\` | – | Clear session |
| POST | \`/verify-account\` | cookie | Email verification |
| POST | \`/is-auth\` | cookie | Check session validity |
| POST | \`/reset-password\` | – | Password reset |

**Documents** (\`/api/doc\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | \`/\` | cookie | List your documents |
| POST | \`/upload\` | cookie | Upload file → IPFS pin → on-chain register |
| DELETE | \`/:id\` | cookie | Delete a document |
| GET | \`/verify/:cid\` | – (public) | Verify authenticity by CID |

**User** (\`/api/user\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | \`/data\` | cookie | Get current user's profile |

### Smart contract — \`DocumentRegistry.sol\`

| Function | Description |
|---|---|
| \`registerDocument(cid, ...)\` | Records a new document's CID on-chain |
| \`getMyDocuments()\` | Returns the caller's registered documents |
| \`verifyCID(cid)\` | Public — confirms a CID is registered and returns its metadata |

## Environment variables

### \`backend/.env\`
\`\`\`
PORT=
MONGODB_URI=
JWT_SECRET=
NODE_ENV=              # set to "production" when deployed
CLIENT_URL=            # your deployed frontend URL (for CORS)
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
PINATA_JWT=
PINATA_GATEWAY=
PRIVATE_KEY=           # backend's signer wallet — pays gas for on-chain writes
SEPOLIA_RPC_URL=
CONTRACT_ADDRESS=      # deployed DocumentRegistry address
\`\`\`

### \`frontend/.env\`
\`\`\`
VITE_API_URL=          # backend URL, e.g. http://localhost:4000 locally
\`\`\`

> **Never commit real values.** Keep \`.env\` out of git (already covered by
> \`.gitignore\`); only commit an \`.env.example\` with empty/placeholder values.

## Running locally

\`\`\`bash
# Backend
cd backend
npm install
npm run dev          # http://localhost:4000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev           # http://localhost:5173
\`\`\`

Make sure \`backend/.env\` and \`frontend/.env\` are filled in first (see above).
CORS on the backend must allow whatever port the frontend actually runs on.

## Smart contract deployment (Hardhat)

\`\`\`bash
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
\`\`\`
Copy the deployed address into \`backend/.env\` as \`CONTRACT_ADDRESS\`.

## Docker

There's no \`docker-compose.yml\` for this project currently — each half
(backend/frontend) runs directly via \`npm run dev\`/\`node server.js\`. Adding
Dockerfiles for both would be a reasonable next step if containerized local
dev or a non-Vercel/Render deploy target is ever needed.

## Deployment (how the live version is actually hosted)

- **Backend → Render.** Root directory \`backend\`, build \`npm install\`,
  start \`node server.js\`. Requires all the backend env vars above, plus
  \`CLIENT_URL\` set to the real Vercel URL once known.
- **Frontend → Vercel.** Root directory \`frontend\`. Needs a \`vercel.json\`
  rewriting all paths to \`/index.html\` (React Router requires this, since
  Vercel doesn't know about client-side routes by default):
  \`\`\`json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  \`\`\`
- **MongoDB Atlas** — free M0 cluster. Network Access must allow
  \`0.0.0.0/0\` since Render doesn't offer a fixed outbound IP on the free tier.

## Known limitations

- OTP-based email flows (verify/reset) may fail on Render's free tier if
  using SMTP directly — Render blocks outbound SMTP ports (25/465/587) as
  of Sept 2025. If email stops working after a fresh deploy, switch to
  Brevo's HTTP API (or similar) instead of SMTP.
- No automated tests — contract and API behavior have been verified manually
  against Sepolia rather than via a Hardhat/Jest test suite.
    `,
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
    readme: `
# Resume Reviewer

AI-powered interview prep and resume platform. Upload a resume and a job
description, get an AI-generated skill-gap report, and export an
ATS-optimized resume as a dynamically generated PDF.

**Live:** https://resume-reviewer-psi.vercel.app
**Repo:** https://github.com/vinay27112/resume_reviewer

---

## How it works

1. A logged-in user uploads a resume file plus a job description and a
   short self-description.
2. The backend parses the resume and sends it, along with the JD, to the
   **Gemini API**, which returns a structured skill-gap analysis.
3. That report is saved and viewable later (all past reports are listed).
4. From a report, the user can trigger PDF generation — the backend renders
   an ATS-optimized resume as HTML and uses **Puppeteer** (a headless
   Chrome) to convert it to a downloadable PDF.

## Architecture

\`\`\`
Backend/    Node.js + Express, MongoDB Atlas, Gemini API, Puppeteer
Frontend/   React — 4-layer structure: service layer, Context state,
            custom hooks, protected routes
\`\`\`

### Routes

**Auth** (\`/api/auth\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | \`/register\` | – | Create account (expects \`username\`, not \`name\`) |
| POST | \`/login\` | – | Log in, sets JWT cookie |
| GET | \`/logout\` | – | Clear session |
| GET | \`/get-me\` | cookie | Get current user |

**Interview** (\`/api/interview\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | \`/\` | cookie | Upload resume + JD, generate AI report |
| GET | \`/report/:id\` | cookie | Fetch a specific report |
| GET | \`/\` | cookie | List all of the user's reports |
| POST | \`/resume/pdf/:reportId\` | cookie | Generate ATS resume PDF via Puppeteer |

## Environment variables

### \`Backend/.env\`
\`\`\`
PORT=
MONGO_URI=
JWT_SECRET=
GOOGLE_GENAI_API_KEY2=      # Gemini API key — note the exact variable name
CLIENT_URL=                 # deployed frontend URL, for CORS
\`\`\`

### \`Frontend/.env\`
\`\`\`
VITE_API_URL=               # backend URL, e.g. http://localhost:3000 locally
\`\`\`

> Never commit real \`.env\` values — only an \`.env.example\` with empty values.

## Running locally

\`\`\`bash
# Backend
cd Backend
npm install
node server.js         # http://localhost:3000

# Frontend (separate terminal)
cd Frontend
npm install
npm run dev
\`\`\`

## Docker

No Dockerfile/\`docker-compose.yml\` exists for this project currently.

## Deployment (how the live version is actually hosted)

- **Backend → Render.** Root directory \`Backend\`, build \`npm install\`,
  start \`node server.js\`.
  - **Puppeteer needs an explicit Chrome install step** — the default
    \`npm install\` alone doesn't reliably leave a usable Chrome binary on
    Render. Build command should be:
    \`\`\`
    npm install && npx puppeteer browsers install chrome
    \`\`\`
  - Chrome also needs to land somewhere that survives from build to
    runtime — Render's default \`/opt/render/.cache\` path isn't always
    carried over. Set:
    \`\`\`
    PUPPETEER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer
    \`\`\`
    as an env var, and do a "Clear build cache & deploy" the first time
    this is set, so Chrome downloads into the right place.
  - Puppeteer's \`launch()\` call also needs sandbox disabled for Render's
    container environment: \`args: ["--no-sandbox", "--disable-setuid-sandbox"]\`.
- **Frontend → Vercel.** Root directory \`Frontend\`, needs a \`vercel.json\`:
  \`\`\`json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  \`\`\`
- **MongoDB Atlas** free M0 cluster, Network Access set to allow \`0.0.0.0/0\`.

## Known limitations

- No automated test suite.
- Puppeteer-based PDF generation is memory-heavier than the rest of the
  stack — on Render's free tier (512MB RAM) this is the most likely place
  to hit resource limits under load.
    `,
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
    readme: `
# Express Auth

A standalone JWT authentication API — built as reusable auth infrastructure
rather than tied to one product. httpOnly-cookie sessions, bcrypt password
hashing, and full OTP-driven email verification and password reset flows.

**Live:** https://express-auth.vercel.app
**Repo:** https://github.com/vinay27112/express_auth

---

## How it works

- Passwords are hashed with bcrypt before storage — never stored in plain text.
- On login, a JWT is issued and set as an **httpOnly cookie** (not accessible
  to client-side JS, which protects it from XSS token theft).
- Email verification and password reset both use a **6-digit OTP** emailed
  to the user, valid for **10 minutes**, with explicit invalid/expired
  handling rather than failing silently.
- This exact auth pattern is reused (and extended) in ChainVault — this repo
  is effectively the "auth module" in isolation.

## Architecture

\`\`\`
Backend/    Node.js + Express REST API (Mongoose models, JWT, Nodemailer)
Frontend/   React — Login, Register, Verify Email, Forgot Password, Dashboard
\`\`\`

### Routes

**Auth** (\`/api/auth\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | \`/register\` | – | Create account, logs in immediately |
| POST | \`/login\` | – | Log in, sets JWT cookie |
| POST | \`/logout\` | – | Clear session |
| POST | \`/send-verify-otp\` | cookie | Email a verification OTP |
| POST | \`/verify-account\` | cookie | Submit OTP to verify email |
| POST | \`/is-auth\` | cookie | Check session validity |
| POST | \`/send-reset-otp\` | – | Email a password-reset OTP |
| POST | \`/reset-password\` | – | Submit OTP + new password |

**User** (\`/api/user\`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | \`/data\` | cookie | Get current user (name, verification status) |

### Frontend pages

| Page | What it does |
|---|---|
| Login / Register | Standard auth forms |
| Verify Email | Auto-sends an OTP on load, 6-digit input, resend option |
| Forgot Password | Two-step: request OTP by email → submit OTP + new password |
| Dashboard | Protected — shows user info, verification badge, logout |

## Environment variables

### \`Backend/.env\`
\`\`\`
PORT=
MONGODB_URI=
JWT_SECRET=
NODE_ENV=              # "production" in deployment — affects cookie secure/sameSite flags
CLIENT_URL=            # deployed frontend URL, required for CORS
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
\`\`\`

### \`Frontend/.env\`
\`\`\`
VITE_API_URL=          # backend URL, e.g. http://localhost:4000 locally
\`\`\`

> Never commit real \`.env\` values — only an \`.env.example\` with empty values.

## Running locally

\`\`\`bash
# Backend
cd Backend
npm install
node server.js         # http://localhost:4000

# Frontend (separate terminal)
cd Frontend
npm install
npm run dev             # Vite picks a port, usually 5173 or 5174
\`\`\`

Set \`Backend/.env\`'s \`CORS\` origin (in \`server.js\`) to match whatever port
Vite actually starts on locally — cross-port requests need an explicit
CORS origin when cookies/credentials are involved.

## Docker

No Dockerfile/\`docker-compose.yml\` currently exists for this project. Both
halves run directly via \`npm\`. Worth adding if a containerized workflow is
ever needed, but not required for the current Render + Vercel deployment.

## Deployment (how the live version is actually hosted)

- **Backend → Render.** Root directory \`Backend\`, build \`npm install\`,
  start \`node server.js\`. All backend env vars above required, including
  \`NODE_ENV=production\` (this matters — the cookie logic checks it to
  decide \`secure\`/\`sameSite\` flags, and Render doesn't set it automatically).
- **Frontend → Vercel.** Root directory \`Frontend\`, needs a \`vercel.json\`:
  \`\`\`json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  \`\`\`
- **MongoDB Atlas** free M0 cluster, Network Access set to allow \`0.0.0.0/0\`.

## Known limitations

- **OTP emails currently don't send in production.** Render's free tier
  blocks outbound SMTP ports (25/465/587) as of Sept 2025, so Nodemailer's
  SMTP transport times out. Fix: switch to Brevo's HTTP API (\`POST
  https://api.brevo.com/v3/smtp/email\` with an \`api-key\` header) instead of
  SMTP — this goes over HTTPS (443), which isn't blocked. Not yet applied.
- No automated test suite.
    `,
  },
];

export const experience = {
  company: "NuraBytes",
  role: "Full Stack Developer Intern",
  period: "Jan 2026 – Apr 2026",
  stack: [
    "React",
    "Redux Toolkit",
    "Axios",
    "JWT",
    "TailwindCSS",
    "GSAP / Framer Motion",
  ],
  points: [
    "Built and maintained authentication flows on the company's production client platform using JWT cookie-based sessions.",
    "Developed a Notion-style internal admin panel for managing hierarchical content roadmaps, implementing CRUD operations with parent-child node validation and circular-reference detection.",
    "Built responsive, animated UI (GSAP, Framer Motion) across the company's multi-industry client platform spanning Healthcare, Finance, Technology, Energy, and Government verticals.",
  ],
};

export const skills = {
  Languages: ["JavaScript (ES6+)", "Solidity", "Java", "Python"],
  "Full stack": [
    "React",
    "Redux Toolkit",
    "Vite",
    "TailwindCSS",
    "Node.js",
    "Express.js",
    "REST APIs",
  ],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  Blockchain: [
    "Solidity",
    "Hardhat",
    "Ethers.js v6",
    "IPFS / Pinata",
    "Sepolia",
    "MetaMask",
    "OpenZeppelin",
  ],
  "AI integration": ["Gemini API", "Groq API"],
  Tools: ["Git", "GitHub", "Postman", "Docker", "Vercel", "Render"],
};

export const achievements = [
  "Solved 50+ problems on LeetCode; active GitHub with 5+ repositories and consistent contribution history.",
  "Built and deployed production-grade microservice architectures, REST APIs, and DeFi/Web3 systems as self-directed projects.",
  "be10x — AI Tools & ChatGPT Workshop (Sep 2025): AI-assisted presentation creation, data analysis, and code/debug workflows.",
  "SpringPad — Stock Market Using AI Workshop (Aug 2025): AI-based industry/stock analysis, trade setup identification, and automated trading strategies.",
  "upGrad — Certification in Blockchain Development.",
  "upGrad — Certification in Frontend Development.",
  "upGrad — Certification in Backend Development.",
];

export const certificates = [
  {
    label: "be10x — AI Tools Workshop",
    image: "/certificates/be10x-ai-tools.png",
  },
  {
    label: "SpringPad — Stock Market Using AI",
    image: "/certificates/springpad-stock-market-ai.png",
  },
];

export const internshipCertificate = {
  label: "Internship Certificate – NuraBytes",
  image: "/certificates/internship-certificate.png",
};

export const educationHistory = [
  {
    level: "B.Tech (Computer Science)",
    institution: "JECRC University, Jaipur",
    year: "2023 – Present",
    cgpa: "8.2/10",
    image: null, // will come later
    status: "In progress",
  },
  {
    level: "Class XII (PCM + Computer Science)",
    institution: "Kendriya Vidyalaya, Mount Abu",
    year: "2023",
    percentage: "88.4%",
    image: "/twelth.jpeg",
    status: "Completed",
  },
  {
    level: "Class X",
    institution: "Kendriya Vidyalaya, Mount Abu",
    year: "2021",
    percentage: "87.6%",
    // percentage: "XX%", // if you have, add it
    image: "/tenth.jpeg",
    status: "Completed",
  },
];

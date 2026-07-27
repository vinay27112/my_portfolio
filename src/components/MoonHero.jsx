export default function MoonHero({ className = "" }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      role="img"
      aria-label="Illustration of a moon in a soft dawn sky"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9EBEF" />
          <stop offset="55%" stopColor="#DCE0E6" />
          <stop offset="100%" stopColor="#C7CDD6" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4F5F7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F4F5F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="moonBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBFBFC" />
          <stop offset="100%" stopColor="#D7DAE0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="500" fill="url(#sky)" />

      <circle cx="560" cy="180" r="140" fill="url(#moonGlow)" />
      <circle cx="560" cy="180" r="86" fill="url(#moonBody)" />

      <circle cx="530" cy="150" r="10" fill="#C4C9D1" opacity="0.55" />
      <circle cx="590" cy="165" r="16" fill="#C4C9D1" opacity="0.45" />
      <circle cx="575" cy="210" r="8" fill="#C4C9D1" opacity="0.5" />
      <circle cx="540" cy="205" r="5" fill="#C4C9D1" opacity="0.4" />
      <circle cx="605" cy="130" r="6" fill="#C4C9D1" opacity="0.4" />

      <g opacity="0.6">
        <circle cx="120" cy="90" r="1.6" fill="#8A94A6" />
        <circle cx="200" cy="60" r="1.2" fill="#8A94A6" />
        <circle cx="260" cy="120" r="1.6" fill="#8A94A6" />
        <circle cx="90" cy="180" r="1.2" fill="#8A94A6" />
        <circle cx="340" cy="70" r="1.2" fill="#8A94A6" />
        <circle cx="700" cy="90" r="1.4" fill="#8A94A6" />
        <circle cx="750" cy="150" r="1.2" fill="#8A94A6" />
        <circle cx="40" cy="120" r="1.4" fill="#8A94A6" />
      </g>

      <path
        d="M0 400 C 120 360, 220 420, 340 380 C 460 340, 560 400, 680 370 C 740 355, 780 370, 800 365 L 800 500 L 0 500 Z"
        fill="#B9C0CB"
        opacity="0.5"
      />
      <path
        d="M0 440 C 140 410, 260 460, 400 430 C 540 400, 640 450, 800 420 L 800 500 L 0 500 Z"
        fill="#A6AEBB"
        opacity="0.6"
      />
    </svg>
  );
}

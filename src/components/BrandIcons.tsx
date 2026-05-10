// Real brand SVG logos
export function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#25F4EE"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .6.05.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.05 20.1a6.34 6.34 0 0 0 10.86-4.43V8.16a8.16 8.16 0 0 0 4.77 1.52V6.23a4.85 4.85 0 0 1-1.09-.54z"
      />
      <path
        fill="#FE2C55"
        d="M21 7.69a4.83 4.83 0 0 1-3.77-4.25V3h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .6.05.88.13V10.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 6.45 21.1a6.34 6.34 0 0 0 10.86-4.43V9.16a8.16 8.16 0 0 0 4.77 1.52V7.23A4.85 4.85 0 0 1 21 7.69z"
      />
      <path
        fill="#fff"
        d="M17.23 6.23A4.83 4.83 0 0 1 16.14 3h-1.36v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.31-1.16 2.89 2.89 0 0 0 4.32-2.5V2.34h3.46c.02.32.07.63.15.94v0a4.85 4.85 0 0 0 2.79 3.41A4.85 4.85 0 0 0 17.23 6.23zm2.65 4.23a8.16 8.16 0 0 1-4.77-1.52v6.95A6.34 6.34 0 0 1 5.78 19.4a6.34 6.34 0 0 0 10.86-4.43V8.02a8.16 8.16 0 0 0 4.77 1.52V6.23a4.85 4.85 0 0 1-1.53.16v4.07z"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="#fff" />
    </svg>
  );
}

export function SaweriaIcon({ className = "" }: { className?: string }) {
  // Saweria's official cup-with-coin mark, simplified
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sw-cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF7A00" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-cup)"
        d="M14 22h36l-3 28a6 6 0 0 1-6 5.4H23a6 6 0 0 1-6-5.4L14 22z"
      />
      <rect x="11" y="17" width="42" height="8" rx="3" fill="#FF9100" />
      <circle cx="32" cy="38" r="9" fill="#FFE27A" stroke="#FF7A00" strokeWidth="2.5" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#FF7A00"
        fontFamily="system-ui, sans-serif"
      >
        $
      </text>
    </svg>
  );
}

export function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#5865F2"
        d="M20.317 4.369A19.791 19.791 0 0 0 15.502 2.9a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.814 1.469.07.07 0 0 0-.032.027C.533 9.046-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.007.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.04.106c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.661a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"
      />
    </svg>
  );
}

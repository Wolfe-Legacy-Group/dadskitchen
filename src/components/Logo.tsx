export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* House */}
      <path
        d="M32 4L4 28h8v28h40V28h8L32 4z"
        fill="currentColor"
        className="text-enamel"
      />
      {/* House interior cutout */}
      <path
        d="M16 30v22h32V30L32 14 16 30z"
        fill="var(--background)"
      />
      {/* Bowl */}
      <path
        d="M20 38c0 0 2 12 12 12s12-12 12-12H20z"
        fill="currentColor"
        className="text-warm"
      />
      {/* Bowl rim */}
      <rect
        x="18"
        y="36"
        width="28"
        height="3"
        rx="1.5"
        fill="currentColor"
        className="text-warm"
      />
      {/* Steam lines */}
      <path
        d="M26 32c0-3 2-4 0-7M32 30c0-3 2-4 0-7M38 32c0-3 2-4 0-7"
        stroke="currentColor"
        className="text-warm"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

import type { SVGProps } from "react";

/**
 * Custom monogram for Rubayat Raihan.
 * Two interlocking "R" forms struck like a hot-iron seal,
 * sitting inside a thin circular frame — references metalwork hallmarks.
 */
export function BrandLogo({
  className,
  title = "Rubayat Raihan",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      {...rest}
    >
      <defs>
        <linearGradient id="rr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d98a" />
          <stop offset="45%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#8c6a1f" />
        </linearGradient>
        <linearGradient id="rr-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <title>{title}</title>

      {/* Outer hallmark ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#rr-gold)"
        strokeWidth="0.75"
      />
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="url(#rr-gold)"
        strokeWidth="0.4"
        opacity="0.55"
      />

      {/* Tick marks like a maker's seal */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const x1 = 32 + Math.cos(a) * 27.5;
        const y1 = 32 + Math.sin(a) * 27.5;
        const x2 = 32 + Math.cos(a) * 29;
        const y2 = 32 + Math.sin(a) * 29;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#rr-gold)"
            strokeWidth="0.4"
            opacity="0.7"
          />
        );
      })}

      {/* Interlocking RR monogram, drawn as strokes */}
      <g
        fill="none"
        stroke="url(#rr-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left R */}
        <path d="M20 46 V20 H30 a6 6 0 0 1 0 12 H22" />
        <path d="M28 32 L34 46" />
        {/* Right R, mirrored and offset */}
        <path d="M44 46 V20 H34 a6 6 0 0 0 0 12 H42" opacity="0.85" />
        <path d="M36 32 L30 46" opacity="0.85" />
      </g>

      {/* Inner shine highlight */}
      <ellipse
        cx="32"
        cy="22"
        rx="14"
        ry="3"
        fill="url(#rr-shine)"
        opacity="0.4"
      />
    </svg>
  );
}

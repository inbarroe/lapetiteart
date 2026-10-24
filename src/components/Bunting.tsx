// Decorative garland of party flags, echoing the bunting in the logo.

const colors = [
  "var(--flag-pink)",
  "var(--flag-sky)",
  "var(--flag-yellow)",
  "var(--flag-mint)",
  "var(--flag-teal)",
];

export function Bunting({ flags = 15, className = "" }: { flags?: number; className?: string }) {
  const width = flags * 40;
  return (
    <svg
      viewBox={`0 0 ${width} 44`}
      preserveAspectRatio="none"
      className={`block h-8 w-full ${className}`}
      aria-hidden="true"
    >
      <path d={`M0 4 Q ${width / 2} 16 ${width} 4`} stroke="var(--brown-soft)" strokeWidth="1.5" fill="none" />
      {Array.from({ length: flags }, (_, i) => {
        const x = i * 40 + 6;
        const t = (x + 14) / width;
        // Follow the string's sag so the flags hang along the curve.
        const y = 4 + 24 * t * (1 - t);
        return (
          <path key={i} d={`M${x} ${y} L${x + 28} ${y} L${x + 14} ${y + 26} Z`} fill={colors[i % colors.length]} />
        );
      })}
    </svg>
  );
}

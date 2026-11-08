// Decorative garland of party flags, echoing the bunting in the logo.
// One scallop of five flags is drawn as a small tile and repeated across the
// width, so the flags keep their shape on any screen size instead of stretching.

// Same hex values as the --flag-* tokens in globals.css (CSS variables can't
// be used inside a data-URI image).
const colors = ["#f28da6", "#7cc3e8", "#f6cd4c", "#8fd3b6", "#3f9f9c"];

const tileWidth = 160;
const tileHeight = 32;
const sag = 6;

function stringY(x: number) {
  const t = x / tileWidth;
  return 3 + 4 * sag * t * (1 - t);
}

const flags = colors
  .map((color, i) => {
    const x = 5 + i * 32;
    const y = stringY(x + 11);
    return `<path d="M${x} ${y}L${x + 22} ${y}L${x + 11} ${y + 22}Z" fill="${color}"/>`;
  })
  .join("");

const tile = `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}"><path d="M0 3Q${tileWidth / 2} ${3 + 2 * sag} ${tileWidth} 3" stroke="#8a6a58" stroke-width="1.5" fill="none"/>${flags}</svg>`;

const background = `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;

export function Bunting({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-8 w-full bg-repeat-x bg-top ${className}`}
      style={{ backgroundImage: background }}
    />
  );
}

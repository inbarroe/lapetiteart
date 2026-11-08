import Link from "next/link";
import { site } from "@/lib/site";

// Text wordmark until the original logo file is added to /public.
export function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center leading-none" aria-label={`${site.name} – לדף הבית`}>
      <span className="text-[0.65rem] text-brown-soft">{site.tagline}</span>
      <span dir="ltr" className="font-display text-xl tracking-wide text-brown">
        LA PETITE ART
      </span>
      <span className="text-[0.65rem] text-brown-soft">by Tami</span>
    </Link>
  );
}

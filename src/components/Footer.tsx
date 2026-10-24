import Link from "next/link";
import { Bunting } from "@/components/Bunting";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 bg-paper">
      <Bunting />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-base sm:grid-cols-3">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-1 text-brown-soft">{site.tagline} · {site.owner}</p>
          <p className="mt-3">סטודיו ב{site.studioArea} · הפעלות בכל הארץ</p>
        </div>

        <div>
          <p className="font-bold">יצירת קשר</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a href={site.phoneHref} className="hover:text-flag-teal">
                טלפון: <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-flag-teal">
                אינסטגרם
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-flag-teal">
                פייסבוק
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="קישורים נוספים">
          <p className="font-bold">מידע נוסף</p>
          <ul className="mt-2 space-y-1">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-flag-teal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="pb-24 text-center text-sm text-brown-soft sm:pb-8">
        © {site.nameLatin} by Tami Roe
      </p>
    </footer>
  );
}

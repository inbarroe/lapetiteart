import { whatsappLink } from "@/lib/site";

// Temporary page body for sections whose content isn't written yet.
export function ComingSoon({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-4 text-xl text-brown-soft">{intro}</p>
      <p className="mt-8 rounded-2xl bg-paper p-5 ring-1 ring-brown/10">
        העמוד בבנייה ויעלה בקרוב. בינתיים אפשר לשאול אותי כל שאלה בוואטסאפ.
      </p>
      <a
        href={whatsappLink(`היי תמי, אשמח לפרטים על ${title}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-brown px-7 py-3 font-semibold text-paper hover:bg-brown/90"
      >
        שליחת הודעה לתמי
      </a>
    </section>
  );
}

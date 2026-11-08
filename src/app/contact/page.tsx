import type { Metadata } from "next";
import { RequestForm } from "@/components/RequestForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "רוצים לבדוק תאריך פנוי ליום הולדת, סדנה או קייטנה? השאירו פרטים ותמי תחזור אליכם.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-center font-display text-4xl">בואו נדבר!</h1>
      <p className="mt-4 text-center text-xl text-brown-soft">
        רוצים לבדוק תאריך פנוי? השאירו פרטים ותמי תחזור אליכם לשיחה קצרה כדי לתאם הכל.
        <br />
        אין התחייבות – ההזמנה נסגרת רק אחרי השיחה.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3 text-base">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-brown px-5 py-2 font-semibold hover:bg-paper"
        >
          💬 וואטסאפ
        </a>
        <a href={site.phoneHref} className="rounded-full border-2 border-brown px-5 py-2 font-semibold hover:bg-paper">
          📞 <span dir="ltr">{site.phoneDisplay}</span>
        </a>
      </div>

      <div className="mt-10">
        <RequestForm />
      </div>
    </div>
  );
}

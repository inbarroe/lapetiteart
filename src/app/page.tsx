import Link from "next/link";
import { Bunting } from "@/components/Bunting";
import { site, whatsappLink } from "@/lib/site";

const offerings = [
  {
    href: "/birthdays",
    title: "ימי הולדת",
    text: "הפעלת מיניאטורות שכל ילד יוצא ממנה עם יצירה קטנה ומושלמת משלו. בסטודיו או אצלכם בבית.",
    color: "bg-flag-pink",
  },
  {
    href: "/camps",
    title: "קייטנות",
    text: "קייטנות יצירה בחופשות – פתוחות לכולם, בסטודיו ובמקומות נוספים בארץ, או קייטנה פרטית לקבוצה שלכם.",
    color: "bg-flag-yellow",
  },
  {
    href: "/workshops",
    title: "סדנאות",
    text: "סדנאות משפחתיות, סדנאות חג וימי כיף לקבוצות ולצוותים – יוצרים יחד עולם בגודל של כף יד.",
    color: "bg-flag-sky",
  },
  {
    href: "/classes",
    title: "חוגים",
    text: "חוג מיניאטורות שבועי לילדים, שבו לומדים טכניקות ובונים פרויקטים מתמשכים.",
    color: "bg-flag-mint",
  },
];

const steps = [
  { title: "משאירים פרטים", text: "ממלאים טופס קצר או שולחים הודעה בוואטסאפ." },
  { title: "תמי חוזרת אליכם", text: "שיחה קצרה לתיאום התאריך, המקום וכל הפרטים." },
  { title: "חוגגים!", text: "תמי מגיעה עם כל החומרים – ואתם רק נהנים." },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 text-center sm:pt-20">
        <p className="text-brown-soft">{site.tagline}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          ימי הולדת, סדנאות וקייטנות של מיניאטורות
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-brown-soft">
          ילדים יוצרים עולמות קטנטנים – בתים, חנויות ומטבחים בגודל של כף יד – ולוקחים אותם הביתה.
          בסטודיו ב{site.studioArea} או אצלכם, בכל הארץ.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/birthdays"
            className="rounded-full bg-brown px-7 py-3 text-lg font-semibold text-paper hover:bg-brown/90"
          >
            הפעלה ליום הולדת
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-brown px-7 py-3 text-lg font-semibold hover:bg-paper"
          >
            דברו איתי בוואטסאפ
          </a>
        </div>
      </section>

      <Bunting className="opacity-90" />

      <section aria-labelledby="offerings" className="mx-auto max-w-6xl px-4 py-14">
        <h2 id="offerings" className="text-center font-display text-3xl">
          מה אפשר לעשות יחד?
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {offerings.map((item, i) => (
            <li key={item.href} className={i === 0 ? "sm:col-span-2" : undefined}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-brown/10 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`h-2 w-16 rounded-full ${item.color}`} aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-brown-soft">{item.text}</p>
                <span className="mt-4 font-semibold group-hover:text-flag-teal">לפרטים ←</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="bg-paper py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="how" className="text-center font-display text-3xl">
            איך זה עובד?
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-cream p-6 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-flag-yellow font-display text-xl">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-1 text-brown-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about" className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 id="about" className="font-display text-3xl">
          נעים מאוד, אני תמי
        </h2>
        <p className="mt-4 text-xl text-brown-soft">
          אומנית מיניאטורות ומורה ליצירה. אני מאמינה שכשמקטינים את העולם, הדמיון של הילדים גדל.
          בכל מפגש אני מביאה את כל החומרים, את הסבלנות ואת ההתלהבות – והילדים מביאים את הקסם.
        </p>
        <Link href="/about" className="mt-6 inline-block font-semibold underline-offset-4 hover:underline">
          עוד עליי ←
        </Link>
      </section>
    </>
  );
}

// Business details shown across the site. Private settings (like where
// request notifications are sent) live in environment variables, not here.

const whatsappNumber = "972545565542";

export const site = {
  name: "לה פטיט ארט",
  nameLatin: "La Petite Art",
  owner: "תמי רואה",
  tagline: "עולם של מיניאטורות",
  description:
    "הפעלות מיניאטורות לימי הולדת, סדנאות, קייטנות וחוגים לילדים – בסטודיו בצפון תל אביב או אצלכם, בכל הארץ.",
  phoneDisplay: "054-556-5542",
  phoneHref: "tel:+972545565542",
  instagram: "https://www.instagram.com/lapetiteart_by_tami/",
  facebook: "https://www.facebook.com/tamiartparty",
  studioArea: "צפון תל אביב",
};

export function whatsappLink(message = "היי תמי, הגעתי מהאתר ואשמח לפרטים 😊") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { href: "/birthdays", label: "ימי הולדת" },
  { href: "/workshops", label: "סדנאות" },
  { href: "/camps", label: "קייטנות" },
  { href: "/classes", label: "חוגים" },
  { href: "/gallery", label: "גלריה" },
  { href: "/studio", label: "הסטודיו" },
  { href: "/about", label: "על תמי" },
  { href: "/contact", label: "צור קשר" },
];

export const footerNav = [
  { href: "/schools", label: "בתי ספר ומוסדות" },
  { href: "/accessibility", label: "הצהרת נגישות" },
  { href: "/privacy", label: "מדיניות פרטיות" },
];

import { z } from "zod";

export const eventTypes = {
  birthday: "יום הולדת",
  workshop: "סדנה",
  camp: "קייטנה (הרשמה לקייטנה פתוחה)",
  private_camp: "קייטנה פרטית לקבוצה",
  class: "חוג",
  other: "משהו אחר",
} as const;

export const locationTypes = {
  studio: "בסטודיו בצפון תל אביב",
  customer: "אצלנו (בית / מקום אחר)",
  undecided: "עוד לא החלטנו",
} as const;

type EventType = keyof typeof eventTypes;
type LocationType = keyof typeof locationTypes;

const eventTypeKeys = Object.keys(eventTypes) as [EventType, ...EventType[]];
const locationTypeKeys = Object.keys(locationTypes) as [LocationType, ...LocationType[]];

// Accepts Israeli mobile and landline numbers, with or without +972,
// spaces and dashes, and stores them as 05XXXXXXXX / 0XXXXXXXX.
export function normalizeIsraeliPhone(value: string): string | null {
  let digits = value.replace(/[\s\-()]/g, "");
  if (digits.startsWith("+972")) digits = "0" + digits.slice(4);
  else if (digits.startsWith("972")) digits = "0" + digits.slice(3);
  return /^(0[23489]\d{7}|0[57]\d{8})$/.test(digits) ? digits : null;
}

// Empty form fields arrive as "", which should mean "not filled in".
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: "הטקסט ארוך מדי" })
    .transform((v) => v || null);

const optionalNumber = (min: number, max: number, message: string) =>
  z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : Number(v)))
    .refine((v) => v === null || (Number.isInteger(v) && v >= min && v <= max), { error: message });

const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), { error: "תאריך לא תקין" })
  .transform((v) => v || null);

export const requestSchema = z
  .object({
    eventType: z.enum(eventTypeKeys, { error: "בחרו סוג פעילות" }),
    locationType: z.enum(locationTypeKeys, { error: "בחרו איפה תרצו את הפעילות" }),
    city: optionalText(80),
    preferredDate: optionalDate,
    alternativeDate: optionalDate,
    childAge: optionalNumber(1, 120, "גיל לא תקין"),
    kidsCount: optionalNumber(1, 500, "מספר משתתפים לא תקין"),
    parentName: z.string().trim().min(2, { error: "נא למלא שם" }).max(80, { error: "השם ארוך מדי" }),
    phone: z
      .string()
      .transform((v, ctx) => {
        const phone = normalizeIsraeliPhone(v);
        if (!phone) {
          ctx.addIssue({ code: "custom", message: "מספר טלפון לא תקין" });
          return z.NEVER;
        }
        return phone;
      }),
    email: z
      .string()
      .trim()
      .refine((v) => v === "" || z.email().safeParse(v).success, { error: "כתובת מייל לא תקינה" })
      .transform((v) => v.toLowerCase() || null),
    callTime: optionalText(80),
    notes: optionalText(1000),
    consent: z.literal("on", { error: "נא לאשר את מדיניות הפרטיות" }),
  })
  .superRefine((data, ctx) => {
    if (data.locationType === "customer" && !data.city) {
      ctx.addIssue({ code: "custom", path: ["city"], message: "באיזו עיר תהיה הפעילות?" });
    }
  });

export type RequestInput = z.input<typeof requestSchema>;
export type ValidRequest = z.output<typeof requestSchema>;

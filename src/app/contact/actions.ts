"use server";

import { z } from "zod";
import { getDb } from "@/lib/db";
import { notifyTami } from "@/lib/requests/notify";
import { requestSchema, type ValidRequest } from "@/lib/requests/schema";

export type RequestFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
  // Echoed back on error so the form keeps what the visitor typed.
  values?: Record<string, string>;
};

const fields = [
  "eventType",
  "locationType",
  "city",
  "preferredDate",
  "alternativeDate",
  "childAge",
  "kidsCount",
  "parentName",
  "phone",
  "email",
  "callTime",
  "notes",
  "consent",
] as const;

async function saveRequest(r: ValidRequest): Promise<boolean> {
  const db = getDb();
  if (!db) {
    console.warn("[requests] Supabase is not configured; request not saved", r);
    return false;
  }
  const { error } = await db.from("requests").insert({
    event_type: r.eventType,
    location_type: r.locationType,
    city: r.city,
    preferred_date: r.preferredDate,
    alternative_date: r.alternativeDate,
    child_age: r.childAge,
    kids_count: r.kidsCount,
    parent_name: r.parentName,
    phone: r.phone,
    email: r.email,
    call_time: r.callTime,
    notes: r.notes,
  });
  if (error) {
    console.error("[requests] saving failed", error);
    return false;
  }
  return true;
}

export async function submitRequest(_prev: RequestFormState, formData: FormData): Promise<RequestFormState> {
  const values = Object.fromEntries(fields.map((f) => [f, String(formData.get(f) ?? "")]));

  // Honeypot: real visitors never see this field, bots tend to fill it.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const parsed = requestSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "יש כמה פרטים שצריך לתקן",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  // Lets the form be tried locally before Supabase and Resend are set up.
  const configured = getDb() !== null || Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL);
  if (!configured && process.env.NODE_ENV !== "production") {
    console.info("[requests] dev mode, nothing configured; request:", parsed.data);
    return { status: "success" };
  }

  // The request counts as received if it reached Tami by at least one route.
  const [saved, emailed] = await Promise.all([saveRequest(parsed.data), notifyTami(parsed.data)]);
  if (!saved && !emailed) {
    return {
      status: "error",
      message: "משהו השתבש בשליחה. אפשר לנסות שוב, או לשלוח לתמי הודעה בוואטסאפ.",
      values,
    };
  }

  return { status: "success" };
}

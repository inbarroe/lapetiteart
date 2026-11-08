import "server-only";
import { Resend } from "resend";
import { eventTypes, locationTypes, type ValidRequest } from "@/lib/requests/schema";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function formatDate(isoDate: string | null) {
  if (!isoDate) return null;
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

function whatsappTo(phone: string) {
  return `https://wa.me/972${phone.slice(1)}`;
}

export function requestSummary(r: ValidRequest) {
  return [
    ["סוג פעילות", eventTypes[r.eventType]],
    ["מיקום", locationTypes[r.locationType] + (r.city ? ` – ${r.city}` : "")],
    ["תאריך מועדף", formatDate(r.preferredDate)],
    ["תאריך חלופי", formatDate(r.alternativeDate)],
    ["גיל הילד/ה", r.childAge?.toString()],
    ["מספר ילדים", r.kidsCount?.toString()],
    ["שם", r.parentName],
    ["טלפון", r.phone],
    ["מייל", r.email],
    ["זמן נוח לשיחה", r.callTime],
    ["הערות", r.notes],
  ].filter((row): row is [string, string] => Boolean(row[1]));
}

// Emails Tami about a new request. Returns false when email isn't configured
// or sending failed, so the caller can decide what to tell the visitor.
export async function notifyTami(r: ValidRequest): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("[notify] RESEND_API_KEY or NOTIFY_EMAIL is not set; skipping email");
    return false;
  }

  const rows = requestSummary(r)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#8a6a58">${label}</td><td style="padding:6px 12px"><b>${escapeHtml(value)}</b></td></tr>`,
    )
    .join("");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;color:#5b3a29;font-size:16px">
      <h2 style="margin:0 0 12px">📩 בקשה חדשה מהאתר</h2>
      <table style="border-collapse:collapse;background:#fbf6ec;border-radius:8px">${rows}</table>
      <p style="margin-top:20px">
        <a href="tel:${r.phone}" style="background:#5b3a29;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">📞 להתקשר</a>
        &nbsp;
        <a href="${whatsappTo(r.phone)}" style="background:#25d366;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">💬 וואטסאפ</a>
      </p>
    </div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "La Petite Art <onboarding@resend.dev>",
    to,
    replyTo: r.email ?? undefined,
    subject: `📩 בקשה חדשה: ${eventTypes[r.eventType]} · ${r.parentName}`,
    html,
  });
  if (error) {
    console.error("[notify] sending email failed", error);
    return false;
  }
  return true;
}

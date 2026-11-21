import { timingSafeEqual } from "node:crypto";
import { getDb } from "@/lib/db";

// Called once a day by Vercel Cron (see vercel.json). A tiny query keeps the
// free-tier Supabase project from being paused after a week without activity.
// Vercel sends "Authorization: Bearer <CRON_SECRET>" automatically when the
// CRON_SECRET environment variable is set; anyone else gets a 401.

function isAuthorized(header: string | null) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function GET(request: Request) {
  if (!isAuthorized(request.headers.get("authorization"))) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return Response.json({ ok: false, error: "Supabase is not configured" }, { status: 500 });
  }

  const { error, status } = await db.from("requests").select("id", { count: "exact", head: true });
  if (error) {
    // HEAD requests come back without a message, so report the status too
    // (e.g. 521 while the project is paused).
    const message = error.message || `Supabase responded with status ${status}`;
    console.error("[keepalive] query failed:", message);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }

  return Response.json({ ok: true });
}

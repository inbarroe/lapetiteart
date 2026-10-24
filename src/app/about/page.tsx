import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "על תמי" };

export default function Page() {
  return <ComingSoon title="על תמי" intro="אומנית מיניאטורות ומורה ליצירה לילדים." />;
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "סדנאות" };

export default function Page() {
  return <ComingSoon title="סדנאות" intro="סדנאות משפחתיות, סדנאות חג וימי כיף לקבוצות ולצוותים." />;
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "גלריה" };

export default function Page() {
  return <ComingSoon title="גלריה" intro="עבודות של תמי ויצירות של הילדים מההפעלות, הסדנאות והקייטנות." />;
}

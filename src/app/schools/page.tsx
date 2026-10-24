import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "בתי ספר ומוסדות" };

export default function Page() {
  return <ComingSoon title="בתי ספר ומוסדות" intro="תוכניות העשרה במיניאטורות לבתי ספר, גנים ומוסדות." />;
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "הסטודיו" };

export default function Page() {
  return <ComingSoon title="הסטודיו" intro="הסטודיו שלי בצפון תל אביב – המקום שבו העולמות הקטנים נולדים." />;
}

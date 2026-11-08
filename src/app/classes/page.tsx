import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "חוגים" };

export default function Page() {
  return <ComingSoon title="חוגים" intro="חוג מיניאטורות שבועי לילדים." />;
}

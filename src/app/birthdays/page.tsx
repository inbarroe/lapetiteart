import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "ימי הולדת" };

export default function Page() {
  return <ComingSoon title="ימי הולדת" intro="הפעלת מיניאטורות ליום הולדת – בסטודיו בצפון תל אביב או אצלכם, בכל הארץ." />;
}

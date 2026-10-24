import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

export default function Page() {
  return <ComingSoon title="מדיניות פרטיות" intro="כאן יפורט אילו פרטים נאספים באתר וכיצד הם נשמרים." />;
}

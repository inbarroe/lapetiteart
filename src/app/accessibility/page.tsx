import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "הצהרת נגישות" };

export default function Page() {
  return <ComingSoon title="הצהרת נגישות" intro="אנחנו פועלים להנגשת האתר בהתאם לתקן הישראלי 5568 ולהנחיות WCAG 2.1 ברמה AA." />;
}

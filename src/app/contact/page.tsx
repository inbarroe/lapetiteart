import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "צור קשר" };

export default function Page() {
  return <ComingSoon title="צור קשר" intro="רוצים לבדוק תאריך פנוי? השאירו פרטים ואחזור אליכם לשיחה קצרה." />;
}

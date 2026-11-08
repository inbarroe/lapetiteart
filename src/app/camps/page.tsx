import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "קייטנות" };

export default function Page() {
  return <ComingSoon title="קייטנות" intro="קייטנות יצירה בחופשות – פתוחות לכולם בסטודיו ובמקומות נוספים בארץ, או קייטנה פרטית לקבוצה שלכם." />;
}

import type { Metadata } from "next";
import { Desk } from "@/components/admin/desk";

export const metadata: Metadata = { title: "Clinic desk", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <Desk />;
}

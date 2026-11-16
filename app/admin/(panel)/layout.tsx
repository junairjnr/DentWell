import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return <div className="min-h-[100svh] bg-wall">{children}</div>;
}

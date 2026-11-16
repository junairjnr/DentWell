import { Footer } from "./footer";
import { Header } from "./header";
import { getContent, getSettings } from "@/lib/db";

export async function Shell({ children }: { children: React.ReactNode }) {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer settings={settings} treatments={content.treatments} />
    </>
  );
}

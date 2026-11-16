import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/db";
import type { SiteContent } from "@/lib/types";

async function guard() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json({ content: await getContent() });
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body?.treatments || !body.doctors || !body.gallery || !body.reviews) {
    return NextResponse.json({ error: "Content was not readable." }, { status: 400 });
  }
  await saveContent(body);
  return NextResponse.json({ ok: true });
}

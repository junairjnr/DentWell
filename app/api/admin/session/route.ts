import { NextResponse } from "next/server";
import { clearSession, getSession, passwordMatches, setSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ ok: Boolean(session) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password ?? "");
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "That password is not recognised." }, { status: 401 });
  }
  await setSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ ok: true });
}

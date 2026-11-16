import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/db";
import type { Settings } from "@/lib/types";

async function guard() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const body = (await request.json().catch(() => null)) as Settings | null;
  if (!body || typeof body.slotMinutes !== "number" || !body.hours) {
    return NextResponse.json({ error: "Settings were not readable." }, { status: 400 });
  }
  const hours: Settings["hours"] = {};
  for (const [day, ranges] of Object.entries(body.hours)) {
    hours[day] = (ranges ?? []).filter(
      (range): range is [string, string] =>
        Array.isArray(range) && /^\d{2}:\d{2}$/.test(range[0] ?? "") && /^\d{2}:\d{2}$/.test(range[1] ?? ""),
    );
  }
  const settings: Settings = {
    slotMinutes: Math.min(120, Math.max(10, Math.round(body.slotMinutes))),
    hours,
    holidays: Array.isArray(body.holidays) ? body.holidays.filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day)) : [],
    disabledSlots: Array.isArray(body.disabledSlots)
      ? body.disabledSlots.filter((slot) => /^\d{4}-\d{2}-\d{2}$/.test(slot?.date) && /^\d{2}:\d{2}$/.test(slot?.time))
      : [],
  };
  await saveSettings(settings);
  return NextResponse.json({ settings });
}

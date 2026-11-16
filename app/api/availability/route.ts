import { NextResponse } from "next/server";
import { getBookings, getSettings } from "@/lib/db";
import { slotsForDate } from "@/lib/slots";
import { monthBounds } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const month = url.searchParams.get("month");
  const [settings, bookings] = await Promise.all([getSettings(), getBookings()]);

  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Use a YYYY-MM-DD date." }, { status: 400 });
    }
    const day = slotsForDate(settings, bookings, date);
    return NextResponse.json({ date, ...day });
  }

  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const { days } = monthBounds(month);
    const summary: Record<string, { state: string; openCount: number }> = {};
    for (let day = 1; day <= days; day += 1) {
      const iso = `${month}-${String(day).padStart(2, "0")}`;
      const result = slotsForDate(settings, bookings, iso);
      summary[iso] = {
        state: result.state,
        openCount: result.slots.filter((slot) => slot.available).length,
      };
    }
    return NextResponse.json({ month, days: summary });
  }

  return NextResponse.json({ error: "Pass a date or a month." }, { status: 400 });
}

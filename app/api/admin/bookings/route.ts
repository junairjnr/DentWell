import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBookings, saveBookings, withLock } from "@/lib/db";
import type { AppointmentStatus } from "@/lib/types";

const statuses: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled"];

async function guard() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}

export async function PATCH(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const status = body.status as AppointmentStatus;
  if (!statuses.includes(status) || typeof body.id !== "string") {
    return NextResponse.json({ error: "Choose a valid status." }, { status: 400 });
  }
  const updated = await withLock(async () => {
    const bookings = await getBookings();
    const next = bookings.map((booking) => (booking.id === body.id ? { ...booking, status } : booking));
    await saveBookings(next);
    return next.find((booking) => booking.id === body.id) ?? null;
  });
  if (!updated) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  return NextResponse.json({ booking: updated });
}

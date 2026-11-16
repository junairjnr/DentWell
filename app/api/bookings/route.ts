import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { getBookings, getSettings, saveBookings, withLock } from "@/lib/db";
import { isSlotFree } from "@/lib/slots";
import { bookingSchema, manageSchema, rescheduleSchema } from "@/lib/validators";

function reference() {
  return `DW-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the form and try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const input = parsed.data;

  try {
    const booking = await withLock(async () => {
      const [settings, bookings] = await Promise.all([getSettings(), getBookings()]);
      if (!isSlotFree(settings, bookings, input.date, input.time)) {
        throw new Error("That time was just taken. Choose another.");
      }
      const created = {
        id: randomBytes(8).toString("hex"),
        reference: reference(),
        treatment: input.treatment,
        date: input.date,
        time: input.time,
        name: input.name,
        phone: input.phone,
        email: input.email ?? "",
        notes: input.notes ?? "",
        status: "pending" as const,
        createdAt: new Date().toISOString(),
      };
      await saveBookings([created, ...bookings]);
      return created;
    });
    return NextResponse.json({
      booking: {
        reference: booking.reference,
        name: booking.name,
        treatment: booking.treatment,
        date: booking.date,
        time: booking.time,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The booking could not be saved.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}

export async function PUT(request: Request) {
  const json = await request.json().catch(() => null);
  const action = json?.action;
  if (action === "cancel") {
    const parsed = manageSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the reference and mobile." }, { status: 400 });
    }
    return updateBooking(parsed.data.reference, parsed.data.phone, (booking) => {
      if (booking.status === "cancelled" || booking.status === "completed") {
        throw new Error("This booking can no longer be cancelled online.");
      }
      return { ...booking, status: "cancelled" as const };
    });
  }
  if (action === "reschedule") {
    const parsed = rescheduleSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Choose a new date and time." }, { status: 400 });
    }
    return updateBooking(parsed.data.reference, parsed.data.phone, (booking, all, settings) => {
      if (booking.status === "cancelled" || booking.status === "completed") {
        throw new Error("This booking can no longer be moved online.");
      }
      const others = all.filter((item) => item.id !== booking.id);
      if (!isSlotFree(settings, others, parsed.data.date, parsed.data.time)) {
        throw new Error("That time is not open.");
      }
      return { ...booking, date: parsed.data.date, time: parsed.data.time, status: "pending" as const };
    });
  }
  return NextResponse.json({ error: "Unknown request." }, { status: 400 });
}

async function updateBooking(
  reference: string,
  phone: string,
  change: (
    booking: Awaited<ReturnType<typeof getBookings>>[number],
    all: Awaited<ReturnType<typeof getBookings>>,
    settings: Awaited<ReturnType<typeof getSettings>>,
  ) => Awaited<ReturnType<typeof getBookings>>[number],
) {
  try {
    const updated = await withLock(async () => {
      const [settings, bookings] = await Promise.all([getSettings(), getBookings()]);
      const current = bookings.find(
        (booking) => booking.reference.toLowerCase() === reference.toLowerCase() && booking.phone === phone,
      );
      if (!current) throw new Error("No booking matches that reference and mobile number.");
      const next = change(current, bookings, settings);
      await saveBookings(bookings.map((booking) => (booking.id === current.id ? next : booking)));
      return next;
    });
    return NextResponse.json({
      booking: {
        reference: updated.reference,
        status: updated.status,
        date: updated.date,
        time: updated.time,
        treatment: updated.treatment,
        name: updated.name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The booking could not be updated.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

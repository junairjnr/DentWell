import type { Booking, DayState, Settings, Slot } from "./types";
import { clinicNow, formatClock, fromMinutes, toMinutes, weekdayIndex } from "./utils";

const HOLDING: Booking["status"][] = ["pending", "confirmed"];

export function slotStarts(settings: Settings, date: string) {
  const ranges = settings.hours[String(weekdayIndex(date))] ?? [];
  const step = settings.slotMinutes;
  const starts: string[] = [];
  for (const [open, close] of ranges) {
    let cursor = toMinutes(open);
    const end = toMinutes(close);
    while (cursor + step <= end) {
      starts.push(fromMinutes(cursor));
      cursor += step;
    }
  }
  return starts;
}

export function slotsForDate(settings: Settings, bookings: Booking[], date: string): {
  state: DayState;
  slots: Slot[];
} {
  const now = clinicNow();
  if (date < now.date) return { state: "past", slots: [] };
  if (settings.holidays.includes(date)) return { state: "holiday", slots: [] };
  const starts = slotStarts(settings, date);
  if (starts.length === 0) return { state: "closed", slots: [] };

  const held = new Set(
    bookings
      .filter((booking) => booking.date === date && HOLDING.includes(booking.status))
      .map((booking) => booking.time),
  );
  const disabled = new Set(
    settings.disabledSlots.filter((slot) => slot.date === date).map((slot) => slot.time),
  );

  const slots: Slot[] = starts.map((time) => {
    if (date === now.date && toMinutes(time) <= now.minutes) {
      return { time, label: formatClock(time), available: false, reason: "past" };
    }
    if (disabled.has(time)) {
      return { time, label: formatClock(time), available: false, reason: "disabled" };
    }
    if (held.has(time)) {
      return { time, label: formatClock(time), available: false, reason: "booked" };
    }
    return { time, label: formatClock(time), available: true };
  });

  const openCount = slots.filter((slot) => slot.available).length;
  if (openCount > 0) return { state: "open", slots };
  const allPast = slots.length > 0 && slots.every((slot) => slot.reason === "past");
  return { state: allPast ? "past" : "full", slots };
}

export function isSlotFree(settings: Settings, bookings: Booking[], date: string, time: string) {
  const day = slotsForDate(settings, bookings, date);
  return day.slots.some((slot) => slot.time === time && slot.available);
}

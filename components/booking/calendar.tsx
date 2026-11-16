"use client";

import { addMonths, clinicNow, monthBounds } from "@/lib/utils";
import type { DayState } from "@/lib/types";

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthCalendar({
  month,
  days,
  selected,
  onMonth,
  onSelect,
}: {
  month: string;
  days: Record<string, { state: DayState; openCount: number }>;
  selected: string | null;
  onMonth: (month: string) => void;
  onSelect: (date: string) => void;
}) {
  const { year, monthIndex, days: count } = monthBounds(month);
  const first = new Date(Date.UTC(year, monthIndex, 1, 12)).getUTCDay();
  const today = clinicNow().date;
  const title = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, 1, 12)));
  const cells = [...Array(first).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];

  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" className="h-10 rounded-full px-3 text-sm hover:bg-ink/5" onClick={() => onMonth(addMonths(month, -1))}>
          Previous
        </button>
        <p className="text-base font-medium">{title}</p>
        <button type="button" className="h-10 rounded-full px-3 text-sm hover:bg-ink/5" onClick={() => onMonth(addMonths(month, 1))}>
          Next
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-[#5c534c]">
        {labels.map((label) => (
          <div key={label} className="py-2">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} />;
          const date = `${month}-${String(day).padStart(2, "0")}`;
          const info = days[date];
          const state = info?.state ?? "closed";
          const disabled = state !== "open";
          const isToday = date === today;
          const isSelected = date === selected;
          return (
            <button
              key={date}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              aria-pressed={isSelected}
              aria-label={`${date}${disabled ? `, ${state}` : `, ${info?.openCount ?? 0} times open`}`}
              className={`aspect-square rounded-full text-sm transition ${
                isSelected
                  ? "bg-gold text-ink"
                  : disabled
                    ? "text-[#5c534c]/50"
                    : "bg-paper text-ink hover:bg-oak/40"
              } ${isToday && !isSelected ? "ring-1 ring-gold-deep" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5c534c]">
        <li>Gold ring is today</li>
        <li>Filled gold is your date</li>
        <li>Faint dates are closed, past, full, or a holiday</li>
      </ul>
    </div>
  );
}

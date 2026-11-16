import type { Settings } from "./types";
import { formatClock } from "./utils";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function hoursLines(settings: Settings) {
  return DAYS.map((label, index) => {
    const ranges = settings.hours[String(index)] ?? [];
    const value = ranges.length
      ? ranges.map(([open, close]) => `${formatClock(open)} – ${formatClock(close)}`).join(", ")
      : "Closed";
    return { label, value };
  });
}

export function hoursSummary(settings: Settings) {
  const lines = hoursLines(settings);
  const weekday = lines.slice(1);
  const same = weekday.every((line) => line.value === weekday[0]?.value);
  if (same && weekday[0]) {
    return [
      { label: "Monday – Saturday", value: weekday[0].value },
      { label: "Sunday", value: lines[0].value },
    ];
  }
  return lines;
}

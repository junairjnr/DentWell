import { promises as fs } from "fs";
import path from "path";
import type { Booking, Settings, SiteContent } from "./types";
import { seedContent, seedSettings } from "./seed";

const dataDir = path.join(process.cwd(), "data");

let chain: Promise<unknown> = Promise.resolve();

export function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(dataDir, { recursive: true });
  const target = path.join(dataDir, file);
  const temp = `${target}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(value, null, 2));
  await fs.rename(temp, target);
}

export function getSettings() {
  return readJson<Settings>("settings.json", seedSettings);
}

export function saveSettings(settings: Settings) {
  return withLock(() => writeJson("settings.json", settings));
}

export function getBookings() {
  return readJson<Booking[]>("bookings.json", []);
}

export function saveBookings(bookings: Booking[]) {
  return writeJson("bookings.json", bookings);
}

export function getContent() {
  return readJson<SiteContent>("content.json", seedContent);
}

export function saveContent(content: SiteContent) {
  return withLock(() => writeJson("content.json", content));
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AppointmentStatus, Booking, Settings, SiteContent } from "@/lib/types";
import { clinicNow, formatClock, formatLongDate } from "@/lib/utils";

const statuses: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function Desk() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [notice, setNotice] = useState("");
  const [holiday, setHoliday] = useState("");
  const [blockDate, setBlockDate] = useState("");
  const [blockTime, setBlockTime] = useState("09:00");
  const today = clinicNow().date;

  async function load() {
    const [bookingRes, settingsRes, contentRes] = await Promise.all([
      fetch("/api/admin/bookings"),
      fetch("/api/admin/settings"),
      fetch("/api/admin/content"),
    ]);
    if (bookingRes.status === 401) {
      router.push("/admin/login");
      return;
    }
    const bookingJson = await bookingRes.json();
    const settingsJson = await settingsRes.json();
    const contentJson = await contentRes.json();
    setBookings(bookingJson.bookings ?? []);
    setSettings(settingsJson.settings);
    setContent(contentJson.content);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const counts = useMemo(() => {
    return {
      total: bookings.length,
      today: bookings.filter((booking) => booking.date === today && booking.status !== "cancelled").length,
      pending: bookings.filter((booking) => booking.status === "pending").length,
      confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled").length,
    };
  }, [bookings, today]);

  async function setStatus(id: string, status: AppointmentStatus) {
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setNotice("The status did not save.");
      return;
    }
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
  }

  async function saveSettings(next: Settings) {
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!response.ok) {
      setNotice("Hours did not save.");
      return;
    }
    const data = await response.json();
    setSettings(data.settings);
    setNotice("The public calendar is using these hours now.");
  }

  async function saveContent(next: SiteContent) {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setNotice(response.ok ? "The public pages are updated." : "Content did not save.");
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  if (!settings || !content) {
    return <p className="px-6 py-16 text-sm text-[#5c534c]">Loading the desk…</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-medium tracking-[-0.03em]">Today at DENTWELL</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/" className="underline">View site</Link>
          <button type="button" onClick={() => void signOut()} className="underline">Sign out</button>
        </div>
      </div>
      {notice ? <p className="mt-4 text-sm text-[#3f3832]">{notice}</p> : null}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ["All", counts.total],
          ["Today", counts.today],
          ["Pending", counts.pending],
          ["Confirmed", counts.confirmed],
          ["Cancelled", counts.cancelled],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl bg-paper p-4">
            <p className="text-2xl font-medium">{value}</p>
            <p className="text-sm text-[#5c534c]">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-medium">Appointments</h2>
        {bookings.length === 0 ? <p className="mt-3 text-sm text-[#5c534c]">No bookings yet.</p> : null}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="text-[#5c534c]">
              <tr>
                <th className="py-2 font-medium">When</th>
                <th className="font-medium">Patient</th>
                <th className="font-medium">Treatment</th>
                <th className="font-medium">Reference</th>
                <th className="font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-ink/10">
                  <td className="py-3">
                    {formatLongDate(booking.date)}
                    <span className="block text-[#5c534c]">{formatClock(booking.time)}</span>
                  </td>
                  <td>
                    {booking.name}
                    <span className="block text-[#5c534c]">{booking.phone}</span>
                    {booking.notes ? <span className="block text-[#5c534c]">{booking.notes}</span> : null}
                  </td>
                  <td>{booking.treatment}</td>
                  <td>{booking.reference}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(event) => void setStatus(booking.id, event.target.value as AppointmentStatus)}
                      className="h-10 rounded-full border border-ink/10 bg-paper px-3"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Hours, holidays, and blocked times</h2>
        <p className="mt-2 text-sm text-[#3f3832]">Changes appear on the public calendar immediately. Leave a day with no range to close it.</p>
        <div className="mt-4 space-y-3">
          {dayNames.map((name, index) => {
            const range = settings.hours[String(index)]?.[0] ?? ["", ""];
            return (
              <div key={name} className="grid grid-cols-[7rem_1fr_1fr] items-center gap-2 text-sm">
                <span>{name}</span>
                <input
                  type="time"
                  value={range[0]}
                  onChange={(event) => {
                    const hours = { ...settings.hours, [index]: event.target.value ? [[event.target.value, range[1] || "19:30"]] : [] };
                    setSettings({ ...settings, hours });
                  }}
                  className="h-10 rounded-xl border border-ink/10 bg-paper px-2"
                />
                <input
                  type="time"
                  value={range[1]}
                  onChange={(event) => {
                    const hours = { ...settings.hours, [index]: range[0] ? [[range[0], event.target.value]] : [] };
                    setSettings({ ...settings, hours });
                  }}
                  className="h-10 rounded-xl border border-ink/10 bg-paper px-2"
                />
              </div>
            );
          })}
        </div>
        <label className="mt-4 block text-sm">
          Minutes per visit
          <input
            type="number"
            min={10}
            max={120}
            value={settings.slotMinutes}
            onChange={(event) => setSettings({ ...settings, slotMinutes: Number(event.target.value) })}
            className="mt-1 h-10 w-28 rounded-xl border border-ink/10 bg-paper px-3"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <input type="date" value={holiday} onChange={(event) => setHoliday(event.target.value)} className="h-10 rounded-xl border border-ink/10 bg-paper px-3" />
          <button
            type="button"
            className="h-10 rounded-full bg-paper px-4 text-sm"
            onClick={() => {
              if (!holiday || settings.holidays.includes(holiday)) return;
              setSettings({ ...settings, holidays: [...settings.holidays, holiday].sort() });
              setHoliday("");
            }}
          >
            Add holiday
          </button>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {settings.holidays.map((day) => (
            <li key={day}>
              <button
                type="button"
                className="rounded-full bg-paper px-3 py-1"
                onClick={() => setSettings({ ...settings, holidays: settings.holidays.filter((item) => item !== day) })}
              >
                {day} ×
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <input type="date" value={blockDate} onChange={(event) => setBlockDate(event.target.value)} className="h-10 rounded-xl border border-ink/10 bg-paper px-3" />
          <input type="time" value={blockTime} onChange={(event) => setBlockTime(event.target.value)} className="h-10 rounded-xl border border-ink/10 bg-paper px-3" />
          <button
            type="button"
            className="h-10 rounded-full bg-paper px-4 text-sm"
            onClick={() => {
              if (!blockDate) return;
              setSettings({
                ...settings,
                disabledSlots: [...settings.disabledSlots, { date: blockDate, time: blockTime }],
              });
            }}
          >
            Block this time
          </button>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {settings.disabledSlots.map((slot, index) => (
            <li key={`${slot.date}-${slot.time}-${index}`}>
              <button
                type="button"
                className="underline"
                onClick={() =>
                  setSettings({
                    ...settings,
                    disabledSlots: settings.disabledSlots.filter((_, item) => item !== index),
                  })
                }
              >
                {slot.date} {slot.time} — remove
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => void saveSettings(settings)} className="mt-5 h-11 rounded-full bg-gold px-5 text-sm font-medium text-ink">
          Save calendar
        </button>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Doctors</h2>
        <div className="mt-4 space-y-6">
          {content.doctors.map((doctor, index) => (
            <div key={doctor.id} className="grid gap-2 rounded-2xl bg-paper p-4">
              <input
                value={doctor.name}
                onChange={(event) => {
                  const doctors = content.doctors.slice();
                  doctors[index] = { ...doctor, name: event.target.value };
                  setContent({ ...content, doctors });
                }}
                className="h-10 rounded-xl border border-ink/10 px-3"
              />
              <input
                value={doctor.qualifications}
                onChange={(event) => {
                  const doctors = content.doctors.slice();
                  doctors[index] = { ...doctor, qualifications: event.target.value };
                  setContent({ ...content, doctors });
                }}
                className="h-10 rounded-xl border border-ink/10 px-3"
              />
              <textarea
                value={doctor.bio}
                onChange={(event) => {
                  const doctors = content.doctors.slice();
                  doctors[index] = { ...doctor, bio: event.target.value };
                  setContent({ ...content, doctors });
                }}
                className="min-h-24 rounded-xl border border-ink/10 px-3 py-2"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Treatments</h2>
        <div className="mt-4 space-y-4">
          {content.treatments.map((treatment, index) => (
            <label key={treatment.slug} className="block text-sm">
              {treatment.name}
              <textarea
                value={treatment.summary}
                onChange={(event) => {
                  const treatments = content.treatments.slice();
                  treatments[index] = { ...treatment, summary: event.target.value };
                  setContent({ ...content, treatments });
                }}
                className="mt-1 min-h-20 w-full rounded-xl border border-ink/10 bg-paper px-3 py-2"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Gallery</h2>
        <ul className="mt-4 space-y-3">
          {content.gallery.map((item, index) => (
            <li key={item.id} className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.visible}
                  onChange={(event) => {
                    const gallery = content.gallery.slice();
                    gallery[index] = { ...item, visible: event.target.checked };
                    setContent({ ...content, gallery });
                  }}
                />
                Show
              </label>
              <input
                value={item.caption}
                onChange={(event) => {
                  const gallery = content.gallery.slice();
                  gallery[index] = { ...item, caption: event.target.value };
                  setContent({ ...content, gallery });
                }}
                className="h-10 flex-1 rounded-xl border border-ink/10 bg-paper px-3"
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => void saveContent(content)} className="mt-5 h-11 rounded-full bg-slate px-5 text-sm font-medium text-wall">
          Save pages
        </button>
      </section>
    </div>
  );
}

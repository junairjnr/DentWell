"use client";

import { useState } from "react";
import { formatClock, formatLongDate } from "@/lib/utils";

type Found = {
  reference: string;
  status: string;
  date: string;
  time: string;
  treatment: string;
  name: string;
};

export function ManageForm() {
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [found, setFound] = useState<Found | null>(null);
  const [busy, setBusy] = useState(false);

  async function send(action: "cancel" | "reschedule") {
    setBusy(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, reference, phone, date, time }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setError(data.error ?? "That request did not go through.");
      return;
    }
    setFound(data.booking);
    setMessage(action === "cancel" ? "The booking is cancelled and the time is free." : "The visit has moved and is pending again.");
  }

  return (
    <form
      className="mt-8 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        void send("cancel");
      }}
    >
      <label className="block text-sm">
        Reference
        <input value={reference} onChange={(event) => setReference(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4" />
      </label>
      <label className="block text-sm">
        Mobile number
        <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4" />
      </label>
      {found ? (
        <p className="text-sm text-[#3f3832]">
          {found.name} · {found.treatment} · {formatLongDate(found.date)} · {formatClock(found.time)} · {found.status}
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          New date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4" />
        </label>
        <label className="block text-sm">
          New time
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4" />
        </label>
      </div>
      {error ? <p className="text-sm text-gold-deep">{error}</p> : null}
      {message ? <p className="text-sm text-ink">{message}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" disabled={busy} onClick={() => void send("reschedule")} className="h-12 rounded-full bg-gold px-5 text-sm font-medium text-ink disabled:opacity-50">
          {busy ? "Saving…" : "Request the new time"}
        </button>
        <button type="submit" disabled={busy} className="h-12 rounded-full border border-ink/15 px-5 text-sm disabled:opacity-50">
          Cancel booking
        </button>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { bookingSchema, type BookingInput } from "@/lib/validators";
import { useBookingDraft } from "@/lib/store";
import { clinic, whatsappHref } from "@/lib/clinic";
import { formatClock, formatLongDate } from "@/lib/utils";
import type { DayState, Slot } from "@/lib/types";
import { MonthCalendar } from "./calendar";

const choices = [
  "Root Canal Treatment",
  "Dental Implants",
  "Teeth Whitening",
  "Dental Cleaning",
  "Clear Aligners",
  "Dental Consultation",
  "Other Treatments",
];

type MonthDay = { state: DayState; openCount: number };

export function BookingWizard() {
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const draft = useBookingDraft();
  const monthNow = draft.date?.slice(0, 7) ?? new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(monthNow);
  const [days, setDays] = useState<Record<string, MonthDay>>({});
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingDays, setLoadingDays] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<null | {
    reference: string;
    name: string;
    treatment: string;
    date: string;
    time: string;
  }>(null);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      treatment: draft.treatment,
      date: draft.date ?? "",
      time: draft.time ?? "",
      name: draft.name,
      phone: draft.phone,
      email: draft.email,
      notes: draft.notes,
    },
  });

  useEffect(() => {
    const requested = params.get("treatment");
    if (!requested || draft.treatment) return;
    const match = choices.find((choice) => requested.toLowerCase().includes(choice.toLowerCase().slice(0, 8)));
    const treatment = match ?? (requested.toLowerCase().includes("clean") ? "Dental Cleaning" : "Other Treatments");
    draft.setDraft({ treatment });
    form.setValue("treatment", treatment);
  }, [params, draft, form]);

  useEffect(() => {
    let cancel = false;
    setLoadingDays(true);
    fetch(`/api/availability?month=${month}`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancel) setDays(data.days ?? {});
      })
      .catch(() => {
        if (!cancel) setDays({});
      })
      .finally(() => {
        if (!cancel) setLoadingDays(false);
      });
    return () => {
      cancel = true;
    };
  }, [month]);

  useEffect(() => {
    if (!draft.date) {
      setSlots([]);
      return;
    }
    let cancel = false;
    setLoadingSlots(true);
    fetch(`/api/availability?date=${draft.date}`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancel) setSlots(data.slots ?? []);
      })
      .finally(() => {
        if (!cancel) setLoadingSlots(false);
      });
    return () => {
      cancel = true;
    };
  }, [draft.date]);

  const step = draft.step;
  const openSlots = useMemo(() => slots.filter((slot) => slot.available), [slots]);

  async function submit(values: BookingInput) {
    setSubmitError("");
    setPending(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitError(data.error ?? "That time could not be held. Choose another.");
        return;
      }
      setDone(data.booking);
      draft.reset();
    } catch {
      setSubmitError("The clinic could not be reached. Call or try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    const message = `Hello DENTWELL, I requested ${done.treatment} on ${formatLongDate(done.date)} at ${formatClock(done.time)}. Reference ${done.reference}. Name: ${done.name}.`;
    return (
      <section className="rounded-[2rem] bg-wall p-7 sm:p-10">
        <p className="text-sm text-[#5c534c]">Request received</p>
        <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em]">Your time is held.</h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#3f3832]">
          This is a request, not a confirmed visit, until the clinic says so. The slot stays yours while the booking is pending.
        </p>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[#5c534c]">Reference</dt>
            <dd className="text-lg font-medium">{done.reference}</dd>
          </div>
          <div>
            <dt className="text-[#5c534c]">Patient</dt>
            <dd className="text-lg font-medium">{done.name}</dd>
          </div>
          <div>
            <dt className="text-[#5c534c]">Treatment</dt>
            <dd>{done.treatment}</dd>
          </div>
          <div>
            <dt className="text-[#5c534c]">When</dt>
            <dd>
              {formatLongDate(done.date)} · {formatClock(done.time)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[#5c534c]">Clinic</dt>
            <dd>{clinic.address}</dd>
            <dd className="mt-1">{clinic.phones.map((phone) => phone.display).join(" · ")}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappHref(message)} className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink">
            Send on WhatsApp
          </a>
          <a href={`tel:${clinic.phones[0].tel}`} className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium">
            Call the clinic
          </a>
          <a href="/book/manage" className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium underline">
            Reschedule or cancel
          </a>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <form
        className="rounded-[2rem] bg-wall p-5 sm:p-8"
        onSubmit={form.handleSubmit(submit)}
        noValidate
      >
        <ol className="flex gap-3 text-xs text-[#5c534c]">
          {["Treatment", "Date", "Time", "Details"].map((label, index) => (
            <li key={label} className={step === index + 1 ? "font-medium text-ink" : ""}>
              {index + 1} {label}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
        {step === 1 ? (
          <fieldset className="mt-6">
            <legend className="text-2xl font-medium tracking-[-0.03em]">What do you need?</legend>
            <div className="mt-5 grid gap-2">
              {choices.map((choice) => {
                const selected = draft.treatment === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      draft.setDraft({ treatment: choice });
                      form.setValue("treatment", choice);
                    }}
                    className={`rounded-2xl px-4 py-3 text-left text-sm ${selected ? "bg-gold text-ink" : "bg-paper hover:bg-oak/30"}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              disabled={!draft.treatment}
              className="mt-6 h-12 w-full rounded-full bg-slate text-sm font-medium text-wall disabled:opacity-40 sm:w-auto sm:px-6"
              onClick={() => draft.setDraft({ step: 2 })}
            >
              Continue
            </button>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="mt-6">
            <h2 className="text-2xl font-medium tracking-[-0.03em]">Choose a date</h2>
            <p className="mt-2 text-sm text-[#3f3832]">Past days, holidays, and full days cannot be selected. Times come from the clinic&apos;s hours.</p>
            <div className="mt-5">
              {loadingDays ? <p className="text-sm text-[#5c534c]">Loading the month…</p> : null}
              <MonthCalendar
                month={month}
                days={days}
                selected={draft.date}
                onMonth={setMonth}
                onSelect={(date) => {
                  draft.setDraft({ date, time: null, step: 3 });
                  form.setValue("date", date);
                  form.setValue("time", "");
                }}
              />
            </div>
            <button type="button" className="mt-4 text-sm underline" onClick={() => draft.setDraft({ step: 1 })}>
              Back
            </button>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6">
            <h2 className="text-2xl font-medium tracking-[-0.03em]">
              {draft.date ? formatLongDate(draft.date) : "Choose a time"}
            </h2>
            {loadingSlots ? <p className="mt-4 text-sm text-[#5c534c]">Checking open times…</p> : null}
            {!loadingSlots && openSlots.length === 0 ? (
              <p className="mt-4 text-sm text-[#3f3832]">No open times on this date. Go back and choose another day.</p>
            ) : null}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => {
                    draft.setDraft({ time: slot.time, step: 4 });
                    form.setValue("time", slot.time);
                  }}
                  className={`h-11 rounded-full text-sm ${
                    draft.time === slot.time
                      ? "bg-gold text-ink"
                      : slot.available
                        ? "bg-paper hover:bg-oak/40"
                        : "bg-ink/5 text-[#5c534c]/50 line-through"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            <button type="button" className="mt-4 text-sm underline" onClick={() => draft.setDraft({ step: 2 })}>
              Back
            </button>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl font-medium tracking-[-0.03em]">Your details</h2>
            <p className="text-sm text-[#3f3832]">
              {draft.treatment} · {draft.date ? formatLongDate(draft.date) : ""} · {draft.time ? formatClock(draft.time) : ""}
            </p>
            <label className="block text-sm">
              Full name
              <input
                className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4"
                {...form.register("name", {
                  onChange: (event) => draft.setDraft({ name: event.target.value }),
                })}
              />
              {form.formState.errors.name ? <span className="mt-1 block text-gold-deep">{form.formState.errors.name.message}</span> : null}
            </label>
            <label className="block text-sm">
              Mobile number
              <input
                inputMode="tel"
                className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4"
                {...form.register("phone", {
                  onChange: (event) => draft.setDraft({ phone: event.target.value }),
                })}
              />
              {form.formState.errors.phone ? <span className="mt-1 block text-gold-deep">{form.formState.errors.phone.message}</span> : null}
            </label>
            <label className="block text-sm">
              Email, if you want one
              <input
                type="email"
                className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-paper px-4"
                {...form.register("email")}
              />
              {form.formState.errors.email ? <span className="mt-1 block text-gold-deep">{form.formState.errors.email.message}</span> : null}
            </label>
            <label className="block text-sm">
              Notes
              <textarea className="mt-1 min-h-24 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3" {...form.register("notes")} />
            </label>
            {submitError ? <p className="text-sm text-gold-deep">{submitError}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" className="h-12 rounded-full px-5 text-sm underline" onClick={() => draft.setDraft({ step: 3 })}>
                Back
              </button>
              <button type="submit" disabled={pending} className="h-12 rounded-full bg-gold px-6 text-sm font-medium text-ink disabled:opacity-50">
                {pending ? "Holding the time…" : "Request this time"}
              </button>
            </div>
          </div>
        ) : null}
          </motion.div>
        </AnimatePresence>
      </form>

      <motion.aside
        className="h-fit rounded-[2rem] bg-slate p-6 text-wall"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-wall/60">Treatment</dt>
            <dd>{draft.treatment || "Not chosen"}</dd>
          </div>
          <div>
            <dt className="text-wall/60">Date</dt>
            <dd>{draft.date ? formatLongDate(draft.date) : "Not chosen"}</dd>
          </div>
          <div>
            <dt className="text-wall/60">Time</dt>
            <dd>{draft.time ? formatClock(draft.time) : "Not chosen"}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-wall/75">{clinic.landmark}</p>
      </motion.aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      setError("That password is not recognised.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-md items-center px-4">
      <form onSubmit={submit} className="w-full rounded-[2rem] bg-paper p-8 shadow-lift">
        <h1 className="text-3xl font-medium tracking-[-0.03em]">Clinic desk</h1>
        <p className="mt-2 text-sm text-[#3f3832]">Sign in to manage times and bookings.</p>
        <label className="mt-6 block text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 h-12 w-full rounded-2xl border border-ink/10 bg-wall px-4"
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-gold-deep">{error}</p> : null}
        <button disabled={busy} className="mt-6 h-12 w-full rounded-full bg-slate text-sm font-medium text-wall disabled:opacity-50">
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

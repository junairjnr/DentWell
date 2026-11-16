import type { Metadata } from "next";
import { ManageForm } from "@/components/booking/manage-form";
import { Reveal } from "@/components/site/motion";
import { Shell } from "@/components/site/shell";

export const metadata: Metadata = {
  title: "Change a booking",
  description: "Reschedule or cancel a DENTWELL appointment with your reference and mobile number.",
};

export default function ManagePage() {
  return (
    <Shell>
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <Reveal>
          <h1 className="text-4xl font-medium tracking-[-0.03em]">Move or cancel a booking.</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#3f3832]">
            Use the reference from your confirmation and the same mobile number. Completed visits stay as they are.
          </p>
          <ManageForm />
        </Reveal>
      </div>
    </Shell>
  );
}

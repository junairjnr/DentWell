import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine((value) => /^(\+91|91)?[6-9]\d{9}$/.test(value), {
    message: "Enter a 10-digit Indian mobile number.",
  })
  .transform((value) => {
    const digits = value.replace(/^\+?91/, "");
    return digits.length === 10 ? digits : value;
  });

export const bookingSchema = z.object({
  treatment: z.string().trim().min(2, "Choose a treatment."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Choose a time."),
  name: z.string().trim().min(2, "Enter the patient's full name.").max(80),
  phone: phoneSchema,
  email: z
    .string()
    .trim()
    .email("Enter a valid email, or leave it blank.")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export const manageSchema = z.object({
  reference: z.string().trim().min(4, "Enter the booking reference."),
  phone: phoneSchema,
});

export const rescheduleSchema = manageSchema.extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export type BookingInput = z.infer<typeof bookingSchema>;

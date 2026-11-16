# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the brief, then confirmed in the same request: Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Framer Motion, Lucide, React Hook Form + Zod, Zustand, and a calendar built for this booking flow. Persistence for the first release is a server-side JSON store with a write lock, documented as the integration point for a hosted database.

## Users

People in and around Thalakkadathur, Tirur, and Malappuram who need dental care and want to understand the clinic, trust it, and book a time. A second audience is the clinic admin who confirms, reschedules, cancels, and configures real availability.

## Product Purpose

A public website for Dr. Shemina's DENTWELL Super Speciality Dental Clinic & Root Canal Centre, plus an admin desk for appointments. Success is a visitor who can see the actual clinic, choose a treatment, and reserve a slot that nobody else can take.

## Positioning

The site is the clinic's own rooms, hours, and Google record, with availability that changes when the admin changes it. A neighbouring template cannot truthfully show this reception, this gold wall mark, or this booking book.

## Operating Context

Patients phone, WhatsApp, or book online. The clinic is on the first floor of OPS Tower, Parapputhadam, opposite Thalakkadathur Jumah Mosque and above Federal Bank. Visits happen in a brightly lit room, including evenings until 7:30 pm.

## Capabilities and Constraints

Confirmed:

- Public pages: home, about, treatments and treatment details, doctors, gallery, reviews, contact, booking, reschedule/cancel by reference and mobile.
- Booking steps: treatment, date, time, patient details, confirmation with a reference.
- Availability comes from server settings (hours, holidays, disabled slots) minus pending and confirmed bookings. Past times are closed. Two patients cannot hold the same slot.
- Statuses: pending, confirmed, completed, cancelled.
- Admin: login, overview counts, today's list, status changes, hours, holidays, slot disable, treatment and doctor and gallery records.
- WhatsApp and phone are the notification path until the clinic adds an email or SMS provider. The site does not pretend a message was sent.

Open, and not invented:

- Formal degrees, years in practice, and doctor portraits.
- Patient-volume and "years of experience" figures.
- Instagram handle.
- Sunday was published on the live Google Business Profile on 9 Nov 2026 as 10:00 AM–1:00 PM, with Monday–Saturday 9:00 AM–7:30 PM. The brief asked for Sunday to be confirmed before publishing; the profile is the source used, and admin can change it.
- Owned video files. The hero uses the clinic's photographs and will play `/clinic/hero.mp4` only if that file is added.

## Brand Commitments

Name: Dr. Shemina's DENTWELL Super Speciality Dental Clinic & Root Canal Centre.

The visual world is taken from the clinic's own Google photographs (reception, operatory, waiting room, gold tooth mark, staff uniforms), not from a generic dental palette. Voice is calm, specific, and free of outcome guarantees.

## Evidence on Hand

Verified on the live Google listing, 9 Nov 2026: 4.9 from 84 reviews; address and both the user's phones as given in the brief (the listing shows 073563 35332); place id `ChIJV7BKVbezpzsR4cnuZfxj7iE`; coordinates 10.9345052, 75.9354694.

Review lines visible on that listing's summary, with names supplied in the brief for those exact lines:

- Shajahan Ubaid: "The doctors, the ambience and the staff are amazing."
- shafeeq shafeeq temmath: "His behavior and approach were very kind and reassuring."
- Sharena Share: "Neat and clean Atmosphere and good team of Doctors and staffs."

Longer public reviews also name Dr. Shemina and Dr. Arshad Mohammed A. No degrees were published.

Photographs saved from that public gallery into `public/clinic/`. A clinical software screen that showed a patient name was excluded.

## Product Principles

- Publish only what the clinic or its public listing actually shows.
- The room leads; chrome does not cover the photograph.
- A reserved time is a real hold, or it is not offered.
- Say when a fact is waiting on the clinic.
- Make the phone and WhatsApp as easy as the form.

## Accessibility & Inclusion

The site respects reduced motion, keeps text contrast on the ivory and slate surfaces, and uses semantic controls for booking. No further product-specific access standard was set.

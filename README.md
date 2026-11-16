# Dr. Shemina's DENTWELL

Public website and appointment desk for the clinic in Thalakkadathur, Tirur.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `ADMIN_PASSWORD` and `ADMIN_SECRET` in `.env.local` before signing in at `/admin`.

## What is verified

Checked on the live Google listing on 9 November 2026:

- 4.9 from 84 reviews
- Monday–Saturday 9:00 AM–7:30 PM, Sunday 10:00 AM–1:00 PM
- The three review lines shown in Google's summary
- Place: OPS Tower, Parapputhadam, Thalakkadathur

Photographs in `public/clinic` are from that public gallery. A software screen that showed a patient name was not used. Doctor degrees, years in practice, patient totals, and an Instagram account were not published, so the site does not invent them. Add degrees in the admin desk when the clinic provides them.

## Booking

Availability is computed on the server from `data/settings.json` minus pending and confirmed rows in `data/bookings.json`. A write lock stops two requests taking the same slot. Cancelling frees the time. This JSON store is for one Node server. Move it to a database with a unique constraint on date and time before running more than one instance.

Confirmation is a WhatsApp link and the on-screen reference. Email and SMS are not sent, because no provider is configured.

Drop a file at `public/clinic/hero.mp4` when the clinic has a video to host. The hero currently crossfades the clinic photographs.

## Replace the domain

`metadataBase`, the sitemap, and robots use `https://dentwell.local`. Change that to the real domain before launch.

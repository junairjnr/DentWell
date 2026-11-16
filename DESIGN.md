---
name: DENTWELL
description: The clinic's own rooms, read under the operatory light.
colors:
  wall: "#F4F1EC"
  paper: "#FBF9F6"
  oak: "#C6B08A"
  oak-deep: "#8C7358"
  gold: "#C4A15A"
  gold-deep: "#8C6E32"
  slate: "#2C3A44"
  ink: "#1A1816"
  body: "#3F3832"
  quiet: "#5C534C"
  aqua: "#7AD4F0"
typography:
  body:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  wordmark:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.18em"
  supporting:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  pill: "9999px"
  panel: "2rem"
  card: "1.5rem"
spacing:
  page: "1.5rem"
  section: "5rem"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "48px"
  button-gold-hover:
    backgroundColor: "#d4b36a"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-slate:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.wall}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "48px"
  hero-panel:
    backgroundColor: "{colors.wall}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px 24px"
---

## Overview

DENTWELL is the clinic in Thalakkadathur, not a generic dental template. The page ground is the wall colour from the reception photographs. Gold is the wall mark and the action. Slate is the uniform and the dark bands. Photographs of the real rooms carry the first screen. The reading surface sits on ivory, with a gold ring, in front of the full-bleed operatory.

## Colors

Sampled from the clinic's public photographs. Wall white is the fluted panels. Oak is the reception desk and lower cabinets. Gold is the mounted tooth and the word DENTWELL. Slate is the reception uniform. Aqua is the screen logo and stays rare. Body text on ivory is `#3F3832`, not a neutral gray. On slate, text is wall white.

## Typography

Sora is the only face, self-hosted through `next/font`. The wordmark is tracked out in small capitals. Headlines are medium weight, tight, and balanced. Body copy stays near 16px and under 65 characters where it is a paragraph.

## Layout

The home page opens full viewport: photograph behind, ivory panel in front, controls pinned to the lower right. Later sections alternate wall, paper, slate, and a pale oak band. Content width is 76rem. More space sits above a heading than below it. Mobile keeps the same panel, full-width actions, and a compact header with WhatsApp, Book, and the menu.

## Elevation & Depth

Shadows are soft and offset downward (`shadow-lift`, `shadow-header`). The hero panel uses a gold hairline ring rather than a glow. Do not add hard offset shadows.

## Shapes

Actions are pills. Panels and photographs use a large radius, about 2rem. Calendar days are circles. The hero ring is the operatory lamp, not a second card style.

## Components

Header is transparent until the page scrolls, then ivory with a soft shadow. The primary action is the gold pill with ink text. The booking flow is four steps: treatment, month of circles, open times, then name and mobile. A held time is pending until the clinic confirms it. Gallery opens a dialog. Admin is the same ivory and gold, denser, for hours and bookings.

## Do's and Don'ts

Do use the clinic photographs and the verified Google figures. Do keep gold for the mark and the main action. Do say when a degree or a statistic has not been published.

Do not invent doctor credentials, patient totals, or review text. Do not cover the photographs with a dark gradient. Do not switch the palette to a generic medical blue. Do not present a static list of times as live availability.

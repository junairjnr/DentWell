export type Treatment = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
  bookable: boolean;
};

export type Doctor = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  focus: string;
  bio: string;
  visible: boolean;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  visible: boolean;
};

export type Review = {
  id: string;
  name: string;
  quote: string;
  source: string;
  visible: boolean;
};

export type SiteContent = {
  treatments: Treatment[];
  doctors: Doctor[];
  gallery: GalleryItem[];
  reviews: Review[];
};

export type Hours = Record<string, [string, string][]>;

export type Settings = {
  slotMinutes: number;
  hours: Hours;
  holidays: string[];
  disabledSlots: { date: string; time: string }[];
};

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  reference: string;
  treatment: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type DayState = "past" | "closed" | "holiday" | "full" | "open";

export type Slot = {
  time: string;
  label: string;
  available: boolean;
  reason?: "past" | "booked" | "disabled";
};

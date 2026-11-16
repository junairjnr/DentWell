export const clinic = {
  name: "DENTWELL",
  short: "Dr. Shemina's DENTWELL",
  full: "Dr. Shemina's DENTWELL Super Speciality Dental Clinic & Root Canal Centre",
  address:
    "First Floor, OPS Tower, Parapputhadam, Thalakkadathur, Tirur, Malappuram, Kerala – 676103",
  landmark: "Opposite Thalakkadathur Jumah Mosque, above Federal Bank",
  phones: [
    { display: "+91 73563 35332", tel: "+917356335332", wa: "917356335332" },
    { display: "+91 8460440923", tel: "+918460440923", wa: "918460440923" },
  ],
  rating: 4.9,
  reviewCount: 84,
  ratingChecked: "9 November 2026",
  placeId: "ChIJV7BKVbezpzsR4cnuZfxj7iE",
  coordinates: { lat: 10.9345052, lng: 75.9354694 },
  mapSearch:
    "https://www.google.com/maps/place/?q=place_id:ChIJV7BKVbezpzsR4cnuZfxj7iE",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=10.9345052,75.9354694",
  mapEmbed:
    "https://maps.google.com/maps?q=10.9345052,75.9354694&z=16&output=embed",
} as const;

export function whatsappHref(message: string, index = 0) {
  const phone = clinic.phones[index]?.wa ?? clinic.phones[0].wa;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

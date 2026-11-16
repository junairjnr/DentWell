export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        fill="#C4A15A"
        d="M32 6c7 0 14 6 16 14 2 8 1 16-2 22-2 4-5 9-8 13-1 2-3 3-6 3s-5-1-6-3c-3-4-6-9-8-13-3-6-4-14-2-22C18 12 25 6 32 6Z"
      />
      <path
        fill="#F4F1EC"
        d="M34 14c6 1 10 6 11 12 1 6 0 12-2 17-1 2-2 5-3 7h-2c2-4 4-9 4-16 0-6-2-10-6-12l-2-8Z"
      />
      <circle cx="40" cy="24" r="1.4" fill="#C4A15A" />
      <circle cx="44" cy="31" r="1.3" fill="#C4A15A" />
      <circle cx="39" cy="36" r="1.2" fill="#C4A15A" />
    </svg>
  );
}

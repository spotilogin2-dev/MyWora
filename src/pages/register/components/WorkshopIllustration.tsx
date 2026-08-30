interface WorkshopIllustrationProps {
  className?: string;
}

/**
 * Decorative brand illustration for the registration brand panel — a stylized
 * workshop with a car, drawn in MyWora colors. Purely presentational.
 */
export default function WorkshopIllustration({ className }: WorkshopIllustrationProps) {
  return (
    <svg viewBox="0 0 340 230" fill="none" aria-hidden="true" role="presentation" className={className}>
      {/* Orange blob backdrop */}
      <path
        d="M30 146c-4-50 56-84 132-80 76 4 140 22 136 74-4 50-62 76-140 72-74-4-124-16-128-66Z"
        fill="#FF6A32"
      />
      <ellipse cx="172" cy="196" rx="128" ry="14" fill="#0D153F" opacity="0.08" />

      {/* Workshop building */}
      <path
        d="M66 92 170 44l104 48"
        stroke="#0D153F"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="80" y="88" width="180" height="104" rx="10" fill="#FFFFFF" stroke="#D7DEE5" strokeWidth="2" />
      <rect x="94" y="102" width="30" height="22" rx="5" fill="#DCE7FD" />
      <rect x="216" y="102" width="30" height="22" rx="5" fill="#DCE7FD" />
      {/* Arched door with the MyWora mark */}
      <path d="M140 192v-50a30 30 0 0 1 60 0v50Z" fill="#0D153F" />
      <path
        d="M157 138l6.5 16 6.5-13 6.5 13 6.5-16"
        stroke="#FF6A32"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Car parked in front */}
      <path
        d="M186 194c0-11 5-19 14-22l8-13c4-7 10-10 18-10h8c8 0 14 3 18 10l8 13c9 3 14 11 14 22v3a4 4 0 0 1-4 4h-80a4 4 0 0 1-4-4Z"
        fill="#1455E8"
      />
      <path d="M212 162h24c4 0 7 2 9 5l5 8h-48l10-13Z" fill="#DCE7FD" />
      <circle cx="208" cy="198" r="9" fill="#0D153F" />
      <circle cx="208" cy="198" r="3.5" fill="#FFFFFF" />
      <circle cx="250" cy="198" r="9" fill="#0D153F" />
      <circle cx="250" cy="198" r="3.5" fill="#FFFFFF" />

      {/* Greenery */}
      <circle cx="300" cy="152" r="17" fill="#BFDFC8" />
      <rect x="298" y="164" width="4" height="16" rx="2" fill="#8FA98F" />
      <circle cx="318" cy="166" r="11" fill="#D3E9DA" />
      <rect x="316.5" y="174" width="3" height="12" rx="1.5" fill="#8FA98F" />
      <circle cx="56" cy="176" r="12" fill="#D3E9DA" />
      <circle cx="70" cy="182" r="9" fill="#BFDFC8" />
    </svg>
  );
}

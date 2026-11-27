import styles from '../../home.module.css';

const drawings = {
  integrate: (
    <>
      <rect x="8" y="8" width="42" height="32" rx="4" />
      <path d="M8 17h42m-31 6-5 5 5 5m20-10 5 5-5 5m-10-11-4 12" />
      <path d="M90 8v32h42" opacity=".45" />
      <path d="M98 34V24m10 10V18m10 16V22m10 12V10" strokeWidth="2" />
    </>
  ),
  streaming: (
    <>
      <path d="M8 8v32h42m40-32v32h42" opacity=".4" />
      <path d="m14 31 12-8 12 4" />
      <path d="m38 27 10-10" strokeDasharray="2 4" opacity=".5" />
      <path d="m96 31 8-8 8 4 9-12 9-5" />
      {[
        [14, 31],
        [26, 23],
        [38, 27],
        [96, 31],
        [104, 23],
        [112, 27],
        [121, 15],
        [130, 10],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="1.5" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  analysis: (
    <>
      <ellipse cx="29" cy="13" rx="18" ry="5" />
      <path d="M11 13v22c0 7 36 7 36 0V13m-36 9c0 7 36 7 36 0m-36 9c0 7 36 7 36 0" />
      <rect x="92" y="8" width="38" height="32" rx="4" />
      <path d="M99 16h24m-24 6h12" opacity=".5" />
      <path d="m100 32 7-5 7 2 8-7" />
      <circle cx="122" cy="22" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  annotations: (
    <>
      <path d="M8 40h42m-34-7V21m13 12V16m13 17V24" opacity=".55" />
      <path d="M12 13v-3h13q4 0 4-3 0 3 4 3h13v3" />
      <path d="M95 8h32q5 0 5 5v17q0 5-5 5h-22l-8 5v-5h-2q-5 0-5-5V13q0-5 5-5Z" />
      <path d="M98 18h26m-26 8h18" opacity=".6" />
    </>
  ),
  themes: (
    <>
      <rect x="8" y="14" width="20" height="26" rx="3" fill="currentColor" fillOpacity=".05" />
      <rect x="20" y="11" width="20" height="26" rx="3" fill="currentColor" fillOpacity=".12" />
      <rect x="32" y="8" width="20" height="26" rx="3" fill="currentColor" fillOpacity=".2" />
      <path d="m89 40 12-32 12 32m-20-11h16m11-9c9-6 14-2 14 5v15m0-12c-21-6-17 19 0 8" />
    </>
  ),
};

export function HeadingArtwork({ kind }: { kind: keyof typeof drawings }) {
  return (
    <svg
      className={styles.headingArtwork}
      viewBox="0 0 144 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[kind]}
      <path d="M60 24h22m-4-4 4 4-4 4" opacity=".6" />
    </svg>
  );
}

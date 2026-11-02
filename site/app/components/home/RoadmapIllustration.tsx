import styles from './roadmap.module.css';

export function RoadmapIllustration({
  kind,
}: {
  kind: 'annotations' | 'statistics' | 'selection';
}) {
  return (
    <div className={styles.illustration} aria-label={`Concept preview: ${kind}`} role="img">
      <svg viewBox="0 0 300 160" fill="none" aria-hidden="true">
        <path d="M24 130H280M24 25V130" stroke="#ddd5e7" />
        <path d="M24 95H280M24 60H280" stroke="#eee9f2" strokeDasharray="3 4" />
        {kind === 'annotations' && (
          <>
            <path
              d="M30 111L73 97L115 105L160 72L204 81L252 38"
              stroke="#7653c7"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M24 72H280" stroke="#a47c4c" strokeDasharray="5 4" />
            <circle cx="160" cy="72" r="5" fill="#7653c7" stroke="white" strokeWidth="2" />
            <path d="M160 62V37" stroke="#7653c7" />
            <rect x="121" y="15" width="78" height="24" rx="5" fill="#eee8fa" />
            <text x="160" y="31" textAnchor="middle" fill="#6744ad" fontSize="10">
              Target reached
            </text>
            <text x="248" y="66" fill="#917147" fontSize="9">
              Target
            </text>
          </>
        )}
        {kind === 'statistics' && (
          <>
            <path
              d="M30 99L73 69L115 84L160 40L204 57L252 23V79L204 105L160 86L115 118L73 107L30 124Z"
              fill="#eee8fa"
            />
            <path
              d="M30 112L73 89L115 101L160 64L204 80L252 51"
              stroke="#7653c7"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {[
              { x: 73, y: 89 },
              { x: 160, y: 64 },
              { x: 252, y: 51 },
            ].map(({ x, y }) => (
              <g key={x} stroke="#7653c7">
                <path
                  d={`M${x} ${y - 18}V${y + 18}M${x - 5} ${y - 18}H${x + 5}M${x - 5} ${y + 18}H${x + 5}`}
                />
              </g>
            ))}
          </>
        )}
        {kind === 'selection' && (
          <>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${35 + i * 83},32)`}>
                <rect
                  width="67"
                  height="84"
                  rx="5"
                  fill={i === 1 ? '#f0ebfa' : '#faf8fc'}
                  stroke={i === 1 ? '#b7a2df' : '#e5deec'}
                />
                <text x="33" y="16" textAnchor="middle" fontSize="9" fill="#877b94">
                  {['Group A', 'Group B', 'Group C'][i]}
                </text>
                <path
                  d="M10 66L23 46L35 52L55 29"
                  stroke={i === 1 ? '#7653c7' : '#baa9ce'}
                  strokeWidth="2"
                />
                {i === 1 && (
                  <rect
                    x="26"
                    y="25"
                    width="28"
                    height="49"
                    rx="3"
                    fill="#7653c7"
                    fillOpacity=".09"
                    stroke="#7653c7"
                    strokeDasharray="3 2"
                  />
                )}
              </g>
            ))}
            <path
              d="M170 96L173 112L177 107L183 113L186 110L180 104L187 102Z"
              fill="#3c2b54"
              stroke="white"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
  );
}

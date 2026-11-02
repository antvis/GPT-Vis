import { ArrowUpRight, FileCode2, FileJson2 } from 'lucide-react';
import styles from './first-report.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr'];
const values = ['$12,000', '$18,000', '$15,000', '$24,000'];
const palette = ['#7047eb', '#369fb8', '#f5b14c', '#ee7990', '#6ba890'];

export function FirstReportPreview() {
  return (
    <figure className={styles.preview} aria-labelledby="first-report-caption">
      <div className={styles.heading}>
        <span className="site-eyebrow">FROM YOUR FIRST TASK</span>
        <span className={styles.fileCount}>2 files, ready to keep</span>
      </div>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <span className={styles.windowDots}>
              <i />
              <i />
              <i />
            </span>
            <span>
              <FileCode2 size={10} /> report.html
            </span>
            <ArrowUpRight size={11} />
          </div>
          <div className={styles.report}>
            <span className={styles.reportLabel}>JAN — APR / REVENUE REPORT</span>
            <div className={styles.metrics}>
              <span>
                <small>Total revenue</small>
                <strong>$69,000</strong>
              </span>
              <span>
                <small>April vs. March</small>
                <b>↗ 60%</b>
              </span>
            </div>
            <svg className={styles.chart} viewBox="0 0 264 80" fill="none">
              {[18, 36, 54, 72].map((y) => (
                <path key={y} d={`M12 ${y}H252`} stroke="#eee9f4" strokeDasharray="3 4" />
              ))}
              <path d="M12 54L92 36L172 45L252 18V72H12Z" fill="#7047eb" fillOpacity=".07" />
              <path
                d="M12 54L92 36L172 45L252 18"
                stroke="#7047eb"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {[
                [12, 54],
                [92, 36],
                [172, 45],
                [252, 18],
              ].map(([cx, cy]) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="#7047eb"
                  stroke="white"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
            <div className={styles.dataTable}>
              {months.map((month, i) => (
                <span key={month}>
                  <small>{month}</small>
                  <b>{values[i]}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className={styles.annotation}>
          same style,
          <br />
          next report ↗
        </span>
        <div className={styles.themeCard}>
          <span className={styles.themeTape} />
          <div>
            <FileJson2 size={13} />
            <strong>theme.json</strong>
            <span>{'{ }'}</span>
          </div>
          <span className={styles.tokenLabel}>tokens.category10</span>
          <div className={styles.swatches}>
            {palette.map((color) => (
              <i key={color} style={{ background: color }} />
            ))}
          </div>
          <span className={styles.themeFootnote}>REUSE ACROSS CHART TYPES</span>
        </div>
      </div>
      <figcaption id="first-report-caption" className={styles.caption}>
        <span>
          <strong>Open your report.</strong> A chart, a table, and the key numbers in{' '}
          <code>report.html</code>.
        </span>
        <span>
          <strong>Keep your style.</strong> Reuse <code>theme.json</code> in your next report.
        </span>
      </figcaption>
    </figure>
  );
}

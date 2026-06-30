import { Preview } from '../../components/Preview'

const SCALE = [
  { token: '--fs-12', size: '0.75rem',   px: '12px' },
  { token: '--fs-13', size: '0.8125rem', px: '13px' },
  { token: '--fs-14', size: '0.875rem',  px: '14px' },
  { token: '--fs-15', size: '0.9375rem', px: '15px' },
  { token: '--fs-16', size: '1rem',      px: '16px' },
  { token: '--fs-18', size: '1.125rem',  px: '18px' },
  { token: '--fs-20', size: '1.25rem',   px: '20px' },
  { token: '--fs-24', size: '1.5rem',    px: '24px' },
  { token: '--fs-28', size: '1.75rem',   px: '28px' },
  { token: '--fs-32', size: '2rem',      px: '32px' },
]

const NAMED_STYLES = [
  { name: 'Display',     token: '--fs-32', weight: 700, lh: '--lh-tight',  usage: 'Hero headings (ClockCard time)' },
  { name: 'H1',         token: '--fs-28', weight: 700, lh: '--lh-tight',  usage: 'Page titles' },
  { name: 'H2',         token: '--fs-20', weight: 600, lh: '--lh-tight',  usage: 'Card headings, section titles' },
  { name: 'H3',         token: '--fs-16', weight: 600, lh: '--lh-base',   usage: 'Sub-sections' },
  { name: 'Body/md',    token: '--fs-15', weight: 400, lh: '--lh-loose',  usage: 'Primary body copy' },
  { name: 'Body/sm',    token: '--fs-14', weight: 400, lh: '--lh-base',   usage: 'Secondary body, table rows' },
  { name: 'Body/xs',    token: '--fs-13', weight: 400, lh: '--lh-base',   usage: 'Metadata, hints' },
  { name: 'Label/md',   token: '--fs-14', weight: 600, lh: '--lh-base',   usage: 'Nav items, button text' },
  { name: 'Label/sm',   token: '--fs-13', weight: 600, lh: '--lh-base',   usage: 'Form labels, chip text' },
  { name: 'Caption',    token: '--fs-12', weight: 400, lh: '--lh-base',   usage: 'Timestamps, file names, captions' },
]

export function TypographyPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Typography</h1>
        <p>
          Font family: <strong>Inter</strong>, with system-ui fallback.
          All sizes are <code className="ds-source-ref">--fs-*</code> tokens in rem.
          Line height tokens: <code className="ds-source-ref">--lh-tight</code> (1.2),
          <code className="ds-source-ref"> --lh-base</code> (1.45),
          <code className="ds-source-ref"> --lh-loose</code> (1.6).
        </p>
        <code className="ds-source-ref">packages/xhr-ui/app.css:96–130</code>
      </div>

      <div className="ds-section">
        <h2>Named text styles</h2>
        <Preview noPad>
          <div style={{ padding: 'var(--s-4)' }}>
            {NAMED_STYLES.map(s => (
              <div key={s.name} className="ds-type-row">
                <div className="ds-type-meta">
                  <div style={{ fontWeight: 600, color: 'var(--ink-600)' }}>{s.name}</div>
                  <div>{s.token}</div>
                  <div>wt {s.weight}</div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: `var(${s.token})`,
                      fontWeight: s.weight,
                      lineHeight: `var(${s.lh})`,
                      color: 'var(--ink-800)',
                    }}
                  >
                    Attendance Summary — June 2026
                  </div>
                  <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)', marginTop: 2 }}>
                    {s.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Type scale tokens</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Token</th><th>rem</th><th>px</th></tr>
          </thead>
          <tbody>
            {SCALE.map(s => (
              <tr key={s.token}>
                <td><code>{s.token}</code></td>
                <td style={{ fontFamily: 'ui-monospace,monospace', fontSize: 'var(--fs-13)' }}>{s.size}</td>
                <td style={{ color: 'var(--ink-400)', fontSize: 'var(--fs-13)' }}>{s.px}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

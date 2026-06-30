import { Preview } from '../../components/Preview'

const SCALE = [
  { token: '--s-1',  px: 4 },
  { token: '--s-2',  px: 8 },
  { token: '--s-3',  px: 12 },
  { token: '--s-4',  px: 16 },
  { token: '--s-5',  px: 20 },
  { token: '--s-6',  px: 24 },
  { token: '--s-8',  px: 32 },
  { token: '--s-10', px: 40 },
  { token: '--s-12', px: 48 },
]

const LAYOUT = [
  { token: '--topbar-h',     value: '60px',  usage: 'Topbar / header height' },
  { token: '--bottomnav-h',  value: '64px',  usage: 'Mobile bottom nav height' },
  { token: '--rail-w',       value: '240px', usage: 'Desktop side rail width' },
  { token: '--safe-bottom',  value: 'env(safe-area-inset-bottom, 0px)', usage: 'iOS safe area inset' },
  { token: '--container-max',value: '1180px',usage: 'Max content width' },
]

export function SpacingPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Spacing</h1>
        <p>
          Base unit is 4px. All tokens follow a 4px grid.
          Use spacing tokens for padding, margin, and gap — never raw pixel values.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/app.css:131–165</code>
      </div>

      <div className="ds-section">
        <h2>Spacing scale</h2>
        <Preview noPad bg="surface">
          <div style={{ padding: 'var(--s-4)' }}>
            {SCALE.map(s => (
              <div key={s.token} className="ds-space-row">
                <div className="ds-space-token">{s.token}</div>
                <div
                  className="ds-space-bar"
                  style={{ width: s.px * 2, minWidth: 4 }}
                />
                <div className="ds-space-value">{s.px}px</div>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Layout constants</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
          </thead>
          <tbody>
            {LAYOUT.map(l => (
              <tr key={l.token}>
                <td><code>{l.token}</code></td>
                <td><code>{l.value}</code></td>
                <td>{l.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Utility classes</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Class</th><th>Behavior</th></tr>
          </thead>
          <tbody>
            {[
              ['.grid',      'display: grid; gap: --s-4; 12-col grid'],
              ['.grid--4',   '4-column grid'],
              ['.grid--3',   '3-column grid'],
              ['.grid--2',   '2-column grid'],
              ['.row',       'flex row, gap --s-3'],
              ['.row--sb',   'flex row, space-between'],
              ['.stack',     'flex column, gap --s-3'],
              ['.stack-sm',  'flex column, gap --s-2'],
              ['.spacer',    'flex: 1 (pushes siblings apart)'],
            ].map(([cls, desc]) => (
              <tr key={cls}>
                <td><code>{cls}</code></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

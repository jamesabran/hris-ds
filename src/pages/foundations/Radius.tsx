import { Preview } from '../../components/Preview'

const TOKENS = [
  { token: '--r-sm',   value: '8px',   usage: 'Inputs, small cards, inline elements, nav items' },
  { token: '--r-md',   value: '12px',  usage: 'Cards, modals, preview containers, main content areas' },
  { token: '--r-lg',   value: '16px',  usage: 'Panels, sidebars, floating elements' },
  { token: '--r-xl',   value: '22px',  usage: 'Hero cards (ClockCard, RtoCard), feature callouts' },
  { token: '--r-pill', value: '999px', usage: 'Chips, badges, avatar rings, tag-style labels' },
]

export function RadiusPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Radius</h1>
        <p>5 radius tokens. Use the token that matches the visual weight of the element — larger surfaces use larger radii.</p>
        <code className="ds-source-ref">packages/xhr-ui/app.css:146–155</code>
      </div>

      <div className="ds-section">
        <h2>Live examples</h2>
        <Preview bg="surface">
          <div style={{ display: 'flex', gap: 'var(--s-6)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {TOKENS.map(t => {
              const side = t.token === '--r-pill' ? 80 : 80
              const height = t.token === '--r-pill' ? 36 : 80
              return (
                <div key={t.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-2)' }}>
                  <div
                    style={{
                      width: side,
                      height,
                      background: 'var(--qx-orange-100)',
                      border: '2px solid var(--qx-orange-300)',
                      borderRadius: `var(${t.token})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--fs-12)',
                      color: 'var(--qx-orange-700)',
                      fontWeight: 500,
                    }}
                  >
                    {t.value}
                  </div>
                  <code style={{ fontSize: 10, color: 'var(--ink-500)', fontFamily: 'ui-monospace,monospace' }}>{t.token}</code>
                </div>
              )
            })}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Token reference</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
          </thead>
          <tbody>
            {TOKENS.map(t => (
              <tr key={t.token}>
                <td><code>{t.token}</code></td>
                <td><code>{t.value}</code></td>
                <td>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

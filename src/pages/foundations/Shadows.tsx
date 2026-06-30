import { Preview } from '../../components/Preview'

const TOKENS = [
  {
    token: '--sh-1',
    value: '0 1px 2px rgba(15,19,32,0.05)',
    level: 'Flush',
    usage: 'Subtle lift — list items, inactive cards',
  },
  {
    token: '--sh-2',
    value: '0 2px 8px rgba(15,19,32,0.06), 0 1px 2px rgba(15,19,32,0.04)',
    level: 'Card',
    usage: 'Default card elevation — main content cards',
  },
  {
    token: '--sh-3',
    value: '0 10px 30px rgba(15,19,32,0.10), 0 2px 6px rgba(15,19,32,0.05)',
    level: 'Raised',
    usage: 'Hero cards — ClockCard, RtoCard',
  },
  {
    token: '--sh-pop',
    value: '0 18px 40px rgba(15,19,32,0.18)',
    level: 'Pop',
    usage: 'Modal overlay, dropdown menus, tooltips',
  },
]

export function ShadowsPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Shadows</h1>
        <p>4 elevation levels using a single shadow color anchored to <code className="ds-source-ref">--ink-900</code> at varying opacity.</p>
        <code className="ds-source-ref">packages/xhr-ui/app.css:156–165</code>
      </div>

      <div className="ds-section">
        <h2>Elevation scale</h2>
        <Preview bg="surface">
          <div style={{ display: 'flex', gap: 'var(--s-8)', alignItems: 'center', justifyContent: 'center', padding: 'var(--s-4)' }}>
            {TOKENS.map(t => (
              <div key={t.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-3)' }}>
                <div
                  style={{
                    width: 120,
                    height: 80,
                    background: 'white',
                    borderRadius: 'var(--r-md)',
                    boxShadow: t.value,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--fs-13)',
                    color: 'var(--ink-500)',
                    fontWeight: 500,
                  }}
                >
                  {t.level}
                </div>
                <code style={{ fontSize: 10, color: 'var(--ink-400)', fontFamily: 'ui-monospace,monospace' }}>{t.token}</code>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Token reference</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Token</th><th>Level</th><th>Usage</th></tr>
          </thead>
          <tbody>
            {TOKENS.map(t => (
              <tr key={t.token}>
                <td><code>{t.token}</code></td>
                <td>{t.level}</td>
                <td>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

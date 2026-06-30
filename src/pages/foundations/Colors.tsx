import { Preview } from '../../components/Preview'

const BRAND = [
  { token: '--qx-orange-50',  value: '#FFF1EB' },
  { token: '--qx-orange-100', value: '#FFDFD0' },
  { token: '--qx-orange-200', value: '#FFB596' },
  { token: '--qx-orange-300', value: '#F88C63' },
  { token: '--qx-orange-400', value: '#F26A2E' },
  { token: '--qx-orange-500', value: '#E94E1B' },
  { token: '--qx-orange-600', value: '#C53E12' },
  { token: '--qx-orange-700', value: '#9A300C' },
]

const NEUTRAL = [
  { token: '--ink-50',  value: '#F6F8FB' },
  { token: '--ink-100', value: '#EEF1F6' },
  { token: '--ink-200', value: '#E2E6EE' },
  { token: '--ink-300', value: '#C2C8D6' },
  { token: '--ink-400', value: '#9099AE' },
  { token: '--ink-500', value: '#6B7185' },
  { token: '--ink-600', value: '#4A5063' },
  { token: '--ink-700', value: '#2E3344' },
  { token: '--ink-800', value: '#1F2330' },
  { token: '--ink-900', value: '#0F1320' },
  { token: '--white',   value: '#FFFFFF' },
]

const STATUS = [
  { token: '--success-500', value: '#16A34A', label: 'Success' },
  { token: '--success-50',  value: '#E8F7EE', label: 'Success bg' },
  { token: '--warning-500', value: '#D97706', label: 'Warning' },
  { token: '--warning-50',  value: '#FEF3E7', label: 'Warning bg' },
  { token: '--danger-500',  value: '#DC2626', label: 'Danger' },
  { token: '--danger-50',   value: '#FDEAEA', label: 'Danger bg' },
  { token: '--info-500',    value: '#2563EB', label: 'Info' },
  { token: '--info-50',     value: '#E8F0FE', label: 'Info bg' },
]

const SURFACE = [
  { token: '--surface-bg',   value: '#F6F8FB', label: 'Page background' },
  { token: '--surface-card', value: '#FFFFFF',  label: 'Card surface' },
  { token: '--border',       value: '#E2E6EE',  label: 'Default border' },
  { token: '--border-strong',value: '#C2C8D6',  label: 'Emphasized border' },
]

function SwatchRow({ tokens }: { tokens: { token: string; value: string; label?: string }[] }) {
  return (
    <div className="ds-swatch-row">
      {tokens.map(t => (
        <div key={t.token} className="ds-swatch">
          <div
            className="ds-swatch__color"
            style={{ background: t.value }}
          />
          <div className="ds-swatch__token">{t.label ?? t.token}</div>
          <div className="ds-swatch__value">{t.value}</div>
        </div>
      ))}
    </div>
  )
}

export function ColorsPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Colors</h1>
        <p>
          All colors are CSS custom properties defined in{' '}
          <code className="ds-source-ref">packages/xhr-ui/app.css</code>. Use tokens, never raw hex values.
        </p>
      </div>

      <div className="ds-section">
        <h2>Brand — Orange</h2>
        <p style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-500)', marginBottom: 'var(--s-4)' }}>
          <code className="ds-source-ref">--qx-orange-500</code> is the primary brand color.
          Use 50–200 for backgrounds, 500 for primary actions, 600–700 for text on light surfaces.
        </p>
        <Preview bg="surface">
          <SwatchRow tokens={BRAND} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Neutral — Ink</h2>
        <p style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-500)', marginBottom: 'var(--s-4)' }}>
          Ink scale from <code className="ds-source-ref">--ink-50</code> (lightest) to{' '}
          <code className="ds-source-ref">--ink-900</code> (darkest). Body text uses 700,
          secondary text uses 500, disabled uses 400, borders use 200.
        </p>
        <Preview bg="surface">
          <SwatchRow tokens={NEUTRAL} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Status</h2>
        <p style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-500)', marginBottom: 'var(--s-4)' }}>
          Each status color has a 500 (icon/text) and 50 (background) pair. Used in Chip tones,
          Banner tones, and attendance status indicators.
        </p>
        <Preview bg="surface">
          <SwatchRow tokens={STATUS} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Surface &amp; border aliases</h2>
        <Preview bg="surface">
          <SwatchRow tokens={SURFACE} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Accessibility — contrast ratios</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Foreground</th><th>Background</th><th>Ratio</th><th>WCAG AA (4.5:1)</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--ink-900</code></td><td><code>--white</code></td><td>16.7:1</td><td className="ds-a11y-pass">Pass</td></tr>
            <tr><td><code>--ink-700</code></td><td><code>--white</code></td><td>9.3:1</td><td className="ds-a11y-pass">Pass</td></tr>
            <tr><td><code>--ink-500</code></td><td><code>--white</code></td><td>4.6:1</td><td className="ds-a11y-pass">Pass</td></tr>
            <tr><td><code>--qx-orange-500</code></td><td><code>--white</code></td><td>3.0:1</td><td className="ds-a11y-fail">Fail (large text only)</td></tr>
            <tr><td><code>--qx-orange-700</code></td><td><code>--qx-orange-50</code></td><td>5.2:1</td><td className="ds-a11y-pass">Pass</td></tr>
            <tr><td><code>--success-500</code></td><td><code>--success-50</code></td><td>3.0:1</td><td className="ds-a11y-fail">Fail <span className="ds-badge-gap">gap</span></td></tr>
            <tr><td><code>--warning-500</code></td><td><code>--warning-50</code></td><td>2.4:1</td><td className="ds-a11y-fail">Fail <span className="ds-badge-gap">gap</span></td></tr>
            <tr><td><code>#fff</code></td><td><code>--qx-orange-500</code></td><td>3.0:1</td><td className="ds-a11y-fail">Fail (large text only)</td></tr>
          </tbody>
        </table>
        <div className="ds-callout" style={{ marginTop: 'var(--s-3)' }}>
          <strong>Gaps:</strong> success and warning chip foreground/background pairs fall below WCAG AA.
          Chip text relies on the dot indicator and label — not color alone — to convey meaning.
        </div>
      </div>
    </div>
  )
}

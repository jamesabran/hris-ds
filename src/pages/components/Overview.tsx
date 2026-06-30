import { Link } from 'react-router-dom'

const SHARED = [
  { name: 'Banner',     to: '/components/banner',     desc: 'Inline feedback strip — info/warning/success/danger' },
  { name: 'Button',     to: '/components/button',     desc: '5 variants, 3 sizes, full-width mode' },
  { name: 'Card',       to: '/components/card',       desc: 'Content container with optional flush mode' },
  { name: 'Chip',       to: '/components/chip',       desc: 'Status/label badge — 6 tones + dot indicator' },
  { name: 'DataTable',  to: '/components/datatable',  desc: 'Generic typed table with empty/loading state' },
  { name: 'FormField',  to: '/components/formfield',  desc: 'Label + hint + error wrapper for form controls' },
  { name: 'Input',      to: '/components/input',      desc: 'Text input — 4 states, forwardRef' },
  { name: 'ListRow',    to: '/components/listrow',    desc: 'Icon / title / sub / meta row item' },
  { name: 'Modal',      to: '/components/modal',      desc: '2 sizes, header + body + footer, overlay backdrop' },
  { name: 'PageHeader', to: '/components/pageheader', desc: 'Page title + subtitle + actions slot' },
  { name: 'Select',     to: '/components/select',     desc: 'Native select with HRIS-styled chevron' },
  { name: 'StatTile',   to: '/components/stattile',   desc: 'KPI tile — value + label + icon + tone' },
  { name: 'Textarea',   to: '/components/textarea',   desc: 'Resizable textarea, min-height 96px' },
]

const CUSTOM = [
  { name: 'AppShell',        to: '/components/appshell',        desc: 'Root layout — rail + topbar + bottom nav + guards' },
  { name: 'ClockCard',       to: '/components/clockcard',       desc: 'Self-contained clock-in/out hero card' },
  { name: 'CorrectionModal', to: '/components/correctionmodal', desc: 'Time correction form modal' },
  { name: 'EmpPhoto',        to: '/components/empphoto',        desc: 'Employee photo with initials fallback' },
  { name: 'LeaveModal',      to: '/components/leavemodal',      desc: 'Leave filing form modal' },
]

const GAPS = ['Tabs', 'Switch', 'Progress', 'Avatar/Icon button', 'Empty state', 'Pagination']

export function ComponentsOverview() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Components</h1>
        <p>
          Shared components live in <code className="ds-source-ref">packages/xhr-ui/src/index.tsx</code>.
          Custom product components live in <code className="ds-source-ref">apps/web/src/components/</code>.
          Every preview below renders the real implementation.
        </p>
      </div>

      <div className="ds-section">
        <h2>Shared — @xhr/ui</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s-3)' }}>
          {SHARED.map(c => (
            <Link key={c.to} to={c.to} className="ds-home-card">
              <div className="ds-home-card__title">{c.name}</div>
              <div className="ds-home-card__desc">{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="ds-section">
        <h2>Custom product components</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s-3)' }}>
          {CUSTOM.map(c => (
            <Link key={c.to} to={c.to} className="ds-home-card">
              <div className="ds-home-card__title">{c.name}</div>
              <div className="ds-home-card__desc">{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="ds-section">
        <h2>Coverage gaps</h2>
        <div className="ds-callout">
          <strong>Missing components:</strong>{' '}
          {GAPS.join(' · ')}. CSS classes exist for some of these but no React wrapper has been extracted yet.
        </div>
      </div>
    </div>
  )
}

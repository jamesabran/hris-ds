import { Chip, Button } from '@xhr/ui'
import { StateGrid } from '../../components/Preview'

interface RtoCardData {
  quota: number
  used: number
  pending: number
  cycleEnd: string
  arrangement: string
}

function RtoCard({ data }: { data: RtoCardData }) {
  const available = Math.max(0, data.quota - data.used - data.pending)
  const pct = Math.min(100, Math.round((data.used / data.quota) * 100))

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F1320 0%, #1E2030 60%, var(--qx-orange-700) 130%)',
      borderRadius: 'var(--r-xl)',
      padding: 'var(--s-5)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--sh-3)',
    }}>
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,78,27,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--s-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--fs-12)', color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>Return-to-Office</div>
            <div style={{ fontSize: 'var(--fs-24)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {available} <span style={{ fontSize: 'var(--fs-14)', fontWeight: 400, opacity: 0.7 }}>days available</span>
            </div>
          </div>
          <Chip tone="brand">{data.arrangement}</Chip>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 'var(--s-3)' }}>
          <div style={{
            height: 8, borderRadius: 'var(--r-pill)',
            background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: 'var(--r-pill)',
              background: 'linear-gradient(90deg, var(--qx-orange-400), var(--qx-orange-300))',
              transition: 'width 0.4s ease',
            }} />
          </div>
          <div style={{ fontSize: 'var(--fs-12)', color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
            {data.used} used · {data.pending} pending · {data.quota} quota · cycle ends {data.cycleEnd}
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
        >
          Log RTO day
        </Button>
      </div>
    </div>
  )
}

export function RtoCardPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>RtoCard</h1>
        <p>
          Return-to-Office hero card for the employee RTO page. Mirrors ClockCard's dark gradient
          layout. Shows quota, used, pending, progress bar, and a CTA to log an RTO day.
        </p>
        <code className="ds-source-ref">apps/web/src/pages/employee/Rto.tsx:44</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Custom product component.</strong> RtoCard is assembled inline in the RTO page, not a separate file.
        The preview is a faithful recreation of the production component.
      </div>

      <div className="ds-section">
        <h2>States</h2>
        <StateGrid cols={2} states={[
          {
            label: 'Normal — days available',
            children: <RtoCard data={{ quota: 10, used: 3, pending: 1, cycleEnd: 'Jul 31', arrangement: 'Hybrid' }} />,
          },
          {
            label: 'Quota met — 0 days left',
            children: <RtoCard data={{ quota: 10, used: 8, pending: 2, cycleEnd: 'Jul 31', arrangement: 'Hybrid' }} />,
          },
          {
            label: 'Full WFH arrangement',
            children: <RtoCard data={{ quota: 0, used: 0, pending: 0, cycleEnd: 'Jul 31', arrangement: 'Work from Home' }} />,
          },
          {
            label: 'High usage',
            children: <RtoCard data={{ quota: 12, used: 11, pending: 0, cycleEnd: 'Jul 31', arrangement: 'Hybrid' }} />,
          },
        ]} />
      </div>

      <div className="ds-section">
        <h2>Progress bar semantics</h2>
        <table className="ds-props-table">
          <thead><tr><th>Fill %</th><th>Calculation</th></tr></thead>
          <tbody>
            <tr><td>Track fill</td><td><code>Math.min(100, (used / quota) * 100)</code></td></tr>
            <tr><td>Available</td><td><code>quota − used − pending</code> (floored at 0)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Composed from</h2>
        <p className="ds-muted">
          <a href="/components/chip" style={{ color: 'var(--qx-orange-600)' }}>Chip</a> ·{' '}
          <a href="/components/button" style={{ color: 'var(--qx-orange-600)' }}>Button</a> ·{' '}
          Custom gradient background (same as <a href="/components/clockcard" style={{ color: 'var(--qx-orange-600)' }}>ClockCard</a>)
        </p>
      </div>
    </div>
  )
}

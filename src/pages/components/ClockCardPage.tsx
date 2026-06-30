import { Chip, Button, Banner } from '@xhr/ui'
import { useState, useEffect } from 'react'
import { Preview, StateGrid } from '../../components/Preview'

type ClockState = 'out' | 'in' | 'done'

function ClockCardPreview({
  state = 'out',
  showError = false,
  arrangement = 'Work from Home',
}: {
  state?: ClockState
  showError?: boolean
  arrangement?: string
}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-PH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Manila',
      }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const today = new Date().toLocaleDateString('en-PH', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    timeZone: 'Asia/Manila',
  })

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F1320 0%, #2A1B1A 55%, var(--qx-orange-700) 100%)',
      borderRadius: 'var(--r-xl)',
      padding: 'var(--s-6)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--sh-3)',
    }}>
      {/* decorative glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,78,27,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 'var(--fs-12)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--s-2)' }}>
          Asia/Manila · {today}
        </div>

        <div style={{
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: 800,
          color: '#fff',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--s-3)',
          lineHeight: 1.1,
        }}>
          {time || '08:45:32'}
        </div>

        <div className="ds-flex ds-gap-2" style={{ flexWrap: 'wrap', marginBottom: 'var(--s-4)' }}>
          <Chip tone="brand">{arrangement}</Chip>
          {state === 'in' && <Chip tone="success" dot>Clocked In</Chip>}
          {state === 'out' && <Chip tone="default" dot>Not clocked in</Chip>}
          {state === 'done' && <Chip tone="success" dot>Done for today</Chip>}
        </div>

        {showError && (
          <div style={{ marginBottom: 'var(--s-4)' }}>
            <Banner tone="danger">
              Clock-in failed — location access was denied. Enable GPS and try again.
            </Banner>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          block
          disabled={state === 'done'}
          style={state === 'in' ? {
            background: 'rgba(255,255,255,0.18)',
            borderColor: 'rgba(255,255,255,0.3)',
            color: '#fff',
          } : state === 'done' ? {
            opacity: 0.55,
          } : {
            background: '#fff',
            color: 'var(--qx-orange-700)',
            borderColor: 'transparent',
          }}
        >
          {state === 'out' ? 'Clock In' : state === 'in' ? 'Clock Out' : 'Done for today ✓'}
        </Button>
      </div>
    </div>
  )
}

export function ClockCardPage() {
  const [demoState, setDemoState] = useState<ClockState>('out')

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>ClockCard</h1>
        <p>
          Self-contained clock-in/out hero card for the employee Home page.
          Dark-to-orange gradient background. Live clock, work arrangement chip, and a CTA that
          cycles through three states.
        </p>
        <code className="ds-source-ref">apps/web/src/components/ClockCard.tsx:14</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Custom product component</strong> — lives in <code>apps/web</code>.
        In production it fetches from <code>/v1/attendance/me</code> and uses geolocation.
        Preview below is a faithful recreation; click the CTA to cycle through states.
      </div>

      <div className="ds-section">
        <h2>Interactive state demo</h2>
        <Preview bg="surface" label="Click the CTA to cycle states">
          <div style={{ maxWidth: 480, margin: '0 auto' }} onClick={() => {
            setDemoState(s => s === 'out' ? 'in' : s === 'in' ? 'done' : 'out')
          }}>
            <ClockCardPreview state={demoState} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--s-3)', fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>
            Click card to cycle: out → in → done → out
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>All three states</h2>
        <StateGrid cols={3} states={[
          { label: 'Clocked out', bg: 'surface', children: <ClockCardPreview state="out" /> },
          { label: 'Clocked in', bg: 'surface', children: <ClockCardPreview state="in" /> },
          { label: 'Done for today', bg: 'surface', children: <ClockCardPreview state="done" /> },
        ]} />
      </div>

      <div className="ds-section">
        <h2>Error state</h2>
        <Preview bg="surface" label="API error — geolocation denied">
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <ClockCardPreview state="out" showError />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <p className="ds-muted">
          ClockCard accepts no props — it is fully self-contained and sources all data from internal
          React Query hooks (<code>['employee','me']</code> and <code>['attendance','me']</code>).
        </p>
        <p className="ds-muted" style={{ marginTop: 'var(--s-2)' }}>
          Returns <code>null</code> when <code>employee.clock_enabled === false</code>.
        </p>
      </div>

      <div className="ds-section">
        <h2>Token gaps</h2>
        <div className="ds-callout">
          <strong>Gap:</strong> Gradient mid-stop <code>#2A1B1A</code> is not a defined token.
          Should be extracted to a semantic dark-warm-surface token in a future pass.
        </div>
      </div>
    </div>
  )
}

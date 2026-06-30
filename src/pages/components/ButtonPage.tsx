import { useState } from 'react'
import { Button } from '@xhr/ui'
import type { ButtonVariant } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger', 'success']

export function ButtonPage() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  function handleSave() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Button</h1>
        <p>Primary action trigger. Five variants for different contexts; three sizes; optional full-width mode.</p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:12</code>
      </div>

      <div className="ds-section">
        <h2>Live demo</h2>
        <Preview label="Interactive — click to confirm behavior">
          <div className="ds-flex ds-gap-3" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => setCount(c => c + 1)}>
              Approve request{count > 0 ? ` (${count})` : ''}
            </Button>
            <Button variant="ghost" onClick={() => setCount(0)}>Reset</Button>
            {count > 0 && (
              <span className="ds-muted">{count} approval{count !== 1 ? 's' : ''} submitted</span>
            )}
          </div>
        </Preview>

        <Preview label="Loading pattern — simulates a save mutation">
          <div className="ds-flex ds-gap-3">
            <Button variant="primary" disabled={loading} onClick={handleSave}>
              {loading ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="ghost" disabled={loading}>Cancel</Button>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Variants</h2>
        <StateGrid
          cols={5}
          states={VARIANTS.map(v => ({
            label: v.charAt(0).toUpperCase() + v.slice(1),
            children: <Button variant={v}>Label</Button>,
          }))}
        />

        <h3>Disabled state</h3>
        <StateGrid
          cols={5}
          states={VARIANTS.map(v => ({
            label: v,
            children: <Button variant={v} disabled>Label</Button>,
          }))}
        />
      </div>

      <div className="ds-section">
        <h2>Sizes</h2>
        <Preview label="sm / default / lg">
          <div className="ds-flex ds-gap-4" style={{ alignItems: 'center' }}>
            <Button variant="primary" size="sm">Clock in</Button>
            <Button variant="primary">Submit leave</Button>
            <Button variant="primary" size="lg">Clock in</Button>
          </div>
        </Preview>
        <div className="ds-callout ds-callout--info" style={{ marginTop: 'var(--s-2)' }}>
          Only <code>size="lg"</code> meets the 44px minimum touch target for mobile. Use <code>lg</code> for
          primary CTAs on mobile screens (ClockCard, RtoCard).
        </div>
      </div>

      <div className="ds-section">
        <h2>Full-width</h2>
        <Preview label='block — stretches to container width'>
          <div style={{ maxWidth: 360 }}>
            <Button variant="primary" block>Clock out</Button>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>HRIS usage examples</h2>
        <Preview label="Modal footer pattern">
          <div className="ds-flex ds-gap-3" style={{ justifyContent: 'flex-end' }}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Submit request</Button>
          </div>
        </Preview>
        <Preview label="Danger confirmation">
          <div className="ds-flex ds-gap-3">
            <Button variant="danger">Reject</Button>
            <Button variant="success">Approve</Button>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'success'", default: "'primary'", description: 'Visual intent of the button' },
          { name: 'size', type: "'sm' | 'lg'", description: 'Size variant — default is between sm and lg' },
          { name: 'block', type: 'boolean', description: 'Stretch to full container width' },
          { name: 'disabled', type: 'boolean', description: 'Prevents interaction, reduces opacity' },
          { name: '...rest', type: 'ButtonHTMLAttributes', description: 'All native button attributes (onClick, type, aria-*, etc.)' },
        ]} />
      </div>
    </div>
  )
}

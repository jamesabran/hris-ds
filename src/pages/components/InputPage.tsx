import { useState } from 'react'
import { Input } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function InputPage() {
  const [value, setValue] = useState('')

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Input</h1>
        <p>
          Text input field. Fixed height 40px. forwardRef-compatible.
          Usually wrapped in <a href="/components/formfield" style={{ color: 'var(--qx-orange-600)' }}>FormField</a> for label and validation messages.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:96</code>
      </div>

      <div className="ds-section">
        <h2>Live demo</h2>
        <Preview label="Interactive — type to see value">
          <div style={{ maxWidth: 360 }}>
            <Input
              placeholder="Search employees…"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            {value && (
              <div className="ds-muted" style={{ marginTop: 'var(--s-2)' }}>
                Searching for: <strong>{value}</strong>
              </div>
            )}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>All states</h2>
        <StateGrid
          cols={2}
          states={[
            {
              label: 'Default',
              children: (
                <div style={{ width: '100%' }}>
                  <Input placeholder="Employee name or ID" />
                </div>
              ),
            },
            {
              label: 'With value',
              children: (
                <div style={{ width: '100%' }}>
                  <Input defaultValue="Maria Santos" />
                </div>
              ),
            },
            {
              label: 'Disabled',
              children: (
                <div style={{ width: '100%' }}>
                  <Input value="Read-only field" disabled readOnly />
                </div>
              ),
            },
            {
              label: 'Error state (via FormField)',
              children: (
                <div style={{ width: '100%' }}>
                  <Input
                    defaultValue="06/35/2026"
                    style={{ borderColor: 'var(--danger-500)', outlineColor: 'var(--danger-500)' }}
                  />
                </div>
              ),
            },
          ]}
        />
        <div className="ds-callout ds-callout--info" style={{ marginTop: 'var(--s-3)' }}>
          Error state styling is applied by <strong>FormField</strong> wrapping the Input — not a prop on Input itself.
          Use <code>&lt;FormField error="…"&gt;&lt;Input /&gt;&lt;/FormField&gt;</code>.
        </div>
      </div>

      <div className="ds-section">
        <h2>Input types used in HRIS</h2>
        <Preview label="Date / time inputs">
          <div className="ds-stack" style={{ maxWidth: 280 }}>
            <Input type="date" defaultValue="2026-06-30" />
            <Input type="time" defaultValue="08:00" />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: '...rest', type: 'InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes (type, placeholder, value, onChange, disabled, ref, etc.)' },
        ]} />
        <p className="ds-muted" style={{ marginTop: 'var(--s-2)' }}>
          Input uses <code>React.forwardRef</code> — pass a ref to access the underlying DOM element.
        </p>
      </div>
    </div>
  )
}

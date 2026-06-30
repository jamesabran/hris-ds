import { Textarea } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function TextareaPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Textarea</h1>
        <p>
          Multi-line text input. Min-height 96px; vertically resizable by the user.
          forwardRef-compatible. Used in leave and correction form modals.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:109</code>
      </div>

      <div className="ds-section">
        <h2>Leave request reason field</h2>
        <Preview label="As used in LeaveModal">
          <div style={{ maxWidth: 480 }}>
            <Textarea
              placeholder="Briefly describe the reason for your leave request…"
              rows={4}
            />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>States</h2>
        <StateGrid
          cols={2}
          states={[
            { label: 'Default (empty)', children: <div style={{ width: '100%' }}><Textarea placeholder="Enter reason…" /></div> },
            { label: 'With content', children: <div style={{ width: '100%' }}><Textarea defaultValue="Family emergency — need to travel to province for medical situation." /></div> },
            { label: 'Disabled', children: <div style={{ width: '100%' }}><Textarea value="This field is read-only" disabled readOnly /></div> },
            {
              label: 'Error (via FormField)',
              children: (
                <div style={{ width: '100%' }}>
                  <Textarea
                    defaultValue="ok"
                    style={{ borderColor: 'var(--danger-500)', outlineColor: 'var(--danger-500)' }}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: '...rest', type: 'TextareaHTMLAttributes<HTMLTextAreaElement>', description: 'All native textarea attributes including rows, maxLength, placeholder, disabled. Uses React.forwardRef.' },
        ]} />
        <p className="ds-muted" style={{ marginTop: 'var(--s-2)' }}>
          The <code>resize: vertical</code> CSS allows users to drag-resize the textarea vertically.
          Horizontal resize is disabled.
        </p>
      </div>
    </div>
  )
}

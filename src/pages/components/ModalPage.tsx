import { useState } from 'react'
import { Modal, Button, FormField, Input, Select, Textarea, Banner } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function ModalPage() {
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Modal</h1>
        <p>
          Centered overlay dialog. Two sizes: md (520px) and lg (880px).
          Returns null when closed — no CSS animation.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:173</code>
      </div>

      <div className="ds-callout ds-callout--danger" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Known gap — focus trap not implemented.</strong> When a modal is open, keyboard focus
        can escape to content behind the overlay. This is a WCAG 2.1 SC 2.1.2 failure.
        Remediation: integrate <code>focus-trap-react</code> or native <code>inert</code> attribute on the background.
      </div>

      <div className="ds-section">
        <h2>Live demos</h2>
        <Preview label="Leave request modal (md) — click to open">
          <div className="ds-flex ds-gap-3">
            <Button onClick={() => { setError(false); setLeaveOpen(true) }}>
              File leave request
            </Button>
            <Button variant="ghost" onClick={() => { setError(true); setLeaveOpen(true) }}>
              Open with error
            </Button>
          </div>
        </Preview>

        <Preview label="Confirmation dialog (md) — compact footer">
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Reject request
          </Button>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Sizes</h2>
        <StateGrid
          cols={2}
          states={[
            { label: 'md — 520px (default)', children: <div className="ds-muted" style={{ fontSize: 'var(--fs-13)' }}>Leave, correction, and most form modals</div> },
            { label: 'lg — 880px', children: <div className="ds-muted" style={{ fontSize: 'var(--fs-13)' }}>CSV import preview, wide data grids</div> },
          ]}
        />
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. When false, component returns null.' },
          { name: 'title', type: 'string', required: true, description: 'Modal heading displayed in the header bar' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when the close (×) button is clicked or backdrop is tapped' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Modal body content' },
          { name: 'footer', type: 'ReactNode', description: 'Footer slot — typically Cancel + Submit buttons' },
          { name: 'size', type: "'md' | 'lg'", default: "'md'", description: 'Modal width: md=520px, lg=880px' },
        ]} />
      </div>

      {/* Leave request modal */}
      <Modal
        open={leaveOpen}
        title="File Leave Request"
        onClose={() => setLeaveOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setLeaveOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setLeaveOpen(false)}>Submit Request</Button>
          </>
        }
      >
        {error && (
          <Banner tone="danger">
            <strong>Submission failed:</strong> The selected dates overlap with an approved request (June 28–30).
          </Banner>
        )}
        <div className="ds-stack">
          <FormField label="Leave type">
            <Select>
              <option value="">Select type…</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="emergency">Emergency Leave</option>
            </Select>
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-3)' }}>
            <FormField label="From">
              <Input type="date" />
            </FormField>
            <FormField label="To">
              <Input type="date" />
            </FormField>
          </div>
          <FormField label="Reason" hint="Approvers will see this in the review queue.">
            <Textarea placeholder="Briefly describe your reason…" />
          </FormField>
        </div>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        open={confirmOpen}
        title="Reject leave request?"
        onClose={() => setConfirmOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Keep pending</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>Reject request</Button>
          </>
        }
      >
        <p style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-700)', lineHeight: 'var(--lh-base)', margin: 0 }}>
          You are rejecting <strong>Maria Santos's</strong> Annual Leave request for
          July 7–11 (5 days). This action cannot be undone. The employee will be notified automatically.
        </p>
      </Modal>
    </div>
  )
}

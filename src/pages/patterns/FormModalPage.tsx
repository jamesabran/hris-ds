import { useState } from 'react'
import { Modal, Button, FormField, Input, Select, Textarea, Banner } from '@xhr/ui'
import { Preview } from '../../components/Preview'

export function FormModalPage() {
  const [open, setOpen] = useState(false)
  const [showError, setShowError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit() {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setOpen(false); setShowError(false) }, 1200)
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>FormModal</h1>
        <p>
          Standard pattern for presenting a data-entry form inside a Modal. Enforces consistent
          structure: error Banner → form fields → Cancel + Submit footer.
        </p>
        <code className="ds-source-ref">apps/web/src/components/LeaveModal.tsx + CorrectionModal.tsx</code>
      </div>

      <div className="ds-section">
        <h2>Pattern rules</h2>
        <ol style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-600)', lineHeight: 'var(--lh-loose)', paddingLeft: 'var(--s-5)', margin: 0 }}>
          <li><strong>Modal title is action-oriented</strong> — verb + noun ("File Leave Request", "Request Time Correction")</li>
          <li><strong>Danger Banner is the first child</strong> — before any fields, so errors are immediately visible</li>
          <li><strong>Footer has exactly 2 buttons</strong> — ghost Cancel (left) + primary Submit (right)</li>
          <li><strong>Submit disables + text swaps during mutation</strong> — "Submitting…" while pending</li>
          <li><strong>Form resets on close</strong> — <code>useEffect(() =&gt; reset(), [open])</code></li>
          <li><strong>Do not close on error</strong> — keep open so the user can correct and resubmit</li>
        </ol>
      </div>

      <div className="ds-section">
        <h2>Live demo</h2>
        <Preview label="Open the modal — toggle error state to test Banner behavior">
          <div className="ds-flex ds-gap-3">
            <Button onClick={() => { setShowError(false); setOpen(true) }}>Open (normal)</Button>
            <Button variant="secondary" onClick={() => { setShowError(true); setOpen(true) }}>Open with error</Button>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>State machine</h2>
        <table className="ds-props-table">
          <thead><tr><th>State</th><th>Submit button</th><th>Banner</th></tr></thead>
          <tbody>
            <tr><td>idle</td><td>Enabled — "Submit Request"</td><td>Hidden</td></tr>
            <tr><td>filled</td><td>Enabled — "Submit Request"</td><td>Hidden</td></tr>
            <tr><td>submitting</td><td>Disabled — "Submitting…"</td><td>Hidden</td></tr>
            <tr><td>error</td><td>Re-enabled — "Submit Request"</td><td>Danger tone, visible</td></tr>
            <tr><td>success</td><td>N/A — modal closes</td><td>N/A</td></tr>
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Known instances</h2>
        <table className="ds-props-table">
          <thead><tr><th>Instance</th><th>File</th><th>Size</th><th>Fields</th></tr></thead>
          <tbody>
            <tr><td>LeaveModal</td><td><code>LeaveModal.tsx</code></td><td>md</td><td>Leave type, from/to dates, reason, attachment</td></tr>
            <tr><td>CorrectionModal</td><td><code>CorrectionModal.tsx</code></td><td>md</td><td>Date (read-only), clock-in time, clock-out time, reason</td></tr>
            <tr><td>ImportModal</td><td><code>Employees.tsx</code> (inline)</td><td>lg</td><td>CSV upload + result preview table</td></tr>
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        title="File Leave Request"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </Button>
          </>
        }
      >
        <div className="ds-stack">
          {showError && (
            <Banner tone="danger">
              <strong>Submission failed:</strong> The selected dates overlap with an approved leave request (June 28–30).
            </Banner>
          )}
          <FormField label="Leave type">
            <Select><option value="annual">Annual Leave</option><option value="sick">Sick Leave</option></Select>
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-3)' }}>
            <FormField label="From"><Input type="date" defaultValue="2026-07-07" /></FormField>
            <FormField label="To"><Input type="date" defaultValue="2026-07-11" /></FormField>
          </div>
          <FormField label="Reason" hint="Approvers see this in the review queue.">
            <Textarea placeholder="Briefly describe the reason…" />
          </FormField>
        </div>
      </Modal>
    </div>
  )
}

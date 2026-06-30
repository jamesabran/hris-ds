import { useState } from 'react'
import { Modal, Button, FormField, Input, Select, Textarea, Banner } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function LeaveModalPage() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit() {
    setError('')
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setOpen(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1200)
  }

  function handleOpen() {
    setError('')
    setSubmitted(false)
    setOpen(true)
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>LeaveModal</h1>
        <p>
          Leave filing form modal. Fetches eligible leave types from the server, validates
          dates, and submits the request. Follows the FormModal pattern.
        </p>
        <code className="ds-source-ref">apps/web/src/components/LeaveModal.tsx:25</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Custom product component.</strong> In production, leave types are fetched from{' '}
        <code>/v1/leave/types</code> and filtered to <code>eligible: true</code> for the current user.
        The demo below shows the real modal shell with stubbed options.
      </div>

      <div className="ds-section">
        <h2>Live demo</h2>
        <Preview label="Click to open the real modal">
          <div className="ds-flex ds-gap-3" style={{ alignItems: 'center' }}>
            <Button variant="primary" onClick={handleOpen}>File leave request</Button>
            {submitted && (
              <span style={{ fontSize: 'var(--fs-13)', color: 'var(--success-500)', fontWeight: 500 }}>
                ✅ Request submitted successfully
              </span>
            )}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>With pre-filled date (from schedule page)</h2>
        <Preview label="When triggered from an absent day cell in WeekGrid">
          <Button
            variant="secondary"
            onClick={() => {
              setError('')
              setOpen(true)
            }}
          >
            Request leave for June 30
          </Button>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls modal visibility' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on cancel or × button' },
          { name: 'onDone', type: '() => void', required: true, description: 'Called on successful submission — caller invalidates the leave history query' },
          { name: 'initialDate', type: 'string', description: 'ISO date string — pre-fills both from and to date fields' },
        ]} />
      </div>

      <Modal
        open={open}
        title="File Leave Request"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </Button>
          </>
        }
      >
        <div className="ds-stack">
          {error && <Banner tone="danger">{error}</Banner>}
          <FormField label="Leave type">
            <Select defaultValue="">
              <option value="" disabled>Select type…</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="emergency">Emergency Leave</option>
              <option value="maternity">Maternity Leave</option>
            </Select>
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-3)' }}>
            <FormField label="From">
              <Input type="date" defaultValue="2026-06-30" />
            </FormField>
            <FormField label="To">
              <Input type="date" defaultValue="2026-06-30" />
            </FormField>
          </div>
          <FormField label="Reason" hint="Approvers will see this in the review queue.">
            <Textarea placeholder="Briefly describe the reason for your leave…" />
          </FormField>
        </div>
      </Modal>
    </div>
  )
}

import { useState } from 'react'
import { Modal, Button, FormField, Input, Textarea } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function CorrectionModalPage() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit() {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setOpen(false) }, 1200)
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>CorrectionModal</h1>
        <p>
          Time correction form modal. Allows employees to request corrected clock-in and/or
          clock-out times for a given date. Routes to supervisor for approval.
        </p>
        <code className="ds-source-ref">apps/web/src/components/CorrectionModal.tsx:28</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Custom product component.</strong> In production, the date field is pre-filled
        from the absent day the employee tapped in WeekGrid. Overnight shift handling: if clock-out
        ≤ clock-in, the server assigns clock-out to the next calendar day.
      </div>

      <div className="ds-section">
        <h2>Live demo</h2>
        <Preview label="Pre-filled for June 29 — click to open">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Request time correction
          </Button>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on cancel or close' },
          { name: 'onDone', type: '() => void', required: true, description: 'Called on successful submission — caller refetches attendance data' },
          { name: 'initialDate', type: 'string', description: 'Pre-fills the date field (ISO date string)' },
          { name: 'initialField', type: "'clock_in_at' | 'clock_out_at'", description: 'Which time field to pre-focus' },
          { name: 'initialValue', type: 'string', description: 'Pre-fills the selected time field (HH:MM)' },
        ]} />
      </div>

      <Modal
        open={open}
        title="Request Time Correction"
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
          <FormField label="Date">
            <Input type="date" defaultValue="2026-06-29" readOnly style={{ background: 'var(--ink-50)' }} />
          </FormField>
          <FormField label="Clock in time" hint="Leave blank if only correcting clock-out.">
            <Input type="time" defaultValue="08:15" />
          </FormField>
          <FormField label="Clock out time" hint="Leave blank if only correcting clock-in.">
            <Input type="time" defaultValue="17:00" />
          </FormField>
          <FormField label="Reason">
            <Textarea placeholder="Briefly describe why a correction is needed…" />
          </FormField>
        </div>
      </Modal>
    </div>
  )
}

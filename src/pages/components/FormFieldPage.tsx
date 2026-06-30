import { FormField, Input, Select, Textarea } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function FormFieldPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>FormField</h1>
        <p>
          Wrapper that adds a label, optional hint, and optional error message around a form control.
          Wires <code>htmlFor</code> to the child label.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:117</code>
      </div>

      <div className="ds-section">
        <h2>States</h2>
        <Preview label="Default — label only">
          <div style={{ maxWidth: 400 }}>
            <FormField label="Leave type">
              <Select>
                <option value="">Select type…</option>
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
              </Select>
            </FormField>
          </div>
        </Preview>

        <Preview label="With hint">
          <div style={{ maxWidth: 400 }}>
            <FormField label="Reason" hint="Keep it brief — approvers see this in the approval queue.">
              <Textarea placeholder="e.g. Family emergency" />
            </FormField>
          </div>
        </Preview>

        <Preview label="With validation error">
          <div style={{ maxWidth: 400 }}>
            <FormField label="From date" error="End date must be after start date.">
              <Input type="date" defaultValue="2026-07-05" />
            </FormField>
          </div>
        </Preview>

        <Preview label="Hint is replaced by error when both are set">
          <div style={{ maxWidth: 400 }}>
            <FormField
              label="Clock in time"
              hint="Enter the corrected clock-in time"
              error="Time must be within the shift window (06:00–10:00)."
            >
              <Input type="time" defaultValue="05:30" />
            </FormField>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Full leave form example</h2>
        <Preview label="As composed in LeaveModal">
          <div className="ds-stack" style={{ maxWidth: 480 }}>
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
            <FormField label="Reason" hint="Approvers will see this in the approval queue.">
              <Textarea placeholder="Briefly describe the reason…" />
            </FormField>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'label', type: 'string', description: 'Label text displayed above the control' },
          { name: 'hint', type: 'string', description: 'Helper text displayed below the control. Hidden when error is set.' },
          { name: 'error', type: 'string', description: 'Validation error message. Replaces hint when present.' },
          { name: 'htmlFor', type: 'string', description: 'Links the label to a specific input via id. Auto-derived from label when omitted.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The form control (Input, Select, Textarea, etc.)' },
        ]} />
      </div>
    </div>
  )
}

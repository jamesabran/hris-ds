import { Banner } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function BannerPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Banner</h1>
        <p>Inline contextual feedback strip. Four tones. Used inside modal bodies, page headers, and form error boundaries.</p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:83</code>
      </div>

      <div className="ds-section">
        <h2>All tones</h2>
        <Preview label="Live renders — real @xhr/ui Banner">
          <div className="ds-stack">
            <Banner tone="info">
              Your schedule for next week has been published. Review it before Sunday.
            </Banner>
            <Banner tone="warning">
              Your leave balance is low — 1.5 days remaining for Q3. New credits apply July 1.
            </Banner>
            <Banner tone="success">
              Leave request approved. Your absence is now reflected in the team schedule.
            </Banner>
            <Banner tone="danger">
              Clock-in failed — location access was denied. Enable GPS and try again.
            </Banner>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>States by tone</h2>
        <StateGrid
          cols={4}
          states={[
            { label: 'Info', children: <Banner tone="info">Scheduled maintenance tonight at 11 PM.</Banner> },
            { label: 'Warning', children: <Banner tone="warning">2 pending approvals past SLA.</Banner> },
            { label: 'Success', children: <Banner tone="success">Attendance record updated.</Banner> },
            { label: 'Danger', children: <Banner tone="danger">Invalid employee ID. Check and retry.</Banner> },
          ]}
        />
      </div>

      <div className="ds-section">
        <h2>Usage in forms (FormModal pattern)</h2>
        <Preview label="Banner at top of modal body — danger tone">
          <div style={{ maxWidth: 480 }}>
            <Banner tone="danger">
              <strong>Submission failed:</strong> The selected leave dates overlap with an approved leave request (June 28–30).
            </Banner>
          </div>
        </Preview>
        <div className="ds-callout" style={{ marginTop: 'var(--s-3)' }}>
          In the FormModal pattern, the danger Banner is the <strong>first child</strong> in the modal body — before any
          form fields — so the error is always visible without scrolling.
        </div>
      </div>

      <div className="ds-section">
        <h2>Token gaps</h2>
        <div className="ds-callout">
          <strong>Gap:</strong> Banner border and icon colors are hardcoded per tone, not referencing semantic tokens.
          Should be extracted to <code>color/semantic/&#123;tone&#125;-border</code> in a future token pass.
        </div>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'tone', type: "'info' | 'warning' | 'success' | 'danger'", default: "'info'", description: 'Visual tone — drives background, border, and icon color' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Banner content. Can include inline HTML (strong, em) for emphasis.' },
        ]} />
      </div>
    </div>
  )
}

import { Chip } from '@xhr/ui'
import type { ChipTone } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

const TONES: ChipTone[] = ['default', 'success', 'warning', 'danger', 'info', 'brand']

const HRIS_EXAMPLES = [
  { tone: 'success' as ChipTone, label: 'Complete', dot: true },
  { tone: 'warning' as ChipTone, label: 'Pending', dot: true },
  { tone: 'danger' as ChipTone,  label: 'Absent',  dot: true },
  { tone: 'info' as ChipTone,    label: 'Scheduled', dot: true },
  { tone: 'default' as ChipTone, label: 'Rest day', dot: false },
  { tone: 'brand' as ChipTone,   label: 'Work from Home', dot: false },
]

export function ChipPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Chip</h1>
        <p>
          Status badge / label. Six tones. Optional leading dot for attendance status indicators.
          Used in DataTable status columns, WeekGrid day cells, and approval inbox SLA labels.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:41</code>
      </div>

      <div className="ds-section">
        <h2>Attendance status examples</h2>
        <Preview label="As used in employee schedule and attendance list">
          <div className="ds-flex-wrap ds-gap-2">
            {HRIS_EXAMPLES.map(e => (
              <Chip key={e.label} tone={e.tone} dot={e.dot}>{e.label}</Chip>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>All tones</h2>
        <StateGrid
          cols={6}
          states={TONES.map(t => ({
            label: t,
            children: <Chip tone={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</Chip>,
          }))}
        />

        <h3>With dot indicator</h3>
        <StateGrid
          cols={6}
          states={TONES.map(t => ({
            label: `${t} + dot`,
            children: <Chip tone={t} dot>{t.charAt(0).toUpperCase() + t.slice(1)}</Chip>,
          }))}
        />
      </div>

      <div className="ds-section">
        <h2>HRIS usage contexts</h2>
        <Preview label="Leave type labels">
          <div className="ds-flex-wrap ds-gap-2">
            <Chip tone="default">Annual Leave</Chip>
            <Chip tone="info">Sick Leave</Chip>
            <Chip tone="warning">Emergency Leave</Chip>
            <Chip tone="brand">Maternity Leave</Chip>
          </div>
        </Preview>
        <Preview label="SLA countdown in ApprovalsInbox">
          <div className="ds-flex-wrap ds-gap-2">
            <Chip tone="danger">Overdue</Chip>
            <Chip tone="warning">Due in 3h</Chip>
            <Chip tone="info">Due in 14h</Chip>
          </div>
        </Preview>
        <Preview label="Work arrangement">
          <div className="ds-flex-wrap ds-gap-2">
            <Chip tone="brand" dot>Work from Home</Chip>
            <Chip tone="info" dot>On-site</Chip>
            <Chip tone="default" dot>Remote</Chip>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Accessibility</h2>
        <div className="ds-callout">
          <strong>Do not rely on color alone.</strong> Always include a text label. Use the <code>dot</code> prop
          as a secondary indicator, not a primary one. The success/warning tone foreground+background pairs
          do not meet WCAG AA — chip labels must always be present.
        </div>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'tone', type: "'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand'", default: "'default'", description: 'Color tone — drives background and text color' },
          { name: 'dot', type: 'boolean', description: 'Shows a leading colored dot for status indicators' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Chip label text' },
        ]} />
      </div>
    </div>
  )
}

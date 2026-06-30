import { Chip, Button } from '@xhr/ui'
import { Preview } from '../../components/Preview'

type DayStatus = 'complete' | 'absent' | 'open' | 'rest' | 'leave'
type ShiftType = 'day' | 'night' | 'rest'

interface DayData {
  day: string
  date: number
  shift: ShiftType
  status: DayStatus
  isToday?: boolean
  holiday?: string
}

const WEEK: DayData[] = [
  { day: 'Mon', date: 23, shift: 'day',  status: 'complete' },
  { day: 'Tue', date: 24, shift: 'day',  status: 'complete' },
  { day: 'Wed', date: 25, shift: 'day',  status: 'leave',    holiday: 'Independence Day ×2' },
  { day: 'Thu', date: 26, shift: 'day',  status: 'absent',   isToday: true },
  { day: 'Fri', date: 27, shift: 'day',  status: 'open' },
  { day: 'Sat', date: 28, shift: 'rest', status: 'rest' },
  { day: 'Sun', date: 29, shift: 'rest', status: 'rest' },
]

const STATUS_TONE: Record<DayStatus, 'success' | 'danger' | 'default' | 'warning' | 'info'> = {
  complete: 'success',
  absent:   'danger',
  open:     'default',
  rest:     'default',
  leave:    'info',
}

const STATUS_LABEL: Record<DayStatus, string> = {
  complete: 'Complete',
  absent:   'Absent',
  open:     'Open',
  rest:     'Rest',
  leave:    'On Leave',
}

function DayCell({ d }: { d: DayData }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-md)',
      border: d.isToday ? '2px solid var(--qx-orange-400)' : '1px solid var(--border)',
      padding: 'var(--s-3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--s-2)',
      minHeight: 130,
    }}>
      <div>
        <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)', fontWeight: 500 }}>{d.day}</div>
        <div style={{
          fontSize: 'var(--fs-20)', fontWeight: 700,
          color: d.isToday ? 'var(--qx-orange-600)' : 'var(--ink-800)',
        }}>{d.date}</div>
      </div>

      {d.shift !== 'rest' && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 10,
          fontWeight: 600,
          color: d.shift === 'day' ? 'var(--qx-orange-700)' : 'var(--ink-500)',
          background: d.shift === 'day' ? 'var(--qx-orange-50)' : 'var(--ink-100)',
          borderRadius: 'var(--r-pill)',
          padding: '2px 8px',
          alignSelf: 'flex-start',
        }}>
          {d.shift === 'day' ? '☀' : '🌙'} {d.shift === 'day' ? 'Day' : 'Night'}
        </div>
      )}

      {d.holiday && (
        <Chip tone="brand" dot={false}>{d.holiday}</Chip>
      )}

      {d.status !== 'rest' && (
        <Chip tone={STATUS_TONE[d.status]} dot={d.status !== 'leave'}>
          {STATUS_LABEL[d.status]}
        </Chip>
      )}

      {d.status === 'absent' && (
        <Button variant="ghost" size="sm">Request correction</Button>
      )}
    </div>
  )
}

export function WeekGridPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>WeekGrid</h1>
        <p>
          7-column schedule grid showing Mon–Sun. Each cell shows shift type, attendance status chip,
          optional holiday badge, and a correction CTA on absent days.
          Used on <code className="ds-source-ref">/employee/schedule</code>.
        </p>
        <code className="ds-source-ref">apps/web/src/pages/employee/Schedule.tsx</code>
      </div>

      <div className="ds-section">
        <h2>Live — week of June 23–29, 2026</h2>
        <Preview bg="surface" label="Today = Thursday June 26 (orange border)">
          {/* Week nav */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 'var(--s-4)',
            background: 'var(--surface-card)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border)', padding: 'var(--s-3) var(--s-4)',
          }}>
            <Button variant="ghost" size="sm">← Prev</Button>
            <span style={{ fontSize: 'var(--fs-14)', fontWeight: 600, color: 'var(--ink-700)' }}>
              Week of June 23–29, 2026
            </span>
            <div className="ds-flex ds-gap-2">
              <Button variant="secondary" size="sm">This week</Button>
              <Button variant="ghost" size="sm">Next →</Button>
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 'var(--s-2)',
          }}>
            {WEEK.map(d => <DayCell key={d.day} d={d} />)}
          </div>

          {/* Legend */}
          <div className="ds-flex ds-gap-3" style={{ marginTop: 'var(--s-4)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>Legend:</span>
            <span style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-500)' }}>☀ Day shift</span>
            <span style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-500)' }}>🌙 Night shift</span>
            <span style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-500)' }}>— Rest day</span>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Attendance status precedence</h2>
        <table className="ds-props-table">
          <thead><tr><th>Priority</th><th>Status</th><th>Chip tone</th><th>Note</th></tr></thead>
          <tbody>
            {[
              [1, 'REST', 'default', 'No shift expected'],
              [2, 'Leave approved', 'info', 'Approved leave'],
              [3, 'Leave pending', 'warning', 'Pending approval'],
              [4, 'Complete', 'success', 'Clock in + out recorded'],
              [5, 'Open', 'default', 'Shift not yet started'],
              [6, 'Absent', 'danger', 'No attendance record + correction CTA'],
              [7, 'Scheduled (future)', 'info', 'Upcoming shift'],
            ].map(([p, s, t, n]) => (
              <tr key={String(p)}>
                <td>{p}</td>
                <td><Chip tone={t as any}>{String(s)}</Chip></td>
                <td><code>{t}</code></td>
                <td>{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Composed from</h2>
        <p className="ds-muted">
          <a href="/components/chip" style={{ color: 'var(--qx-orange-600)' }}>Chip</a> ·{' '}
          <a href="/components/button" style={{ color: 'var(--qx-orange-600)' }}>Button</a> ·{' '}
          <a href="/components/card" style={{ color: 'var(--qx-orange-600)' }}>Card</a> (week nav) ·{' '}
          <a href="/components/correctionmodal" style={{ color: 'var(--qx-orange-600)' }}>CorrectionModal</a> (triggered from absent cells)
        </p>
      </div>
    </div>
  )
}

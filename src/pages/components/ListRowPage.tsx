import { ListRow } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function ListRowPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>ListRow</h1>
        <p>
          Flexible list item with icon, title, subtitle, and trailing metadata slots.
          All slots are optional — render only what you need.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:249</code>
      </div>

      <div className="ds-section">
        <h2>Notification feed</h2>
        <Preview noPad label="As rendered in the AppShell notification drawer">
          <div>
            {[
              { icon: '✅', title: 'Leave request approved', sub: 'Annual Leave — Jul 7–11 · HR Admin', meta: '2h ago' },
              { icon: '📋', title: 'New approval pending', sub: 'Maria Santos · Overtime · 4 hrs', meta: '5h ago' },
              { icon: '⚠️', title: 'SLA approaching', sub: 'Carlos Reyes · Correction request · Due 6 PM', meta: '1d ago' },
              { icon: '🔔', title: 'Schedule published', sub: 'Week of Jul 7–13 is now visible', meta: '2d ago' },
            ].map((n, i, arr) => (
              <div key={n.title} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <ListRow
                  icon={<span style={{ fontSize: 18 }}>{n.icon}</span>}
                  title={n.title}
                  sub={n.sub}
                  meta={n.meta}
                />
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Employee roster list</h2>
        <Preview noPad label="Team member rows with status">
          <div>
            {[
              { initials: 'MS', name: 'Maria Santos', role: 'Senior Engineer', meta: 'Present' },
              { initials: 'CR', name: 'Carlos Reyes', role: 'HR Specialist', meta: 'WFH' },
              { initials: 'AV', name: 'Ana Villanueva', role: 'Accountant', meta: 'On leave' },
            ].map((emp, i, arr) => (
              <div key={emp.name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <ListRow
                  icon={
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--qx-orange-100)', border: '1.5px solid var(--qx-orange-200)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'var(--fs-12)', fontWeight: 700, color: 'var(--qx-orange-700)',
                    }}>
                      {emp.initials}
                    </div>
                  }
                  title={emp.name}
                  sub={emp.role}
                  meta={emp.meta}
                />
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Slot variations</h2>
        <Preview noPad label="Different slot combinations">
          <div>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              <ListRow title="Title only" />
            </div>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              <ListRow title="Title + subtitle" sub="Secondary line of text" />
            </div>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              <ListRow title="Title + meta" meta="Jul 1" />
            </div>
            <div>
              <ListRow
                icon={<span style={{ fontSize: 20 }}>📎</span>}
                title="All four slots"
                sub="Icon · title · subtitle · meta"
                meta="2 min ago"
              />
            </div>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'icon', type: 'ReactNode', description: 'Leading icon — rendered in a 40×40px container. Use emoji, SVG, or EmpPhoto.' },
          { name: 'title', type: 'ReactNode', required: true, description: 'Primary label — bold, ink-800' },
          { name: 'sub', type: 'ReactNode', description: 'Subtitle / secondary line — smaller, muted' },
          { name: 'meta', type: 'ReactNode', description: 'Trailing metadata — right-aligned, muted (timestamps, counts)' },
        ]} />
      </div>
    </div>
  )
}

import { Card, Chip, Button } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function CardPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Card</h1>
        <p>
          General-purpose content container. White surface on the page background.
          Default mode has padding; flush mode removes it so content (tables, lists) can reach the edges.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:36</code>
      </div>

      <div className="ds-section">
        <h2>Default — with content</h2>
        <Preview bg="surface" label="Standard padded card">
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--s-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--fs-15)', fontWeight: 600, color: 'var(--ink-800)' }}>Leave Balance</div>
                <div style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-400)', marginTop: 2 }}>As of June 30, 2026</div>
              </div>
              <Chip tone="success">Active</Chip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-4)' }}>
              {[
                { label: 'Annual Leave', value: '12.5 days' },
                { label: 'Sick Leave',   value: '8 days' },
                { label: 'Emergency',    value: '3 days' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 'var(--fs-20)', fontWeight: 700, color: 'var(--ink-900)' }}>{item.value}</div>
                  <div style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-400)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Flush — edge-to-edge content</h2>
        <Preview bg="surface" label="flush — used with DataTable, list rows">
          <Card flush>
            {[
              { name: 'Maria Santos', dept: 'Engineering', status: 'Complete' as const },
              { name: 'Carlos Reyes', dept: 'HR', status: 'Absent' as const },
              { name: 'Ana Villanueva', dept: 'Finance', status: 'Pending' as const },
            ].map((row, i) => (
              <div
                key={row.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--s-3) var(--s-4)',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500, color: 'var(--ink-800)' }}>{row.name}</div>
                  <div style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-400)' }}>{row.dept}</div>
                </div>
                <Chip
                  tone={row.status === 'Complete' ? 'success' : row.status === 'Absent' ? 'danger' : 'warning'}
                  dot
                >
                  {row.status}
                </Chip>
              </div>
            ))}
          </Card>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>With header pattern</h2>
        <Preview bg="surface" label="card__header — title + actions row inside a padded card">
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--s-4)' }}>
              <span style={{ fontSize: 'var(--fs-15)', fontWeight: 600, color: 'var(--ink-800)', flex: 1 }}>
                Team Attendance — Week of June 23
              </span>
              <Button variant="ghost" size="sm">Export</Button>
            </div>
            <div style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-400)' }}>
              Card body content here — table, chart, or other data
            </div>
          </Card>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'flush', type: 'boolean', description: 'Removes padding so content reaches the card edges. Use with DataTable and list rows.' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' },
          { name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'All native div attributes' },
        ]} />
      </div>
    </div>
  )
}

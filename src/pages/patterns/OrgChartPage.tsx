import { Preview } from '../../components/Preview'

interface OrgNode {
  id: string
  name: string
  role: string
  initials: string
  children?: OrgNode[]
}

const ORG: OrgNode = {
  id: 'n1', name: 'Ramon Cruz', role: 'Finance Manager', initials: 'RC',
  children: [
    {
      id: 'n2', name: 'Ana Villanueva', role: 'Accountant', initials: 'AV',
      children: [
        { id: 'n5', name: 'Lea Domingo', role: 'AP Clerk', initials: 'LD' },
      ],
    },
    {
      id: 'n3', name: 'Sofia Aquino', role: 'Budget Analyst', initials: 'SA',
    },
    {
      id: 'n4', name: 'Jose Bautista', role: 'Operations Lead', initials: 'JB',
      children: [
        { id: 'n6', name: 'Carlos Reyes', role: 'HR Specialist', initials: 'CR' },
        { id: 'n7', name: 'Maria Santos', role: 'Senior Engineer', initials: 'MS' },
      ],
    },
  ],
}

function OrgCard({ node, isRoot }: { node: OrgNode; isRoot?: boolean }) {
  return (
    <div style={{
      background: isRoot ? 'var(--qx-orange-500)' : 'var(--surface-card)',
      color: isRoot ? '#fff' : 'var(--ink-800)',
      border: isRoot ? 'none' : '1.5px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-3) var(--s-4)',
      boxShadow: isRoot ? 'var(--sh-2)' : 'var(--sh-1)',
      minWidth: 140,
      textAlign: 'center',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: isRoot ? 'rgba(255,255,255,0.25)' : 'var(--qx-orange-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto var(--s-2)',
        fontSize: 'var(--fs-12)', fontWeight: 700,
        color: isRoot ? '#fff' : 'var(--qx-orange-700)',
      }}>{node.initials}</div>
      <div style={{ fontSize: 'var(--fs-13)', fontWeight: 600 }}>{node.name}</div>
      <div style={{ fontSize: 'var(--fs-11)', opacity: 0.75, marginTop: 2 }}>{node.role}</div>
    </div>
  )
}

function OrgTree({ node, isRoot }: { node: OrgNode; isRoot?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <OrgCard node={node} isRoot={isRoot} />

      {node.children && node.children.length > 0 && (
        <>
          {/* Vertical connector from parent */}
          <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

          {/* Horizontal bar across children */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
            {node.children.length > 1 && (
              <div style={{
                position: 'absolute', top: 0,
                left: '12%', right: '12%',
                height: 1, background: 'var(--border)',
              }} />
            )}
            {node.children.map((child) => (
              <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {node.children!.length > 1 && (
                  <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
                )}
                <OrgTree node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function OrgChartPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>OrgChart</h1>
        <p>
          CSS flexbox tree of employee nodes connected by SVG-free line connectors.
          Used on <code className="ds-source-ref">/leader/team</code> to show the reporting hierarchy.
        </p>
        <code className="ds-source-ref">apps/web/src/pages/leader/Team.tsx</code>
      </div>

      <div className="ds-section">
        <h2>Live — Finance team hierarchy</h2>
        <Preview bg="surface" label="Root node (manager) is orange; direct reports are white cards">
          <div style={{ overflowX: 'auto', padding: 'var(--s-4)' }}>
            <OrgTree node={ORG} isRoot />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Implementation notes</h2>
        <div className="ds-callout ds-callout--info">
          <strong>No SVG connectors.</strong> The tree uses a CSS flex technique:
          vertical connectors are <code>width: 1px</code> divs with background <code>var(--border)</code>,
          and the horizontal bar across children is absolutely positioned.
          This approach works for shallow org trees (2–3 levels). Deeper trees need an SVG or canvas-based solution.
        </div>
      </div>

      <div className="ds-section">
        <h2>Node states</h2>
        <table className="ds-props-table">
          <thead><tr><th>State</th><th>Visual treatment</th></tr></thead>
          <tbody>
            <tr><td>Root (logged-in user's manager)</td><td>Orange background, white text, shadow-2</td></tr>
            <tr><td>Direct report</td><td>White card, orange initials, border</td></tr>
            <tr><td>Indirect report</td><td>Same as direct report, nested further right</td></tr>
            <tr><td>Selected (click)</td><td>Orange border + shadow-3 (in source)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Composed from</h2>
        <p className="ds-muted">
          Custom CSS only — no shared <code>@xhr/ui</code> components in the tree itself.
          Uses <a href="/foundations/colors" style={{ color: 'var(--qx-orange-600)' }}>color tokens</a>,{' '}
          <a href="/foundations/spacing" style={{ color: 'var(--qx-orange-600)' }}>spacing tokens</a>,{' '}
          and <a href="/foundations/shadows" style={{ color: 'var(--qx-orange-600)' }}>shadow tokens</a>.
          Parent page uses <a href="/components/pageheader" style={{ color: 'var(--qx-orange-600)' }}>PageHeader</a>.
        </p>
      </div>
    </div>
  )
}

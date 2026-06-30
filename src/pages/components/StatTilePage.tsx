import { StatTile } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function StatTilePage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>StatTile</h1>
        <p>
          KPI tile — value + label + icon + optional tone. Used in the employee home dashboard grid
          and leader home page. Renders in a 3- or 4-column grid.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:59</code>
      </div>

      <div className="ds-section">
        <h2>Employee home dashboard</h2>
        <Preview bg="surface" label="4-column grid as on /employee/home">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s-4)' }}>
            <StatTile label="Days Present" value="18" icon="✅" />
            <StatTile label="Late arrivals" value="2" icon="⏰" tone="amber" />
            <StatTile label="Leave balance" value="12.5" icon="🌴" tone="green" />
            <StatTile label="Overtime hrs" value="4.5" icon="💼" tone="blue" />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Leader home page stats</h2>
        <Preview bg="surface" label="Team-level KPIs">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-4)' }}>
            <StatTile label="Team size" value="12" icon="👥" />
            <StatTile label="Pending approvals" value="4" icon="📋" tone="amber" />
            <StatTile label="Absent today" value="1" icon="⚠️" tone="red" />
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>All tones</h2>
        <StateGrid
          cols={5}
          states={[
            { label: 'Default', bg: 'surface', children: <StatTile label="Present" value="18" icon="✅" /> },
            { label: 'Green', bg: 'surface', children: <StatTile label="Leave balance" value="12" icon="🌴" tone="green" /> },
            { label: 'Blue', bg: 'surface', children: <StatTile label="Overtime hrs" value="4.5" icon="💼" tone="blue" /> },
            { label: 'Amber', bg: 'surface', children: <StatTile label="Late arrivals" value="2" icon="⏰" tone="amber" /> },
            { label: 'Red', bg: 'surface', children: <StatTile label="Absent" value="1" icon="⚠️" tone="red" /> },
          ]}
        />
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'label', type: 'string', required: true, description: 'KPI label displayed below the value' },
          { name: 'value', type: 'ReactNode', required: true, description: 'Primary metric — number or string' },
          { name: 'icon', type: 'ReactNode', description: 'Icon element rendered in a 44×44px box (typically emoji)' },
          { name: 'tone', type: "'' | 'green' | 'blue' | 'amber' | 'red'", default: "''", description: 'Color tone for the icon box background' },
        ]} />
      </div>
    </div>
  )
}

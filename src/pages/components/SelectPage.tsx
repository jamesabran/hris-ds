import { Select } from '@xhr/ui'
import { Preview, StateGrid } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function SelectPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Select</h1>
        <p>
          Native select element with HRIS-styled chevron (SVG background-image).
          Same height and border as Input — visually consistent in form grids.
          Inherits from Input styles; adds dropdown indicator.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:102</code>
      </div>

      <div className="ds-section">
        <h2>HRIS examples</h2>
        <Preview label="Leave type filter">
          <div style={{ maxWidth: 280 }}>
            <Select>
              <option value="">All leave types</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="emergency">Emergency Leave</option>
              <option value="maternity">Maternity Leave</option>
              <option value="paternity">Paternity Leave</option>
            </Select>
          </div>
        </Preview>

        <Preview label="Department filter">
          <div style={{ maxWidth: 280 }}>
            <Select>
              <option value="">All departments</option>
              <option value="eng">Engineering</option>
              <option value="hr">Human Resources</option>
              <option value="fin">Finance</option>
              <option value="ops">Operations</option>
            </Select>
          </div>
        </Preview>

        <Preview label="Status filter">
          <div style={{ maxWidth: 240 }}>
            <Select defaultValue="active">
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </Select>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>States</h2>
        <StateGrid
          cols={3}
          states={[
            { label: 'Default', children: <div style={{ width: '100%' }}><Select><option>Select option</option></Select></div> },
            { label: 'With value', children: <div style={{ width: '100%' }}><Select defaultValue="hr"><option value="hr">Human Resources</option></Select></div> },
            { label: 'Disabled', children: <div style={{ width: '100%' }}><Select disabled><option>Not available</option></Select></div> },
          ]}
        />
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: '...rest', type: 'SelectHTMLAttributes<HTMLSelectElement>', description: 'All native select attributes. Uses React.forwardRef.' },
        ]} />
      </div>
    </div>
  )
}

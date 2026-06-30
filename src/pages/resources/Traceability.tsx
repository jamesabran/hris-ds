export function TraceabilityPage() {
  const rows = [
    // Shared components
    { item: 'Banner', type: 'Component', source: 'packages/xhr-ui/src/Banner.tsx', page: '/components/banner' },
    { item: 'Button', type: 'Component', source: 'packages/xhr-ui/src/Button.tsx', page: '/components/button' },
    { item: 'Card', type: 'Component', source: 'packages/xhr-ui/src/Card.tsx', page: '/components/card' },
    { item: 'Chip', type: 'Component', source: 'packages/xhr-ui/src/Chip.tsx', page: '/components/chip' },
    { item: 'DataTable', type: 'Component', source: 'packages/xhr-ui/src/DataTable.tsx', page: '/components/datatable' },
    { item: 'FormField', type: 'Component', source: 'packages/xhr-ui/src/FormField.tsx', page: '/components/formfield' },
    { item: 'Input', type: 'Component', source: 'packages/xhr-ui/src/Input.tsx', page: '/components/input' },
    { item: 'ListRow', type: 'Component', source: 'packages/xhr-ui/src/ListRow.tsx', page: '/components/listrow' },
    { item: 'Modal', type: 'Component', source: 'packages/xhr-ui/src/Modal.tsx', page: '/components/modal' },
    { item: 'PageHeader', type: 'Component', source: 'packages/xhr-ui/src/PageHeader.tsx', page: '/components/pageheader' },
    { item: 'Select', type: 'Component', source: 'packages/xhr-ui/src/Select.tsx', page: '/components/select' },
    { item: 'StatTile', type: 'Component', source: 'packages/xhr-ui/src/StatTile.tsx', page: '/components/stattile' },
    { item: 'Textarea', type: 'Component', source: 'packages/xhr-ui/src/Textarea.tsx', page: '/components/textarea' },
    // Custom components
    { item: 'AppShell', type: 'Custom', source: 'apps/web/src/components/AppShell.tsx', page: '/components/appshell' },
    { item: 'ClockCard', type: 'Custom', source: 'apps/web/src/components/ClockCard.tsx', page: '/components/clockcard' },
    { item: 'CorrectionModal', type: 'Custom', source: 'apps/web/src/components/CorrectionModal.tsx', page: '/components/correctionmodal' },
    { item: 'EmpPhoto', type: 'Custom', source: 'apps/web/src/components/Photo.tsx', page: '/components/empphoto' },
    { item: 'LeaveModal', type: 'Custom', source: 'apps/web/src/components/LeaveModal.tsx', page: '/components/leavemodal' },
    // Foundations
    { item: 'Color tokens', type: 'Foundation', source: 'packages/xhr-ui/src/app.css (lines 1–120)', page: '/foundations/colors' },
    { item: 'Typography tokens', type: 'Foundation', source: 'packages/xhr-ui/src/app.css (--fs-*, --lh-*)', page: '/foundations/typography' },
    { item: 'Spacing tokens', type: 'Foundation', source: 'packages/xhr-ui/src/app.css (--s-*)', page: '/foundations/spacing' },
    { item: 'Radius tokens', type: 'Foundation', source: 'packages/xhr-ui/src/app.css (--r-*)', page: '/foundations/radius' },
    { item: 'Shadow tokens', type: 'Foundation', source: 'packages/xhr-ui/src/app.css (--sh-*)', page: '/foundations/shadows' },
    // Patterns
    { item: 'ApprovalsInbox', type: 'Pattern', source: 'apps/web/src/pages/leader/Approvals.tsx', page: '/patterns/approvalsinbox' },
    { item: 'FilteredTable', type: 'Pattern', source: 'apps/web/src/pages/hr/Employees.tsx', page: '/patterns/filteredtable' },
    { item: 'FormModal', type: 'Pattern', source: 'apps/web/src/components/LeaveModal.tsx + CorrectionModal.tsx', page: '/patterns/formmodal' },
    { item: 'OrgChart', type: 'Pattern', source: 'apps/web/src/pages/leader/Team.tsx', page: '/patterns/orgchart' },
    { item: 'RtoCard', type: 'Pattern', source: 'apps/web/src/pages/employee/Rto.tsx:44', page: '/patterns/rtocard' },
    { item: 'WeekGrid', type: 'Pattern', source: 'apps/web/src/pages/employee/Schedule.tsx', page: '/patterns/weekgrid' },
  ]

  const TYPE_COLORS: Record<string, string> = {
    Component:  'var(--qx-orange-50)',
    Custom:     'var(--info-50)',
    Foundation: 'var(--success-50)',
    Pattern:    'var(--warning-50)',
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Traceability</h1>
        <p>
          Every component, token category, and pattern in this catalog traced back to its
          source file in the monorepo. Use this table to navigate from the design system
          to the implementation — and to identify coverage gaps.
        </p>
      </div>

      <div className="ds-section">
        <h2>Legend</h2>
        <div className="ds-flex ds-gap-3" style={{ flexWrap: 'wrap', marginBottom: 'var(--s-4)' }}>
          {Object.entries(TYPE_COLORS).map(([type, bg]) => (
            <div key={type} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: bg, borderRadius: 'var(--r-pill)',
              padding: '4px 12px', fontSize: 'var(--fs-12)', fontWeight: 500,
            }}>{type}</div>
          ))}
        </div>
      </div>

      <div className="ds-section">
        <h2>Index</h2>
        <table className="ds-props-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Source file</th>
              <th>DS page</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.item} style={{ background: TYPE_COLORS[r.type] }}>
                <td><strong>{r.item}</strong></td>
                <td>{r.type}</td>
                <td><code style={{ fontSize: 'var(--fs-11)' }}>{r.source}</code></td>
                <td>
                  <a href={r.page} style={{ color: 'var(--qx-orange-600)', fontSize: 'var(--fs-12)' }}>
                    {r.page}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Audit metadata</h2>
        <table className="ds-props-table">
          <tbody>
            <tr><td>Audit date</td><td>2026-06-30</td></tr>
            <tr><td>Shared components</td><td>13 (from @xhr/ui)</td></tr>
            <tr><td>Custom components</td><td>5 (from apps/web)</td></tr>
            <tr><td>Patterns</td><td>6</td></tr>
            <tr><td>Token categories</td><td>5</td></tr>
            <tr><td>Known token gaps</td><td>2 (gradient stops without token names)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

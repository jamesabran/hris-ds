import { Link } from 'react-router-dom'

const PATTERNS = [
  { name: 'ApprovalsInbox', to: '/patterns/approvalsinbox', desc: 'Master/detail approval queue with SLA chips and bulk actions. Used on /leader/approvals.' },
  { name: 'FilteredTable',  to: '/patterns/filteredtable',  desc: 'Search + filter toolbar above a DataTable in a flush Card. Used on /hr/employees and /hr/audit.' },
  { name: 'FormModal',      to: '/patterns/formmodal',      desc: 'Standard form-in-modal template: Banner → fields → Cancel + Submit footer.' },
  { name: 'OrgChart',       to: '/patterns/orgchart',       desc: 'CSS tree of employee nodes with connector lines. Used on /leader/team.' },
  { name: 'RtoCard',        to: '/patterns/rtocard',        desc: 'Gradient hero card for RTO quota + progress. Mirrors ClockCard layout. Used on /employee/rto.' },
  { name: 'WeekGrid',       to: '/patterns/weekgrid',       desc: '7-column schedule grid with attendance status chips and correction CTA. Used on /employee/schedule.' },
]

export function PatternsOverview() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Patterns</h1>
        <p>
          Recurring page-level compositions specific to the QuadX HRIS product. Patterns are assembled
          from shared and custom components and represent repeatable UI solutions for common HRIS use cases.
          They are not reusable in isolation — they are meaningful only within their product context.
        </p>
      </div>
      <div className="ds-home-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {PATTERNS.map(p => (
          <Link key={p.to} to={p.to} className="ds-home-card">
            <div className="ds-home-card__title">{p.name}</div>
            <div className="ds-home-card__desc">{p.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

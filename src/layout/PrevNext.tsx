import { Link, useLocation } from 'react-router-dom'

interface PageEntry { label: string; to: string }

const ALL_PAGES: PageEntry[] = [
  { label: 'Foundations',            to: '/foundations' },
  { label: 'Colors',                 to: '/foundations/colors' },
  { label: 'Typography',             to: '/foundations/typography' },
  { label: 'Spacing',                to: '/foundations/spacing' },
  { label: 'Radius',                 to: '/foundations/radius' },
  { label: 'Shadows',                to: '/foundations/shadows' },
  { label: 'Components',             to: '/components' },
  { label: 'Banner',                 to: '/components/banner' },
  { label: 'Button',                 to: '/components/button' },
  { label: 'Card',                   to: '/components/card' },
  { label: 'Chip',                   to: '/components/chip' },
  { label: 'DataTable',              to: '/components/datatable' },
  { label: 'FormField',              to: '/components/formfield' },
  { label: 'Input',                  to: '/components/input' },
  { label: 'ListRow',                to: '/components/listrow' },
  { label: 'Modal',                  to: '/components/modal' },
  { label: 'PageHeader',             to: '/components/pageheader' },
  { label: 'Select',                 to: '/components/select' },
  { label: 'StatTile',               to: '/components/stattile' },
  { label: 'Textarea',               to: '/components/textarea' },
  { label: 'AppShell',               to: '/components/appshell' },
  { label: 'ClockCard',              to: '/components/clockcard' },
  { label: 'CorrectionModal',        to: '/components/correctionmodal' },
  { label: 'EmpPhoto',               to: '/components/empphoto' },
  { label: 'LeaveModal',             to: '/components/leavemodal' },
  { label: 'Patterns',               to: '/patterns' },
  { label: 'ApprovalsInbox',         to: '/patterns/approvalsinbox' },
  { label: 'FilteredTable',          to: '/patterns/filteredtable' },
  { label: 'FormModal',              to: '/patterns/formmodal' },
  { label: 'OrgChart',               to: '/patterns/orgchart' },
  { label: 'RtoCard',                to: '/patterns/rtocard' },
  { label: 'WeekGrid',               to: '/patterns/weekgrid' },
  { label: 'Traceability',           to: '/resources/traceability' },
  { label: 'Changelog',              to: '/resources/changelog' },
  { label: 'Contributing',           to: '/resources/contributing' },
]

export function PrevNext() {
  const { pathname } = useLocation()
  const idx = ALL_PAGES.findIndex(p => p.to === pathname)
  if (idx < 0) return null
  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null
  const next = idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null

  return (
    <div className="vp-prev-next">
      <div className="vp-prev-next__item vp-prev-next__item--prev">
        {prev && (
          <Link to={prev.to} className="vp-prev-next__link">
            <span className="vp-prev-next__arrow">←</span>
            <span className="vp-prev-next__info">
              <span className="vp-prev-next__hint">Previous page</span>
              <span className="vp-prev-next__title">{prev.label}</span>
            </span>
          </Link>
        )}
      </div>
      <div className="vp-prev-next__item vp-prev-next__item--next">
        {next && (
          <Link to={next.to} className="vp-prev-next__link">
            <span className="vp-prev-next__info">
              <span className="vp-prev-next__hint">Next page</span>
              <span className="vp-prev-next__title">{next.label}</span>
            </span>
            <span className="vp-prev-next__arrow">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

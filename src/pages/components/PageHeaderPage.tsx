import { PageHeader, Button } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

export function PageHeaderPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>PageHeader</h1>
        <p>
          Page-level title bar with optional subtitle and actions slot.
          Flips to column layout at ≤720px. Bottom margin is <code className="ds-source-ref">--s-5</code> by default.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:273</code>
      </div>

      <div className="ds-section">
        <h2>Live previews</h2>
        <Preview bg="surface" label="Title only">
          <PageHeader title="My Attendance" />
        </Preview>

        <Preview bg="surface" label="Title + subtitle">
          <PageHeader
            title="Team Schedule"
            subtitle="Week of June 30 – July 6, 2026"
          />
        </Preview>

        <Preview bg="surface" label="Title + subtitle + actions">
          <PageHeader
            title="Employees"
            subtitle="42 total · 38 active"
            actions={
              <>
                <Button variant="ghost" size="sm">Export</Button>
                <Button variant="primary" size="sm">Add employee</Button>
              </>
            }
          />
        </Preview>

        <Preview bg="surface" label="Leave page header">
          <PageHeader
            title="Leave"
            subtitle="Remaining: Annual 12.5d · Sick 8d · Emergency 3d"
            actions={
              <Button variant="primary">File leave request</Button>
            }
          />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Responsive behavior</h2>
        <div className="ds-callout ds-callout--info">
          At ≤720px the actions slot stacks below the title/subtitle in a column layout.
          Resize the browser window to observe.
        </div>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'title', type: 'string', required: true, description: 'Page heading — h1 semantics, --fs-24 weight 700' },
          { name: 'subtitle', type: 'string', description: 'Secondary line below the title — muted, smaller font' },
          { name: 'actions', type: 'ReactNode', description: 'Right-aligned slot for buttons or controls' },
        ]} />
      </div>
    </div>
  )
}

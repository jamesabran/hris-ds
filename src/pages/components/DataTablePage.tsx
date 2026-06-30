import { DataTable, Chip, Button } from '@xhr/ui'
import type { Column } from '@xhr/ui'
import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

interface Employee {
  id: string
  name: string
  department: string
  role: string
  status: 'Active' | 'Inactive' | 'On Leave'
  joined: string
}

const EMPLOYEES: Employee[] = [
  { id: '1042', name: 'Maria Santos',   department: 'Engineering', role: 'Senior Engineer',   status: 'Active',   joined: '2021-03-15' },
  { id: '1043', name: 'Carlos Reyes',   department: 'HR',          role: 'HR Specialist',    status: 'Active',   joined: '2022-07-01' },
  { id: '1044', name: 'Ana Villanueva', department: 'Finance',     role: 'Accountant',       status: 'On Leave', joined: '2020-11-08' },
  { id: '1045', name: 'Jose Bautista',  department: 'Operations',  role: 'Operations Lead',  status: 'Inactive', joined: '2019-05-20' },
  { id: '1046', name: 'Lea Domingo',    department: 'Engineering', role: 'Frontend Dev',     status: 'Active',   joined: '2023-01-10' },
]

const COLUMNS: Column<Employee>[] = [
  {
    key: 'name',
    header: 'Employee',
    render: row => (
      <div>
        <div style={{ fontWeight: 500, color: 'var(--ink-800)' }}>{row.name}</div>
        <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>ID {row.id}</div>
      </div>
    ),
  },
  { key: 'department', header: 'Department' },
  { key: 'role', header: 'Position' },
  {
    key: 'status',
    header: 'Status',
    render: row => (
      <Chip
        tone={row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'default'}
        dot
      >
        {row.status}
      </Chip>
    ),
  },
  {
    key: 'actions',
    header: '',
    render: () => (
      <div className="ds-flex ds-gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    ),
  },
]

const ATTENDANCE_COLUMNS: Column<{ date: string; status: string; clockIn: string; clockOut: string; hours: string }>[] = [
  { key: 'date',     header: 'Date' },
  { key: 'clockIn',  header: 'Clock in' },
  { key: 'clockOut', header: 'Clock out' },
  { key: 'hours',    header: 'Hours' },
  {
    key: 'status',
    header: 'Status',
    render: row => (
      <Chip
        tone={row.status === 'Complete' ? 'success' : row.status === 'Absent' ? 'danger' : 'warning'}
        dot
      >
        {row.status}
      </Chip>
    ),
  },
]

const ATTENDANCE = [
  { date: 'Mon Jun 30', clockIn: '08:02', clockOut: '17:05', hours: '9h 03m', status: 'Complete' },
  { date: 'Tue Jul 1',  clockIn: '08:15', clockOut: '17:00', hours: '8h 45m', status: 'Complete' },
  { date: 'Wed Jul 2',  clockIn: '—',     clockOut: '—',     hours: '—',      status: 'Absent' },
  { date: 'Thu Jul 3',  clockIn: '09:02', clockOut: '17:00', hours: '7h 58m', status: 'Complete' },
]

export function DataTablePage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>DataTable</h1>
        <p>
          Generic typed table. Columns are declarative — each column can have a custom <code>render</code> function.
          Stacks to card-style rows on mobile via <code>.table--stack</code>.
        </p>
        <code className="ds-source-ref">packages/xhr-ui/src/index.tsx:207</code>
      </div>

      <div className="ds-section">
        <h2>Employee directory</h2>
        <Preview noPad label="HR employee list — /hr/employees">
          <DataTable columns={COLUMNS} rows={EMPLOYEES} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Attendance log</h2>
        <Preview noPad label="Employee attendance history — /employee/attendance">
          <DataTable columns={ATTENDANCE_COLUMNS} rows={ATTENDANCE} />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Empty state</h2>
        <Preview noPad label="No data — empty prop">
          <DataTable columns={COLUMNS} rows={[]} empty="No employees match your search filters." />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Column type</h2>
        <PropsTable props={[
          { name: 'key', type: 'string', required: true, description: 'Unique column identifier — used as React key' },
          { name: 'header', type: 'string', required: true, description: 'Column heading text' },
          { name: 'render', type: '(row: T) => ReactNode', description: 'Custom cell renderer. If omitted, renders row[key] as string.' },
        ]} />
      </div>

      <div className="ds-section">
        <h2>DataTable props</h2>
        <PropsTable props={[
          { name: 'columns', type: 'Column<T>[]', required: true, description: 'Column definitions' },
          { name: 'rows', type: 'T[]', required: true, description: 'Data rows. Must be Record<string, any>.' },
          { name: 'empty', type: 'string', default: "'No records'", description: 'Message shown when rows is empty' },
        ]} />
      </div>
    </div>
  )
}

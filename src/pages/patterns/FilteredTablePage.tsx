import { useState, useMemo } from 'react'
import { DataTable, Chip, Button, Input, Select } from '@xhr/ui'
import type { Column } from '@xhr/ui'
import { Preview } from '../../components/Preview'

interface Employee {
  id: string
  name: string
  department: string
  role: string
  status: 'Active' | 'Inactive' | 'On Leave'
}

const ALL_EMPLOYEES: Employee[] = [
  { id: '1042', name: 'Maria Santos',    department: 'Engineering', role: 'Senior Engineer',  status: 'Active' },
  { id: '1043', name: 'Carlos Reyes',    department: 'HR',          role: 'HR Specialist',   status: 'Active' },
  { id: '1044', name: 'Ana Villanueva',  department: 'Finance',     role: 'Accountant',      status: 'On Leave' },
  { id: '1045', name: 'Jose Bautista',   department: 'Operations',  role: 'Operations Lead', status: 'Inactive' },
  { id: '1046', name: 'Lea Domingo',     department: 'Engineering', role: 'Frontend Dev',    status: 'Active' },
  { id: '1047', name: 'Ramon Cruz',      department: 'Finance',     role: 'Finance Manager', status: 'Active' },
  { id: '1048', name: 'Sofia Aquino',    department: 'HR',          role: 'Recruiter',       status: 'Active' },
]

const COLUMNS: Column<Employee>[] = [
  {
    key: 'name', header: 'Employee',
    render: r => (
      <div>
        <div style={{ fontWeight: 500, color: 'var(--ink-800)' }}>{r.name}</div>
        <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>ID {r.id}</div>
      </div>
    ),
  },
  { key: 'department', header: 'Department' },
  { key: 'role', header: 'Position' },
  {
    key: 'status', header: 'Status',
    render: r => (
      <Chip tone={r.status === 'Active' ? 'success' : r.status === 'On Leave' ? 'warning' : 'default'} dot>
        {r.status}
      </Chip>
    ),
  },
  {
    key: 'actions', header: '',
    render: () => (
      <div className="ds-flex ds-gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    ),
  },
]

export function FilteredTablePage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('')
  const [status, setStatus] = useState('')

  const filtered = useMemo(() => ALL_EMPLOYEES.filter(e => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.id.includes(search)
    const matchDept = !dept || e.department === dept
    const matchStatus = !status || e.status === status
    return matchSearch && matchDept && matchStatus
  }), [search, dept, status])

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>FilteredTable</h1>
        <p>
          Search + filter toolbar above a DataTable, all inside a flush Card.
          Standard pattern for HR administrative list views. Filters are fully interactive below.
        </p>
        <code className="ds-source-ref">apps/web/src/pages/hr/Employees.tsx</code>
      </div>

      <div className="ds-section">
        <h2>Live — employee directory</h2>
        <Preview noPad label={`/hr/employees — ${filtered.length} of ${ALL_EMPLOYEES.length} employees shown`}>
          {/* Toolbar */}
          <div style={{
            display: 'flex', gap: 'var(--s-3)', padding: 'var(--s-3) var(--s-4)',
            borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center',
            background: 'var(--surface-card)',
          }}>
            <Input
              placeholder="Search name or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 220 }}
            />
            <Select value={dept} onChange={e => setDept(e.target.value)} style={{ width: 180 }}>
              <option value="">All departments</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </Select>
            <Select value={status} onChange={e => setStatus(e.target.value)} style={{ width: 150 }}>
              <option value="">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </Select>
            <div style={{ flex: 1 }} />
            {(search || dept || status) && (
              <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setDept(''); setStatus('') }}>
                Clear filters
              </Button>
            )}
            <Button variant="ghost" size="sm">↓ Export</Button>
            <Button variant="primary" size="sm">↑ Import</Button>
          </div>

          {/* Table */}
          <DataTable
            columns={COLUMNS}
            rows={filtered}
            empty="No employees match your search filters."
          />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Composed from</h2>
        <p className="ds-muted">
          <a href="/components/input" style={{ color: 'var(--qx-orange-600)' }}>Input</a> ·{' '}
          <a href="/components/select" style={{ color: 'var(--qx-orange-600)' }}>Select</a> ·{' '}
          <a href="/components/button" style={{ color: 'var(--qx-orange-600)' }}>Button</a> ·{' '}
          <a href="/components/datatable" style={{ color: 'var(--qx-orange-600)' }}>DataTable</a> ·{' '}
          <a href="/components/card" style={{ color: 'var(--qx-orange-600)' }}>Card (flush)</a> ·{' '}
          <a href="/components/chip" style={{ color: 'var(--qx-orange-600)' }}>Chip</a>
        </p>
      </div>
    </div>
  )
}

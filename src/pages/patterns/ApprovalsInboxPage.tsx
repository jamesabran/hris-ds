import { useState } from 'react'
import { Chip, Button, Banner } from '@xhr/ui'
import { Preview } from '../../components/Preview'

interface ApprovalItem {
  id: string
  type: 'leave' | 'correction' | 'overtime'
  employee: string
  initials: string
  detail: string
  requestedAt: string
  slaHours: number
  status: 'pending' | 'approved' | 'rejected'
}

const INITIAL_ITEMS: ApprovalItem[] = [
  {
    id: 'a1', type: 'leave', employee: 'Ana Villanueva', initials: 'AV',
    detail: 'Annual Leave · Jul 7–11 (5 days)', requestedAt: 'Jun 30, 8:14 AM',
    slaHours: 1, status: 'pending',
  },
  {
    id: 'a2', type: 'correction', employee: 'Maria Santos', initials: 'MS',
    detail: 'Time correction · Jun 28 · Clock-out: 18:45', requestedAt: 'Jun 29, 4:30 PM',
    slaHours: 6, status: 'pending',
  },
  {
    id: 'a3', type: 'overtime', employee: 'Jose Bautista', initials: 'JB',
    detail: 'Overtime · Jun 30 · 3 hrs (18:00–21:00)', requestedAt: 'Jun 29, 11:00 AM',
    slaHours: 24, status: 'pending',
  },
]

const TYPE_LABEL: Record<string, string> = {
  leave: 'Leave',
  correction: 'Correction',
  overtime: 'Overtime',
}

function SlaChip({ hours }: { hours: number }) {
  const tone = hours <= 2 ? 'danger' : hours <= 8 ? 'warning' : 'default'
  const label = hours < 1 ? 'Overdue' : hours === 1 ? '1h left' : `${hours}h left`
  return <Chip tone={tone} dot>{label}</Chip>
}

export function ApprovalsInboxPage() {
  const [items, setItems] = useState<ApprovalItem[]>(INITIAL_ITEMS)
  const [selected, setSelected] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  function act(id: string, action: 'approved' | 'rejected') {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i))
    setSelected(null)
    setToast(action === 'approved' ? 'Request approved.' : 'Request rejected.')
    setTimeout(() => setToast(''), 3000)
  }

  const pending = items.filter(i => i.status === 'pending')
  const resolved = items.filter(i => i.status !== 'pending')
  const activeItem = items.find(i => i.id === selected)

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>ApprovalsInbox</h1>
        <p>
          Master/detail layout for the team leader approval queue. Left: paginated list of pending
          requests with SLA countdown chips. Right: request detail + approve/reject CTAs.
          Used on <code className="ds-source-ref">/leader/approvals</code>.
        </p>
        <code className="ds-source-ref">apps/web/src/pages/leader/Approvals.tsx</code>
      </div>

      <div className="ds-section">
        <h2>Live — fully interactive queue</h2>
        <Preview noPad label="Click a row to view detail; approve or reject to resolve">
          {toast && (
            <div style={{ padding: 'var(--s-3) var(--s-4)', borderBottom: '1px solid var(--border)' }}>
              <Banner tone="success">{toast}</Banner>
            </div>
          )}
          <div style={{ display: 'flex', minHeight: 380 }}>
            {/* Master list */}
            <div style={{ width: 320, borderRight: '1px solid var(--border)', flexShrink: 0 }}>
              {/* Header */}
              <div style={{
                padding: 'var(--s-3) var(--s-4)',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontWeight: 600, fontSize: 'var(--fs-13)', color: 'var(--ink-700)' }}>
                  Pending ({pending.length})
                </span>
              </div>

              {pending.length === 0 && (
                <div style={{ padding: 'var(--s-6)', textAlign: 'center', color: 'var(--ink-400)', fontSize: 'var(--fs-13)' }}>
                  All caught up ✓
                </div>
              )}

              {pending.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item.id === selected ? null : item.id)}
                  style={{
                    padding: 'var(--s-3) var(--s-4)',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    background: selected === item.id ? 'var(--qx-orange-50)' : 'var(--surface-card)',
                    borderLeft: selected === item.id ? '3px solid var(--qx-orange-500)' : '3px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--qx-orange-100)', border: '1.5px solid var(--qx-orange-200)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'var(--fs-11)', fontWeight: 700, color: 'var(--qx-orange-700)',
                      flexShrink: 0,
                    }}>{item.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--ink-800)', marginBottom: 2 }}>
                        {item.employee}
                      </div>
                      <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.detail}
                      </div>
                      <div className="ds-flex ds-gap-2">
                        <Chip tone="default">{TYPE_LABEL[item.type]}</Chip>
                        <SlaChip hours={item.slaHours} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {resolved.map(item => (
                <div key={item.id} style={{
                  padding: 'var(--s-3) var(--s-4)',
                  borderBottom: '1px solid var(--border)',
                  opacity: 0.55,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--ink-100)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'var(--fs-11)', fontWeight: 700, color: 'var(--ink-500)',
                      flexShrink: 0,
                    }}>{item.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-600)' }}>{item.employee}</div>
                      <div className="ds-flex ds-gap-2" style={{ marginTop: 4 }}>
                        <Chip tone={item.status === 'approved' ? 'success' : 'danger'} dot>
                          {item.status === 'approved' ? 'Approved' : 'Rejected'}
                        </Chip>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail pane */}
            <div style={{ flex: 1, padding: 'var(--s-5)' }}>
              {!activeItem ? (
                <div style={{ textAlign: 'center', color: 'var(--ink-400)', fontSize: 'var(--fs-14)', paddingTop: 'var(--s-10)' }}>
                  Select a request to review
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 'var(--s-5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
                      <Chip tone="default">{TYPE_LABEL[activeItem.type]}</Chip>
                      <SlaChip hours={activeItem.slaHours} />
                    </div>
                    <h3 style={{ fontSize: 'var(--fs-18)', fontWeight: 700, color: 'var(--ink-800)', margin: 0 }}>
                      {activeItem.employee}
                    </h3>
                    <p style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-500)', margin: 'var(--s-1) 0 0' }}>
                      Submitted {activeItem.requestedAt}
                    </p>
                  </div>

                  <table className="ds-props-table" style={{ marginBottom: 'var(--s-5)' }}>
                    <tbody>
                      <tr><td style={{ width: 140 }}>Request type</td><td>{TYPE_LABEL[activeItem.type]}</td></tr>
                      <tr><td>Details</td><td>{activeItem.detail}</td></tr>
                      <tr><td>Submitted</td><td>{activeItem.requestedAt}</td></tr>
                      <tr><td>SLA remaining</td><td><SlaChip hours={activeItem.slaHours} /></td></tr>
                    </tbody>
                  </table>

                  <div className="ds-flex ds-gap-3">
                    <Button variant="primary" onClick={() => act(activeItem.id, 'approved')}>Approve</Button>
                    <Button variant="danger" onClick={() => act(activeItem.id, 'rejected')}>Reject</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>SLA thresholds</h2>
        <table className="ds-props-table">
          <thead><tr><th>Remaining</th><th>Chip tone</th><th>Action required</th></tr></thead>
          <tbody>
            <tr><td>{">"} 8h</td><td><Chip tone="default" dot>24h left</Chip></td><td>Normal</td></tr>
            <tr><td>2–8h</td><td><Chip tone="warning" dot>4h left</Chip></td><td>Act soon</td></tr>
            <tr><td>{"<"} 2h</td><td><Chip tone="danger" dot>1h left</Chip></td><td>Urgent</td></tr>
            <tr><td>Overdue</td><td><Chip tone="danger" dot>Overdue</Chip></td><td>Escalated</td></tr>
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Composed from</h2>
        <p className="ds-muted">
          <a href="/components/chip" style={{ color: 'var(--qx-orange-600)' }}>Chip</a> ·{' '}
          <a href="/components/button" style={{ color: 'var(--qx-orange-600)' }}>Button</a> ·{' '}
          <a href="/components/banner" style={{ color: 'var(--qx-orange-600)' }}>Banner</a> ·{' '}
          <a href="/components/listrow" style={{ color: 'var(--qx-orange-600)' }}>ListRow</a> (master list items) ·{' '}
          <a href="/components/card" style={{ color: 'var(--qx-orange-600)' }}>Card</a>
        </p>
      </div>
    </div>
  )
}

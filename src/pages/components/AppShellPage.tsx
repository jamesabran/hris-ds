import { Preview } from '../../components/Preview'

function RailPreview() {
  const navItems = [
    { icon: '🏠', label: 'Home', active: false },
    { icon: '📅', label: 'Schedule', active: true },
    { icon: '🕐', label: 'Attendance', active: false },
    { icon: '🌴', label: 'Leave', active: false },
    { icon: '👤', label: 'Profile', active: false },
  ]

  return (
    <div style={{
      width: 240,
      height: 480,
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: 'var(--s-4)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--s-3)',
      }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--qx-orange-500)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 'var(--fs-13)',
        }}>QX</div>
        <div>
          <div style={{ fontSize: 'var(--fs-13)', fontWeight: 600, color: 'var(--ink-800)' }}>QuadX HRIS</div>
          <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>Employee Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: 'var(--s-3) var(--s-2)' }}>
        {navItems.map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
            padding: '8px var(--s-3)',
            borderRadius: 8,
            marginBottom: 2,
            background: item.active ? 'var(--qx-orange-50)' : 'transparent',
            color: item.active ? 'var(--qx-orange-600)' : 'var(--ink-500)',
            fontWeight: item.active ? 500 : 400,
            fontSize: 'var(--fs-13)',
            borderLeft: item.active ? '3px solid var(--qx-orange-500)' : '3px solid transparent',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{
        padding: 'var(--s-3) var(--s-2)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
          padding: '8px var(--s-3)',
          fontSize: 'var(--fs-13)', color: 'var(--ink-400)', cursor: 'pointer',
        }}>
          <span>🚪</span> Sign out
        </div>
      </div>
    </div>
  )
}

function BottomNavPreview() {
  const tabs = [
    { icon: '🏠', label: 'Home', active: false },
    { icon: '📅', label: 'Schedule', active: true },
    { icon: '🕐', label: 'Attend.', active: false },
    { icon: '🌴', label: 'Leave', active: false },
    { icon: '👤', label: 'Profile', active: false },
  ]

  return (
    <div style={{
      width: '100%',
      maxWidth: 400,
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
    }}>
      {tabs.map(tab => (
        <div key={tab.label} style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '10px 4px 12px',
          borderTop: tab.active ? '2px solid var(--qx-orange-500)' : '2px solid transparent',
          color: tab.active ? 'var(--qx-orange-600)' : 'var(--ink-400)',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{tab.icon}</span>
          <span style={{ fontSize: 10, marginTop: 4, fontWeight: tab.active ? 600 : 400 }}>{tab.label}</span>
        </div>
      ))}
    </div>
  )
}

export function AppShellPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>AppShell</h1>
        <p>
          Root layout host. Desktop: 240px side rail + topbar. Mobile: topbar + bottom nav + drawer.
          Handles auth guards, role-based navigation, notification polling, and sign-out.
        </p>
        <code className="ds-source-ref">apps/web/src/components/AppShell.tsx:32</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        <strong>Custom product component.</strong> AppShell wraps all authenticated routes in{' '}
        <code>apps/web/src/App.tsx</code>. It is not a reusable component — it is the single
        application layout host. The previews below are faithful static reproductions of the layout.
      </div>

      <div className="ds-section">
        <h2>Desktop — side rail</h2>
        <Preview bg="surface" label="Rail (240px) — role: employee, active: Schedule">
          <RailPreview />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Mobile — bottom nav</h2>
        <Preview bg="surface" label="Bottom nav (64px) — active: Schedule">
          <BottomNavPreview />
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Layout constants</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Used for</th></tr>
          </thead>
          <tbody>
            {[
              ['--topbar-h', '60px', 'Topbar height (desktop + mobile)'],
              ['--rail-w', '240px', 'Side rail width (desktop)'],
              ['--bottomnav-h', '64px', 'Bottom nav height (mobile)'],
              ['--safe-bottom', 'env(safe-area-inset-bottom,0px)', 'iOS safe area for bottom nav'],
              ['--container-max', '1180px', 'Max-width of main content area'],
            ].map(([token, value, usage]) => (
              <tr key={token}><td><code>{token}</code></td><td><code>{value}</code></td><td>{usage}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Route guards</h2>
        <table className="ds-props-table">
          <thead>
            <tr><th>Guard</th><th>Behavior</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ProtectedShell</code></td><td>Requires auth + role in <code>allow</code> array</td></tr>
            <tr><td><code>RequireVisible</code></td><td>Checks HR feature visibility config (fails closed while loading)</td></tr>
            <tr><td><code>RequireEmployeeFlag</code></td><td>Checks per-employee flags: <code>rto_enabled</code>, <code>ot_allowed</code>, <code>clock_enabled</code></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

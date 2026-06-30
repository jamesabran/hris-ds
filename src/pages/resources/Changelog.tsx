export function ChangelogPage() {
  const entries = [
    {
      version: '0.3.0',
      date: '2026-06-30',
      badge: 'Current',
      changes: [
        { type: 'Added', text: 'Living design-system app at apps/design-system/ — replaces VitePress static site' },
        { type: 'Added', text: 'Live interactive previews for all 13 @xhr/ui components' },
        { type: 'Added', text: 'High-fidelity recreations of 5 custom product components (AppShell, ClockCard, CorrectionModal, EmpPhoto, LeaveModal)' },
        { type: 'Added', text: '6 pattern pages with fully interactive examples using HRIS stub data' },
        { type: 'Added', text: 'Foundation pages: Colors, Typography, Spacing, Radius, Shadows with live token renders' },
        { type: 'Added', text: 'StateGrid component for side-by-side state comparisons' },
        { type: 'Added', text: 'PropsTable component for structured prop documentation' },
        { type: 'Added', text: 'Preview wrapper component with surface variants and optional labels' },
      ],
    },
    {
      version: '0.2.0',
      date: '2026-06-29',
      changes: [
        { type: 'Added', text: 'VitePress documentation site with IA and all section stubs' },
        { type: 'Added', text: 'audit/00-manifest.md — full component inventory and token summary' },
        { type: 'Added', text: 'Foundations docs: colors, typography, spacing, radius, shadows, motion' },
        { type: 'Added', text: 'Component anatomy docs for all 13 shared @xhr/ui components' },
        { type: 'Added', text: 'Resources: traceability, changelog, contributing' },
      ],
    },
    {
      version: '0.1.0',
      date: '2026-06-28',
      changes: [
        { type: 'Added', text: 'Initial audit of QuadX HRIS (apps/web) — component inventory, token mapping, pattern identification' },
        { type: 'Added', text: 'Identified 13 shared components in @xhr/ui, 5 custom product components, 6 product patterns' },
        { type: 'Added', text: 'Token inventory: 42+ CSS custom properties across 5 categories' },
      ],
    },
  ]

  const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
    Added:    { bg: 'var(--success-100)', color: 'var(--success-600)' },
    Changed:  { bg: 'var(--warning-100)', color: 'var(--warning-700)' },
    Fixed:    { bg: 'var(--info-100)', color: 'var(--info-600)' },
    Removed:  { bg: 'var(--danger-100)', color: 'var(--danger-600)' },
  }

  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Changelog</h1>
        <p>Design system version history — what changed and when.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
        {entries.map(entry => (
          <div key={entry.version}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--fs-20)', fontWeight: 700, color: 'var(--ink-800)' }}>
                v{entry.version}
              </h2>
              {entry.badge && (
                <span style={{
                  background: 'var(--qx-orange-500)', color: '#fff',
                  fontSize: 'var(--fs-11)', fontWeight: 700,
                  padding: '2px 8px', borderRadius: 'var(--r-pill)',
                }}>
                  {entry.badge}
                </span>
              )}
              <span style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-400)' }}>{entry.date}</span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
              {entry.changes.map((c, i) => {
                const style = TYPE_STYLE[c.type] ?? { bg: 'var(--ink-100)', color: 'var(--ink-600)' }
                return (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--s-3)', fontSize: 'var(--fs-14)', color: 'var(--ink-600)' }}>
                    <span style={{
                      background: style.bg, color: style.color,
                      fontSize: 'var(--fs-11)', fontWeight: 700,
                      padding: '1px 8px', borderRadius: 'var(--r-pill)', flexShrink: 0,
                    }}>
                      {c.type}
                    </span>
                    {c.text}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContributingPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Contributing</h1>
        <p>How to add components, update tokens, and document patterns in this design system.</p>
      </div>

      <div className="ds-section">
        <h2>Where things live</h2>
        <table className="ds-props-table">
          <thead><tr><th>Category</th><th>Location</th><th>Notes</th></tr></thead>
          <tbody>
            <tr>
              <td>Shared UI components</td>
              <td><code>packages/xhr-ui/src/</code></td>
              <td>Exported from <code>index.tsx</code> — usable in any app</td>
            </tr>
            <tr>
              <td>Design tokens (CSS custom properties)</td>
              <td><code>packages/xhr-ui/src/app.css</code></td>
              <td>Imported globally via <code>@xhr/ui/app.css</code></td>
            </tr>
            <tr>
              <td>Custom product components</td>
              <td><code>apps/web/src/components/</code></td>
              <td>HRIS-specific; not exported</td>
            </tr>
            <tr>
              <td>Design system documentation app</td>
              <td><code>apps/design-system/src/</code></td>
              <td>This site. Read-only re: apps/web.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ds-section">
        <h2>Adding a shared component</h2>
        <ol style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-600)', lineHeight: 'var(--lh-loose)', paddingLeft: 'var(--s-5)', margin: 0 }}>
          <li>
            Create <code>packages/xhr-ui/src/YourComponent.tsx</code> — use CSS custom properties for all styling,
            no hardcoded hex values.
          </li>
          <li>
            Export from <code>packages/xhr-ui/src/index.tsx</code>.
          </li>
          <li>
            Add a documentation page at <code>apps/design-system/src/pages/components/YourComponentPage.tsx</code>.
            Import directly from <code>@xhr/ui</code>.
          </li>
          <li>
            Register the route in <code>apps/design-system/src/App.tsx</code> and the nav in{' '}
            <code>apps/design-system/src/layout/Shell.tsx</code>.
          </li>
          <li>
            Add a traceability row to <code>apps/design-system/src/pages/resources/Traceability.tsx</code>.
          </li>
        </ol>
      </div>

      <div className="ds-section">
        <h2>Adding a token</h2>
        <ol style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-600)', lineHeight: 'var(--lh-loose)', paddingLeft: 'var(--s-5)', margin: 0 }}>
          <li>
            Add the CSS custom property to <code>packages/xhr-ui/src/app.css</code> inside <code>:root</code>.
            Follow the existing naming convention: <code>--category-name-scale</code> (e.g., <code>--qx-orange-25</code>).
          </li>
          <li>
            Update the relevant foundations page in <code>apps/design-system/src/pages/foundations/</code>.
          </li>
          <li>
            If the token fills a known gap, remove the <code>ds-callout</code> gap notice from any component page that flagged it.
          </li>
        </ol>
      </div>

      <div className="ds-section">
        <h2>Documenting a pattern</h2>
        <ol style={{ fontSize: 'var(--fs-14)', color: 'var(--ink-600)', lineHeight: 'var(--lh-loose)', paddingLeft: 'var(--s-5)', margin: 0 }}>
          <li>
            A pattern is a recurring composition of 2+ components that solves a specific HRIS product problem.
            If it appears in only one place, it is not a pattern — document it inline in that page instead.
          </li>
          <li>Create <code>apps/design-system/src/pages/patterns/YourPatternPage.tsx</code>.</li>
          <li>Include a live interactive preview with HRIS stub data — no lorem ipsum.</li>
          <li>List the composed-from components with links to their component pages.</li>
          <li>Register in <code>App.tsx</code> and the patterns overview.</li>
        </ol>
      </div>

      <div className="ds-section">
        <h2>Isolation boundary</h2>
        <div className="ds-callout">
          <strong>Never import from <code>apps/web/src/</code> in the design system app.</strong>
          Custom product components that depend on TanStack Query hooks, internal API clients, or auth stores
          cannot be directly imported. Instead, create a faithful visual recreation using the same CSS class names
          and <code>@xhr/ui/app.css</code> tokens, with stub data.
        </div>
      </div>

      <div className="ds-section">
        <h2>Running locally</h2>
        <div style={{
          background: '#0F1320',
          borderRadius: 'var(--r-md)',
          padding: 'var(--s-4)',
          fontFamily: 'ui-monospace, monospace',
          fontSize: 'var(--fs-13)',
          color: '#e2e8f0',
          lineHeight: 'var(--lh-loose)',
        }}>
          <div><span style={{ color: '#94a3b8' }}># from monorepo root</span></div>
          <div>pnpm install</div>
          <div>pnpm --filter design-system dev</div>
          <div style={{ marginTop: 8 }}><span style={{ color: '#94a3b8' }}># open http://localhost:5176</span></div>
        </div>
      </div>
    </div>
  )
}

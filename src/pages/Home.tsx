import { Link } from 'react-router-dom'

const FIGMA_URL = 'https://www.figma.com/design/K1wVYyJIGwPKzPbBYmdffz'

const FEATURES = [
  {
    to: '/foundations',
    title: 'Foundations',
    detail: 'Color tokens, typography scale, spacing system, radius, and shadows — all sourced from packages/xhr-ui/app.css.',
  },
  {
    to: '/components',
    title: 'Components',
    detail: '13 shared @xhr/ui primitives plus 5 custom product components, with full variant and state documentation.',
  },
  {
    to: '/patterns',
    title: 'Patterns',
    detail: '6 recurring HRIS-specific page compositions — WeekGrid, ApprovalsInbox, FormModal, FilteredTable, RtoCard, and OrgChart.',
  },
]

const QUICK_REF: [string, string][] = [
  ['Source audited', 'QuadX HRIS monorepo (apps/web, packages/xhr-ui)'],
  ['Audit date', '2026-06-30'],
  ['Framework', 'React 18.3 + TypeScript 5.6, Vite 5.4, pnpm monorepo'],
  ['Component library', '@xhr/ui (internal — packages/xhr-ui/)'],
  ['Token source', 'packages/xhr-ui/app.css (CSS custom properties)'],
  ['Figma library', 'HRIS-DS'],
  ['Figma team', 'QUADX (Pro)'],
]

const INVENTORY: [string, string][] = [
  ['Shared components (@xhr/ui)', '13'],
  ['Custom product components', '5'],
  ['Patterns / templates', '6'],
  ['Color tokens', '30'],
  ['Spacing tokens', '10'],
  ['Typography sizes', '10'],
  ['Radius tokens', '5'],
  ['Shadow tokens', '4'],
  ['Routes / pages', '24'],
]

export function Home() {
  return (
    <>
      {/* Hero */}
      <div className="vp-hero">
        <div className="vp-hero__container">
          <div className="vp-hero__main">
            <h1 className="vp-hero__name">
              <span className="vp-hero__name-clip">QuadX HRIS</span>
            </h1>
            <p className="vp-hero__text">Design System</p>
            <p className="vp-hero__tagline">
              UI foundations, components, and patterns for the QuadX HRIS application
            </p>
            <div className="vp-hero__actions">
              <Link to="/foundations" className="vp-hero__action vp-hero__action--brand">
                Foundations
              </Link>
              <Link to="/components" className="vp-hero__action vp-hero__action--alt">
                Components
              </Link>
              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="vp-hero__action vp-hero__action--alt"
              >
                Open in Figma ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="vp-features">
        <div className="vp-features__container">
          <div className="vp-features__items">
            {FEATURES.map(f => (
              <div key={f.to} className="vp-features__item">
                <article className="vp-feature">
                  <h2 className="vp-feature__title">
                    <Link to={f.to}>{f.title}</Link>
                  </h2>
                  <p className="vp-feature__detail">{f.detail}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick reference + inventory tables */}
      <div className="vp-home-content">
        <div className="vp-home-content__inner">
          <h2>Quick reference</h2>
          <table>
            <tbody>
              {QUICK_REF.map(([k, v]) => (
                <tr key={k}>
                  <td><strong>{k}</strong></td>
                  <td>
                    {k === 'Figma library'
                      ? <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer">{v}</a>
                      : <code>{v}</code>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Inventory</h2>
          <table>
            <tbody>
              {INVENTORY.map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

import { Link } from 'react-router-dom'

export function FoundationsOverview() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>Foundations</h1>
        <p>
          All design tokens are CSS custom properties in{' '}
          <code className="ds-source-ref">packages/xhr-ui/app.css</code>.
          They are imported globally by both <code className="ds-source-ref">apps/web</code> and
          this design system site.
        </p>
      </div>
      <div className="ds-home-grid">
        {[
          { title: 'Colors', to: '/foundations/colors', desc: '8 brand + 11 neutral + 8 status + 5 surface alias tokens' },
          { title: 'Typography', to: '/foundations/typography', desc: '10-step type scale, 3 line-heights, Inter typeface' },
          { title: 'Spacing', to: '/foundations/spacing', desc: '10-step scale (4–48px) + layout constants' },
          { title: 'Radius', to: '/foundations/radius', desc: '5 radius tokens from 8px to pill (999px)' },
          { title: 'Shadows', to: '/foundations/shadows', desc: '4 elevation levels from subtle to pop' },
        ].map(f => (
          <Link key={f.to} to={f.to} className="ds-home-card">
            <div className="ds-home-card__title">{f.title}</div>
            <div className="ds-home-card__desc">{f.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

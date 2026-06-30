import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { SearchModal } from './SearchModal'
import { Toc } from './Toc'
import { PrevNext } from './PrevNext'

interface NavSection {
  title: string
  items: { label: string; to: string }[]
}

const NAV: NavSection[] = [
  {
    title: 'Foundations',
    items: [
      { label: 'Overview',    to: '/foundations' },
      { label: 'Colors',      to: '/foundations/colors' },
      { label: 'Typography',  to: '/foundations/typography' },
      { label: 'Spacing',     to: '/foundations/spacing' },
      { label: 'Radius',      to: '/foundations/radius' },
      { label: 'Shadows',     to: '/foundations/shadows' },
    ],
  },
  {
    title: 'Components — Shared (@xhr/ui)',
    items: [
      { label: 'Overview',         to: '/components' },
      { label: 'Banner',           to: '/components/banner' },
      { label: 'Button',           to: '/components/button' },
      { label: 'Card',             to: '/components/card' },
      { label: 'Chip',             to: '/components/chip' },
      { label: 'DataTable',        to: '/components/datatable' },
      { label: 'FormField',        to: '/components/formfield' },
      { label: 'Input',            to: '/components/input' },
      { label: 'ListRow',          to: '/components/listrow' },
      { label: 'Modal',            to: '/components/modal' },
      { label: 'PageHeader',       to: '/components/pageheader' },
      { label: 'Select',           to: '/components/select' },
      { label: 'StatTile',         to: '/components/stattile' },
      { label: 'Textarea',         to: '/components/textarea' },
    ],
  },
  {
    title: 'Components — Custom',
    items: [
      { label: 'AppShell',         to: '/components/appshell' },
      { label: 'ClockCard',        to: '/components/clockcard' },
      { label: 'CorrectionModal',  to: '/components/correctionmodal' },
      { label: 'EmpPhoto',         to: '/components/empphoto' },
      { label: 'LeaveModal',       to: '/components/leavemodal' },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Overview',         to: '/patterns' },
      { label: 'ApprovalsInbox',   to: '/patterns/approvalsinbox' },
      { label: 'FilteredTable',    to: '/patterns/filteredtable' },
      { label: 'FormModal',        to: '/patterns/formmodal' },
      { label: 'OrgChart',         to: '/patterns/orgchart' },
      { label: 'RtoCard',          to: '/patterns/rtocard' },
      { label: 'WeekGrid',         to: '/patterns/weekgrid' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Traceability',  to: '/resources/traceability' },
      { label: 'Changelog',     to: '/resources/changelog' },
      { label: 'Contributing',  to: '/resources/contributing' },
    ],
  },
]

function SidebarGroup({ section }: { section: NavSection }) {
  const { pathname } = useLocation()
  const hasActive = section.items.some(i => i.to === pathname || pathname.startsWith(i.to + '/'))
  const [open, setOpen] = useState<boolean>(hasActive || true)

  return (
    <div className="vp-sb-group">
      <button
        className={`vp-sb-group__toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="vp-sb-group__title">{section.title}</span>
        <svg className="vp-sb-group__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="vp-sb-group__items">
          {section.items.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/components' || item.to === '/patterns' || item.to === '/foundations'}
                className={({ isActive }) =>
                  `vp-sb-item${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Shell() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('vp-theme') as 'light' | 'dark') ?? 'light'
  })
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('vp-theme', theme)
  }, [theme])

  // Close mobile nav on route change
  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="vp-layout">
      <Header
        onSearchOpen={() => setSearchOpen(true)}
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        navOpen={navOpen}
        onMenuToggle={() => setNavOpen(o => !o)}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile sidebar backdrop */}
      <div
        className={`vp-sidebar-overlay${navOpen ? ' is-open' : ''}`}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />

      <div className="vp-body">
        {/* Left sidebar */}
        <aside className={`vp-sidebar${navOpen ? ' is-open' : ''}`} aria-label="Site navigation">
          <nav className="vp-sidebar__nav">
            {NAV.map(section => (
              <SidebarGroup key={section.title} section={section} />
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="vp-main">
          {isHome ? (
            /* Home page — no TOC, full width */
            <div className="vp-home-wrap">
              <Outlet />
            </div>
          ) : (
            /* Doc page — content + TOC aside */
            <div className="vp-doc">
              <div className="vp-doc-content" key={location.pathname}>
                <Outlet />
                <PrevNext />
              </div>
              <div className="vp-aside">
                <div className="vp-aside__inner">
                  <Toc />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const TOP_NAV = [
  { label: 'Foundations', to: '/foundations' },
  { label: 'Components',  to: '/components' },
  { label: 'Patterns',    to: '/patterns' },
  { label: 'Resources',   to: '/resources/traceability' },
]

const FIGMA_URL = 'https://www.figma.com/design/K1wVYyJIGwPKzPbBYmdffz'

interface HeaderProps {
  onSearchOpen: () => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  navOpen: boolean
  onMenuToggle: () => void
}

export function Header({ onSearchOpen, theme, onThemeToggle, navOpen, onMenuToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 0) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`vp-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="vp-nav__bar">
        <div className="vp-nav__container">
          {/* Hamburger — visible on mobile only (CSS: display:none on desktop) */}
          <button
            className="vp-nav__menu-btn"
            onClick={onMenuToggle}
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={navOpen}
          >
            {navOpen ? (
              /* X icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <NavLink to="/" className="vp-nav__logo" aria-label="Home">
            <div className="vp-nav__logo-icon">QX</div>
            <div className="vp-nav__logo-text">
              <span className="vp-nav__site-title">QuadX HRIS</span>
              <span className="vp-nav__site-sub">Design System</span>
            </div>
          </NavLink>

          {/* Top nav links */}
          <nav className="vp-nav__links" aria-label="Top navigation">
            {TOP_NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `vp-nav__link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vp-nav__link"
            >
              Figma ↗
            </a>
          </nav>

          {/* Actions */}
          <div className="vp-nav__actions">
            {/* Search */}
            <button
              className="vp-nav__search-btn"
              onClick={onSearchOpen}
              aria-label="Search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <kbd>⌘K</kbd>
            </button>

            {/* Theme toggle */}
            <button
              className="vp-nav__icon-btn"
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

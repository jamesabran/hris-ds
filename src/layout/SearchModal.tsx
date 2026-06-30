import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  title: string
  path: string
  section: string
}

const INDEX: SearchResult[] = [
  { title: 'Colors', path: '/foundations/colors', section: 'Foundations' },
  { title: 'Typography', path: '/foundations/typography', section: 'Foundations' },
  { title: 'Spacing', path: '/foundations/spacing', section: 'Foundations' },
  { title: 'Radius', path: '/foundations/radius', section: 'Foundations' },
  { title: 'Shadows', path: '/foundations/shadows', section: 'Foundations' },
  { title: 'Banner', path: '/components/banner', section: 'Components' },
  { title: 'Button', path: '/components/button', section: 'Components' },
  { title: 'Card', path: '/components/card', section: 'Components' },
  { title: 'Chip', path: '/components/chip', section: 'Components' },
  { title: 'DataTable', path: '/components/datatable', section: 'Components' },
  { title: 'FormField', path: '/components/formfield', section: 'Components' },
  { title: 'Input', path: '/components/input', section: 'Components' },
  { title: 'ListRow', path: '/components/listrow', section: 'Components' },
  { title: 'Modal', path: '/components/modal', section: 'Components' },
  { title: 'PageHeader', path: '/components/pageheader', section: 'Components' },
  { title: 'Select', path: '/components/select', section: 'Components' },
  { title: 'StatTile', path: '/components/stattile', section: 'Components' },
  { title: 'Textarea', path: '/components/textarea', section: 'Components' },
  { title: 'AppShell', path: '/components/appshell', section: 'Components — Custom' },
  { title: 'ClockCard', path: '/components/clockcard', section: 'Components — Custom' },
  { title: 'CorrectionModal', path: '/components/correctionmodal', section: 'Components — Custom' },
  { title: 'EmpPhoto', path: '/components/empphoto', section: 'Components — Custom' },
  { title: 'LeaveModal', path: '/components/leavemodal', section: 'Components — Custom' },
  { title: 'ApprovalsInbox', path: '/patterns/approvalsinbox', section: 'Patterns' },
  { title: 'FilteredTable', path: '/patterns/filteredtable', section: 'Patterns' },
  { title: 'FormModal', path: '/patterns/formmodal', section: 'Patterns' },
  { title: 'OrgChart', path: '/patterns/orgchart', section: 'Patterns' },
  { title: 'RtoCard', path: '/patterns/rtocard', section: 'Patterns' },
  { title: 'WeekGrid', path: '/patterns/weekgrid', section: 'Patterns' },
  { title: 'Traceability', path: '/resources/traceability', section: 'Resources' },
  { title: 'Changelog', path: '/resources/changelog', section: 'Resources' },
  { title: 'Contributing', path: '/resources/contributing', section: 'Resources' },
]

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = query.trim().length < 1
    ? []
    : INDEX.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.section.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') setActive(a => Math.min(a + 1, results.length - 1))
      if (e.key === 'ArrowUp') setActive(a => Math.max(a - 1, 0))
      if (e.key === 'Enter' && results[active]) {
        navigate(results[active].path)
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, navigate, onClose])

  useEffect(() => { setActive(0) }, [query])

  if (!open) return null

  return (
    <div className="vp-search-overlay" onClick={onClose}>
      <div className="vp-search-modal" onClick={e => e.stopPropagation()}>
        <div className="vp-search-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="vp-search-icon">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="vp-search-input"
            placeholder="Search documentation…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="vp-search-close" onClick={onClose}>Esc</button>
        </div>
        {results.length > 0 && (
          <ul className="vp-search-results">
            {results.map((r, i) => (
              <li key={r.path}>
                <button
                  className={`vp-search-result${i === active ? ' is-active' : ''}`}
                  onClick={() => { navigate(r.path); onClose() }}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="vp-search-result__section">{r.section}</span>
                  <span className="vp-search-result__title">{r.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className="vp-search-empty">No results for "{query}"</div>
        )}
      </div>
    </div>
  )
}

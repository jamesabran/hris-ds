import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export function Toc() {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [active, setActive] = useState<string>('')
  const { pathname } = useLocation()

  useEffect(() => {
    /* Build TOC from rendered headings after the page paints.
       Also auto-assign IDs to any heading that doesn't have one. */
    const timer = setTimeout(() => {
      const headings = Array.from(
        document.querySelectorAll<HTMLHeadingElement>('.vp-doc-content h2, .vp-doc-content h3')
      )
      const usedIds = new Set<string>()
      const built: TocEntry[] = []
      for (const h of headings) {
        if (!h.id) {
          let slug = (h.textContent ?? '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
          // deduplicate
          let candidate = slug
          let n = 2
          while (usedIds.has(candidate)) candidate = `${slug}-${n++}`
          h.id = candidate
        }
        usedIds.add(h.id)
        const text = (h.textContent ?? '').trim()
        if (h.id && text) {
          built.push({ id: h.id, text, level: (h.tagName === 'H2' ? 2 : 3) as 2 | 3 })
        }
      }
      setEntries(built)
    }, 80)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (entries.length === 0) return
    const observer = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-64px 0px -80% 0px', threshold: 0 }
    )
    entries.forEach(e => {
      const el = document.getElementById(e.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav className="vp-toc" aria-label="On this page">
      <p className="vp-toc__title">On this page</p>
      <ul className="vp-toc__list">
        {entries.map(e => (
          <li key={e.id} className={`vp-toc__item${e.level === 3 ? ' is-sub' : ''}${active === e.id ? ' is-active' : ''}`}>
            <a
              href={`#${e.id}`}
              className="vp-toc__link"
              onClick={ev => {
                ev.preventDefault()
                document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setActive(e.id)
              }}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

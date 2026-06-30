import type { ReactNode } from 'react'

interface PreviewProps {
  label?: string
  bg?: 'white' | 'surface' | 'dark'
  noPad?: boolean
  center?: boolean
  children: ReactNode
}

export function Preview({ label, bg = 'white', noPad, center, children }: PreviewProps) {
  const cls = [
    'ds-preview__surface',
    bg === 'surface' ? 'ds-preview__surface--bg' : '',
    bg === 'dark' ? 'ds-preview__surface--dark' : '',
    noPad ? 'ds-preview__surface--nopad' : '',
    center ? 'ds-preview__surface--center' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="ds-preview">
      {label && <div className="ds-preview__label">{label}</div>}
      <div className={cls}>{children}</div>
    </div>
  )
}

interface StateGridProps {
  cols?: number
  states: Array<{
    label: string
    bg?: 'white' | 'surface' | 'dark'
    children: ReactNode
  }>
}

export function StateGrid({ cols = 3, states }: StateGridProps) {
  return (
    <div className="ds-state-grid" style={{ '--ds-cols': cols } as React.CSSProperties}>
      {states.map(({ label, bg, children }) => (
        <div key={label} className="ds-state-grid__item">
          <div
            className={[
              'ds-state-grid__preview',
              bg === 'surface' ? 'ds-state-grid__preview--bg' : '',
              bg === 'dark' ? 'ds-state-grid__preview--dark' : '',
            ].filter(Boolean).join(' ')}
          >
            {children}
          </div>
          <div className="ds-state-grid__label">{label}</div>
        </div>
      ))}
    </div>
  )
}

import React from 'react'

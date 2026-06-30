import { Preview } from '../../components/Preview'
import { PropsTable } from '../../components/PropsTable'

function EmpPhoto({ url, name, size = 40 }: { url?: string; name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('')
  const style = {
    width: size, height: size, borderRadius: 12, flexShrink: 0, objectFit: 'cover' as const,
  }

  if (url) {
    return <img src={url} alt={name} style={style} />
  }

  return (
    <span
      aria-hidden="true"
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--qx-orange-50), #FFE9DD)',
        border: '1.5px solid var(--qx-orange-200)',
        color: 'var(--qx-orange-700)',
        fontSize: size * 0.32,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      }}
    >
      {initials}
    </span>
  )
}

const PEOPLE = [
  { name: 'Maria Santos' },
  { name: 'Carlos Reyes' },
  { name: 'Ana Villanueva' },
  { name: 'Jose Bautista' },
  { name: 'Lea Domingo' },
  { name: 'Ramon Cruz' },
]

export function EmpPhotoPage() {
  return (
    <div className="ds-page">
      <div className="ds-page-header">
        <h1>EmpPhoto</h1>
        <p>
          Square-cropped employee photo with initials fallback. Used in list rows, detail headers,
          approval inbox, and org chart nodes. The fallback renders first two initials on an orange gradient.
        </p>
        <code className="ds-source-ref">apps/web/src/components/Photo.tsx:10</code>
      </div>

      <div className="ds-callout ds-callout--info" style={{ marginBottom: 'var(--s-6)' }}>
        This is a <strong>custom product component</strong> in <code>apps/web</code>.
        The preview below is a faithful recreation using the same styles as the source component.
        To use this in a new context, extract it to <code>@xhr/ui</code>.
      </div>

      <div className="ds-section">
        <h2>Initials fallback — no photo URL</h2>
        <Preview label="Various employees — initials derived from full name">
          <div className="ds-flex ds-gap-3" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            {PEOPLE.map(p => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <EmpPhoto name={p.name} size={40} />
                <span style={{ fontSize: 10, color: 'var(--ink-400)' }}>{p.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Sizes</h2>
        <Preview label="36 / 40 / 56 — common usage sizes">
          <div className="ds-flex ds-gap-5" style={{ alignItems: 'flex-end' }}>
            {[36, 40, 56].map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <EmpPhoto name="Maria Santos" size={size} />
                <span style={{ fontSize: 11, color: 'var(--ink-400)', fontFamily: 'ui-monospace,monospace' }}>{size}px</span>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>In context</h2>
        <Preview noPad label="Employee list rows with EmpPhoto">
          <div>
            {PEOPLE.slice(0, 3).map((p, i, arr) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-3)',
                  padding: 'var(--s-3) var(--s-4)',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <EmpPhoto name={p.name} size={36} />
                <div>
                  <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500, color: 'var(--ink-800)' }}>{p.name}</div>
                  <div style={{ fontSize: 'var(--fs-12)', color: 'var(--ink-400)' }}>Engineering</div>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </div>

      <div className="ds-section">
        <h2>Props</h2>
        <PropsTable props={[
          { name: 'url', type: 'string | null | undefined', description: 'Photo URL. When falsy, renders the initials fallback.' },
          { name: 'name', type: 'string', required: true, description: 'Full employee name — used for alt text and initials extraction.' },
          { name: 'size', type: 'number', default: '40', description: 'Square size in pixels.' },
        ]} />
        <div className="ds-callout" style={{ marginTop: 'var(--s-3)' }}>
          <strong>Token gap:</strong> Fallback gradient end stop <code>#FFE9DD</code> is not a defined token.
          Should be extracted to <code>--qx-orange-25</code> in a future token pass.
        </div>
      </div>
    </div>
  )
}

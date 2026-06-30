interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <table className="ds-props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map(p => (
          <tr key={p.name}>
            <td>
              <code>{p.name}</code>
              {p.required && (
                <span style={{ color: 'var(--danger-500)', marginLeft: 4, fontSize: 11 }}>*</span>
              )}
            </td>
            <td><code>{p.type}</code></td>
            <td>
              {p.default ? (
                <code>{p.default}</code>
              ) : (
                <span className="ds-muted">—</span>
              )}
            </td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

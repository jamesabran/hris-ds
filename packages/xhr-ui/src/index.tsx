/* =========================================================
   @xhr/ui — reusable component library.
   Thin React wrappers over the QuadX design-system classes
   defined in app.css (ported from the original mock).
   ========================================================= */
import React from 'react';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---------- Button ----------
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export function Button({
  variant = 'primary',
  size,
  block,
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  block?: boolean;
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <button className={cls} {...rest} />;
}

// ---------- Card ----------
export function Card({ flush, className = '', ...rest }: Div & { flush?: boolean }) {
  return <div className={`card ${flush ? 'card--flush' : ''} ${className}`} {...rest} />;
}

// ---------- Chip ----------
export type ChipTone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand';
export function Chip({
  tone = 'default',
  children,
  dot,
}: {
  tone?: ChipTone;
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span className={`chip ${tone !== 'default' ? `chip--${tone}` : ''}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

// ---------- StatTile ----------
export function StatTile({
  label,
  value,
  icon,
  tone = '',
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tone?: '' | 'green' | 'blue' | 'amber' | 'red';
}) {
  return (
    <div className="stat">
      {icon && <div className={`stat__icon ${tone ? `stat__icon--${tone}` : ''}`}>{icon}</div>}
      <div>
        <div className="stat__label">{label}</div>
        <div className="stat__value mono">{value}</div>
      </div>
    </div>
  );
}

// ---------- Banner ----------
export function Banner({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warning' | 'success' | 'danger';
  children: React.ReactNode;
}) {
  return <div className={`banner banner--${tone}`}>{children}</div>;
}

// ---------- FormField ----------
// (defined below, after the Input/Select/Textarea controls it auto-associates with)

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return <input ref={ref} className="input" {...props} />;
  },
);

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select(props, ref) {
  return <select ref={ref} className="select" {...props} />;
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea(props, ref) {
  return <textarea ref={ref} className="textarea" {...props} />;
});

// ---------- FormField ----------
export function FormField({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  /** Explicitly associate the label with this control id. Use for fields whose
      child WRAPS the control (e.g. an input + button) rather than being it —
      pass the same id to the inner control. When omitted, FormField
      auto-associates a single control child. */
  htmlFor?: string;
  children: React.ReactNode;
}) {
  // Associate <label> with its control and ensure the control has an id, so the
  // field is accessible and autofillable (fixes the DevTools "form field should
  // have an id"/"no label associated" issues). The control components spread
  // props, so an injected id reaches the DOM node. Only auto-wire a bare control
  // child (Input/Select/Textarea or a native input/select/textarea); a wrapped
  // child must use the explicit `htmlFor` prop to avoid pointing the label at a
  // non-labelable element. An existing child id is always respected.
  const autoId = React.useId();
  let control = children;
  let fieldId = htmlFor;
  if (!fieldId && React.isValidElement(children)) {
    const t = children.type;
    const isControl =
      t === Input ||
      t === Select ||
      t === Textarea ||
      (typeof t === 'string' && (t === 'input' || t === 'select' || t === 'textarea'));
    if (isControl) {
      const childId = (children.props as { id?: string }).id;
      fieldId = childId ?? autoId;
      if (!childId) {
        control = React.cloneElement(children as React.ReactElement<{ id?: string }>, { id: fieldId });
      }
    }
  }
  return (
    <div className="field">
      {label && <label htmlFor={fieldId}>{label}</label>}
      {control}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && (
        <span className="hint" style={{ color: 'var(--danger-500)' }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ---------- Modal ----------
export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  size = 'md',
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Panel width. 'lg' widens the modal for table/grid editors. */
  size?: 'md' | 'lg';
}) {
  if (!open) return null;
  return (
    <div className="modal is-open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal__panel${size === 'lg' ? ' modal__panel--lg' : ''}`} role="dialog" aria-modal="true">
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="iconbtn" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

// ---------- DataTable ----------
export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}
export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  empty = 'No records',
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: string;
}) {
  if (rows.length === 0) {
    return <div className="empty">{empty}</div>;
  }
  return (
    <table className="table table--stack">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key} data-label={c.header}>
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---------- ListRow ----------
export function ListRow({
  icon,
  title,
  sub,
  meta,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <div className="list__row">
      {icon && <div className="list__icon">{icon}</div>}
      <div className="list__body">
        <div className="list__title">{title}</div>
        {sub && <div className="list__sub">{sub}</div>}
      </div>
      {meta && <div className="list__meta">{meta}</div>}
    </div>
  );
}

// ---------- PageHeader ----------
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page__header">
      <div>
        <h1 className="page__title">{title}</h1>
        {subtitle && <p className="page__subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </div>
  );
}

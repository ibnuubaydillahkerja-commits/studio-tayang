import { PLATFORMS } from '../config/platforms.js';

export function PageHeader({ title, desc, right }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {desc && <p className="muted">{desc}</p>}
      </div>
      {right}
    </header>
  );
}

export function Card({ title, action, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="card-head">
          {title && <h2>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone }) {
  return (
    <div className={`stat ${tone ? `tone-${tone}` : ''}`}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

const KIND_LABEL = { ok: 'ok', bad: 'bad', wait: 'wait', muted: 'muted' };
export function Badge({ kind = 'muted', children }) {
  return <span className={`badge badge-${KIND_LABEL[kind] || 'muted'}`}>{children}</span>;
}

export function PlatformTag({ p }) {
  const cfg = PLATFORMS[p];
  if (!cfg) return null;
  return <span className={`ptag ptag-${p}`} title={cfg.label}>{cfg.short}</span>;
}

export function Empty({ children }) {
  return <div className="empty">{children}</div>;
}

// Penanda fitur yang baru jalan setelah backend (Supabase) tersambung.
export function Coming({ stage, items }) {
  return (
    <div className="coming">
      <Badge kind="wait">{stage}</Badge>
      <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  );
}

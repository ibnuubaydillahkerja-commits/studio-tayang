import { useState } from 'react';
import { sejak } from '../lib/time.js';

export const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'agents', label: 'Agent' },
  { id: 'konten', label: 'Review Konten' },
  { id: 'jadwal', label: 'Jadwal & Posting' },
  { id: 'memori', label: 'Feedback Memory' },
  { id: 'analitik', label: 'Analitik' },
  { id: 'chat', label: 'Chat Perintah' },
];

export function Layout({ route, live, children }) {
  const [open, setOpen] = useState(false);
  const status = live.error ? 'Gagal memuat data' : live.at ? `Data ${sejak(live.data?.diperbarui)}` : 'Memuat…';
  return (
    <div className="shell">
      <aside className={`side ${open ? 'open' : ''}`}>
        <div className="brand">
          <span className="logo" aria-hidden>◆</span>
          <span>AI Agent<br /><small>TT · YT · IG · FB</small></span>
        </div>
        <nav>
          {NAV.map((n) => (
            <a key={n.id} href={`#/${n.id}`} className={route === n.id ? 'active' : ''} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className={`live ${live.error ? 'stale' : ''}`}><i />{status}</div>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <div className="main">
        <div className="topbar">
          <button className="icon-btn" aria-label="Menu" onClick={() => setOpen(true)}>☰</button>
          <span className="topbar-title">{NAV.find((n) => n.id === route)?.label || 'AI Agent'}</span>
          <button className="icon-btn" aria-label="Muat ulang" onClick={live.reload}>↻</button>
        </div>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

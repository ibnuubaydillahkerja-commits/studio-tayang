import { useMemo, useState } from 'react';
import { PLATFORMS, PLATFORM_KEYS } from '../config/platforms.js';
import { postsPerPlatform, statusKind } from '../lib/selectors.js';
import { addDays, labelTanggal, nowWib } from '../lib/time.js';
import { Badge, Card, Coming, Empty, PageHeader, PlatformTag } from '../components/ui.jsx';

export default function Jadwal({ data }) {
  const [filter, setFilter] = useState('semua');
  const dari = addDays(nowWib().date, -1);

  const groups = useMemo(() => {
    const rows = postsPerPlatform(data.jadwal)
      .filter((p) => p.tanggal >= dari && (filter === 'semua' || p.platform === filter))
      .sort((a, b) => (a.tanggal + a.jam).localeCompare(b.tanggal + b.jam));
    const map = new Map();
    rows.forEach((r) => map.set(r.tanggal, [...(map.get(r.tanggal) || []), r]));
    return [...map.entries()];
  }, [data, filter, dari]);

  return (
    <>
      <PageHeader title="Jadwal & Posting" desc="Antrean posting per platform, mulai kemarin." />

      <div className="chips" role="tablist">
        {['semua', ...PLATFORM_KEYS].map((k) => (
          <button key={k} className={filter === k ? 'chip active' : 'chip'} onClick={() => setFilter(k)}>
            {k === 'semua' ? 'Semua' : PLATFORMS[k].label}
          </button>
        ))}
      </div>

      {groups.length === 0 && <Empty>Belum ada jadwal.</Empty>}
      {groups.map(([tgl, rows]) => (
        <Card key={tgl} title={`${labelTanggal(tgl)} · ${tgl}`}>
          <ul className="list">
            {rows.map((p) => (
              <li key={p.key} className="list-row">
                <span className="time">{p.jam || '—'}</span>
                <PlatformTag p={p.platform} />
                <div className="grow">
                  <div className="row-title">{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.judul}</a> : p.judul}</div>
                  <div className="muted small">{p.format}</div>
                </div>
                <Badge kind={statusKind(p.status)}>{p.status || '—'}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <Card title="Slot & target harian">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Platform</th><th>Target/hari</th><th>Jam slot (WIB)</th></tr></thead>
            <tbody>
              {PLATFORM_KEYS.map((k) => (
                <tr key={k}><td>{PLATFORMS[k].label}</td><td>{PLATFORMS[k].target}x</td><td>{PLATFORMS[k].slots.join(' · ')}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Coming stage="Tahap 2" items={['Ubah target & jam slot dari sini', 'Aktif/hentikan jadwal per agent', 'Alasan gagal + tombol posting ulang', 'Kunci anti-dobel per platform per slot']} />
      </Card>
    </>
  );
}

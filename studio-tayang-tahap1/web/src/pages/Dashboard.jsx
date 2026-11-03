import { AGENTS, PIPELINE } from '../config/agents.js';
import { PLATFORMS } from '../config/platforms.js';
import { ringkasan, targetHariIni, statusTahap } from '../lib/selectors.js';
import { labelTanggal, sejak } from '../lib/time.js';
import { Badge, Card, PageHeader, PlatformTag, Stat } from '../components/ui.jsx';

export default function Dashboard({ data }) {
  const r = ringkasan(data);
  const target = targetHariIni(data);
  const aktif = AGENTS.filter((a) => a.aktif).length;
  const kurang = target.filter((t) => t.kosong > 0);

  return (
    <>
      <PageHeader title="Dashboard" desc="Ringkasan kerja semua AI agent hari ini." />

      {data.catatan && (
        <div className={`alert ${kurang.length ? 'alert-warn' : ''}`}>
          <strong>Catatan terakhir:</strong> {data.catatan}
        </div>
      )}

      <div className="stats">
        <Stat label="Agent aktif" value={`${aktif}/${AGENTS.length}`} hint="agent konten" />
        <Stat label="Posting tayang" value={r.tayang} hint="total tercatat" tone="ok" />
        <Stat label="Dalam antrean" value={r.antrean} hint="per platform" />
        <Stat label="Posting gagal" value={r.gagal} hint="perlu dicek" tone={r.gagal ? 'bad' : undefined} />
        <Stat
          label="Posting berikutnya"
          value={r.berikut ? r.berikut.jam : '—'}
          hint={r.berikut ? `${labelTanggal(r.berikut.tanggal)} · ${PLATFORMS[r.berikut.platform].label}` : 'belum ada jadwal'}
        />
      </div>

      <div className="grid-2">
        <Card title="Target posting hari ini" action={<a href="#/jadwal" className="link">Lihat jadwal</a>}>
          <div className="targets">
            {target.map((t) => (
              <div key={t.key} className="target">
                <div className="target-row">
                  <PlatformTag p={t.key} />
                  <span className="target-name">{t.label}</span>
                  <span className="target-num">{t.tayang + t.terjadwal}/{t.target}</span>
                </div>
                <div className="bar"><span style={{ width: `${t.persen}%` }} className={t.persen < 100 ? 'warn' : ''} /></div>
                <div className="target-meta muted">
                  {t.tayang} tayang · {t.terjadwal} terjadwal{t.gagal ? ` · ${t.gagal} gagal` : ''}{t.kosong ? ` · ${t.kosong} slot kosong` : ''}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Status tahap kerja">
          <ul className="list">
            {PIPELINE.map((p) => {
              const s = data.tim[p.key];
              const kind = s ? statusTahap(s.catatan) : 'muted';
              return (
                <li key={p.key} className="list-row">
                  <span className={`dot dot-${kind}`} />
                  <div className="grow">
                    <div className="row-title">{p.nama}</div>
                    <div className="muted small">{s?.catatan || 'Belum ada catatan'}</div>
                  </div>
                  <span className="muted small nowrap">{s ? sejak(s.waktu) : ''}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card title="Agent konten" action={<a href="#/agents" className="link">Kelola</a>}>
        <ul className="list">
          {AGENTS.map((a) => (
            <li key={a.id} className="list-row">
              <span className={`dot dot-${a.aktif ? 'ok' : 'muted'}`} />
              <div className="grow">
                <div className="row-title">{a.nama}</div>
                <div className="muted small">{a.bidang}</div>
              </div>
              <span className="tags">{a.platform.map((p) => <PlatformTag key={p} p={p} />)}</span>
              <Badge kind={a.aktif ? 'ok' : 'muted'}>{a.aktif ? 'Aktif' : 'Berhenti'}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

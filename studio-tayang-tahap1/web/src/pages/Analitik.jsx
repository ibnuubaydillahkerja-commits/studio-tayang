import { useMemo } from 'react';
import { PLATFORMS, PLATFORM_KEYS } from '../config/platforms.js';
import { fmtNum, labelTanggal } from '../lib/time.js';
import { Card, PageHeader, PlatformTag, Stat } from '../components/ui.jsx';

const avg = (xs) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

export default function Analitik({ data }) {
  const ada = data.performa.filter((p) => p.views != null);

  const perPlatform = PLATFORM_KEYS.map((k) => {
    const xs = ada.filter((p) => p.platform === k);
    return { k, n: xs.length, views: xs.reduce((a, p) => a + p.views, 0), likes: xs.reduce((a, p) => a + (p.likes || 0), 0) };
  });

  const perFormat = useMemo(() => {
    const m = {};
    ada.forEach((p) => { (m[p.format] ||= []).push(p.views); });
    return Object.entries(m).map(([f, v]) => ({ f, n: v.length, avg: avg(v) })).sort((a, b) => b.avg - a.avg);
  }, [ada]);
  const maxAvg = Math.max(1, ...perFormat.map((x) => x.avg));

  const top = [...ada].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <>
      <PageHeader title="Analitik" desc={`Data dari ${ada.length} konten yang sudah punya angka views.`} />

      <div className="stats">
        {perPlatform.map((p) => (
          <Stat key={p.k} label={PLATFORMS[p.k].label} value={fmtNum(p.views)} hint={`${p.n} konten · ${fmtNum(p.likes)} like`} />
        ))}
      </div>

      <div className="grid-2">
        <Card title="Rata-rata views per format">
          <ul className="list">
            {perFormat.map((x) => (
              <li key={x.f} className="list-row col">
                <div className="spread"><span className="row-title">{x.f}</span><span className="muted small">{fmtNum(x.avg)} · {x.n} video</span></div>
                <div className="bar"><span style={{ width: `${(x.avg / maxAvg) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Konten terbaik">
          <ol className="list">
            {top.map((p) => (
              <li key={p.id} className="list-row">
                <PlatformTag p={p.platform} />
                <div className="grow">
                  <div className="row-title">{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.judul}</a> : p.judul}</div>
                  <div className="muted small">{labelTanggal(p.tanggal)} · {p.format}</div>
                </div>
                <strong className="nowrap">{fmtNum(p.views)}</strong>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card title="Semua konten">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Tanggal</th><th>Platform</th><th>Judul</th><th>Format</th><th className="num">Views</th><th className="num">Like</th></tr></thead>
            <tbody>
              {[...data.performa].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((p) => (
                <tr key={p.id}>
                  <td className="nowrap">{p.tanggal}</td>
                  <td><PlatformTag p={p.platform} /></td>
                  <td>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.judul}</a> : p.judul}</td>
                  <td>{p.format}</td>
                  <td className="num">{fmtNum(p.views)}</td>
                  <td className="num">{fmtNum(p.likes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">Komentar, share, dan followers menyusul di tahap 2 (lewat Metricool API).</p>
      </Card>
    </>
  );
}

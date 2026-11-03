import { Badge, Card, Coming, Empty, PageHeader, PlatformTag } from '../components/ui.jsx';
import { labelTanggal } from '../lib/time.js';

export default function Konten({ data }) {
  const antre = [...data.ide].sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  return (
    <>
      <PageHeader title="Review Konten" desc="Ide & naskah yang sedang disiapkan agent." />
      <Card title="Antrean ide & naskah">
        {antre.length === 0 ? <Empty>Belum ada ide.</Empty> : (
          <ul className="list">
            {antre.map((x) => (
              <li key={x.id} className="list-row">
                <span className="time">{labelTanggal(x.tanggal)}</span>
                <span className="tags">{x.platforms.map((p) => <PlatformTag key={p} p={p} />)}</span>
                <div className="grow">
                  <div className="row-title">{x.judul}</div>
                  <div className="muted small">{x.format}</div>
                </div>
                <Badge kind={x.status === 'ide' ? 'muted' : 'wait'}>{x.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="Penilaian">
        <Coming stage="Tahap 2" items={['Baca naskah lengkap sebelum tayang', 'Nilai: BAGUS / PERLU DIPERBAIKI / TIDAK BAGUS + komentar', 'Revisi otomatis + perbandingan naskah lama vs baru', 'Konten wajib-setuju tidak tayang sebelum disetujui']} />
      </Card>
    </>
  );
}

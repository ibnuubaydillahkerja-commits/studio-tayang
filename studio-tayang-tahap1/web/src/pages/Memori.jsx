import { AGENTS } from '../config/agents.js';
import { Card, Coming, PageHeader } from '../components/ui.jsx';

export default function Memori() {
  return (
    <>
      <PageHeader title="Feedback Memory" desc="Catatan penilaian & preferensi lo, dipisah per agent." />
      <div className="grid-2">
        {AGENTS.map((a) => (
          <Card key={a.id} title={a.nama}>
            <p className="muted small">Belum ada catatan tersimpan untuk agent ini.</p>
          </Card>
        ))}
      </div>
      <Card title="Cara kerjanya nanti">
        <Coming stage="Tahap 3" items={['Tiap komentar & nilai disimpan per agent + kategori (hook, panjang, gaya, topik, fakta)', 'Agent membaca memorinya sebelum nulis naskah', 'Lihat, edit, hapus catatan', 'Riwayat perubahan & evaluasi']} />
      </Card>
    </>
  );
}

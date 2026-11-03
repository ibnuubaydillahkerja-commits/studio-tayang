import { useState } from 'react';
import { GITHUB_REPO } from '../config/app.js';
import { AGENTS } from '../config/agents.js';
import { Card, Coming, Empty, PageHeader } from '../components/ui.jsx';

const CONTOH = [
  'Periksa kenapa TikTok belum posting 4 kali sehari',
  'Buat 5 ide konten teknologi baru',
  'Revisi naskah terakhir, pembukaan lebih kuat',
  'Buat laporan aktivitas hari ini',
];

// Sementara: perintah dikirim sebagai GitHub Issue (mekanisme lama yang sudah jalan).
// Tahap 2: diganti chat langsung ke backend (Supabase Edge Function + model AI).
export default function Chat({ data }) {
  const [teks, setTeks] = useState('');
  const [agent, setAgent] = useState('semua');
  const [terkirim, setTerkirim] = useState(false);

  const kirim = (e) => {
    e.preventDefault();
    const t = teks.trim();
    if (!t) return;
    const label = agent === 'semua' ? 'Semua agent' : AGENTS.find((a) => a.id === agent).nama;
    const url = `https://github.com/${GITHUB_REPO}/issues/new?labels=perintah`
      + `&title=${encodeURIComponent(`Perintah: ${t.slice(0, 60)}`)}`
      + `&body=${encodeURIComponent(`Agent: ${label}\n\n${t}`)}`;
    window.open(url, '_blank', 'noopener');
    setTerkirim(true);
  };

  const selesai = data.perintahSelesai.slice(0, 10);

  return (
    <>
      <PageHeader title="Chat Perintah" desc="Kasih perintah ke agent. Dikerjakan tim AI tiap jam." />
      <Card>
        <form onSubmit={kirim} className="form">
          <label className="field">
            <span>Untuk agent</span>
            <select value={agent} onChange={(e) => setAgent(e.target.value)}>
              <option value="semua">Semua agent</option>
              {AGENTS.map((a) => <option key={a.id} value={a.id}>{a.nama}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Perintah</span>
            <textarea rows={4} value={teks} onChange={(e) => { setTeks(e.target.value); setTerkirim(false); }} placeholder="Contoh: periksa semua agent" />
          </label>
          <div className="chips">
            {CONTOH.map((c) => <button type="button" key={c} className="chip" onClick={() => setTeks(c)}>{c}</button>)}
          </div>
          <div className="form-foot">
            <button type="submit" className="btn" disabled={!teks.trim()}>Kirim perintah</button>
            <span className="muted small">{terkirim ? 'GitHub kebuka. Tekan "Submit new issue".' : 'Kebuka di GitHub sebagai issue.'}</span>
          </div>
        </form>
      </Card>
      <Card title="Perintah yang sudah dikerjakan">
        {selesai.length === 0 ? <Empty>Belum ada.</Empty> : (
          <ul className="list">
            {selesai.map((p, i) => (
              <li key={i} className="list-row"><div className="grow"><div className="row-title">{p.perintah}</div><div className="muted small">{p.hasil}</div></div></li>
            ))}
          </ul>
        )}
        <Coming stage="Tahap 2" items={['Chat langsung dengan AI di halaman ini', 'AI jelaskan rencana dulu, perubahan penting butuh persetujuan', 'Riwayat chat per agent']} />
      </Card>
    </>
  );
}

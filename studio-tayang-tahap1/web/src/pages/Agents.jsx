import { AGENTS, PIPELINE } from '../config/agents.js';
import { PLATFORMS } from '../config/platforms.js';
import { Badge, Card, Coming, PageHeader, PlatformTag } from '../components/ui.jsx';

export default function Agents() {
  return (
    <>
      <PageHeader title="Agent" desc="Tiap agent punya bidang, gaya, dan platform sendiri." />
      <div className="grid-2">
        {AGENTS.map((a) => (
          <Card key={a.id} title={a.nama} action={<Badge kind={a.aktif ? 'ok' : 'muted'}>{a.aktif ? 'Aktif' : 'Berhenti'}</Badge>}>
            <dl className="kv">
              <dt>Bidang</dt><dd>{a.bidang}</dd>
              <dt>Audiens</dt><dd>{a.audiens}</dd>
              <dt>Gaya bahasa</dt><dd>{a.gaya}</dd>
              <dt>Platform</dt><dd className="tags">{a.platform.map((p) => <PlatformTag key={p} p={p} />)}</dd>
              <dt>Target</dt><dd>{a.target}x/hari · slot {PLATFORMS[a.platform[0]].slots.join(', ')}</dd>
            </dl>
          </Card>
        ))}
      </div>
      <Card title="Alur kerja tiap agent">
        <ol className="steps">{PIPELINE.map((p) => <li key={p.key}>{p.nama}</li>)}</ol>
        <Coming stage="Tahap 2" items={['Tambah agent baru (bidang, audiens, gaya, platform, target, jadwal, instruksi khusus)', 'Edit & hentikan sementara agent', 'Konteks & memori terpisah per agent']} />
      </Card>
    </>
  );
}

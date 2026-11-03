// Agent konten yang SUDAH ada di sistem lama (belum bisa diubah dari web).
// Tahap 2: dipindah ke tabel `agents` di Supabase + form tambah/edit agent.
export const AGENTS = [
  {
    id: 'fakta-unik',
    nama: 'Fakta Unik',
    bidang: 'Pengetahuan umum (hewan, alam, luar angkasa)',
    audiens: 'Umum, ramah anak',
    gaya: 'Santai, hook kaget, kalimat pendek',
    platform: ['youtube'],
    target: 4,
    aktif: true,
  },
  {
    id: 'portofolio-it',
    nama: 'Portofolio IT',
    bidang: 'Teknologi & web development',
    audiens: 'Calon klien, rekruter, pemula coding',
    gaya: 'Santai (gua/lo), praktis, kode singkat',
    platform: ['tiktok', 'instagram', 'facebook'],
    target: 4,
    aktif: true,
  },
];

// Tahap kerja (pipeline) yang dipakai semua agent. Kunci = field `tim` di data.json.
export const PIPELINE = [
  { key: 'riset', nama: 'Riset' },
  { key: 'penulis', nama: 'Penulis naskah' },
  { key: 'penilaiNaskah', nama: 'Penilai naskah' },
  { key: 'render', nama: 'Render (laptop)' },
  { key: 'penilaiVideo', nama: 'Penilai video' },
  { key: 'posting', nama: 'Posting' },
  { key: 'laporan', nama: 'Laporan' },
];

// Satu-satunya pintu masuk data. Sekarang baca data.json (sistem lama).
// Tahap 2 cukup ganti isi fungsi ini ke Supabase; halaman tidak perlu diubah.
import { PLATFORM_KEYS } from '../config/platforms.js';

const DATA_URL = import.meta.env.VITE_DATA_URL || '../data.json';

const ALIAS = { yt: 'youtube', youtube: 'youtube', tiktok: 'tiktok', tt: 'tiktok', ig: 'instagram', instagram: 'instagram', fb: 'facebook', facebook: 'facebook' };

// "TikTok/IG/FB" | ["tiktok","instagram"] | "youtube"  ->  ['tiktok','instagram','facebook']
export function toPlatforms(v) {
  const list = Array.isArray(v) ? v : String(v || '').split(/[\/,+ ]+/);
  return [...new Set(list.map((x) => ALIAS[String(x).trim().toLowerCase()]).filter(Boolean))];
}

function normalize(raw) {
  const jadwal = (raw.jadwal || []).map((j, i) => ({
    id: `j${i}`,
    tanggal: j.tanggal,
    jam: j.jam || '',
    platforms: toPlatforms(j.platform),
    judul: j.judul || '(tanpa judul)',
    format: j.format || '',
    status: (j.status || '').toLowerCase(),
    link: j.link || '',
  }));
  const ide = (raw.ide || []).map((x, i) => ({
    id: `i${i}`, tanggal: x.tanggal, platforms: toPlatforms(x.platform),
    judul: x.judul, format: x.format || '', status: (x.status || '').toLowerCase(),
  }));
  const performa = (raw.performa || [])
    .map((p, i) => ({
      id: `p${i}`, tanggal: p.tanggal, jam: p.jam || '', platform: toPlatforms(p.platform)[0],
      judul: p.judul, format: p.format || 'lainnya', views: p.views ?? null, likes: p.likes ?? null, link: p.link || '',
    }))
    .filter((p) => PLATFORM_KEYS.includes(p.platform));
  const tim = raw.tim || {};
  return {
    diperbarui: raw.diperbarui || null,
    catatan: raw.catatan || '',
    jadwal, ide, performa, tim,
    perintahSelesai: raw.perintah_selesai || [],
  };
}

export async function fetchData() {
  const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Gagal ambil data (${res.status})`);
  return normalize(await res.json());
}

// Hitungan untuk dashboard. Murni fungsi -> gampang dites & dipindah ke backend.
import { PLATFORMS, PLATFORM_KEYS } from '../config/platforms.js';
import { nowWib, toDate } from './time.js';

const SUKSES = ['tayang', 'published', 'terbit'];
const GAGAL = ['gagal', 'error', 'ditolak'];
const ANTRE = ['terjadwal', 'video siap', 'naskah siap', 'pending'];

export const statusKind = (s) =>
  SUKSES.includes(s) ? 'ok' : GAGAL.includes(s) ? 'bad' : ANTRE.includes(s) ? 'wait' : 'muted';

// Satu baris jadwal bisa untuk 3 platform -> pecah per platform.
export function postsPerPlatform(jadwal) {
  return jadwal.flatMap((j) => j.platforms.map((p) => ({ ...j, platform: p, key: `${j.id}-${p}` })));
}

// Postingan yang sudah tayang = ada di performa (punya link dari platform).
function publishedOn(performa, tanggal, platform) {
  return performa.filter((p) => p.tanggal === tanggal && p.platform === platform && p.link);
}

export function targetHariIni(data) {
  const { date } = nowWib();
  const posts = postsPerPlatform(data.jadwal).filter((p) => p.tanggal === date);
  return PLATFORM_KEYS.map((k) => {
    const sudah = publishedOn(data.performa, date, k);
    const linkTayang = new Set(sudah.map((p) => p.link));
    // Jadwal yang link-nya sudah ada di performa = sudah tayang, jangan dihitung dua kali.
    const mine = posts.filter((p) => p.platform === k && !(p.link && linkTayang.has(p.link)));
    const tayang = sudah.length;
    const terjadwal = mine.filter((p) => p.status === 'terjadwal').length;
    const gagal = mine.filter((p) => statusKind(p.status) === 'bad').length;
    const target = PLATFORMS[k].target;
    const isi = Math.min(target, tayang + terjadwal);
    return { key: k, ...PLATFORMS[k], tayang, terjadwal, gagal, kosong: target - isi, persen: Math.round((isi / target) * 100) };
  });
}

export function ringkasan(data) {
  const posts = postsPerPlatform(data.jadwal);
  const now = new Date();
  const berikut = posts
    // Hanya yang benar-benar sudah dijadwalkan di Metricool, bukan sekadar "video siap".
    .filter((p) => p.jam && p.status === 'terjadwal' && toDate(p.tanggal, p.jam) > now)
    .sort((a, b) => toDate(a.tanggal, a.jam) - toDate(b.tanggal, b.jam));
  return {
    tayang: data.performa.filter((p) => p.link).length,
    gagal: posts.filter((p) => statusKind(p.status) === 'bad').length,
    antrean: posts.filter((p) => statusKind(p.status) === 'wait').length,
    ide: data.ide.length,
    berikut: berikut[0] || null,
  };
}

// Status tiap tahap kerja: dianggap "macet" kalau catatannya berisi kata gagal/crash/macet.
export function statusTahap(catatan = '') {
  return /crash|gagal|macet|error|tidak layak|ditolak/i.test(catatan) ? 'bad' : 'ok';
}

const TZ = 'Asia/Jakarta';

// Tanggal & jam sekarang di WIB: { date: 'YYYY-MM-DD', time: 'HH:MM' }
export function nowWib(d = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(d).map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}

export function toDate(tanggal, jam = '00:00') {
  return new Date(`${tanggal}T${jam}:00+07:00`);
}

export function addDays(tanggal, n) {
  const d = new Date(`${tanggal}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function labelTanggal(tanggal) {
  const today = nowWib().date;
  if (tanggal === today) return 'Hari ini';
  if (tanggal === addDays(today, 1)) return 'Besok';
  if (tanggal === addDays(today, -1)) return 'Kemarin';
  return new Date(`${tanggal}T12:00:00Z`).toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  });
}

export function sejak(iso) {
  if (!iso) return '-';
  const m = Math.round((Date.now() - new Date(iso)) / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.round(h / 24)} hari lalu`;
}

export const fmtNum = (n) => (n == null ? '–' : new Intl.NumberFormat('id-ID').format(n));

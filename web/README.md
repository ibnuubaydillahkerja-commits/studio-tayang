# AI Agent TT YT IG FB — website pusat kendali

React + Vite. Tahap 1: baca `../data.json` (data sistem lama), belum ada backend.

## Jalankan di laptop
```bash
cd web
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil di web/dist
```

## Online
Otomatis lewat GitHub Actions (`.github/workflows/pages.yml`) ke
`https://ibnuubaydillahkerja-commits.github.io/studio-tayang/app/`.
Syarat sekali saja: Settings → Pages → Source: **GitHub Actions**.

## Struktur
```
src/
  config/      platforms.js (target & slot), agents.js (agent + alur kerja), app.js
  lib/         dataSource.js (SATU-SATUNYA tempat ambil data; tahap 2 diganti Supabase)
               selectors.js (hitungan dashboard), time.js (WIB), router.js (hash), useData.js
  components/  Layout.jsx (sidebar + menu HP), ui.jsx (Card, Stat, Badge, dst.)
  pages/       Dashboard, Agents, Konten, Jadwal, Memori, Analitik, Chat
```

# Cara online-in Studio Tayang (gratis, pakai GitHub Pages)

Isi folder ini:
- index.html  -> tampilan website
- data.json   -> isi data (jadwal, views, ide). Ini yang nanti diperbarui otomatis oleh tim AI.

## 1. Bikin akun & repo GitHub (sekali aja)
1. Daftar di https://github.com (gratis).
2. Klik tombol "+" kanan atas -> "New repository".
3. Nama repo: studio-tayang  ->  pilih Public  ->  "Create repository".
4. Klik "uploading an existing file", seret index.html dan data.json, lalu "Commit changes".

## 2. Nyalain website-nya
1. Di repo itu buka Settings -> Pages.
2. Source: "Deploy from a branch", Branch: main, folder: / (root) -> Save.
3. Tunggu 1-2 menit. Alamat web lo: https://USERNAME.github.io/studio-tayang/
   Buka di HP, lalu "Add to Home screen" biar kayak aplikasi.

## 3. Biar perintah & data jalan otomatis
1. Buka index.html (bisa langsung edit di GitHub, ikon pensil), cari baris:
     const GITHUB_REPO = "";
   ganti jadi:
     const GITHUB_REPO = "USERNAME/studio-tayang";
2. Di claude.ai: Settings -> Connectors -> sambungkan GitHub, kasih akses ke repo studio-tayang.
3. Kabarin Claude nama repo-nya. Setelah itu tim AI:
   - memperbarui data.json tiap pagi (habis jadwalin video) dan tiap malam (views terbaru),
   - membaca perintah yang lo kirim dari tombol "Kirim perintah" lalu mengerjakannya.

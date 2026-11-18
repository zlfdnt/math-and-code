# Panduan Instalasi — Math & Code Hub

## A. Backend (Google Apps Script)
1. Buka https://script.google.com → **Proyek baru**. Ganti nama `Code.gs` menjadi `Kode`, lalu tempel seluruh isi **Kode.gs**.
2. ⚙️ **Setelan Proyek** → centang *Show "appsscript.json"* → tempel isi **appsscript.json**.
3. Pilih fungsi **setupAppEnvironment** → ▶ Run (**cukup sekali**; aman diulang, tidak menimpa rahasia). Izinkan akses Drive & Sheets.
4. Buka **Execution log**: **catat KATA SANDI ADMIN** (hanya tampil sekali). Jika hilang, jalankan `resetSandiAdmin`.
5. **Deploy → New deployment → Web app** → Execute as: **Me**, Who has access: **Anyone** → Deploy → salin URL `/exec`.
6. Setiap ada perubahan kode: **Deploy → Manage deployments → ✏️ → New version** (jangan New deployment).

Rahasia (SESSION_SECRET, hash sandi admin, ID Spreadsheet/Folder) otomatis tersimpan di **Script Properties**, tidak di kode, Sheets, atau frontend. Jangan menambah editor proyek sembarangan.

## B. Frontend (GitHub Pages)
Folder kerja = hasil ekstrak ZIP (**folder yang langsung berisi `index.html`**). Di sinilah `git init` dijalankan.
1. Edit `js/config.js`: ganti `GANTI_DENGAN_ID_DEPLOYMENT` dengan URL `/exec` Anda.
2. Buat repository **Public** baru di github.com (jangan centang README).
3. Buka PowerShell/Terminal **di dalam folder tersebut**, cek `dir`/`ls` → `index.html` harus terlihat. Lalu:
```
git init
git add .
git commit -m "Math & Code Hub"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```
4. Password saat push = **Personal Access Token** (scope *repo*); karakter tidak tampil saat diketik, itu normal.
5. Repo → Settings → Pages → Deploy from branch → `main` / root. Tunggu 1–2 menit, buka `https://USERNAME.github.io/NAMA-REPO/`.
6. Update berikutnya: `git add .` → `git commit -m "update"` → `git push`, lalu Ctrl+Shift+R.
> Jangan upload lewat tombol "Upload files" di web GitHub — struktur folder css/ js/ img/ akan rusak.

## C. Pemakaian
- Siswa: pilih kelas/mapel → kartu → **Cara Login** (kartu berbalik) → **Buka Media**. Nama & kelas diminta sekali, tercatat di log.
- Guru: buka `…/#admin` atau tombol **Login Guru** → kelola media (tambah/edit, banyak gambar dipisah koma, status Terbuka/Arsip/Nonaktif), log (unduh CSV), statistik, pindah semester (ketik `GANTI`).
- Gambar kartu tambahan: taruh di folder `img/` lalu tulis `img/foto1.jpg,img/foto2.jpg`, atau pakai URL Drive/web.

## D. Performa & kuota
Daftar media di-cache 10 menit (otomatis dibuang saat admin mengubah). Log dikumpulkan di cache dan ditulis per 10 entri atau tiap 5 menit lewat trigger (`flushLog`).

## E. Fitur v1.1
Dashboard, Kelola Media (filter, aksi massal, halaman edit dengan live preview), Log Aktivitas (unduh Excel, cetak PDF), Statistik (grafik tren & donat), Data Siswa (impor Excel/CSV 3 langkah), Semester & Ajaran (wizard reset 5 langkah), Pengaturan Portal.
**Penting:** setelah mengganti Kode.gs, buat **New version** pada Manage deployments. Wizard reset: jalankan Langkah 1 (cadangan) lebih dulu, uji dulu di salinan Spreadsheet.
**Mode contoh:** selama `GAS_URL` belum diisi, panel admin tampil dengan data contoh (tidak menyimpan apa pun).

## F. Pembaruan v1.2
- **Unggah gambar thumbnail langsung** di halaman Edit Media (tombol "Unggah Gambar", bisa banyak file; otomatis dikecilkan lalu disimpan di folder Drive "📂 Gambar"). Setelah mengganti Kode.gs: **Deploy → Manage deployments → New version**, lalu izinkan ulang akses jika diminta. Bila akun Google Workspace sekolah memblokir berbagi publik, gambar tidak tampil di siswa; gunakan URL gambar dari tempat lain.
- **Credit** Zulfa Dianti, S.Pd., M.Pd., Gr. di bagian paling bawah portal siswa.
- **Tampilan portal siswa** diperbarui; **kursor** diganti "+" kecil dengan efek partikel (nonaktif otomatis di layar sentuh dan bila pengguna memilih *reduce motion*).

## G. Pembaruan v1.3
- **Portal siswa dirapikan:** kartu jenjang kelas, pita topik, bilah pencarian + filter (dengan jumlah media), kartu media, bagian "Kenapa", dan panduan 3 langkah kini sejajar dalam satu lebar kolom. Kartu media memuat label di atas gambar, tombol "Buka Media" penuh, serta "Cara Login" berupa langkah bernomor di sisi balik kartu.
- **Credit minimalis:** foto/inisial **ZD** di bagian paling bawah bisa diklik dan membuka popup profil singkat.
- **Edit profil:** menu **Profil Guru** di panel admin (foto unggah langsung, nama, jabatan, profil singkat maks. 400 karakter, keahlian, WhatsApp, email, tautan) dengan pratinjau langsung. Kolom kosong memakai teks bawaan. Setelah mengganti Kode.gs, buat **New version** pada Manage deployments.
- Isi profil (termasuk WhatsApp/email bila diisi) bersifat **publik**, sehingga tampil ke semua pengunjung portal.

## H. Pembaruan v1.4 — Ikon website
Ikon Σ bergradasi indigo (senada logo header) dengan percikan "+" kuning. Berkas: `favicon.svg`, `favicon.ico`, `icon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest` (semuanya di root, sejajar `index.html`). Ikon ini juga dipakai saat portal ditambahkan ke layar utama HP. Setelah push ke GitHub, tab lama mungkin masih menampilkan ikon lama: tutup tab atau tekan Ctrl+Shift+R.

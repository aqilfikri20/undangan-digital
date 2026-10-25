# UndangYuk

UndangYuk adalah aplikasi web untuk membuat undangan pernikahan digital. Pengguna dapat mendaftar, mengisi informasi acara dan keluarga, memilih tema undangan, lalu membagikan tautan undangan kepada tamu. Tamu dapat mengirim RSVP dan ucapan melalui halaman undangan.

## Fitur

- Halaman utama yang menjelaskan layanan dan tema undangan.
- Pendaftaran dan masuk menggunakan akun yang tersimpan di MySQL.
- Dashboard untuk mengubah informasi mempelai, keluarga, akad, resepsi, cerita, dress code, galeri, video, hadiah, dan tema.
- Dua tema undangan: **Batik Biru** dan **Hutan Hijau**.
- Halaman undangan publik berdasarkan tautan/nama mempelai.
- Form RSVP dan pesan tamu yang disimpan di database.
- Data contoh undangan dan RSVP untuk melihat alur website.

## Teknologi

- Next.js 15 dengan React 19 dan TypeScript.
- MySQL, diakses melalui `mysql2`.
- CSS terpisah untuk halaman utama, autentikasi, dashboard, navbar, dan masing-masing tema undangan.
- Autentikasi memakai kata sandi yang di-hash dan cookie sesi HTTP-only.

## Menjalankan di komputer lokal

Persyaratan: Node.js 20.6 atau lebih baru, npm, dan server MySQL yang aktif.

1. Pasang dependensi:

   ```bash
   npm install
   ```

2. Buat file konfigurasi lokal dari contoh. Di PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   Ubah `.env` sesuai alamat dan akun MySQL Anda. Contoh format:

   ```dotenv
   DATABASE_URL=mysql://db_user:password@127.0.0.1:3306/undangyuk
   DB_CONNECTION_LIMIT=10
   SESSION_SECRET=isi-dengan-string-acak-minimal-32-karakter
   SEED_ADMIN_NAME=Admin UndangYuk
   SEED_ADMIN_EMAIL=admin@undangyuk.local
   SEED_ADMIN_PASSWORD=ganti-dengan-kata-sandi-kuat
   ```

   `SESSION_SECRET` digunakan untuk menandatangani cookie sesi. Jangan bagikan `.env` atau masukkan file tersebut ke Git.

3. Buat database, tabel, akun admin, serta data contoh:

   ```bash
   npm run db:seed
   ```

   Perintah ini membuat database sesuai nama di `DATABASE_URL`, lalu menyiapkan tabel pengguna, undangan, dan pesan tamu. Akun admin dibuat dari `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, dan `SEED_ADMIN_PASSWORD` di `.env`.

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000).

## Perintah proyek

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Next.js. |
| `npm run build` | Membuat build untuk produksi. |
| `npm start` | Menjalankan build produksi. |
| `npm run lint` | Memeriksa tipe TypeScript (`tsc --noEmit`). |
| `npm run db:seed` | Membuat skema database dan mengisi admin serta data contoh. |

## Struktur data

- `users`: nama, email, hash kata sandi, dan peran pengguna (`admin` atau `user`).
- `invitations`: pemilik, slug, tema, status publikasi, dan seluruh data undangan dalam JSON. Maksimal delapan gambar galeri disimpan bersama data undangan.
- `guest_messages`: nama tamu, jawaban kehadiran, ucapan, dan waktu pengiriman; setiap pesan terhubung ke undangan.

Setiap akun memiliki satu data undangan. Pengguna mengubah isian di `/dashboard`, lalu menekan **Simpan data** agar perubahan tersimpan. Setelah memilih tema, undangan dapat dibuka melalui `/undangan/[slug]`.

## Endpoint aplikasi

- `POST /api/auth/register` — membuat akun dan ruang undangan baru.
- `POST /api/auth/login` — masuk dan membuat sesi.
- `GET /api/auth/me` — mengambil akun dari sesi aktif.
- `POST /api/auth/logout` — mengakhiri sesi.
- `GET /api/dashboard` dan `PUT /api/dashboard` — membaca dan menyimpan undangan milik akun aktif.
- `GET /api/invitation/[slug]` — mengambil undangan publik dan pesan tamu.
- `POST /api/invitation/[slug]` — menyimpan RSVP dan ucapan.

## Aset tema

Gambar latar tema ada di `public/background/`, termasuk `cover-batik.jpg`, `section-batik.jpg`, `background-section-batik.png`, `cover-hutan.jpg`, `section-hutan.jpg`, dan `background-section-hutan.png`. Gaya undangan masing-masing tema berada di `app/undangan/templates/`.

## Catatan keamanan

File `.env` dan file lokal `admin.txt` berisi informasi sensitif dan dikecualikan dari Git. Untuk server produksi, gunakan akun MySQL khusus dengan hak akses hanya ke database aplikasi, gunakan kata sandi admin yang kuat, serta sediakan `SESSION_SECRET` acak yang berbeda dari lingkungan pengembangan.

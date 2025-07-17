# Suitmedia Test Frontend

Aplikasi web React untuk menampilkan daftar ide dan detail ide dari API Suitmedia, lengkap dengan fitur pagination, sorting, dan tampilan responsif. Dibuat sebagai bagian dari technical test Suitmedia.

---
# Link Deployment : https://suitmedia-test-mrizabuccharelli.vercel.app/

## Fitur Utama

- **Detail Ide (DetailPage):**
  - Menampilkan detail lengkap ide yang dipilih.
  - Gambar utama, judul, tanggal, dan isi konten ide.
  - Penanganan error jika data tidak ditemukan.

- **Komponen Reusable:**
  - **Header:** Navigasi utama dengan logo Suitmedia.
  - **Banner:** Banner dinamis di halaman utama.
  - **PostCard:** Card responsif untuk setiap ide.

- **UX & Responsif:**
  - Desain modern, responsif di berbagai ukuran layar.
  - Loading state & error handling user-friendly.
  - Scroll-aware header (menghilang saat scroll ke bawah).

- **Proxy API & Gambar:**
  - Proxy untuk API dan gambar agar bebas CORS/CORB saat development lokal.

-----------------------
## Catatan Teknis

<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/49d2615e-90e7-4a0f-ab78-5d0fd8b2c3bb" />

> Beberapa gambar dari API tidak muncul karena server gambar (assets.suitdev.com) memblokir akses dari domain deploy (403 Forbidden).
> Jika gambar gagal di-load, otomatis akan tampil placeholder agar UI tetap rapi.
> Jika domain deploy sudah diizinkan oleh server gambar, gambar akan tampil.
-----------------------
## Struktur Project

```
suitmedia-test-frontend/
├── public/
│   ├── logo-suitmedia.png
│   ├── no-image.png   
├── src/
│   ├── components/
│   │   ├── Banner/
│   │   ├── Header/
│   │   └── PostCard/
│   ├── hooks/
│   ├── pages/
│   │   ├── HomePages.jsx
│   │   └── DetailPage.jsx
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── package.json
└── README.md
```

---

## Instalasi & Menjalankan

1. **Clone repo & install dependencies**
   ```bash
   git clone https://github.com/Mangriza/test-suitmedia.git
   cd suitmedia-test-frontend
   npm install
   ```

2. **Tambahkan gambar placeholder**
   - Download gambar dari https://placehold.co/400x300?text=No+Image
   - Simpan sebagai `public/no-image.png`

3. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```
   Akses di [http://localhost:5173](http://localhost:5173)

---

## Konfigurasi Proxy (Vite)

Sudah otomatis di-setup di `vite.config.js`:
- `/api` → `https://suitmedia-backend.suitdev.com`
- `/image-proxy` → `https://assets.suitdev.com`

Sehingga bebas CORS/CORB saat development.

---



## Stack & Tools

- React 19, React Router 7
- Vite
- Axios
- CSS Modules

---

## Author

- Suitmedia Technical Test


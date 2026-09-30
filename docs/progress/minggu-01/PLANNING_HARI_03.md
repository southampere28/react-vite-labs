# Perencanaan Belajar: Hari 3 (Rabu, 30 September 2026)

Rencana target, mental model, alur materi, dan latihan praktis penguasaan Side Effects & Data Fetching API (`useEffect`).

---

## 1. Identitas Sesi & Sasaran Utama

- **Tanggal Pelaksanaan**: Rabu, 30 September 2026
- **Topik Pembelajaran**: Side Effects, Siklus Hidup Render, Hook `useEffect`, Cleanup Function, & REST API Data Fetching
- **Tujuan Akhir**:
  - Menguasai mental model efek samping (*side effect*) dan waktu eksekusinya di React.
  - Memahami 3 variasi dependency array (`[]`, `[dep]`, tanpa deps).
  - Menghindari jebakan render loop tak terhingga (*infinite loop*).
  - Menguasai fungsi pembersih (*cleanup function*) untuk mencegah kebocoran memori (*memory leak*).
  - Mengambil data nyata dari REST API publik dengan 3 status UI esensial: *Loading*, *Error*, dan *Success*.

---

## 2. Struktur Materi & Mental Model Inti

- **Konsep 1: Apa itu Side Effect?**:
  - Komponen React idealnya berupa *pure function* (input props/state -> output JSX yang sama).
  - Operasi apa pun yang berinteraksi dengan "dunia luar" di luar proses render UI disebut *Side Effect* (mengubah judul browser `document.title`, timer/interval, listener DOM global, panggilan HTTP API).

- **Konsep 2: Anatomi `useEffect` & 3 Aturan Dependency Array**:
  - `useEffect(() => { ... })` -> Tanpa deps: Dijalankan pada setiap render (bahaya infinite loop jika update state di dalam).
  - `useEffect(() => { ... }, [])` -> Deps array kosong: Dijalankan tepat satu kali setelah komponen pertama kali muncul di layar (*mount*).
  - `useEffect(() => { ... }, [filter])` -> Deps array berpenghuni: Dijalankan saat mount dan setiap kali nilai `filter` berubah.

- **Konsep 3: Cleanup Function**:
  - Fungsi pengembalian `return () => { ... }` yang dipanggil sebelum efek berikutnya berjalan atau saat komponen dihapus dari DOM (*unmount*).
  - Digunakan untuk: `clearInterval()`, `removeEventListener()`, dan `AbortController.abort()`.

- **Konsep 4: Pola Standar Industri Data Fetching**:
  - Menyiapkan 3 state: `data`, `loading` (boolean), dan `error` (string | null).
  - Menggunakan API publik: `https://jsonplaceholder.typicode.com/users`.

---

## 3. Rencana Latihan & Hands-On Challenge

- **Latihan 1 (Efek Sederhana)**:
  - Mengubah `document.title` secara dinamis sesuai jumlah total mahasiswa di state.
- **Latihan 2 (Timer & Cleanup)**:
  - Menampilkan jam digital *real-time* atau countdown timer dengan `setInterval` dan `clearInterval`.
- **Latihan 3 (Fetch REST API Publik)**:
  - Mengambil daftar peserta asli dari `https://jsonplaceholder.typicode.com/users` saat komponen di-mount.
- **Latihan 4 (UI State Handling)**:
  - Menampilkan pesan *"⏳ Sedang memuat data mahasiswa..."* saat fetching.
  - Menampilkan kotak alert merah jika API gagal diambil.
  - Menampilkan data hasil fetch di `<StudentCard />`.
- **Challenge Mandiri**:
  - Menambahkan input pencarian (*search bar*) yang otomatis memicu fetch/filter data berdasarkan dependency array `[search]`.

---

## 4. Kriteria Keberhasilan & Validasi

- Data berhasil ditarik dari API eksternal tanpa reload halaman.
- Tidak terjadi infinite loop di console browser.
- Strict Mode React 19/18 teratasi tanpa duplikasi listener / kebocoran memori.
- `npx tsc --noEmit` lolos dengan `0 errors`.
- `npm run lint` lolos dengan `0 errors`.

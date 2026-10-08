# Rencana Pembelajaran: Hari 10 (Rabu, 7 Oktober 2026)
## Topik: Optimasi Performa Render, Memoization Mendalam, DOM & Mutable Refs, serta React 18/19 Concurrent Hooks

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **React Core & Hooks Specialist**

---

### 1. Tujuan Pembelajaran

- Memahami mental model siklus render React: Mengapa dan kapan suatu komponen me-render ulang (*state update*, *props change*, *parent re-render*, dan *context update*).
- Mengidentifikasi masalah *unnecessary re-renders* dan mengukur dampaknya terhadap responsivitas aplikasi menggunakan render counter & browser metrics.
- Menguasai teknik memoization komponen menggunakan `React.memo`:
  - Prinsip *shallow comparison* pada props.
  - Kapan harus menggunakan `React.memo` dan kapan sebaiknya dihindari (*cost of memoization*).
- Menguasai memoization nilai kalkulasi berat menggunakan `useMemo`:
  - Menghindari komputasi berulang yang mahal (sorting, filtering ratusan/ribuan data inventaris, kalkulasi analitik keuangan).
  - Mengukur perbedaan performa waktu eksekusi dalam milidetik (ms) dengan dan tanpa `useMemo`.
- Menguasai memoization referensi fungsi menggunakan `useCallback`:
  - Memahami masalah kesetaraan referensi JavaScript (`() => {} !== () => {}`).
  - Menjaga stabilitas fungsi *callback* agar tidak merusak efektivitas `React.memo` pada komponen anak.
- Menguasai manipulasi DOM dan state persisten menggunakan `useRef`:
  - Mengakses node DOM browser asli (fokus input otomatis, scroll ke elemen tertentu).
  - Menyimpan nilai mutabel yang persisten antar-render tanpa memicu re-render ulang (ID interval/timer, pelacak hitungan render internal, penyimpanan nilai sebelumnya/previous state).
- Menguasai fitur Concurrent Rendering (React 18 & 19 Ready):
  - Membedakan *Urgent Updates* (interaksi langsung pengguna seperti ketikan keyboard) dengan *Transition Updates* (pembaruan UI berat).
  - Menggunakan `useTransition` dan `startTransition` dengan visual status `isPending`.
  - Menggunakan `useDeferredValue` untuk mencegah *UI stuttering/freezing* saat memproses input pencarian intensif.
- Membangun lab interaktif **Performance Studio** di rute `/performance` sebagai sarana pembuktian visual langsung.


---

### 2. Konsep Inti & Arsitektur

- **Mental Model Render React & Re-render Berantai**:
  - Saat komponen induk mengalami re-render, seluruh komponen anak di bawahnya secara default ikut di-render ulang meskipun props-nya tidak berubah.
  - Pada hierarki komponen yang dalam, hal ini menghabiskan CPU cycle dan menimbulkan stuttering.

- **Trio Optimasi Memoization: `React.memo`, `useMemo`, dan `useCallback`**:
  - `React.memo(Component)`: Menjaga komponen anak tidak me-render ulang jika props yang diterima identik secara referensial.
  - `useMemo(() => compute(a, b), [a, b])`: Mengunci hasil komputasi selama dependensinya tidak berubah.
  - `useCallback(fn, deps)`: Mengunci referensi fungsi di memori agar referensinya tetap sama pada setiap siklus render induk.
  - *Aturan Emas*: Hindari optimasi prematur; terapkan pada kalkulasi intensif atau props fungsi yang diteruskan ke komponen yang di-memoize.

- **Dua Wajah `useRef`**:
  - *Wajah 1 (DOM Access)*: Menghubungkan variabel React langsung ke elemen HTML peramban (seperti focus input, scroll, media controls).
  - *Wajah 2 (Persistent Mutable Container)*: Menyimpan nilai (`{ current: val }`) tanpa memicu re-render saat nilainya berubah (timer interval, render counter, tracker).

- **Concurrent Rendering: `useTransition` vs `useDeferredValue`**:
  - Memisahkan update berprioritas tinggi (input keyboard pengguna) dari update berat yang bisa ditunda (rendering list ribuan item).
  - Menghasilkan antarmuka yang tetap responsif dan lancar (60 FPS).

---

### 3. Rencana Berkas & Struktur Kode yang Akan Dibangun

- **Dokumentasi & Modul**:
  - `/home/pramudya/Development/course/react/docs/progress/minggu-02/PLANNING_HARI_10.md`: Dokumen perencanaan ini.
  - `/home/pramudya/Development/course/react/docs/progress/minggu-02/MODUL_TEORI_HARI_10.md`: Modul teori lengkap optimasi performa & concurrent hooks.
  - `/home/pramudya/Development/course/react/docs/progress/minggu-02/PROGRESS_HARI_10.md`: Catatan log pengerjaan, hasil verifikasi, dan checklist pencapaian.

- **Komponen Demonstrasi Lab Performa (`src/components/performance/`)**:
  - `RenderVisualizerBadge.tsx`: Badge visual pendeteksi dan penghitung re-render komponen secara real-time.
  - `MemoCallbackSection.tsx`: Lab perbandingan komponen dengan vs tanpa `React.memo` & `useCallback`.
  - `HeavyComputationSection.tsx`: Lab kalkulasi data berat dengan benchmark waktu eksekusi (ms) menggunakan `useMemo`.
  - `RefLifecycleSection.tsx`: Lab DOM auto-focus, scroll to element, dan stopwatch/timer interval presisi menggunakan `useRef`.
  - `ConcurrentTransitionSection.tsx`: Lab filter pencarian ribuan item data dengan komparasi blocking lag vs `useTransition` / `useDeferredValue`.

- **Halaman Studio & Integrasi Rute**:
  - `/home/pramudya/Development/course/react/react-ts/src/pages/PerformanceStudioPage.tsx`: Halaman lab performa terpadu.
  - `/home/pramudya/Development/course/react/react-ts/src/router/index.tsx`: Pendaftaran rute `/performance`.
  - `/home/pramudya/Development/course/react/react-ts/src/layouts/RootLayout.tsx`: Penambahan navigasi `⚡ Performance Lab (Hari 10)`.

---

### 4. Kriteria Keberhasilan & QA

- Halaman Performance Lab dapat diakses melalui rute `/performance` tanpa kendala.
- Render visualizer badge berhasil mendeteksi dan menampilkan angka render secara akurat saat state induk berubah.
- Komparasi waktu komputasi `useMemo` terbukti menghemat waktu kalkulasi pada dataset besar.
- Fitur auto-focus dan stopwatch `useRef` berjalan stabil tanpa menyebabkan infinite re-render loops atau memory leaks.
- Uji coba `useTransition` membuktikan antarmuka input tetap lancar diketik tanpa jeda lag saat memfilter ribuan data.
- Pemeriksaan kode:
  - TypeScript: `npx tsc --noEmit` lolos dengan 0 error.
  - Linter: `npm run lint` lolos dengan 0 warning/error.
  - Build produksi: `npm run build` berhasil dikompilasi dengan sukses.

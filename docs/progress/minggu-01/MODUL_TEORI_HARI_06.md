# Modul Teori: Hari 6 (Sabtu, 3 Oktober 2026)

Panduan konseptual mendalam arsitektur **Global State Management Modern dengan Zustand**, Mekanisme **Pub/Sub Subscriptions**, Optimasi Re-render via **Atomic Selectors**, dan Integrasi Persistensi Otomatis **Web Storage API (`localStorage`)**.

---

## 1. Masalah Fundamental: Kapan State Lokal Tidak Cukup Lagi?

Pada hari-hari sebelumnya, kita mengelola data menggunakan `useState`:
- Data form input berada di dalam `HomePage`.
- Data counter berada di dalam komponen counter.
- Data daftar mahasiswa diambil via `useEffect` lalu disimpan di `HomePage`.

Pola ini disebut **Local Component State**. Pola ini sangat baik untuk data yang hanya dibutuhkan oleh satu komponen dan anak langsungnya. Namun, seiring aplikasi membesar, kita menghadapi dua masalah klasik:

### 1.1. Fenomena *Prop Drilling*
Bayangkan skenario berikut:
```text
RootLayout (memiliki data currentUser)
 └── Navbar
      └── UserProfileDropdown
           └── AvatarBadge (butuh currentUser.avatarUrl)
```
Untuk memberikan `avatarUrl` ke `AvatarBadge`, kita terpaksa melewatkan (*drilling*) props melewati `Navbar` dan `UserProfileDropdown`. Padahal kedua komponen perantara tersebut **sama sekali tidak peduli dan tidak membutuhkan** data tersebut. Ini membuat kode menjadi rapuh, sulit di-refactor, dan penuh *boilerplate*.

### 1.2. Masalah *State Synchronization Across Siblings* (Antar Saudara Sekandung)
Jika Komponen A (misal: Header) ingin menampilkan jumlah total tugas yang belum selesai, sedangkan Komponen B (misal: TaskList) adalah tempat tugas ditambahkan atau dihapus, kedua komponen tersebut berada di rantai cabang berbeda.
- Jika menggunakan local state, kita terpaksa melakukan **Lifting State Up** ke parent tertinggi bersama.
- Akibatnya, parent tertinggi tersebut menjadi raksasa (*god component*) yang menampung seluruh logika aplikasi.

---

## 2. Paradigma Global State: Redux vs Context API vs Zustand

Dalam ekosistem React modern, ada 3 pendekatan utama untuk mengelola state global:

- **1. Redux / Redux Toolkit**:
  - *Karakter*: Sangat terstruktur, immutable via Immer, konsep Actions & Reducers yang kaku.
  - *Kelemahan*: Sangat banyak boilerplate (*overhead*), setup folder rumit, kurang efisien untuk proyek skala kecil-menengah yang butuh kecepatan gerak tinggi.

- **2. React Context API (Bawaan React)**:
  - *Karakter*: Menggunakan `<Context.Provider value={...}>` untuk membagikan state ke bawah.
  - *Kelemahan Fatal*: **Context API bukan state management engine, melainkan dependency injection mechanism**. Setiap kali nilai di dalam `value` provider berubah, **SELURUH** komponen yang memanggil `useContext()` tersebut akan me-render ulang (*re-render*), meskipun komponen tersebut hanya butuh 1 properti kecil yang tidak berubah.

- **3. Zustand (Standar Industri Modern)**:
  - *Ukuran*: Sangat ringan (< 1.5 kB).
  - *Tanpa Provider Wrapper*: Tidak perlu membungkus aplikasi dengan `<StoreProvider>`. Store hidup di luar pohon React sebagai objek terisolasi (*external store*).
  - *Fine-Grained Re-rendering*: Menggunakan pola *Observer / Pub-Sub*. Komponen hanya subscribe ke properti spesifik yang dibutuhkan via selector.
  - *Hooks-Friendly*: Store Zustand itu sendiri adalah Custom Hook (`useTaskStore`).


---

## 3. Anatomi Dasar & Mekanisme Kerja Zustand

### 3.1. Membuat Store dengan `create()`
Zustand menyediakan fungsi `create()` yang menerima callback dengan parameter `set` dan `get`:

```typescript
import { create } from 'zustand'

interface TaskState {
  tasks: Task[]
  filter: 'all' | 'active' | 'completed'
  // Actions
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: 'all',

  addTask: (title) => set((state) => ({
    tasks: [...state.tasks, { id: crypto.randomUUID(), title, isCompleted: false }]
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    )
  })),

  setFilter: (filter) => set({ filter }),
}))
```

### 3.2. Memahami Parameter `set` dan Immutability
- Fungsi `set()` dari Zustand melakukan **Shallow Merge** pada level root. Artinya, jika kita memanggil `set({ filter: 'completed' })`, properti `tasks` tidak akan terhapus.
- Namun, untuk data array atau nested object di dalam state, kita **wajib menjaga immutability**:
  - Menambah elemen: `tasks: [...state.tasks, newTask]`
  - Menghapus elemen: `tasks: state.tasks.filter(t => t.id !== id)`
  - Mengubah elemen: `tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: true } : t)`

### 3.3. Menggunakan Parameter `get`
Jika aksi membutuhkan nilai state saat ini tanpa harus merender ulang atau untuk kalkulasi logika sebelum memanggil `set`:
```typescript
canAddTask: () => {
  const currentTasks = get().tasks
  return currentTasks.length < 10 // Batasi maksimal 10 tugas
}
```

---

## 4. Kunci Performa: Selector Subscriptions

Salah satu kesalahan paling sering yang dilakukan pemula adalah mengimpor seluruh store sekaligus dengan destructuring:

```typescript
// ❌ KURANG EFISIEN: Komponen akan me-render ulang setiap kali APAPUN di store berubah!
const { tasks, filter, addTask } = useTaskStore()
```

### Pola Selektor yang Benar (Atomic Selector):
```typescript
// ✅ EFISIEN: Komponen HANYA re-render jika `tasks` bertambah, berkurang, atau berubah nilainya!
const tasks = useTaskStore(state => state.tasks)
const addTask = useTaskStore(state => state.addTask)
```
Karena `addTask` adalah referensi fungsi yang stabil, komponen yang hanya memanggil action (`addTask`) **tidak akan pernah me-render ulang** saat ada task baru yang masuk! Inilah rahasia performa super cepat aplikasi berbasis Zustand.

---

## 5. Integrasi Persistensi Data: Middleware `persist` & `localStorage`

Web Storage API (`localStorage`) memungkinkan browser menyimpan pasangan string key-value yang tetap ada meskipun peramban ditutup atau halaman dimuat ulang.

Zustand menyediakan middleware resmi `persist` dari `zustand/middleware` yang mengotomatisasi:
1. Serialisasi state ke format JSON string saat terjadi perubahan.
2. Menyimpan data ke `window.localStorage`.
3. Membaca (*rehydration*) data JSON dari `localStorage` saat aplikasi pertama kali dimuat.

### Sintaks Middleware `persist`:
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      // actions...
    }),
    {
      name: 'study-task-storage', // Kunci unik di localStorage
      storage: createJSONStorage(() => localStorage), // Driver penyimpanan
      partialize: (state) => ({ tasks: state.tasks }), // Filter status tidak perlu disimpan permanen
    }
  )
)
```

---

## 6. Arsitektur Mini Project 1: Study & Task Tracker

Pada Mini Project 1 ini, kita mengintegrasikan seluruh materi Minggu 1:
- **Hari 1 & 2**: Komponen modular, Synthetic Events, Immutability.
- **Hari 3**: Deriving data (Statistik tugas selesai & persentase progres dihitung langsung tanpa state ganda).
- **Hari 4**: Navigasi multi-halaman via `react-router-dom` v7.
- **Hari 5**: Styling adaptif Tailwind CSS v4, `Button`, dan `Badge`.
- **Hari 6**: Zustand Store dengan CRUD lengkap dan `localStorage` auto-sync.

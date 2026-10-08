# Modul Pembelajaran: Hari 10 (Rabu, 7 Oktober 2026)
## Optimasi Performa Render, Memoization Mendalam, DOM & Mutable Refs, serta React 18/19 Concurrent Hooks

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **React Core & Hooks Specialist**

---

### 1. Mental Model: Bagaimana dan Kapan React Me-render Komponen?

Sebelum menggunakan tool optimasi apa pun, kita harus memahami terlebih dahulu **kapan** dan **mengapa** React me-render komponen.

#### 1.1. Empat Pemicu Re-render Komponen
Sebuah komponen React akan mengalami re-render jika terjadi salah satu dari 4 peristiwa berikut:
- **Perubahan State Lokal (`useState` / `useReducer`)**: Saat fungsi setter dipanggil dan nilai state baru berbeda dari nilai sebelumnya (`Object.is(oldState, newState) === false`).
- **Komponen Induk (*Parent*) Me-render Ulang**: Ini adalah aturan default di React. Jika komponen parent me-render ulang, **seluruh komponen anak di bawahnya secara otomatis ikut me-render ulang**, tidak peduli apakah props anak tersebut berubah atau tidak.
- **Perubahan Nilai Context (`useContext`)**: Semua komponen konsumen yang berlangganan ke React Context akan me-render ulang begitu nilai context provider berubah.
- **Custom Hooks yang Mengubah State**: Jika custom hook di dalam komponen memanggil setter state, komponen pemanggil hook tersebut akan me-render ulang.

#### 1.2. Dua Fase Render: Render Phase vs Commit Phase
- **Fase 1: Render Phase (Pure Calculation)**:
  - React mengeksekusi fungsi komponen JSX kamu untuk menghasilkan pohon Virtual DOM baru.
  - React membandingkan pohon Virtual DOM baru dengan pohon sebelumnya (*Diffing algorithm* / Reconciliation).
  - Fase ini tidak menyentuh DOM peramban asli sama sekali.
- **Fase 2: Commit Phase (DOM Update)**:
  - React hanya mengaplikasikan perbedaan (*diff*) yang benar-benar berubah ke DOM browser asli.
  - Menjalankan `useLayoutEffect` dan `useEffect`.

#### 1.3. Apa Masalahnya dengan "Unnecessary Re-render"?
Meskipun React sangat cerdas dalam Commit Phase (hanya mengubah DOM yang berubah), **Render Phase tetap memakan waktu dan komputasi CPU JavaScript**. Jika kamu memiliki tabel dengan 1.000 baris, dan setiap kali mengetik 1 huruf di kolom input parent seluruh 1.000 baris ikut menjalankan fungsi rendernya, browser akan mengalami *frame drops* (tampilan patah-patah di bawah 60 FPS).


---

### 2. Trio Optimasi: React.memo, useMemo, dan useCallback

Ketiga alat ini bekerja bahu-membahu untuk mencegah re-render yang sia-sia dan menghemat pemrosesan CPU.

#### 2.1. React.memo (Mencegah Anak Re-render jika Props Tidak Berubah)
Secara default, jika komponen induk re-render, komponen anak ikut re-render. Dengan membungkus anak menggunakan `React.memo`, React akan membandingkan props yang diterima anak sebelum me-render:

```tsx
// Komponen Anak yang dilindungi React.memo
export const ProductItem = React.memo(function ProductItem({ product, onSelect }: ProductItemProps) {
  return (
    <div className="p-3 border rounded">
      <h4>{product.name}</h4>
      <button onClick={() => onSelect(product.id)}>Pilih</button>
    </div>
  )
})
```

- **Mekanisme Perbandingan (Shallow Comparison)**:
  - React membandingkan setiap prop menggunakan `Object.is(prevProp, nextProp)`.
  - Jika seluruh props bernilai sama, React **melewati (skip)** fase render komponen ini dan menggunakan output JSX sebelumnya!
- **Kapan Menggunakan `React.memo`?**:
  - Komponen menerima props yang jarang berubah.
  - Komponen memiliki pohon elemen JSX yang besar atau melakukan render yang berat.
  - Komponen sering me-render ulang hanya karena parent-nya me-render ulang.

#### 2.2. Jebakan Kesetaraan Referensi (Referential Equality Trap)
Mengapa `React.memo` sering kali gagal bekerja?
Di JavaScript:
```javascript
// Primitif (dibandingkan berdasarkan nilai):
1 === 1 // true
"halo" === "halo" // true

// Objek, Array, & Fungsi (dibandingkan berdasarkan alamat referensi memori):
{} === {} // FALSE! (alamat memori berbeda)
[] === [] // FALSE!
(() => {}) === (() => {}) // FALSE! (fungsi baru di memori)
```

Jika komponen induk me-render ulang:
```tsx
function ParentComponent() {
  const [count, setCount] = useState(0)

  // ⚠️ BAHAYA: Fungsi ini dibuat ulang (referensi baru) setiap Parent re-render!
  const handleSelect = (id: string) => {
    console.log('Selected:', id)
  }

  // Objek ini juga dibuat ulang setiap Parent re-render!
  const filterConfig = { activeOnly: true }

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Hitung: {count}</button>
      {/* 💥 React.memo di ProductItem JEBOL karena handleSelect selalu bernilai baru! */}
      <ProductItem product={item} onSelect={handleSelect} config={filterConfig} />
    </div>
  )
}
```

Inilah mengapa kita butuh `useCallback` dan `useMemo`!

#### 2.3. useCallback: Menstabilkan Referensi Fungsi
`useCallback` mengunci fungsi di dalam cache memori React. Selama dependency array tidak berubah, React akan mengembalikan **alamat referensi fungsi yang sama persis**:

```tsx
// Referensi fungsi handleSelect dijamin stabil, TIDAK dibuat ulang setiap Parent re-render!
const handleSelect = useCallback((id: string) => {
  console.log('Produk dipilih:', id)
}, []) // deps kosong: fungsi ini dibuat sekali saja
```

Sekarang, prop `onSelect={handleSelect}` yang diterima oleh `<ProductItem />` memiliki referensi identik, sehingga `React.memo` **sukses memblokir re-render anak**!

#### 2.4. useMemo: Menghemat Komputasi Berat
Jika `useCallback` meng-cache *definisi fungsi*, maka `useMemo` meng-cache *hasil komputasi/nilai kembalian* dari fungsi:

```tsx
// ❌ TANPA useMemo:
// Setiap ada state apa pun berubah di parent, filtering & sorting 5.000 item dihitung ulang!
const filteredProducts = products
  .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => b.sellingPrice - a.sellingPrice)

// ✅ DENGAN useMemo:
// Hanya dihitung ulang jika `products` atau `search` berubah!
const filteredProducts = useMemo(() => {
  console.log('🔄 Menghitung ulang dataset produk...')
  return products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.sellingPrice - a.sellingPrice)
}, [products, search])
```

#### 2.5. Aturan Emas: Kapan TIDAK PERLU Memoization?
Jangan terjebak membungkus setiap fungsi dan kalkulasi dengan `useCallback` / `useMemo`:
- **Komputasi Ringan**: Menjumlahkan 2 angka `a + b` atau string concatenation justru **lebih lambat** jika dibungkus `useMemo` karena React harus mengalokasikan array dependency dan objek wrapper di memori.
- **Fungsi Event Handler Biasa**: Jika tombol biasa `<button onClick={handleClick}>Simpan</button>` menerima handler, tidak ada gunanya membungkus `handleClick` dengan `useCallback` karena `<button>` HTML bawaan tidak memiliki `React.memo`.
- Gunakan `useCallback` **hanya** jika:
  1. Fungsi diteruskan sebagai props ke komponen anak yang dibungkus `React.memo`.
  2. Fungsi dimasukkan ke dalam dependency array `useEffect` lain.


---

### 3. Dua Wajah useRef: Akses DOM & Persistent Mutable Container

`useRef` adalah hook unik yang sering disalahpahami. `useRef` menghasilkan objek JavaScript biasa: `{ current: initialValue }`.

#### 3.1. Wajah 1: Akses Node DOM Browser Asli
Digunakan ketika kamu harus berinteraksi dengan API peramban yang tidak disediakan secara deklaratif oleh JSX:
- Memfokuskan kursor secara instan ke input (`inputRef.current.focus()`).
- Menggulir halaman ke elemen tertentu (`elementRef.current.scrollIntoView({ behavior: 'smooth' })`).
- Mengontrol pemutaran media (`videoRef.current.play()`).

```tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Cari data..." />
      <button onClick={handleFocus}>Fokuskan Kursor</button>
    </div>
  )
}
```

#### 3.2. Wajah 2: Kotak Memori Mutabel (Tanpa Re-render)
Pembeda terbesar antara `useState` dan `useRef`:
- **Mengubah `useState` (`setVal`)**: Memicu komponen me-render ulang!
- **Mengubah `useRef` (`ref.current = x`)**: **TIDAK PERNAH memicu re-render ulang!** Nilainya bertahan (*persisten*) sepanjang siklus hidup komponen di browser.

**Kasus Penggunaan Terbaik**:
1. **Menyimpan ID Timer / Interval**:
   ```tsx
   const timerIdRef = useRef<NodeJS.Timeout | null>(null)

   const startTimer = () => {
     timerIdRef.current = setInterval(() => {
       console.log('Tik...')
     }, 1000)
   }

   const stopTimer = () => {
     if (timerIdRef.current) clearInterval(timerIdRef.current)
   }
   ```
2. **Menghitung Total Render Komponen**:
   ```tsx
   const renderCountRef = useRef(1)
   renderCountRef.current += 1 // Menghitung render tanpa memicu infinite loop!
   ```
3. **Menyimpan Nilai Sebelumnya (Previous Value)**:
   Mengingat nilai state pada render sebelumnya untuk perbandingan.


---

### 4. React 18/19 Concurrent Updates: useTransition & useDeferredValue

Pada React versi lama, proses rendering bersifat sinkron dan memblokir layar (*blocking execution*). Ketika kamu memfilter daftar 5.000 item, browser akan membeku selama 200ms—huruf yang kamu ketik di keyboard tidak langsung muncul di layar (*input lag*).

React 18 memperkenalkan **Concurrent Rendering**, yang membagi pembaruan menjadi dua kategori:
1. **Urgent Updates**: Respons langsung ke interaksi pengguna (mengetik teks, klik tombol, hover). Harus direspons secara instan (< 16ms, 60 FPS).
2. **Transition Updates**: Pembaruan tampilan yang berat dan bisa ditunda sejenak tanpa membuat pengguna merasa sistem macet (merender hasil pencarian, beralih tab analitik).

#### 4.1. useTransition & startTransition
Hook `useTransition` memberi kita fungsi pembungkus `startTransition` dan flag boolean `isPending`:

```tsx
function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(allProducts)
  const [isPending, startTransition] = useTransition()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    // 1. URGENT: Update input teks seketika (pengguna melihat huruf langsung muncul)
    setSearchTerm(query)

    // 2. NON-URGENT (TRANSITION): Filter data berat dibungkus startTransition
    startTransition(() => {
      // React boleh menunda/menginterupsi render ini jika pengguna mengetik huruf baru lagi!
      setFilteredList(heavyFilterAlgorithm(query))
    })
  }

  return (
    <div>
      <input value={searchTerm} onChange={handleSearchChange} />
      {isPending && <p className="text-sm text-blue-500">Memperbarui hasil pencarian...</p>}
      <ProductList items={filteredList} />
    </div>
  )
}
```

#### 4.2. useDeferredValue
Jika kamu menerima nilai dari props atau state luar dan tidak memegang fungsi updater-nya secara langsung, gunakan `useDeferredValue`:

```tsx
function SearchResults({ query }: { query: string }) {
  // Nilai deferredQuery akan tertinggal sedikit di belakang query asli saat render berat sedang berjalan
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  const results = useMemo(() => {
    return heavySearch(deferredQuery)
  }, [deferredQuery])

  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <List data={results} />
    </div>
  )
}
```

---

### 5. Ringkasan Singkat Pedoman Kapan Memakai Apa

- **Ingin anak tidak re-render saat parent re-render?** $\rightarrow$ Bungkus anak dengan `React.memo`.
- **Fungsi callback di parent membuat `React.memo` anak jebol?** $\rightarrow$ Bungkus fungsi dengan `useCallback`.
- **Ada perulangan data/kalkulasi matematika berat yang lambat?** $\rightarrow$ Bungkus hasil kalkulasi dengan `useMemo`.
- **Butuh akses ke elemen DOM fisik (`input`, `video`, `div`)?** $\rightarrow$ Gunakan `useRef`.
- **Butuh simpan timer ID atau angka tanpa memicu re-render?** $\rightarrow$ Gunakan `useRef`.
- **Input keyboard macet karena me-render ribuan elemen?** $\rightarrow$ Bungkus pembaruan data berat dengan `useTransition` atau gunakan `useDeferredValue`.


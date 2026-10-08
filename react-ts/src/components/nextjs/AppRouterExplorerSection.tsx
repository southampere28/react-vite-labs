import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { FolderTree, FileCode2, Layers, AlertCircle, Sparkles, LayoutTemplate } from 'lucide-react'

interface AppFileNode {
  id: string
  name: string
  type: 'layout' | 'page' | 'loading' | 'error'
  urlRoute: string
  isClient: boolean
  desc: string
  codeSnippet: string
  nestingLevel: number
}

const APP_FILES: AppFileNode[] = [
  {
    id: 'root-layout',
    name: 'app/layout.tsx',
    type: 'layout',
    urlRoute: 'Semua Rute (Global)',
    isClient: false,
    desc: 'Root layout WAJIB ada. Menampung <html>, <body>, font global, dan metadata head.',
    codeSnippet: `// app/layout.tsx (Server Component Default)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}`,
    nestingLevel: 0,
  },
  {
    id: 'root-page',
    name: 'app/page.tsx',
    type: 'page',
    urlRoute: '/',
    isClient: false,
    desc: 'Halaman beranda utama root ("/") aplikasi.',
    codeSnippet: `// app/page.tsx (Server Component)
export default async function HomePage() {
  return <h1>Selamat Datang di NextCommerce</h1>
}`,
    nestingLevel: 1,
  },
  {
    id: 'dash-layout',
    name: 'app/dashboard/layout.tsx',
    type: 'layout',
    urlRoute: '/dashboard/*',
    isClient: false,
    desc: 'Nested Layout khusus area dashboard. Membungkus halaman dengan Sidebar persisten tanpa re-render saat ganti menu.',
    codeSnippet: `// app/dashboard/layout.tsx (Persistent State)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar /> {/* State tidak pernah di-reset */}
      <section className="p-6">{children}</section>
    </div>
  )
}`,
    nestingLevel: 1,
  },
  {
    id: 'dash-page',
    name: 'app/dashboard/page.tsx',
    type: 'page',
    urlRoute: '/dashboard',
    isClient: false,
    desc: 'Halaman dashboard analytics utama.',
    codeSnippet: `// app/dashboard/page.tsx
export default async function DashboardPage() {
  return <h2>Ringkasan Metrik Bisnis</h2>
}`,
    nestingLevel: 2,
  },
  {
    id: 'prod-loading',
    name: 'app/products/loading.tsx',
    type: 'loading',
    urlRoute: '/products',
    isClient: false,
    desc: 'Loading fallback otomatis berbasis React Suspense. Muncul saat server sedang fetch data produk.',
    codeSnippet: `// app/products/loading.tsx
export default function Loading() {
  return <div className="skeleton-grid">Memuat katalog...</div>
}`,
    nestingLevel: 1,
  },
  {
    id: 'prod-dynamic',
    name: 'app/products/[id]/page.tsx',
    type: 'page',
    urlRoute: '/products/:id',
    isClient: false,
    desc: 'Dynamic Route segment. Mengambil parameter id langsung di server tanpa useParams hook.',
    codeSnippet: `// app/products/[id]/page.tsx (RSC)
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })
  return <h1>{product.name}</h1>
}`,
    nestingLevel: 2,
  },
  {
    id: 'prod-error',
    name: 'app/products/[id]/error.tsx',
    type: 'error',
    urlRoute: '/products/:id (Error UI)',
    isClient: true,
    desc: 'Error Boundary penangkap crash runtime. WAJIB menggunakan directive "use client".',
    codeSnippet: `'use client' // WAJIB Client Component!
export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => reset()}>Coba Lagi</button>
    </div>
  )
}`,
    nestingLevel: 2,
  },
]

export function AppRouterExplorerSection() {
  const [selectedFileId, setSelectedFileId] = useState<string>('root-layout')
  const selected = APP_FILES.find((f) => f.id === selectedFileId) || APP_FILES[0]

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-indigo-500" />
          <span>2. Konvensi File & Nested Layout Explorer (`app/` Directory)</span>
        </CardTitle>
        <CardDescription>
          Klik berkas khusus Next.js App Router di bawah untuk melihat peran, hirarki pembungkus, dan contoh kodenya.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Struktur Direktori Proyek:</span>
            </h4>

            <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 font-mono text-xs space-y-1">
              {APP_FILES.map((file) => {
                const isSelected = file.id === selectedFileId
                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => setSelectedFileId(file.id)}
                    style={{ paddingLeft: `${file.nestingLevel * 16 + 12}px` }}
                    className={`w-full py-2 pr-3 rounded-lg text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {file.type === 'layout' && <LayoutTemplate className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      {file.type === 'page' && <FileCode2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      {file.type === 'loading' && <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      {file.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                      <span className="truncate">{file.name}</span>
                    </div>

                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-sans uppercase shrink-0 ${
                        file.isClient
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      }`}
                    >
                      {file.isClient ? 'Client' : 'RSC'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-mono">{selected.name}</h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">Rute URL: {selected.urlRoute}</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    selected.isClient
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {selected.isClient ? "'use client' (Client Component)" : 'React Server Component (RSC)'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selected.desc}</p>

              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Cuplikan Implementasi Kode:
                </span>
                <pre className="p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs overflow-x-auto border border-gray-800 leading-relaxed">
                  {selected.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

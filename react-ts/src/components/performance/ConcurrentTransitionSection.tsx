import { useState, useTransition, useDeferredValue, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { RenderVisualizerBadge } from './RenderVisualizerBadge'
import { Search, Loader2, Sparkles, AlertCircle } from 'lucide-react'

interface CatalogItem {
  id: number
  title: string
  code: string
  tag: string
}

// Menghasilkan 5.000 item katalog
function generateLargeCatalog(count: number): CatalogItem[] {
  const tags = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'AI & ML', 'Cloud']
  const items: CatalogItem[] = []
  for (let i = 1; i <= count; i++) {
    const tag = tags[i % tags.length]
    items.push({
      id: i,
      title: `Modul Pembelajaran ${tag} Level ${((i % 20) + 1).toString().padStart(2, '0')}`,
      code: `MOD-${tag.substring(0, 3).toUpperCase()}-${(1000 + i).toString()}`,
      tag,
    })
  }
  return items
}

const ALL_CATALOG = generateLargeCatalog(5000)

// Algoritma filter yang sengaja disimulasikan komputasinya
function filterCatalog(items: CatalogItem[], query: string): CatalogItem[] {
  if (!query.trim()) return items.slice(0, 50)

  const lower = query.toLowerCase()
  const results: CatalogItem[] = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // Artificial workload loop per item to simulate complex regex / full text scoring
    for (let j = 0; j < 300; j++) {
      Math.sin(j)
    }

    if (
      item.title.toLowerCase().includes(lower) ||
      item.code.toLowerCase().includes(lower) ||
      item.tag.toLowerCase().includes(lower)
    ) {
      results.push(item)
    }
  }

  return results.slice(0, 60)
}

type OptimizationMode = 'blocking' | 'transition' | 'deferred'

export function ConcurrentTransitionSection() {
  const [mode, setMode] = useState<OptimizationMode>('transition')
  const [rawQuery, setRawQuery] = useState('')
  const [transitionResults, setTransitionResults] = useState<CatalogItem[]>(() => ALL_CATALOG.slice(0, 50))
  const [isPending, startTransition] = useTransition()

  // Untuk Mode Deferred
  const deferredQuery = useDeferredValue(rawQuery)
  const isDeferredStale = rawQuery !== deferredQuery

  // Hasil untuk mode blocking & deferred
  const activeResults = useMemo(() => {
    if (mode === 'transition') {
      return transitionResults
    } else if (mode === 'deferred') {
      return filterCatalog(ALL_CATALOG, deferredQuery)
    } else {
      // Blocking
      return filterCatalog(ALL_CATALOG, rawQuery)
    }
  }, [mode, transitionResults, deferredQuery, rawQuery])

  const handleQueryChange = (val: string) => {
    setRawQuery(val)

    if (mode === 'transition') {
      // Transisi: Mengetik adalah urgent, filtering berat dimasukkan ke transition
      startTransition(() => {
        setTransitionResults(filterCatalog(ALL_CATALOG, val))
      })
    }
  }

  return (
    <Card className="border-purple-100 dark:border-purple-900/30">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Lab 4: React 18/19 Concurrent Updates Playground</CardTitle>
              <CardDescription>
                Bandingkan input lag (blocking) vs kelancaran 60 FPS menggunakan useTransition & useDeferredValue.
              </CardDescription>
            </div>
          </div>
          <RenderVisualizerBadge label="Render Section" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Pilih Strategi Rendering:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={mode === 'blocking' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMode('blocking')}
              >
                🔴 Blocking Sync (Macet / Lag)
              </Button>
              <Button
                variant={mode === 'transition' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMode('transition')}
              >
                🟢 useTransition (Responsif 60 FPS)
              </Button>
              <Button
                variant={mode === 'deferred' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMode('deferred')}
              >
                🟣 useDeferredValue (Deklaratif)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Pencarian Katalog (5.000 data dengan artificial CPU workload):
              </label>
              {(isPending || isDeferredStale) && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Memproses transisi di background...
                </span>
              )}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={rawQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Ketik kata kunci dengan cepat (misal: 'frontend', 'cloud', '05')..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>


        {/* Hasil Katalog */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
            <span>Menampilkan {activeResults.length} hasil relevan:</span>
            <span>Query: "{rawQuery || 'semua'}"</span>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-opacity duration-200 max-h-72 overflow-y-auto pr-1 ${
              isPending || isDeferredStale ? 'opacity-40 grayscale' : 'opacity-100'
            }`}
          >
            {activeResults.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-purple-300 transition-all text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400">{item.code}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                    {item.tag}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Perbandingan */}
        <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Bagaimana Cara Membuktikannya?</span>
          </div>
          <p>
            1. Pilih mode <strong>🔴 Blocking Sync</strong> lalu ketik cepat huruf apa saja: kamu akan merasakan tombol keyboard terasa lambat/tersendat karena browser memblokir thread JavaScript.<br />
            2. Beralih ke <strong>🟢 useTransition</strong> lalu ketik cepat: ketikanmu terasa <strong>super mulus & instan</strong> karena React mengizinkan input diprioritaskan utama selagi pencarian data diselesaikan di background!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


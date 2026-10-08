import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { RenderVisualizerBadge } from './RenderVisualizerBadge'
import { Calculator, Gauge, Cpu, CheckCircle2 } from 'lucide-react'

interface SyntheticItem {
  id: number
  sku: string
  price: number
  cost: number
  soldQty: number
}

// Generator data acak untuk simulasi beban komputasi
function generateLargeDataset(count: number): SyntheticItem[] {
  const items: SyntheticItem[] = []
  for (let i = 1; i <= count; i++) {
    items.push({
      id: i,
      sku: `PRD-${(10000 + i).toString()}`,
      price: 50000 + ((i * 37) % 450000),
      cost: 30000 + ((i * 19) % 300000),
      soldQty: (i % 80) + 1,
    })
  }
  return items
}

// Komputasi berat yang sengaja memakan CPU cycles
function computeAnalytics(items: SyntheticItem[]) {
  const startTime = performance.now()

  let totalRevenue = 0
  let totalCost = 0
  let totalProfit = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const revenue = item.price * item.soldQty
    const cost = item.cost * item.soldQty
    totalRevenue += revenue
    totalCost += cost
    totalProfit += revenue - cost

    // Loop komputasi tambahan untuk mensimulasikan agregasi analitik rumit
    for (let j = 0; j < 400; j++) {
      Math.sqrt(revenue * cost + j)
    }
  }

  const duration = performance.now() - startTime

  return {
    itemCount: items.length,
    totalRevenue,
    totalCost,
    totalProfit,
    marginPct: totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0',
    durationMs: duration.toFixed(2),
  }
}

export function HeavyComputationSection() {
  const [dataSize, setDataSize] = useState<number>(3000)
  const [useMemoEnabled, setUseMemoEnabled] = useState<boolean>(true)
  const [unrelatedInput, setUnrelatedInput] = useState<string>('')
  const [clickCount, setClickCount] = useState<number>(0)

  // Dataset berdasarkan ukuran data
  const dataset = useMemo(() => generateLargeDataset(dataSize), [dataSize])

  // Komputasi dengan useMemo (hanya dihitung ulang jika dataset berubah)
  const memoizedStats = useMemo(() => computeAnalytics(dataset), [dataset])

  // Komputasi TANPA useMemo (dihitung ulang setiap kali fungsi komponen me-render!)
  const computedStats = useMemoEnabled ? memoizedStats : computeAnalytics(dataset)

  return (
    <Card className="border-amber-100 dark:border-amber-900/30">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Lab 2: useMemo Benchmark Playground</CardTitle>
              <CardDescription>
                Bandingkan waktu eksekusi CPU saat menghitung kalkulasi berat vs mengambil hasil cache.
              </CardDescription>
            </div>
          </div>
          <RenderVisualizerBadge label="Render Lab" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Jumlah Baris Dataset Analitik
              </label>
              <div className="flex items-center gap-2">
                {[1000, 3000, 6000].map((size) => (
                  <Button
                    key={size}
                    variant={dataSize === size ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setDataSize(size)}
                  >
                    {size.toLocaleString('id-ID')} Data
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Metode Komputasi
              </label>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={useMemoEnabled}
                  onChange={(e) => setUseMemoEnabled(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span>Gunakan <code>useMemo</code> (Cache Hasil Komputasi)</span>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              ⚡ Ketik di Sini untuk Memicu Re-render Komponen (State Tidak Terkait):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={unrelatedInput}
                onChange={(e) => setUnrelatedInput(e.target.value)}
                placeholder="Ketik apa saja di sini dengan cepat..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClickCount((c) => c + 1)}
              >
                Klik (+{clickCount})
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Perhatikan kelancaran ketikanmu saat checkbox useMemo dicentang vs tidak dicentang!
            </p>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Waktu Eksekusi CPU</span>
              <Gauge className="w-4 h-4 text-amber-500" />
            </div>
            <p className={`text-2xl font-black font-mono ${
              Number(computedStats.durationMs) > 15
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {computedStats.durationMs} ms
            </p>
            <p className="text-[11px] text-gray-500 mt-1 font-mono">
              {useMemoEnabled ? '✨ Ambil dari memory cache' : '🔥 Menghitung ulang tiap keystroke'}
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Total Omzet Penjualan</span>
              <Cpu className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
              Rp {computedStats.totalRevenue.toLocaleString('id-ID')}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Dari {computedStats.itemCount.toLocaleString('id-ID')} produk
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Estimasi Laba Kotor</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Rp {computedStats.totalProfit.toLocaleString('id-ID')}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Margin Laba: {computedStats.marginPct}%
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Status Optimasi</span>
              <Cpu className="w-4 h-4 text-purple-500" />
            </div>
            <p className={`text-base font-bold ${
              useMemoEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
            }`}>
              {useMemoEnabled ? 'Aktif (Terlindungi)' : 'Mati (Boros CPU)'}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Re-renders: input & tombol
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


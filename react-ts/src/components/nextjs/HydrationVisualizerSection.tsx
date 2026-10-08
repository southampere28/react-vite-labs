import { useState, useSyncExternalStore } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Droplets, AlertTriangle, MousePointerClick } from 'lucide-react'

type HydrationStep = 'server-html' | 'browser-paint' | 'hydrated'

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

export function HydrationVisualizerSection() {
  const [currentStep, setCurrentStep] = useState<HydrationStep>('hydrated')
  const [clickCount, setClickCount] = useState(0)

  // Safe client mounting detection via useSyncExternalStore
  const isClientMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const clientTimestamp = isClientMounted ? new Date().toLocaleTimeString('id-ID') : 'Menunggu Sisi Klien...'

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Droplets className="w-5 h-5 text-indigo-500" />
          <span>4. Simulator Siklus Hidrasi (Hydration) & Pencegahan Mismatch</span>
        </CardTitle>
        <CardDescription>
          Pahami bagaimana React di browser "menyiramkan" logika interaktif ke atas HTML statis kiriman server.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep('server-html')}
            className={`p-3 rounded-xl border text-left transition-all ${
              currentStep === 'server-html'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">Tahap 1</span>
            <span className="text-xs sm:text-sm font-bold block">1. Server Render HTML</span>
            <span className="text-[11px] opacity-80 block mt-1">String HTML murni tanpa event listener</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep('browser-paint')}
            className={`p-3 rounded-xl border text-left transition-all ${
              currentStep === 'browser-paint'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">Tahap 2</span>
            <span className="text-xs sm:text-sm font-bold block">2. First Paint (FCP)</span>
            <span className="text-[11px] opacity-80 block mt-1">Layar tampil tapi belum bisa diklik</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep('hydrated')}
            className={`p-3 rounded-xl border text-left transition-all ${
              currentStep === 'hydrated'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">Tahap 3</span>
            <span className="text-xs sm:text-sm font-bold block">3. Hydrated (Interaktif)</span>
            <span className="text-[11px] opacity-80 block mt-1">React melampirkan event handler & state</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Pratinjau Antarmuka Berdasarkan Status:
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-indigo-600 dark:text-indigo-400 font-bold">
              Status: {currentStep.toUpperCase()}
            </span>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-4 text-center">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              Sepatu Lari Ultraboost 2026
            </h4>
            <p className="text-sm text-gray-500">Harga: Rp 2.499.000 (Stok: Tersedia)</p>

            <div className="flex justify-center items-center gap-3">
              {currentStep === 'server-html' && (
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs font-mono text-purple-700 dark:text-purple-300">
                  {'<button class="btn">Beli Sekarang</button>'} (String HTML di wire)
                </div>
              )}

              {currentStep === 'browser-paint' && (
                <button
                  type="button"
                  disabled
                  className="px-5 py-2.5 bg-gray-400 text-white rounded-xl text-sm font-semibold cursor-not-allowed opacity-70"
                >
                  Beli Sekarang (Belum Terhidrasi - Klik Tidak Merespon)
                </button>
              )}

              {currentStep === 'hydrated' && (
                <button
                  type="button"
                  onClick={() => setClickCount((prev) => prev + 1)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <MousePointerClick className="w-4 h-4" />
                  <span>Beli Sekarang! (Sudah Diklik: {clickCount}x)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Cara Mencegah Error "Hydration Mismatch":</span>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Jika kamu menggunakan data yang hanya ada di peramban (seperti waktu lokal client <code className="font-mono text-amber-600 dark:text-amber-400">toLocaleTimeString()</code> atau <code className="font-mono text-amber-600 dark:text-amber-400">localStorage</code>), render komponen hanya setelah komponen berhasil di-mount di sisi klien via <code className="font-mono text-amber-600 dark:text-amber-400">useSyncExternalStore</code> atau isolasi ke Client Component.
          </p>

          <div className="p-2.5 rounded-lg bg-white dark:bg-gray-950 border border-amber-500/20 text-xs font-mono flex items-center justify-between">
            <span className="text-gray-500">Timestamp Klien Terverifikasi:</span>
            <strong className="text-indigo-600 dark:text-indigo-400">
              {clientTimestamp}
            </strong>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

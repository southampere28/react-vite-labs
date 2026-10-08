import React, { useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { RenderVisualizerBadge } from './RenderVisualizerBadge'
import { Sparkles, AlertTriangle, ShieldCheck, Zap } from 'lucide-react'

// 1. Komponen Anak Biasa (TANPA React.memo)
function UnmemoizedChild({ title, onAction }: { title: string; onAction: () => void }) {
  return (
    <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/10 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm text-red-900 dark:text-red-200">{title}</span>
        <RenderVisualizerBadge label="Render Anak" />
      </div>
      <p className="text-xs text-red-700 dark:text-red-300">
        ❌ Komponen ini <strong>TIDAK dibungkus React.memo</strong>. Setiap kali tombol di Parent ditekan, komponen ini dipaksa re-render ulang.
      </p>
      <Button variant="outline" size="sm" onClick={onAction}>
        Jalankan Aksi Anak
      </Button>
    </div>
  )
}

// 2. Komponen Anak Terproteksi (DENGAN React.memo)
const MemoizedChild = React.memo(function MemoizedChild({
  title,
  onAction,
}: {
  title: string
  onAction: () => void
}) {
  return (
    <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/10 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm text-emerald-900 dark:text-emerald-200">{title}</span>
        <RenderVisualizerBadge label="Render Anak" />
      </div>
      <p className="text-xs text-emerald-700 dark:text-emerald-300">
        🛡️ Komponen ini <strong>dibungkus React.memo</strong>. Komponen ini HANYA me-render ulang jika props yang diterima berubah secara referensi.
      </p>
      <Button variant="outline" size="sm" onClick={onAction}>
        Jalankan Aksi Anak
      </Button>
    </div>
  )
})

export function MemoCallbackSection() {
  const [parentCount, setParentCount] = useState(0)
  const [otherState, setOtherState] = useState(false)
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true)
  const [lastActionTime, setLastActionTime] = useState<string | null>(null)

  const memoizedHandler = useCallback(() => {
    setLastActionTime(new Date().toLocaleTimeString('id-ID'))
  }, [])

  const rawHandler = () => {
    setLastActionTime(new Date().toLocaleTimeString('id-ID'))
  }

  const selectedHandler = useCallbackEnabled ? memoizedHandler : rawHandler

  return (
    <Card className="border-indigo-100 dark:border-indigo-900/30">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Lab 1: React.memo & useCallback Playground</CardTitle>
              <CardDescription>
                Buktikan secara visual perbedaan re-render anak saat Parent mengalami state updates.
              </CardDescription>
            </div>
          </div>
          <RenderVisualizerBadge label="Render Parent" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Kontrol Komponen Parent (Induk)
          </h4>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setParentCount((prev) => prev + 1)}
            >
              Ubah State Parent (Count: {parentCount})
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setOtherState((prev) => !prev)}
            >
              Toggle State Lain ({otherState ? 'AKTIF' : 'NONAKTIF'})
            </Button>
          </div>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
            <label className="flex items-center gap-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={useCallbackEnabled}
                onChange={(e) => setUseCallbackEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span>Aktifkan <code>useCallback</code> untuk prop fungsi <code>onAction</code></span>
            </label>

            <span className="text-xs px-2.5 py-1 rounded-md font-mono font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              Status Handler: {useCallbackEnabled ? 'useCallback (Stabil)' : 'Inline Baru (Re-create)'}
            </span>
          </div>

          {lastActionTime && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
              ⚡ Aksi terakhir anak dieksekusi pada: {lastActionTime}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UnmemoizedChild
            title="Komponen A: Tanpa React.memo"
            onAction={selectedHandler}
          />

          <MemoizedChild
            title="Komponen B: Dengan React.memo"
            onAction={selectedHandler}
          />
        </div>

        <div className="p-4 rounded-xl text-xs space-y-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-200">
          <div className="flex items-center gap-2 font-bold text-sm">
            {useCallbackEnabled ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Analisis: Optimasi Berjalan Sempurna</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Analisis: Jebakan Referential Equality Terjadi!</span>
              </>
            )}
          </div>
          <p>
            {useCallbackEnabled ? (
              <>
                Ketika kamu menekan tombol <strong>Ubah State Parent</strong>, perhatikan bahwa badge render <strong>Komponen B tetap diam</strong> (tidak me-render ulang)! Ini karena <code>React.memo</code> berhasil membandingkan bahwa prop <code>onAction</code> memiliki alamat memori yang sama berkat <code>useCallback</code>.
              </>
            ) : (
              <>
                Ketika <code>useCallback</code> dinonaktifkan, setiap kali Parent me-render ulang, fungsi <code>onAction</code> baru dibuat di memori. Akibatnya, <code>React.memo</code> pada <strong>Komponen B jebol</strong> dan ikut me-render ulang karena <code>prevProps.onAction !== nextProps.onAction</code>!
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


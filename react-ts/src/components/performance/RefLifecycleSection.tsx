import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { RenderVisualizerBadge } from './RenderVisualizerBadge'
import { MousePointer, Timer, Play, Pause, RotateCcw, Focus, ArrowDown } from 'lucide-react'

export function RefLifecycleSection() {
  // --- 1. DOM REF USE CASES ---
  const inputRef = useRef<HTMLInputElement>(null)
  const previewBoxRef = useRef<HTMLDivElement>(null)

  const handleFocusInput = () => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  const handleScrollToPreview = () => {
    previewBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  // --- 2. MUTABLE CONTAINER: PRECISE STOPWATCH ---
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  // Ref menyimpan ID interval (tidak hilang antar-render & tidak memicu re-render)
  const intervalIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const handleStartTimer = () => {
    if (isRunning) return
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime

    intervalIdRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current)
    }, 50)
  }

  const handlePauseTimer = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    setIsRunning(false)
  }

  const handleResetTimer = () => {
    handlePauseTimer()
    setElapsedTime(0)
  }

  // Cleanup interval saat unmount agar bebas dari memory leaks
  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [])

  // --- 3. MUTABLE CONTAINER: PREVIOUS VALUE TRACKER ---
  const [textInput, setTextInput] = useState<string>('React')
  const [previousText, setPreviousText] = useState<string>('')
  const prevTextRef = useRef<string>('React')

  const handleTextChange = (val: string) => {
    setPreviousText(prevTextRef.current)
    prevTextRef.current = val
    setTextInput(val)
  }

  const formatStopwatch = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="border-cyan-100 dark:border-cyan-900/30">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-lg">
              <MousePointer className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Lab 3: Dua Wajah useRef Playground</CardTitle>
              <CardDescription>
                Akses node DOM browser fisik vs penyimpan nilai mutabel yang persisten tanpa re-render.
              </CardDescription>
            </div>
          </div>
          <RenderVisualizerBadge label="Render Section" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri: DOM Node Manipulation */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-cyan-700 dark:text-cyan-300">
              <Focus className="w-4 h-4" />
              <span>Wajah 1: Akses Elemen DOM Asli</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              Mengontrol fokus input kursor dan trigger scroll langsung ke node HTML tanpa re-render.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Target Input DOM (Terhubung ke <code>inputRef</code>):
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Klik tombol fokus untuk mengarahkan kursor ke sini..."
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary" size="sm" onClick={handleFocusInput}>
                  <Focus className="w-3.5 h-3.5 mr-1" />
                  Auto-Focus Input
                </Button>
                <Button variant="outline" size="sm" onClick={handleScrollToPreview}>
                  <ArrowDown className="w-3.5 h-3.5 mr-1" />
                  Scroll ke Target
                </Button>
              </div>
            </div>
          </div>


          {/* Kolom Kanan: Mutable Value Container (Stopwatch) */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-700 dark:text-cyan-300">
                <Timer className="w-4 h-4" />
                <span>Wajah 2: Persistent Mutable Container</span>
              </div>
              <RenderVisualizerBadge label="Timer Render" />
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              Menyimpan timer interval ID di <code>intervalIdRef</code>. ID disimpan secara aman antar-render tanpa trigger re-render ganda.
            </p>

            <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-mono font-black text-cyan-600 dark:text-cyan-400 tracking-wider">
                {formatStopwatch(elapsedTime)}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Status: {isRunning ? '⏱️ Berjalan' : '⏸️ Berhenti'}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {!isRunning ? (
                <Button variant="primary" size="sm" onClick={handleStartTimer}>
                  <Play className="w-3.5 h-3.5 mr-1" />
                  Mulai
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={handlePauseTimer}>
                  <Pause className="w-3.5 h-3.5 mr-1" />
                  Jeda
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={handleResetTimer}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Box Pelacak Previous Value */}
        <div className="p-4 rounded-xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 space-y-3">
          <h4 className="text-xs font-bold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
            💡 Kasus Penggunaan 3: Pelacak State Sebelumnya (Previous Value Tracker)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Ketik Kata Baru:
              </label>
              <input
                type="text"
                value={textInput}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 outline-none"
              />
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
              <span className="text-gray-500 block">Nilai Sekarang (State):</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{textInput || '(kosong)'}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
              <span className="text-gray-500 block">Nilai Sebelumnya (useRef):</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">{previousText || '(belum ada)'}</strong>
            </div>
          </div>
        </div>
      </CardContent>

      <div
        ref={previewBoxRef}
        className="m-20 p-3 rounded-lg border border-dashed border-cyan-300 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 text-xs text-cyan-800 dark:text-cyan-300"
      >
        📍 <strong>Elemen Target Scroll:</strong> Dihubungkan dengan <code>scrollTargetRef</code>.
      </div>
    </Card>
  )
}


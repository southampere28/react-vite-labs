import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Server, Laptop, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react'

interface FeatureCheck {
  id: string
  label: string
  isClientRequired: boolean
  explanation: string
}

const FEATURE_CHECKS: FeatureCheck[] = [
  {
    id: 'fetch-db',
    label: 'Mengambil data dari Database SQL / Private Backend API',
    isClientRequired: false,
    explanation: 'Rekomendasi Utama: Gunakan Server Component (RSC)! Bisa async/await langsung tanpa useEffect dan tanpa expose DB credentials.',
  },
  {
    id: 'secret-key',
    label: 'Menggunakan Secret Token / Private API Key (cth: STRIPE_SECRET_KEY)',
    isClientRequired: false,
    explanation: 'Wajib Server Component (RSC)! Jangan pernah memakai secret key di Client Component karena bisa dibaca di DevTools browser.',
  },
  {
    id: 'click-event',
    label: 'Memasang Event Listener interaktif (onClick, onSubmit, onKeyDown)',
    isClientRequired: true,
    explanation: 'Wajib Client Component ("use client")! Server tidak bisa menerima event klik pengguna.',
  },
  {
    id: 'react-hooks',
    label: 'Menggunakan State & Lifecycle Hooks (useState, useEffect, useReducer)',
    isClientRequired: true,
    explanation: 'Wajib Client Component ("use client")! Server Components tidak memiliki state reaktif.',
  },
  {
    id: 'browser-api',
    label: 'Mengakses Web Browser APIs (localStorage, window, navigator)',
    isClientRequired: true,
    explanation: 'Wajib Client Component ("use client")! Di server Node.js objek window dan localStorage bernilai undefined.',
  },
  {
    id: 'heavy-lib',
    label: 'Mengimpor library Markdown Parser atau Syntax Highlighter berat (300KB)',
    isClientRequired: false,
    explanation: 'Sangat Direkomendasikan Server Component! Library 300KB dieksekusi di server dan 0 KB dikirim ke bundle JS browser.',
  },
]

export function RscVsClientSection() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['click-event'])

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // If any selected feature requires client, then this component MUST be client component
  const mustBeClient = selectedFeatures.some((id) => {
    const f = FEATURE_CHECKS.find((item) => item.id === id)
    return f?.isClientRequired
  })

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>3. Asisten Penentu Arsitektur: RSC vs Client Component (`'use client'`)</span>
        </CardTitle>
        <CardDescription>
          Centang kebutuhan fitur komponen kamu di bawah ini untuk melihat apakah komponenmu wajib diberi direktif `'use client'` atau aman tetap sebagai Server Component murni.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FEATURE_CHECKS.map((item) => {
            const isChecked = selectedFeatures.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleFeature(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-sm'
                    : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-gray-300 dark:border-gray-700 bg-transparent'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 block">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block leading-tight">
                    {item.explanation}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Diagnosis Result Banner */}
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            mustBeClient
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {mustBeClient ? (
              <Laptop className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" />
            ) : (
              <Server className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <div>
              <h4 className="text-sm sm:text-base font-bold">
                {mustBeClient ? "WAJIB Diberi Direktif: 'use client'" : 'AMAN Tetap Sebagai: React Server Component (RSC)'}
              </h4>
              <p className="text-xs opacity-85">
                {mustBeClient
                  ? 'Karena komponen menggunakan state/events/browser APIs, ia harus dieksekusi di peramban pengguna.'
                  : 'Komponen tidak memiliki interaktivitas browser, sehingga 100% kode JavaScriptnya tidak akan dikirim ke browser (0 KB JS bundle)!'}
              </p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase shrink-0 bg-white/80 dark:bg-gray-900/80 border border-current">
            {mustBeClient ? "'use client'" : 'RSC (Default)'}
          </span>
        </div>

        {/* Leaf Component Composition Tip */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Pola Arsitektur Emas: "Leaf Component Pattern"</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Jangan jadikan seluruh halaman menjadi <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">'use client'</code>. Biarkan halaman induk (<code className="font-mono">page.tsx</code>) tetap menjadi Server Component yang bertugas mengambil data dari backend. Hanya tombol atau modal interaktif kecil di ujung rantai yang dibungkus <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">'use client'</code>.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

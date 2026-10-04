import { create } from 'zustand'
import { Gamepad2, MousePointer2, Sparkles } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

type XStore = number

// game 1: horizontal pointer tracker
const useXStore = create<XStore>()(() => 0)

const ageStore = create<number>()(() => 18)

export function PlaygroundPage() {
  const x = useXStore()
  const age = ageStore()
  
  const setX = (nextX: number) => {
    useXStore.setState(nextX, true)
  }
  const position = { y: 140, x }

  const setAge = (nextAge: number) => {
    ageStore.setState(nextAge, true)
  }

  // mapper tingkatan umur icon
  const ageStages = [
    { minAge: 60, icon: '👴', label: 'Lansia' },
    { minAge: 20, icon: '👨', label: 'Dewasa' },
    { minAge: 13, icon: '🧑', label: 'Remaja' },
    { minAge: 7, icon: '👦', label: 'Anak-anak' },
    { minAge: 3, icon: '🧒', label: 'Balita' },
    { minAge: 0, icon: '👶', label: 'Bayi' }
  ]

  const currentStage =
    ageStages.find((stage) => age >= stage.minAge) ?? ageStages[ageStages.length - 1]
  const currentAgeIcon = currentStage.icon
  const currentAgeLabel = currentStage.label
    
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Judul Playground */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Gamepad2 className="w-8 h-8 text-indigo-500" />
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">
                Zustand Game Playground
              </h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Eksperimen interaktivitas instan, reaktivitas state 60 FPS, dan arena game eksperimental berbasis Zustand.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="purple" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Reaktivitas 60 FPS
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Daftar Mini Games */}
      <div className="space-y-8">
        {/* Game 1: Horizontal Pointer Tracker */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <MousePointer2 className="w-4 h-4 text-red-500" />
                Game 1: Horizontal Pointer Tracker
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Gerakkan pointer di dalam arena. Titik merah mengikuti sumbu X secara instan via Zustand.
              </p>
            </div>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              Koordinat X: <span className="font-bold text-red-500">{Math.round(x)}px</span>
            </div>
          </div>

          {/* Arena Interaktif Game 1 */}
          <div
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setX(e.clientX - rect.left)
            }}
            className="relative w-full h-72 bg-gray-950 rounded-xl overflow-hidden cursor-crosshair border border-gray-800 select-none shadow-inner"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Guide line horizontal */}
            <div
              className="absolute left-0 right-0 border-b border-dashed border-red-500/25 pointer-events-none"
              style={{ top: position.y }}
            />

            {/* Titik Merah Interaktif */}
            <div
              className="absolute bg-red-500 rounded-full shadow-[0_0_18px_rgba(239,68,68,0.9)] pointer-events-none"
              style={{
                width: 20,
                height: 20,
                left: -10,
                top: -10,
                transform: `translate(${position.x}px, ${position.y}px)`
              }}
            />

            <div className="absolute bottom-3 left-3 text-[11px] text-gray-500 select-none pointer-events-none">
              Gerakkan pointer di dalam arena ini 👆
            </div>
          </div>
        </section>

        {/* game 2 */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-indigo-500" />
              Game 2: Simple Age Classification
            </h3>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              Nilai: <span className="font-bold text-indigo-500">{age}</span>
            </div>
          </div>
          {/* Arena Mini Game 2 (Ditengah secara Vertikal & Horizontal) */}
          <div
            className="relative w-full h-72 bg-gray-950 rounded-xl overflow-hidden border border-gray-800 select-none shadow-inner flex flex-col items-center justify-center"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Display Ikon Karakter & Kategori Umur Terpusat */}
            <div className="flex flex-col items-center mb-3">
              <span className="text-5xl select-none transition-transform duration-200 hover:scale-110 drop-shadow-lg">
                {currentAgeIcon}
              </span>
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold mt-3">
                {currentAgeLabel}
              </span>
            </div>

            {/* flex: button minus, display age, button plus (Terpusat Rapi) */}
            <div className="flex items-center gap-4 bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800 shadow-lg">
              <button
                className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md shadow-red-500/20 text-xl"
                onClick={() => setAge(age - 1)}
                title="Kurangi Umur"
              >
                -
              </button>
              <div className="flex flex-col items-center px-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Umur</span>
                <span className="text-white font-mono text-3xl font-black min-w-14 text-center">
                  {age}
                </span>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md shadow-indigo-600/20 text-xl"
                onClick={() => setAge(age + 1)}
                title="Tambah Umur"
              >
                +
              </button>
            </div>

          </div>
        </section>


        {/* Slot Game Berikutnya */}
        <section className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center bg-gray-50/50 dark:bg-gray-800/30">
          <Gamepad2 className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            Slot Mini Game Berikutnya
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-md mx-auto mt-1">
            Coming Soon!
          </p>
        </section>
      </div>
    </div>
  )
}

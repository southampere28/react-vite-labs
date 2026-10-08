import { MemoCallbackSection } from '../components/performance/MemoCallbackSection'
import { HeavyComputationSection } from '../components/performance/HeavyComputationSection'
import { RefLifecycleSection } from '../components/performance/RefLifecycleSection'
import { ConcurrentTransitionSection } from '../components/performance/ConcurrentTransitionSection'
import { Zap, Gauge, Flame, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react'

export function PerformanceStudioPage() {
  return (
    <div className="space-y-8 pb-12 m-15">
      {/* Header Halaman */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Hari 10 • Advanced Hooks & Performa
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                Interactive Lab
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Performance Studio & Rendering Lab
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl">
          Eksplorasi visual dan benchmark mendalam cara kerja rendering React, isolasi re-render dengan{' '}
          <code className="text-indigo-600 dark:text-indigo-400">React.memo</code> &{' '}
          <code className="text-indigo-600 dark:text-indigo-400">useCallback</code>, akselerasi CPU dengan{' '}
          <code className="text-indigo-600 dark:text-indigo-400">useMemo</code>, manipulasi DOM & mutable values dengan{' '}
          <code className="text-indigo-600 dark:text-indigo-400">useRef</code>, serta rendering tanpa hambatan melalui{' '}
          <code className="text-indigo-600 dark:text-indigo-400">useTransition</code> &{' '}
          <code className="text-indigo-600 dark:text-indigo-400">useDeferredValue</code>.
        </p>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/40 dark:bg-indigo-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Memoization Guard</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">React.memo + useCallback</p>
          <p className="text-xs text-gray-500 mt-1">Isolasi re-render komponen anak dari parent updates</p>
        </div>

        <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
            <Gauge className="w-4 h-4" />
            <span>Heavy Computation</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">useMemo Benchmark</p>
          <p className="text-xs text-gray-500 mt-1">Cegah kalkulasi berulang pada komputasi CPU intensif</p>
        </div>

        <div className="p-4 rounded-xl border border-cyan-100 dark:border-cyan-900/30 bg-cyan-50/40 dark:bg-cyan-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Persistent Reference</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">useRef DOM & Timers</p>
          <p className="text-xs text-gray-500 mt-1">Akses elemen browser & mutable data tanpa re-render</p>
        </div>

        <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 bg-purple-50/40 dark:bg-purple-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
            <Flame className="w-4 h-4" />
            <span>React 18/19 Concurrency</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">useTransition 60 FPS</p>
          <p className="text-xs text-gray-500 mt-1">Bebaskan main thread dari input lag saat render besar</p>
        </div>
      </div>

      {/* 4 Laboratorium Interaktif */}
      <div className="space-y-8">
        <MemoCallbackSection />
        <HeavyComputationSection />
        <RefLifecycleSection />
        <ConcurrentTransitionSection />
      </div>

      {/* Rangkuman & Best Practices */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Aturan Emas Optimasi Performa React di Dunia Industri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-1">
            <strong className="text-gray-900 dark:text-gray-100 block">1. Ukur Sebelum Mengoptimasi</strong>
            <p>
              Jangan melakukan <em>premature optimization</em>. Komputasi string dan array kecil (&lt; 100 elemen) tidak butuh <code>useMemo</code> karena overhead wrapper React justru lebih lambat.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-1">
            <strong className="text-gray-900 dark:text-gray-100 block">2. Pasangkan Memo dan Callback</strong>
            <p>
              <code>useCallback</code> tidak ada gunanya jika fungsi hanya di-pass ke tag HTML bawaan seperti <code>&lt;button&gt;</code>. Gunakan saat mem-passing fungsi ke komponen anak berbalut <code>React.memo</code>.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-1">
            <strong className="text-gray-900 dark:text-gray-100 block">3. Pisahkan Urgent vs Transition</strong>
            <p>
              Setiap kali pengguna mengetik atau mengeklik tombol, utamakan responsivitas UI input (urgent update). Alihkan proses rendering tabel atau filter ribuan baris ke dalam <code>useTransition</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceStudioPage


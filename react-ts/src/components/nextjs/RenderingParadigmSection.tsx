import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Server, Globe, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Zap } from 'lucide-react'

type StrategyType = 'csr' | 'ssr' | 'ssg' | 'isr'

interface StrategyInfo {
  id: StrategyType
  title: string
  subtitle: string
  badge: string
  badgeColor: string
  ttfb: string
  fcp: string
  jsBundle: string
  seoScore: string
  timeline: { step: string; desc: string; time: string; state: 'server' | 'network' | 'browser' }[]
  pros: string[]
  cons: string[]
}

const STRATEGIES: Record<StrategyType, StrategyInfo> = {
  csr: {
    id: 'csr',
    title: 'Client-Side Rendering (CSR / SPA Vite)',
    subtitle: 'HTML kosong dikirim dari server, JavaScript merender seluruh UI di browser',
    badge: 'SPA Default',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    ttfb: '50 ms',
    fcp: '1.200 ms (Blank Flash)',
    jsBundle: '850 KB (Besar)',
    seoScore: 'Kurang Optimal (HTML Kosong)',
    timeline: [
      { step: '1. Request', desc: 'Browser minta URL /produk/123', time: '0ms', state: 'network' },
      { step: '2. HTML Kosong', desc: 'Server kirim <div id="root"></div>', time: '50ms', state: 'server' },
      { step: '3. Unduh JS', desc: 'Browser unduh & parse bundle React 850KB', time: '600ms', state: 'browser' },
      { step: '4. Fetch Data', desc: 'React mount dan fetch("/api/produk/123")', time: '850ms', state: 'network' },
      { step: '5. UI Muncul', desc: 'Data tiba, UI produk digambar di layar', time: '1.200ms', state: 'browser' },
    ],
    pros: ['Navigasi halaman instan tanpa reload', 'Hosting murah di static storage (S3/Netlify)', 'Cocok untuk Dashboard Internal & Admin'],
    cons: ['First load lambat & layar putih sesaat', 'SEO & preview media sosial buruk'],
  },
  ssr: {
    id: 'ssr',
    title: 'Server-Side Rendering (SSR - Dynamic)',
    subtitle: 'Server mengambil data & menghasilkan HTML lengkap untuk setiap request pengguna',
    badge: 'On-Demand Server',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    ttfb: '250 ms',
    fcp: '300 ms (Cepat)',
    jsBundle: '180 KB (Kecil)',
    seoScore: 'Sempurna 100%',
    timeline: [
      { step: '1. Request', desc: 'Browser minta URL /produk/123', time: '0ms', state: 'network' },
      { step: '2. DB Query', desc: 'Node.js query langsung ke database / REST API', time: '180ms', state: 'server' },
      { step: '3. Render HTML', desc: 'Server menyusun HTML lengkap isi judul & harga', time: '240ms', state: 'server' },
      { step: '4. First Paint', desc: 'Browser terima HTML matang & langsung tampilkan UI', time: '300ms', state: 'browser' },
      { step: '5. Hydration', desc: 'JS kecil tiba, tombol beli langsung aktif', time: '480ms', state: 'browser' },
    ],
    pros: ['SEO sempurna & preview WhatsApp/Twitter muncul', 'FCP instan tanpa blank screen', 'Data selalu real-time setiap request'],
    cons: ['Beban CPU server Node.js bertambah saat traffic tinggi'],
  },
  ssg: {
    id: 'ssg',
    title: 'Static Site Generation (SSG - Build Time)',
    subtitle: 'Seluruh halaman HTML di-generate sekali saat build time (npm run build)',
    badge: 'Blazing Fast CDN',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    ttfb: '15 ms (Edge CDN)',
    fcp: '80 ms (Instan)',
    jsBundle: '120 KB (Minimal)',
    seoScore: 'Sempurna 100%',
    timeline: [
      { step: '1. Build Time', desc: 'npm run build query data & cetak file .html statis', time: 'Build', state: 'server' },
      { step: '2. Request', desc: 'Browser minta URL ke CDN terdekat', time: '0ms', state: 'network' },
      { step: '3. CDN Kirim', desc: 'Edge CDN langsung kirim file HTML statis instan', time: '15ms', state: 'server' },
      { step: '4. Instant Paint', desc: 'Browser langsung menampilkan konten tanpa tunggu JS', time: '80ms', state: 'browser' },
      { step: '5. Hydration', desc: 'Interaktivitas diaktifkan di latar belakang', time: '180ms', state: 'browser' },
    ],
    pros: ['Kecepatan tercepat di dunia via Edge CDN', 'Server anti-tumbang dari jutaan traffic', 'Cocok untuk Blog, Docs, dan Landing Page'],
    cons: ['Data tidak real-time jika ada perubahan setelah build'],
  },
  isr: {
    id: 'isr',
    title: 'Incremental Static Regeneration (ISR)',
    subtitle: 'Halaman statis secepat SSG dengan auto-update cache berkala di latar belakang',
    badge: 'Best of Both Worlds',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    ttfb: '20 ms',
    fcp: '90 ms (Super Cepat)',
    jsBundle: '120 KB (Minimal)',
    seoScore: 'Sempurna 100%',
    timeline: [
      { step: '1. Request', desc: 'User baca cache CDN instan (revalidate: 60s)', time: '20ms', state: 'server' },
      { step: '2. Expired', desc: 'Jika lewat 60s, sajikan cache lama sejenak', time: '25ms', state: 'browser' },
      { step: '3. Rebuild', desc: 'Server Next.js re-fetch data di background', time: '150ms', state: 'server' },
      { step: '4. Cache Baru', desc: 'Pengunjung berikutnya otomatis dapat data teranyar', time: 'Next', state: 'server' },
    ],
    pros: ['Kecepatan SSG tanpa rebuild seluruh web', 'Data otomatis terbarui secara periodik', 'Sangat cocok untuk E-Commerce skala besar'],
    cons: ['Pengunjung pertama saat kedaluwarsa melihat cache lama sekejap'],
  },
}

export function RenderingParadigmSection() {
  const [activeStrategy, setActiveStrategy] = useState<StrategyType>('ssr')
  const current = STRATEGIES[activeStrategy]

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              <span>1. Simulator Paradigma Rendering Web (CSR vs SSR vs SSG vs ISR)</span>
            </CardTitle>
            <CardDescription>
              Bandingkan jalur transmisi jaringan, kecepatan render pertama (FCP), dan skor SEO.
            </CardDescription>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${current.badgeColor}`}>
            {current.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
          {(Object.keys(STRATEGIES) as StrategyType[]).map((key) => {
            const item = STRATEGIES[key]
            const isActive = activeStrategy === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveStrategy(key)}
                className={`px-3 py-2 rounded-xl text-left font-medium text-xs sm:text-sm transition-all border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-gray-50 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="font-bold uppercase tracking-wider">{item.id}</div>
                <div className="text-[11px] opacity-85 truncate">{item.id === 'csr' ? 'SPA Vite' : item.id.toUpperCase()}</div>
              </button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{current.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{current.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">TTFB</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">{current.ttfb}</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">FCP (First Paint)</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">{current.fcp}</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">JS Bundle</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">{current.jsBundle}</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">Skor SEO</span>
              <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">{current.seoScore}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Alur Transmisi Waktu & Siklus Render:</span>
          </h4>

          <div className="space-y-2">
            {current.timeline.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  {step.state === 'server' && <Server className="w-4 h-4 text-purple-500 shrink-0" />}
                  {step.state === 'network' && <RefreshCw className="w-4 h-4 text-blue-500 shrink-0" />}
                  {step.state === 'browser' && <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />}
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white mr-2">{step.step}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{step.desc}</span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 shrink-0 border border-gray-200 dark:border-gray-800">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Keunggulan Utama:</span>
            </h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
              {current.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Pertimbangan & Trade-off:</span>
            </h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
              {current.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

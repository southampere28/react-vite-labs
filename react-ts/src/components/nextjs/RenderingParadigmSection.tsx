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

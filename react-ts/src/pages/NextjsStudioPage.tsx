import { RenderingParadigmSection } from '../components/nextjs/RenderingParadigmSection'
import { AppRouterExplorerSection } from '../components/nextjs/AppRouterExplorerSection'
import { RscVsClientSection } from '../components/nextjs/RscVsClientSection'
import { HydrationVisualizerSection } from '../components/nextjs/HydrationVisualizerSection'
import { Sparkles } from 'lucide-react'

export function NextjsStudioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-gray-900 to-black p-6 sm:p-8 text-white border border-indigo-500/20 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modul Hari 11 • Next.js & App Router Architecture Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Transisi Modern: SPA Vite ke Next.js Fullstack
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Eksplorasi perubahan paradigma dari Client-Side Rendering (CSR) menuju Server-Side Rendering (SSR), Static Site Generation (SSG), hirarki file Next.js App Router, serta batas arsitektur React Server Components (RSC) vs Client Components.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Interactive Lab Sections */}
      <div className="space-y-8">
        <RenderingParadigmSection />
        <AppRouterExplorerSection />
        <RscVsClientSection />
        <HydrationVisualizerSection />
      </div>
    </div>
  )
}

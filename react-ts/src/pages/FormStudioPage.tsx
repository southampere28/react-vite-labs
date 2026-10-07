import { useState } from 'react'
import { ProductFormSection } from '../components/forms/ProductFormSection'
import { ApplicantFormSection } from '../components/forms/ApplicantFormSection'
import { FileText, Package, GraduationCap, Zap, ShieldCheck, Layers } from 'lucide-react'

export function FormStudioPage() {
  const [activeTab, setActiveTab] = useState<'product' | 'applicant'>('product')

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Banner Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Hari 9: React Hook Form + Zod & Modern UI Primitives</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Form Studio & Runtime Validation Lab
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl">
          Eksplorasi arsitektur form tanpa jeda (*zero-re-render typing*) menggunakan <strong>React Hook Form v7</strong>, validasi skema runtime <strong>Zod</strong>, dan komponen UI reusable berbasis Tailwind CSS v4.
        </p>

        {/* Feature Highlights Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Uncontrolled Performance</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">0 re-render saat mengetik berkat ref DOM asli</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Zod Runtime Safety</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Type inference + cross-field validation .refine()</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Shadcn UI Pattern</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Reusable forwardRef primitives milik proyek sendiri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('product')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'product'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>1. Inventaris & Transaksi Produk</span>
        </button>

        <button
          onClick={() => setActiveTab('applicant')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'applicant'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>2. Registrasi Pelamar DevTalent Portal</span>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="transition-all">
        {activeTab === 'product' ? <ProductFormSection /> : <ApplicantFormSection />}
      </div>
    </div>
  )
}

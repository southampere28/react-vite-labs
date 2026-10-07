import { Badge } from '../ui/Badge'
import { CheckCircle2, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react'

interface FormStateDebuggerProps {
  isDirty: boolean
  isValid: boolean
  isSubmitting: boolean
  submitCount: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchedValues: Record<string, any>
  title?: string
}

export function FormStateDebugger({
  isDirty,
  isValid,
  isSubmitting,
  submitCount,
  errors,
  watchedValues,
  title = 'Live Form State Inspector'
}: FormStateDebuggerProps) {
  const errorCount = Object.keys(errors).length

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl p-5 border border-gray-800 shadow-md flex flex-col h-full font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-gray-200 tracking-wide">{title}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">
          React Hook Form v7 + Zod
        </span>
      </div>

      {/* Grid Status Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-sans">
        <div className="p-2.5 rounded-lg bg-gray-800/80 border border-gray-700/60 flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">isDirty</span>
          <Badge variant={isDirty ? 'warning' : 'neutral'} size="sm">
            {isDirty ? '✏️ Telah Diubah' : '⚪ Bersih'}
          </Badge>
        </div>

        <div className="p-2.5 rounded-lg bg-gray-800/80 border border-gray-700/60 flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">isValid</span>
          <Badge variant={isValid ? 'success' : 'danger'} size="sm">
            {isValid ? '✅ Skema Valid' : `❌ ${errorCount} Error`}
          </Badge>
        </div>

        <div className="p-2.5 rounded-lg bg-gray-800/80 border border-gray-700/60 flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">isSubmitting</span>
          <Badge variant={isSubmitting ? 'info' : 'neutral'} size="sm">
            {isSubmitting ? '⏳ Mengirim...' : '💤 Standby'}
          </Badge>
        </div>

        <div className="p-2.5 rounded-lg bg-gray-800/80 border border-gray-700/60 flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">submitCount</span>
          <span className="font-bold text-gray-200 text-sm">
            {submitCount} kali
          </span>
        </div>
      </div>

      {/* Active Validation Errors */}
      {errorCount > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/70 text-red-300 font-sans">
          <div className="flex items-center gap-1.5 font-semibold text-xs mb-1.5 text-red-200">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Pesan Kesalahan Skema Zod Aktif ({errorCount}):</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-[11px]">
            {Object.entries(errors).map(([field, err]) => (
              <li key={field}>
                <strong className="text-red-200">{field}:</strong> {err?.message as string}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Realtime JSON Payload Preview */}
      <div className="flex-1 flex flex-col min-h-[220px]">
        <div className="flex items-center justify-between text-gray-400 mb-1.5">
          <span className="text-[11px] font-sans font-semibold">Live Data Payload (JSON):</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" /> Uncontrolled sync
          </span>
        </div>
        <pre className="flex-1 bg-black/60 rounded-lg p-3 text-[11px] text-emerald-400 overflow-auto border border-gray-800 max-h-72">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 text-[10px] text-gray-400 font-sans flex items-center justify-between">
        <span>⚡ Zero-re-render typing mechanics</span>
        <span className="text-blue-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Runtime Verified
        </span>
      </div>
    </div>
  )
}

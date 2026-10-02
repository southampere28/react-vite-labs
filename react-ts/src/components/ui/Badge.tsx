import type { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'neutral'
  children: ReactNode
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-2xl text-xs font-medium'

  const variantClasses = {
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    neutral: 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
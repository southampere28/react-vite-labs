import type { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'neutral' | 'danger' | 'purple'
  size?: 'sm' | 'md'
  className?: string
  children: ReactNode
}

export function Badge({
  variant = 'neutral',
  size = 'sm',
  className = '',
  children
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  }

  const variantClasses = {
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    info: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
    danger: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30',
    purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
  }

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

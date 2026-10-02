import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  // 1. Gaya dasar yang selalu dimiliki oleh setiap tombol
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  // 2. Kamus varian warna
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-sm hover:shadow-md',
    outline: 'border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-slate-300 active:scale-95'
  }

  // 3. Kamus varian ukuran
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

// styling export
// eslint-disable-next-line react-refresh/only-export-components
export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  className: string = ''
) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none cursor-pointer disabled:opacity-50'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm',
    secondary: 'bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-sm',
    outline: 'border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-slate-300 active:scale-95'
  }

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  }

  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}
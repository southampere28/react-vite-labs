import React, { forwardRef } from "react"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "success"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    // 1. Gaya dasar yang selalu dimiliki oleh setiap tombol
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"

    // 2. Kamus varian warna
    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900",
      secondary: "bg-slate-700 hover:bg-slate-600 active:scale-98 text-slate-100",
      danger: "bg-red-600 hover:bg-red-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-red-300 dark:focus:ring-red-900",
      success: "bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-900",
      outline: "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 active:scale-98",
      ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 active:scale-98"
    }

    // 3. Kamus varian ukuran
    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-2.5 gap-2.5"
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
// eslint-disable-next-line react-refresh/only-export-components
export function getButtonClasses(
  variant: "primary" | "secondary" | "danger" | "outline" | "ghost" | "success" = "primary",
  size: "sm" | "md" | "lg" = "md"
): string {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900",
    secondary: "bg-slate-700 hover:bg-slate-600 active:scale-98 text-slate-100",
    danger: "bg-red-600 hover:bg-red-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-red-300 dark:focus:ring-red-900",
    success: "bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-xs hover:shadow-sm focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-900",
    outline: "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 active:scale-98",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 active:scale-98"
  }
  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5"
  }
  return `${base} ${variants[variant]} ${sizes[size]}`
}



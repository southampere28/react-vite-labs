import React, { forwardRef } from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode
  description?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || `chk-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="space-y-1">
        <label htmlFor={checkboxId} className="flex items-start gap-2.5 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            aria-invalid={Boolean(error)}
            className={`mt-0.5 h-4 w-4 rounded-sm border transition-colors text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 ${
              error
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-700 group-hover:border-blue-400'
            } dark:bg-gray-800 cursor-pointer ${className}`}
            {...props}
          />
          <div className="select-none">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {label}
            </span>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            )}
          </div>
        </label>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium pl-6.5 flex items-center gap-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

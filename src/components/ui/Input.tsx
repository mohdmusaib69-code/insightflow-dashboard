import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="mb-2 block text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={clsx(
              'input-base w-full',
              icon && 'pl-11',
              error && 'border-red-300 dark:border-red-900/50 focus:ring-red-500 focus:ring-offset-red-50 dark:focus:ring-offset-slate-900',
              className,
            )}
            {...props}
          />
          {icon && <span className="absolute left-4 top-3.5 text-emerald-600 dark:text-emerald-400">{icon}</span>}
        </div>
        {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="mb-2 block text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'input-base w-full resize-vertical',
            error && 'border-red-300 dark:border-red-900/50 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">{helperText}</p>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  options: { value: string; label: string }[]
  fullWidth?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="mb-2 block text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'input-base w-full appearance-none pr-10 bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-right bg-[length:1.5em_1.5em]',
            error && 'border-red-300 dark:border-red-900/50 focus:ring-red-500',
            className,
          )}
          {...props}
        >
          <option value="">{props.placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">{helperText}</p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'

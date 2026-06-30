import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-10 w-full border rounded-md px-3 py-2 text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:rounded-md file:text-sm file:font-medium file:text-primary file:mr-5 focus-visible:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-defaultBorder bg-background text-ld placeholder:text-muted-foreground dark:placeholder:text-white/30 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15',
        gray: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
        info: 'border-info bg-info/10 text-info placeholder-info/50 focus:border-info focus:ring-2 focus:ring-info/15 dark:border-info dark:bg-info/10',
        failure:
          'border-error bg-error/10 text-error placeholder-error/50 focus:border-error focus:ring-2 focus:ring-error/15 dark:border-error dark:bg-error/10',
        warning:
          'border-warning bg-warning/10 text-warning placeholder-warning/50 focus:border-warning focus:ring-2 focus:ring-warning/15 dark:border-warning dark:bg-warning/10',
        success:
          'border-success bg-success/10 text-success placeholder-success/50 focus:border-success focus:ring-2 focus:ring-success/15 dark:border-success dark:bg-success/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }

import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variantStyles = {
      default: 'bg-zinc-900 text-white hover:bg-zinc-800',
      outline: 'border border-zinc-300 bg-transparent hover:bg-zinc-100',
      ghost: 'hover:bg-zinc-100',
    }
    
    const sizeStyles = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8',
    }
    
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

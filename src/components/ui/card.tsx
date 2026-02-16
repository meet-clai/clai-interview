import * as React from "react"

type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardContent }

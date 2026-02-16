import * as React from "react"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-200 ${className}`}
      {...props}
    />
  )
}

export { Skeleton }

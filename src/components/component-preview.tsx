import type { ReactNode } from "react"

type ComponentPreviewProps = {
  children: ReactNode
  className?: string
}

export function ComponentPreview({ children, className = "" }: ComponentPreviewProps) {
  return (
    <div
      className={`my-5 flex min-h-72 items-center justify-center rounded-lg border bg-showcase/45 p-6 sm:p-10 ${className}`}
    >
      {children}
    </div>
  )
}

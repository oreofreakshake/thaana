import type { ReactNode } from "react"

type ComponentPreviewProps = {
  children: ReactNode
  className?: string
}

export function ComponentPreview({ children, className = "" }: ComponentPreviewProps) {
  return (
    <div
      className={`my-5 flex min-h-64 items-center justify-center rounded-xl border bg-card bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--border)_60%,transparent)_1px,transparent_0)] bg-[size:22px_22px] p-6 shadow-sm sm:p-10 ${className}`}
    >
      {children}
    </div>
  )
}

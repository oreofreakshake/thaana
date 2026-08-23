import type { ReactNode } from "react"

type DocsPageProps = {
  title: string
  description: string
  eyebrow?: string
  children: ReactNode
}

export function DocsPage({
  title,
  description,
  eyebrow = "Documentation",
  children,
}: DocsPageProps) {
  return (
    <>
      <header className="mb-12 border-b pb-9">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </header>
      {children}
    </>
  )
}

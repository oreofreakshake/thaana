import type { ReactNode } from "react"

type DocsPageProps = {
  title: string
  description: string
  eyebrow?: string
  children: ReactNode
}

export function DocsPage({ title, description, eyebrow, children }: DocsPageProps) {
  return (
    <>
      <header className="mb-10">
        {eyebrow ? (
          <p className="mb-2 text-sm font-medium text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </header>
      {children}
    </>
  )
}

import type { ReactNode } from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/src/components/code-block"

type ComponentExampleProps = {
  children: ReactNode
  code: string
  className?: string
}

export function ComponentExample({ children, code, className }: ComponentExampleProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")

  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-background">
      <div className="flex h-12 items-center gap-1 border-b px-3">
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            tab === "preview"
              ? "bg-secondary font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setTab("code")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            tab === "code"
              ? "bg-secondary font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Code
        </button>
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "flex min-h-80 items-center justify-center bg-showcase/45 p-6 sm:p-10",
            className
          )}
        >
          {children}
        </div>
      ) : (
        <CodeBlock className="m-0 rounded-none border-0" language="tsx">
          {code}
        </CodeBlock>
      )}
    </div>
  )
}

import { CheckIcon, CopyIcon, TerminalIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/src/lib/copy-to-clipboard"

export type PackageManager = "pnpm" | "npm" | "bun"
export type PackageCommands = Record<PackageManager, string>

type TerminalCommandProps = {
  commands: PackageCommands
  className?: string
}

const managers: PackageManager[] = ["pnpm", "npm", "bun"]

export function TerminalCommand({ commands, className }: TerminalCommandProps) {
  const [manager, setManager] = useState<PackageManager>("pnpm")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyCommand() {
    if (await copyToClipboard(commands[manager])) setCopied(true)
  }

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-code-border bg-code text-code-foreground",
        className
      )}
    >
      <div className="flex h-11 items-center border-b border-code-border px-2">
        <TerminalIcon className="mx-2 size-4 text-code-muted" aria-hidden="true" />
        {managers.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setManager(item)}
            data-active={manager === item}
            className="rounded-md px-3 py-1.5 font-mono text-xs text-code-muted transition-colors hover:text-code-foreground data-[active=true]:bg-white/8 data-[active=true]:text-code-foreground"
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          onClick={copyCommand}
          className="ms-auto inline-flex size-8 items-center justify-center rounded-md text-code-muted transition-colors hover:bg-white/8 hover:text-code-foreground"
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
        </button>
      </div>
      <div className="code-type flex min-h-16 items-center gap-3 overflow-x-auto px-5 py-4 font-mono text-sm sm:text-[15px]">
        <span className="select-none text-code-keyword" aria-hidden="true">
          $
        </span>
        <code data-terminal-command className="whitespace-nowrap">
          {commands[manager]}
        </code>
      </div>
    </div>
  )
}

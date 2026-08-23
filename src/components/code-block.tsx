import { CheckIcon, CopyIcon } from "lucide-react"
import { type ReactNode, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/src/lib/copy-to-clipboard"

type CodeBlockProps = {
  children: string
  className?: string
  language?: string
}

const tokenPattern =
  /(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:as|async|await|break|case|catch|class|const|continue|default|else|export|extends|false|finally|for|from|function|if|import|in|interface|let|new|null|of|return|switch|throw|true|try|type|typeof|undefined|while)\b|\b\d+(?:\.\d+)?\b|<\/?[A-Za-z][\w.-]*)/g

function tokenClass(token: string) {
  if (token.startsWith("//") || token.startsWith("/*")) return "text-code-comment"
  if (/^["'`]/.test(token)) return "text-code-string"
  if (/^<\/?/.test(token)) return "text-code-tag"
  if (/^\d/.test(token)) return "text-code-number"
  if (/^(true|false|null|undefined)$/.test(token)) return "text-code-constant"
  return "text-code-keyword"
}

function highlightLine(line: string, lineIndex: number): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const match of line.matchAll(tokenPattern)) {
    const index = match.index ?? 0
    if (index > cursor) nodes.push(line.slice(cursor, index))
    nodes.push(
      <span key={`${lineIndex}-${index}`} className={tokenClass(match[0])}>
        {match[0]}
      </span>
    )
    cursor = index + match[0].length
  }

  if (cursor < line.length) nodes.push(line.slice(cursor))
  return nodes
}

export function CodeBlock({ children, className, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyCode() {
    if (await copyToClipboard(children)) setCopied(true)
  }

  const occurrences = new Map<string, number>()
  const lines = children
    .replace(/\n$/, "")
    .split("\n")
    .map((content) => {
      const occurrence = (occurrences.get(content) ?? 0) + 1
      occurrences.set(content, occurrence)
      return { content, id: `${content}-${occurrence}` }
    })

  return (
    <figure
      data-language={language}
      className={cn(
        "relative my-6 overflow-hidden rounded-2xl border border-code-border bg-code text-code-foreground",
        className
      )}
    >
      <button
        type="button"
        onClick={copyCode}
        className="absolute end-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md bg-code text-code-muted transition-colors hover:bg-white/8 hover:text-code-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </button>

      <pre className="code-type max-h-[28rem] overflow-auto px-0 py-4 font-mono text-[14px] leading-7 sm:text-[15px]">
        <code className="block min-w-max">
          {lines.map((line, index) => (
            <span key={line.id} className="grid grid-cols-[3.25rem_1fr] pe-14">
              <span className="select-none pe-4 text-end text-code-line" aria-hidden="true">
                {index + 1}
              </span>
              <span className="pe-6">
                {line.content ? highlightLine(line.content, index) : " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

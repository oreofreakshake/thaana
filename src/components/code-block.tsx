type CodeBlockProps = {
  children: string
  language?: string
}

export function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border bg-[oklch(0.12_0_0)] text-[oklch(0.94_0_0)] shadow-sm">
      <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        {language}
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6">
        <code>{children}</code>
      </pre>
    </div>
  )
}

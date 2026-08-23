import { useEffect, useMemo, useState } from "react"

type TableOfContentsLink = {
  title: string
  href: string
}

type DocsTableOfContentsProps = {
  links: TableOfContentsLink[]
}

export function DocsTableOfContents({ links }: DocsTableOfContentsProps) {
  const itemIds = useMemo(() => links.map((link) => link.href.replace("#", "")), [links])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setActiveId(null)

    function updateLastItemAtPageEnd() {
      const isAtPageEnd =
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2
      if (isAtPageEnd) setActiveId(itemIds.at(-1) ?? null)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    for (const id of itemIds) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    window.addEventListener("scroll", updateLastItemAtPageEnd, { passive: true })
    updateLastItemAtPageEnd()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateLastItemAtPageEnd)
    }
  }, [itemIds])

  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="mb-1 text-xs font-medium text-muted-foreground">On This Page</p>
      {links.map((link) => {
        const isActive = link.href === `#${activeId}`
        return (
          <a
            key={link.href}
            href={link.href}
            data-active={isActive}
            aria-current={isActive ? "location" : undefined}
            className="text-[0.8rem] leading-5 text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
          >
            {link.title}
          </a>
        )
      })}
    </div>
  )
}

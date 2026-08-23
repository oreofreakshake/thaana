import { GitForkIcon, MenuIcon } from "lucide-react"
import * as React from "react"
import { Link, NavLink } from "react-router-dom"

import { ThemeToggle } from "@/src/components/theme-toggle"
import { docsNavigation } from "@/src/content/navigation"

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-foreground ${
    isActive ? "font-medium text-foreground" : "text-muted-foreground"
  }`

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!mobileMenuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !mobileMenuRef.current?.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setMobileMenuOpen(false)
      mobileMenuButtonRef.current?.focus()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-360 items-center gap-6 px-4 sm:px-6">
        <Link to="/" aria-label="Thaana home" className="shrink-0">
          <img src="/logo.svg" alt="Thaana" className="h-10 w-auto dark:invert" />
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary navigation">
          <NavLink to="/docs/introduction" className={navClass}>
            Docs
          </NavLink>
          <NavLink to="/docs/components/input" className={navClass}>
            Components
          </NavLink>
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <ThemeToggle />
          <a
            href="https://github.com/oreofreakshake/thaana"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Thaana on GitHub"
          >
            <GitForkIcon className="size-4" />
          </a>

          <div ref={mobileMenuRef} className="relative md:hidden">
            <button
              ref={mobileMenuButtonRef}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <MenuIcon className="size-5" />
              <span className="sr-only">Open navigation</span>
            </button>
            {mobileMenuOpen && (
              <nav
                id="mobile-navigation"
                className="absolute inset-e-0 top-11 w-64 rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg"
                aria-label="Mobile navigation"
              >
                {docsNavigation.map((section) => (
                  <div key={section.title} className="mb-3 last:mb-0">
                    <p className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </p>
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

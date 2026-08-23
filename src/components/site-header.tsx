import { GitForkIcon } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import { MobileNav } from "@/src/components/mobile-nav"
import { ThemeToggle } from "@/src/components/theme-toggle"

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-foreground ${
    isActive ? "font-medium text-foreground" : "text-muted-foreground"
  }`

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-360 items-center gap-6 px-4 sm:px-6">
        <MobileNav className="flex lg:hidden" />

        <Link to="/" aria-label="Thaana home" className="hidden shrink-0 lg:block">
          <img src="/logo.svg" alt="Thaana" className="h-10 w-auto dark:invert" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
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
        </div>
      </div>
    </header>
  )
}

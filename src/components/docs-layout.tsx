import { NavLink, Outlet } from "react-router-dom"

import { docsNavigation } from "@/src/content/navigation"

export function DocsLayout() {
  return (
    <div className="mx-auto grid max-w-7xl lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden border-e lg:block">
        <nav className="sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto px-6 py-10">
          {docsNavigation.map((section) => (
            <div key={section.title} className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-secondary font-medium text-secondary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <article className="docs-content mx-auto max-w-3xl">
          <Outlet />
        </article>
      </main>
    </div>
  )
}

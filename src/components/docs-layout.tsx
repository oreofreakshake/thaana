import { NavLink, Outlet, useLocation } from "react-router-dom"

import { DocsTableOfContents } from "@/src/components/docs-table-of-contents"
import { docsNavigation, docsOnThisPage } from "@/src/content/navigation"

export function DocsLayout() {
  const { pathname } = useLocation()
  const pageLinks = docsOnThisPage[pathname] ?? []

  return (
    <div className="mx-auto grid max-w-[90rem] lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
      <aside className="hidden lg:block">
        <nav className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto px-5 py-8">
          {docsNavigation.map((section) => (
            <div key={section.title} className="mb-8">
              <p className="mb-2 px-2 text-sm font-semibold text-foreground">{section.title}</p>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `block rounded-md px-2 py-1.5 text-sm transition-colors ${
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
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

      <main className="min-w-0 border-x-0 px-5 py-10 sm:px-8 lg:border-x lg:px-10 lg:py-12 xl:px-12">
        <article className="docs-content mx-auto max-w-[48rem]">
          <Outlet />
        </article>
      </main>

      <aside className="hidden xl:block">
        <nav className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-6 py-10">
          <DocsTableOfContents links={pageLinks} />
        </nav>
      </aside>
    </div>
  )
}

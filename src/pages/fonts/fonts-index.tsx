import { ArrowRightIcon, BadgeCheckIcon, ShieldAlertIcon } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import { getPublicFonts, thaanaFonts } from "@/lib/fonts/registry"

const sample = "ދިވެހި ބަސް ރީތިކޮށް ލިޔުމަށް"

export function FontsIndexPage() {
  useEffect(() => {
    const links = getPublicFonts().map((font) => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = `/fonts/css/${font.slug}.css`
      link.dataset.thaanaFont = font.slug
      document.head.append(link)
      return link
    })
    return () =>
      links.forEach((link) => {
        link.remove()
      })
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Thaana Fonts</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Dhivehi fonts for the web
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Standards based WOFF2 fonts for React, Next.js, and any website. Load only the font you
          need with one CSS URL or a tiny npm import.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border">
        {thaanaFonts.map((font, index) => {
          const weights = font.styles.flatMap((style) =>
            typeof style.weight !== "number"
              ? [`${style.weight[0]}–${style.weight[1]}`]
              : [String(style.weight)]
          )
          const isPublic = font.distribution === "public"

          return (
            <Link
              key={font.slug}
              to={`/fonts/${font.slug}`}
              className={`group block p-6 transition-colors hover:bg-muted/50 sm:p-8 ${
                index > 0 ? "border-t" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight">{font.name}</h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                      {isPublic ? (
                        <BadgeCheckIcon className="size-3.5" />
                      ) : (
                        <ShieldAlertIcon className="size-3.5" />
                      )}
                      {isPublic ? "Ready to use" : "License review"}
                    </span>
                  </div>
                  <p
                    lang="dv"
                    dir="rtl"
                    className="mt-6 text-end text-3xl leading-relaxed sm:text-4xl"
                    style={isPublic ? { fontFamily: `var(--thaana-font-${font.slug})` } : undefined}
                  >
                    {sample}
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
                    <div>
                      <dt className="inline text-foreground">Family: </dt>
                      <dd className="inline">{font.family}</dd>
                    </div>
                    <div>
                      <dt className="inline text-foreground">Weights: </dt>
                      <dd className="inline">
                        {weights.length > 0 ? weights.join(", ") : "Unavailable"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-foreground">Designer: </dt>
                      <dd className="inline">{font.designer ?? "Unknown"}</dd>
                    </div>
                  </dl>
                </div>
                <ArrowRightIcon className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

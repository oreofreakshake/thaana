import { ArrowLeft, ExternalLinkIcon, ShieldAlertIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getFont, getFontWeightOptions } from "@/lib/fonts/registry"
import { CodeBlock } from "@/src/components/code-block"
import { NotFoundPage } from "@/src/pages/not-found"

const defaultSample = "ދިވެހިންގެ ބަހާއި ތާރީޚަކީ ދައުލަތުގެ އަގުހުރި މިރާޘެކެވެ."
const cssOrigin = "https://thaana.yazak.me/fonts/css"

export function FontDetailPage() {
  const { slug = "" } = useParams()
  const font = getFont(slug)
  const weights = useMemo(() => (font ? getFontWeightOptions(font) : []), [font])
  const [previewText, setPreviewText] = useState(defaultSample)
  const [fontSize, setFontSize] = useState(48)
  const [weight, setWeight] = useState(400)

  useEffect(() => {
    if (font?.distribution !== "public") return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = `/fonts/css/${font.slug}.css`
    link.dataset.thaanaFont = font.slug
    document.head.append(link)
    return () => link.remove()
  }, [font])

  useEffect(() => {
    if (weights.length > 0 && !weights.includes(weight)) setWeight(weights[0])
  }, [weight, weights])

  if (!font) return <NotFoundPage />

  const cssUrl = `${cssOrigin}/${font.slug}.css`
  const cssImport = `@import url("${cssUrl}");`
  const cssUsage = `.my-text {\n  font-family: var(--thaana-font-${font.slug});\n}`
  const htmlUsage = `<link\n  rel="stylesheet"\n  href="${cssUrl}"\n/>`
  const npmImport = `import "@thaana/fonts/${font.slug}";`
  const tailwindUsage = `@theme inline {\n  --font-thaana-${font.slug}: var(--thaana-font-${font.slug});\n}`
  const isPublic = font.distribution === "public"

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Link to="/fonts" className="text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft />
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Thaana Fonts</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{font.name}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{font.description}</p>
      </header>

      {!isPublic ? (
        <section className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex gap-3">
            <ShieldAlertIcon className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h2 className="font-semibold">Distribution is disabled</h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                This font remains in the catalogue for research, but it has no public CSS endpoint
                or npm export until its source files and redistribution license are verified.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="mt-12" aria-labelledby="preview-heading">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="preview-heading" className="text-2xl font-semibold tracking-tight">
                  Live preview
                </h2>
                <p className="mt-2 text-muted-foreground">Type in Dhivehi and adjust the font.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <label className="grid gap-1.5 text-sm">
                  <span className="text-muted-foreground">Size: {fontSize}px</span>
                  <input
                    type="range"
                    min="24"
                    max="96"
                    value={fontSize}
                    onChange={(event) => setFontSize(Number(event.target.value))}
                    className="w-36 accent-foreground"
                  />
                </label>
                {weights.length > 1 ? (
                  <div className="grid gap-1.5 text-sm">
                    <span className="text-muted-foreground">Weight</span>
                    <Select
                      value={String(weight)}
                      onValueChange={(value) => setWeight(Number(value))}
                    >
                      <SelectTrigger className="w-28" aria-label="Font weight">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {weights.map((option) => (
                          <SelectItem key={option} value={String(option)}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
              </div>
            </div>
            <Textarea
              aria-label="Dhivehi font preview text"
              lang="dv"
              dir="rtl"
              value={previewText}
              onChange={(event) => setPreviewText(event.target.value)}
              className="min-h-56 resize-y p-6 text-end leading-[1.8]"
              style={{
                fontFamily: `var(--thaana-font-${font.slug})`,
                fontSize,
                fontWeight: weight,
              }}
            />
          </section>

          <div className="docs-content mt-16 border-t pt-4">
            <section id="css-installation">
              <h2>CSS</h2>
              <p>
                Copy this import, then use the stable Thaana font variable anywhere in your CSS.
              </p>
              <CodeBlock language="css">{cssImport}</CodeBlock>
              <CodeBlock language="css">{cssUsage}</CodeBlock>
            </section>

            <section id="html-installation">
              <h2>HTML</h2>
              <p>Use a stylesheet link when you prefer to load the font from document markup.</p>
              <CodeBlock language="html">{htmlUsage}</CodeBlock>
            </section>

            <section id="npm-installation">
              <h2>React and Next.js</h2>
              <CodeBlock language="sh">npm install @thaana/fonts</CodeBlock>
              <CodeBlock>{npmImport}</CodeBlock>
              <p>The package contains CSS only. The WOFF2 binary continues to load remotely.</p>
            </section>

            <section id="tailwind-installation">
              <h2>Tailwind CSS v4</h2>
              <p>Expose the library variable as a Tailwind font token without a custom plugin.</p>
              <CodeBlock language="css">{tailwindUsage}</CodeBlock>
              <p>
                This creates <code>font-thaana-{font.slug}</code>. Loading a font does not change
                text direction; set RTL separately in your document or component.
              </p>
            </section>
          </div>
        </>
      )}

      <section className="mt-16 border-t pt-10" aria-labelledby="metadata-heading">
        <h2 id="metadata-heading" className="text-2xl font-semibold tracking-tight">
          About this font
        </h2>
        <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
          <Metadata label="Family" value={font.family} />
          <Metadata label="Designer" value={font.designer ?? "Unknown"} />
          <Metadata label="License" value={font.license} href={font.licenseUrl} />
          <Metadata
            label="Source"
            value={font.sourceUrl ? "View source" : "Unknown"}
            href={font.sourceUrl}
          />
        </dl>
      </section>
    </main>
  )
}

function Metadata({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">
        {href ? (
          <a href={href} className="inline-flex items-center gap-1.5 hover:underline">
            {value} <ExternalLinkIcon className="size-3.5" />
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

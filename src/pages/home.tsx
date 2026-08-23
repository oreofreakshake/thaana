import { ArrowRightIcon, ChevronRightIcon, GitForkIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DvInput } from "@/registry/components/dv-input"
import { DvSelect } from "@/registry/components/dv-select"
import { TerminalCommand } from "@/src/components/terminal-command"
import { installInputCommands } from "@/src/content/code-examples"

const cardClass = "mb-5 break-inside-avoid rounded-2xl border bg-showcase p-5 sm:p-6"

const contributionWeeks = [
  [0, 1, 0, 2, 0, 3, 1],
  [1, 2, 0, 1, 3, 2, 0],
  [0, 3, 2, 4, 1, 0, 2],
  [2, 1, 3, 2, 4, 1, 0],
  [0, 2, 4, 3, 2, 1, 3],
  [1, 3, 2, 4, 3, 2, 1],
  [2, 4, 3, 2, 4, 3, 0],
  [0, 2, 1, 3, 2, 4, 2],
  [1, 3, 4, 2, 3, 1, 0],
  [0, 1, 3, 4, 2, 3, 1],
  [2, 3, 2, 4, 3, 0, 2],
  [1, 4, 3, 2, 4, 2, 1],
  [0, 2, 4, 3, 1, 3, 2],
  [2, 3, 1, 4, 2, 4, 1],
  [1, 2, 3, 2, 4, 3, 0],
  [0, 3, 4, 1, 3, 2, 1],
]

const contributionTone = [
  "bg-background/55",
  "bg-primary/15",
  "bg-primary/35",
  "bg-primary/60",
  "bg-primary",
]

function ContributionWeek({ levels }: { levels: number[] }) {
  const occurrences = new Map<number, number>()

  return (
    <div className="grid gap-1.5">
      {levels.map((level) => {
        const occurrence = (occurrences.get(level) ?? 0) + 1
        occurrences.set(level, occurrence)

        return (
          <span
            key={`${level}-${occurrence}`}
            className={`aspect-square rounded-[3px] border border-border/45 ${contributionTone[level]}`}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

function IslandSelect({ labelId }: { labelId: string }) {
  return (
    <DvSelect>
      <SelectTrigger aria-labelledby={labelId} lang="dv" className="w-full bg-background/40">
        <SelectValue placeholder="ރަށެއް ހޮވާ" />
      </SelectTrigger>
      <SelectContent lang="dv">
        <SelectItem value="male">މާލެ</SelectItem>
        <SelectItem value="hulhumale">ހުޅުމާލެ</SelectItem>
        <SelectItem value="addu">އައްޑޫ ސިޓީ</SelectItem>
      </SelectContent>
    </DvSelect>
  )
}

export function HomePage() {
  return (
    <main>
      <section>
        <div className="mx-auto flex max-w-360 flex-col items-center px-6 py-16 text-center md:py-24 lg:py-28">
          <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The Foundation for Dhivehi Interfaces
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
            RTL-aware React components that you can install, customize, and build on. Open Source.
            Open Code. Made for Thaana.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/docs/introduction"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              to="/docs/components/input"
              className="inline-flex h-9 items-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              View Components
            </Link>
            <a
              href="https://github.com/oreofreakshake/thaana"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Thaana on GitHub"
            >
              <GitForkIcon className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[82rem]">
          <div className="home-showcase-mask columns-1 gap-5 md:columns-2 xl:columns-3">
            <section
              lang="dv"
              dir="rtl"
              className={cardClass}
              aria-labelledby="showcase-controls-title"
            >
              <h2 id="showcase-controls-title" className="sr-only">
                Component controls
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="h-8 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"
                >
                  ރައްކާ ކުރައްވާ
                </button>
                <button
                  type="button"
                  className="h-8 rounded-md bg-secondary px-3 text-xs font-medium"
                >
                  ކެންސަލް
                </button>
                <button
                  type="button"
                  className="h-8 rounded-md border bg-background/30 px-3 text-xs font-medium"
                >
                  އިތުރު
                </button>
              </div>
              <div className="mt-6 grid gap-4">
                <DvInput placeholder="ނަން ލިޔުއްވާ" className="bg-background/35" />
                <textarea
                  lang="dv"
                  dir="rtl"
                  aria-label="މެސެޖް"
                  placeholder="މެސެޖް ލިޔުއްވާ"
                  className="min-h-24 resize-none rounded-md border border-input bg-background/35 px-3 py-2 text-start text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] text-primary-foreground">
                  އާ
                </span>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full border-2 border-foreground" />
                  <span className="size-4 rounded-full bg-muted-foreground/35" />
                  <span className="flex h-5 w-9 items-center justify-end rounded-full bg-primary p-0.5">
                    <span className="size-4 rounded-full bg-primary-foreground" />
                  </span>
                </div>
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="island-title">
              <h2 id="island-title" className="text-xl font-normal">
                ރަށް ހޮވުން
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">ކަސްޓަމަރު ދިރިއުޅޭ ރަށް ހޮވާ</p>
              <div className="mt-5 grid gap-2">
                <span id="home-island-card-label" className="text-sm font-medium">
                  ރަށް
                </span>
                <IslandSelect labelId="home-island-card-label" />
              </div>
              <div className="mt-5 divide-y rounded-lg border bg-background/25 text-sm">
                {[
                  ["މާލެ", "MLE"],
                  ["ހުޅުމާލެ", "HML"],
                  ["އައްޑޫ ސިޓީ", "ADD"],
                ].map(([name, code]) => (
                  <div key={code} className="flex items-center justify-between px-3 py-2.5">
                    <span>{name}</span>
                    <bdi lang="en" dir="ltr" className="font-mono text-xs text-muted-foreground">
                      {code}
                    </bdi>
                  </div>
                ))}
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="amount-title">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ފައިސާ ނެގުމުގެ މިން
              </p>
              <h2
                id="amount-title"
                lang="en"
                dir="ltr"
                className="mt-3 text-end text-3xl font-semibold tracking-tight"
              >
                MVR 2,500.00
              </h2>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>MVR 50</span>
                <span>MVR 10,000</span>
              </div>
              <DvInput
                lang="en"
                dir="ltr"
                inputMode="decimal"
                defaultValue="2500.00"
                className="mt-6 bg-background/35"
              />
              <button
                type="button"
                className="mt-3 h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground"
              >
                މިން ރައްކާ ކުރައްވާ
              </button>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="customer-title">
              <h2 id="customer-title" className="text-xl font-normal">
                ކަސްޓަމަރ ތަފްޞީލް
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">ކަސްޓަމަރުގެ މަޢުލޫމާތު އެޑިޓް ކުރައްވާ</p>
              <div className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="home-customer-name" className="text-sm font-medium">
                    ނަން
                  </label>
                  <DvInput
                    id="home-customer-name"
                    placeholder="ނަން ލިޔުއްވާ"
                    className="bg-background/35"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="home-customer-email" className="text-sm font-medium">
                    އީމެއިލް
                  </label>
                  <DvInput
                    id="home-customer-email"
                    type="email"
                    lang="en"
                    dir="ltr"
                    placeholder="support@example.com"
                    className="bg-background/35"
                  />
                </div>
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="activity-title">
              <h2 id="activity-title" className="font-semibold">
                ޙިއްޞާވެރިވި ތާރީޚު
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">ފަހުގެ ހަ މަހުގެ ހަރަކާތް</p>
              <div dir="ltr" className="mt-7">
                <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1.5">
                  {contributionWeeks.map((week) => (
                    <ContributionWeek key={week.join("-")} levels={week} />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  ޖުމްލަ ޙިއްޞާ: <bdi lang="en">284</bdi>
                </span>
                <span className="flex items-center gap-1.5">
                  މަދު
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`size-3 rounded-[2px] border border-border/45 ${contributionTone[level]}`}
                    />
                  ))}
                  ގިނަ
                </span>
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="access-title">
              <h2 id="access-title" className="font-semibold">
                އެކައުންޓް ސެކިއުރިޓީ
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                ލޮގިން މަޢުލޫމާތު ބަދަލުކުރުމަށް ނުވަތަ އަލުން ލޮގިން ކުރުމަށް.
              </p>
              <div className="mt-6 grid gap-4">
                <DvInput lang="en" dir="ltr" type="email" placeholder="artist@studio.mv" />
                <DvInput type="password" placeholder="ޕާސްވޯޑް" />
              </div>
              <button
                type="button"
                className="mt-4 h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                ސެކިއުރިޓީ އަޕްޑޭޓް ކުރައްވާ
              </button>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="install-title">
              <h2 id="install-title" className="font-semibold">
                ރެޖިސްޓްރީން އިންސްޓޯލް ކުރުން
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                ޕެކޭޖް މެނޭޖަރ ހޮވައި ކޮމްޕޯނެންޓް ޕްރޮޖެކްޓަށް އިންސްޓޯލް ކުރައްވާ.
              </p>
              <TerminalCommand commands={installInputCommands} className="mb-0 mt-5" />
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="contacts-title">
              <h2 id="contacts-title" className="font-semibold">
                ދެ ދިމާލުގެ ލިޔުން
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">ދިވެހި ލޭބަލްތަކާއި ލެޓިން އަގުތައް.</p>
              <div lang="dv" dir="rtl" className="mt-5 divide-y rounded-lg border bg-background/25">
                {[
                  ["އީމެއިލް", "support@example.com"],
                  ["ފޯނު", "+960 777-1234"],
                  ["ޖުމްލަ", "MVR 1,250.00"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 px-3 py-3 text-sm"
                  >
                    <span>{label}</span>
                    <bdi lang="en" dir="ltr" className="text-muted-foreground">
                      {value}
                    </bdi>
                  </div>
                ))}
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="settings-title">
              <h2 id="settings-title" className="font-semibold">
                ނޮޓިފިކޭޝަން ސެޓިންގސް
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">ލިބެން ބޭނުން ނޮޓިފިކޭޝަންތައް ހޮވާ.</p>
              <div className="mt-5 divide-y">
                {[
                  ["ފައިސާގެ އެލާޓް", "ޑިޕޮޒިޓް އަދި ޓްރާންސްފަރ", true],
                  ["ސެކިއުރިޓީ އެލާޓް", "ލޮގިން އަދި އެކައުންޓް ބަދަލު", true],
                  ["މާކެޓް އަޕްޑޭޓް", "ދުވަހުގެ ޚުލާޞާ", false],
                ].map(([title, description, checked]) => (
                  <label
                    key={String(title)}
                    className="flex cursor-pointer items-center gap-4 py-4"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{title}</span>
                      <span className="block text-xs text-muted-foreground">{description}</span>
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={Boolean(checked)}
                      className="size-4 accent-foreground"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section lang="dv" dir="rtl" className={cardClass} aria-labelledby="navigation-title">
              <p className="text-xs text-muted-foreground">ސެޓިންގސް / ފައިސާ</p>
              <h2 id="navigation-title" className="mt-4 font-semibold">
                ފައިސާގެ އިޚްތިޔާރުތައް
              </h2>
              <div className="mt-4 space-y-2">
                {["ޓްރާންސްފަރ ލިމިޓް ބަދަލުކުރުން", "ޝެޑިއުލްކޮށްފައިވާ ޓްރާންސްފަރ", "މުޢާމަލާތް އަލުން ހިންގުން"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border bg-background/25 px-4 py-3 text-start text-sm transition-colors hover:bg-background/50"
                  >
                    {item}
                    <ChevronRightIcon className="size-4 rotate-180 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <footer className="relative z-10 -mt-20 pb-12 pt-6 text-center text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/oreofreakshake"
              className="text-foreground underline underline-offset-4"
            >
              oreo
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/oreofreakshake/thaana"
              className="text-foreground underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </footer>
        </div>
      </section>
    </main>
  )
}

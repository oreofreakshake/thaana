import {
  ArrowRightIcon,
  CodeXmlIcon,
  GitForkIcon,
  LanguagesIcon,
  MoveHorizontalIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

const principles = [
  {
    icon: LanguagesIcon,
    title: "Dhivehi first",
    text: "Sensible Thaana language and direction defaults without translating upstream shadcn primitives.",
  },
  {
    icon: MoveHorizontalIcon,
    title: "Bidi aware",
    text: "Patterns for interfaces where Dhivehi lives beside names, emails, phone numbers, and MVR values.",
  },
  {
    icon: CodeXmlIcon,
    title: "React native",
    text: "Small TypeScript components that compose shadcn and install through the same CLI workflow.",
  },
]

export function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            A Dhivehi-first UI system built on shadcn.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
            Installable React components designed for Thaana, right-to-left behavior, and the
            mixed-direction interfaces Maldivian products use every day.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/docs/introduction"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Documentation
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              to="/docs/components/input"
              className="inline-flex h-11 items-center rounded-lg border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Components
            </Link>
            <a
              href="https://github.com/oreofreakshake/thaana"
              className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitForkIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        <div lang="dv" dir="rtl" className="relative">
          <div className="absolute -inset-6 -z-10 rounded-4xl bg-secondary/70" />
          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-sm text-muted-foreground">ތާނަ އިންޓަރފޭސް</p>
            <p className="mt-5 text-3xl font-normal leading-relaxed">ދިވެހިން ހަދާ ވެބް އެޕްތަކަށް</p>
            <div className="mt-8 border-t pt-5 text-sm text-muted-foreground">
              <bdi lang="en" dir="ltr">
                MVR 1,250.00
              </bdi>
              <span className="mx-3">·</span>
              <bdi lang="en">Ahmed</bdi>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-card/50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Designed for real interfaces
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Direction is part of the component contract.
            </h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card p-6">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

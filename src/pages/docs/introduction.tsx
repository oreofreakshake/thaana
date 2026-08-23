import { DocsPage } from "@/src/components/docs-page"

export function IntroductionPage() {
  return (
    <DocsPage
      title="Introduction"
      description="Thaana is a small, open-source registry for building Dhivehi-first React interfaces with shadcn."
    >
      <section id="what-thaana-solves">
        <h2>What Thaana solves</h2>
        <p>
          A component can look mirrored and still behave incorrectly in a real RTL interface. Thaana
          focuses on the details that matter for Dhivehi products: reading direction, portal
          behavior, logical alignment, and content that mixes Thaana with Latin text and numbers.
        </p>
        <p>
          Components install through the shadcn CLI and live in your application. They remain
          ordinary React and TypeScript source that you can inspect and change.
        </p>
      </section>

      <section id="built-on-shadcn">
        <h2>Built on shadcn</h2>
        <p>
          Thaana composes existing shadcn primitives instead of replacing accessible behavior or
          maintaining parallel implementations. A registry component adds a focused Dhivehi or RTL
          contract only where that contract is useful.
        </p>
      </section>

      <section id="current-scope">
        <h2>Current scope</h2>
        <ul>
          <li>React and TypeScript projects.</li>
          <li>Tailwind CSS and shadcn primitives.</li>
          <li>Framework-neutral component source.</li>
          <li>No localization framework or application-wide Thaana provider.</li>
        </ul>
      </section>
    </DocsPage>
  )
}

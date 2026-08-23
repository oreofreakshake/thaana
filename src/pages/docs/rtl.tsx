import { CodeBlock } from "@/src/components/code-block"
import { DocsPage } from "@/src/components/docs-page"
import { directionProvider, documentDirection } from "@/src/content/code-examples"

export function RtlPage() {
  return (
    <DocsPage
      title="RTL architecture"
      description="Thaana uses browser direction, shadcn configuration, and local component defaults as separate, complementary layers."
      eyebrow="Foundation"
    >
      <section>
        <h2>Document direction</h2>
        <p>
          A Dhivehi application should declare its language and reading direction at the document
          root. This gives native controls, text layout, and portals the correct inheritance.
        </p>
        <CodeBlock language="html">{documentDirection}</CodeBlock>
      </section>

      <section>
        <h2>Primitive direction</h2>
        <p>
          Radix components such as Select use direction for positioning and behavior. Shadcn&apos;s
          DirectionProvider supplies that value once at the React root without introducing a Thaana
          context.
        </p>
        <CodeBlock>{directionProvider}</CodeBlock>
      </section>

      <section>
        <h2>Logical CSS</h2>
        <p>
          The registry enables shadcn RTL transforms. Prefer logical utilities such as{" "}
          <code>ps-4</code>, <code>end-2</code>, <code>text-start</code>, and <code>text-end</code>{" "}
          when writing project code.
        </p>
      </section>

      <section>
        <h2>Local defaults and portals</h2>
        <p>
          Thaana components keep narrow local defaults where they are meaningful. DvInput sets
          native language and direction. DvSelect sets the Radix Select Root direction, which
          reaches its portalled content. Components whose root does not propagate direction should
          place it directly on their portal content rather than adding another provider.
        </p>
      </section>
    </DocsPage>
  )
}

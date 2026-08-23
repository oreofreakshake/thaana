import { CodeBlock } from "@/src/components/code-block"
import { ComponentPreview } from "@/src/components/component-preview"
import { DocsPage } from "@/src/components/docs-page"
import { bidiExamples } from "@/src/content/code-examples"

export function BidirectionalContentPage() {
  return (
    <DocsPage
      title="Bidirectional content"
      description="Use native HTML direction and isolation for interfaces that combine Dhivehi with Latin text, numbers, and punctuation."
      eyebrow="Foundation"
    >
      <section id="known-ltr-values">
        <h2>Known LTR values</h2>
        <p>
          Email addresses, URLs, phone numbers, codes, and complete formatted MVR values should
          usually remain one left-to-right token. This preserves punctuation and number order inside
          an RTL sentence.
        </p>
        <CodeBlock>{bidiExamples}</CodeBlock>
        <ComponentPreview>
          <div
            lang="dv"
            dir="rtl"
            className="w-full max-w-md rounded-xl border bg-card p-6 text-start"
          >
            <dl className="grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-5">
                <dt>އީމެއިލް</dt>
                <dd lang="en" dir="ltr" className="text-muted-foreground">
                  support@example.com
                </dd>
              </div>
              <div className="flex items-center justify-between gap-5">
                <dt>ފޯނު</dt>
                <dd lang="en" dir="ltr" className="text-muted-foreground">
                  +960 777-1234
                </dd>
              </div>
              <div className="flex items-center justify-between gap-5">
                <dt>ޖުމްލަ</dt>
                <dd className="font-mono text-muted-foreground">
                  <bdi lang="en" dir="ltr">
                    MVR 1,250.00
                  </bdi>
                </dd>
              </div>
            </dl>
          </div>
        </ComponentPreview>
      </section>

      <section id="unknown-direction">
        <h2>Unknown direction</h2>
        <p>
          Use <code>&lt;bdi&gt;</code> for an inline value such as a user-generated name so it
          cannot reorder surrounding punctuation. Use <code>dir=&quot;auto&quot;</code> on inputs,
          textareas, or blocks when the first strong character should determine their base
          direction.
        </p>
      </section>

      <section id="alignment">
        <h2>Alignment</h2>
        <p>
          Keep layout direction-independent with <code>text-start</code> and <code>text-end</code>.
          Avoid reconstructing browser bidi behavior with JavaScript or reversing strings.
        </p>
      </section>
    </DocsPage>
  )
}

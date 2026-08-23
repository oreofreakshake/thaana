import type { ReactNode } from "react"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DvInput } from "@/registry/components/dv-input"
import { DvSelect } from "@/registry/components/dv-select"
import { DvInputDemo } from "@/registry/examples/dv-input-demo"
import { DvSelectDemo } from "@/registry/examples/dv-select-demo"
import { CodeBlock } from "@/src/components/code-block"
import { ComponentPreview } from "@/src/components/component-preview"
import { DocsPage } from "@/src/components/docs-page"
import { inputUsage, installInput, installSelect, selectUsage } from "@/src/content/code-examples"

type ComponentPageProps = {
  name: string
  description: string
  preview: ReactNode
  installCommand: string
  usage: string
  rtlBehavior: ReactNode
  mixedDirectionExample: ReactNode
}

function ComponentPage({
  name,
  description,
  preview,
  installCommand,
  usage,
  rtlBehavior,
  mixedDirectionExample,
}: ComponentPageProps) {
  return (
    <DocsPage title={name} description={description} eyebrow="Component">
      <section>
        <h2>Preview</h2>
        <ComponentPreview>{preview}</ComponentPreview>
      </section>

      <section>
        <h2>Installation</h2>
        <CodeBlock language="shell">{installCommand}</CodeBlock>
      </section>

      <section>
        <h2>Usage</h2>
        <CodeBlock>{usage}</CodeBlock>
      </section>

      <section>
        <h2>RTL behavior</h2>
        {rtlBehavior}
      </section>

      <section>
        <h2>Mixed-direction example</h2>
        <p>
          Keep known Latin tokens explicitly LTR while the surrounding label and layout remain
          Dhivehi.
        </p>
        <ComponentPreview>{mixedDirectionExample}</ComponentPreview>
      </section>
    </DocsPage>
  )
}

export function InputPage() {
  return (
    <ComponentPage
      name="DvInput"
      description="A shadcn Input with small, overrideable defaults for Dhivehi language, RTL direction, and logical alignment."
      preview={<DvInputDemo />}
      installCommand={installInput}
      usage={inputUsage}
      rtlBehavior={
        <p>
          DvInput defaults to <code>lang=&quot;dv&quot;</code>, <code>dir=&quot;rtl&quot;</code>,
          and logical <code>textAlign: &quot;start&quot;</code>. Normal React input props can
          override each default. It does not need DirectionProvider because it renders a native
          input.
        </p>
      }
      mixedDirectionExample={
        <div lang="dv" dir="rtl" className="grid w-full max-w-sm gap-5">
          <div className="grid gap-2">
            <label htmlFor="docs-email" className="text-sm font-medium">
              އީމެއިލް
            </label>
            <DvInput
              id="docs-email"
              type="email"
              lang="en"
              dir="ltr"
              placeholder="support@example.com"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border bg-muted/35 px-4 py-3 text-sm">
            <span>ޖުމްލަ</span>
            <bdi lang="en" dir="ltr" className="font-mono">
              MVR 1,250.00
            </bdi>
          </div>
        </div>
      }
    />
  )
}

export function SelectPage() {
  return (
    <ComponentPage
      name="DvSelect"
      description="A shadcn Select that gives the direction-aware Radix Root an overrideable RTL default."
      preview={<DvSelectDemo />}
      installCommand={installSelect}
      usage={selectUsage}
      rtlBehavior={
        <p>
          DvSelect defaults the Radix Select Root to <code>dir=&quot;rtl&quot;</code>. Radix uses
          that direction for popup positioning and propagates it into portalled Select content.
          Apply <code>lang=&quot;dv&quot;</code> to DOM-rendering parts such as SelectTrigger and
          SelectContent, or inherit language from the document.
        </p>
      }
      mixedDirectionExample={
        <div lang="dv" dir="rtl" className="grid w-full max-w-sm gap-2">
          <span id="docs-customer-label" className="text-sm font-medium">
            ކަސްޓަމަރ
          </span>
          <DvSelect>
            <SelectTrigger aria-labelledby="docs-customer-label" lang="dv" className="w-full">
              <SelectValue placeholder="ކަސްޓަމަރެއް ހޮވާ" />
            </SelectTrigger>
            <SelectContent lang="dv">
              <SelectItem value="ahmed">
                <bdi lang="en">Ahmed</bdi>
              </SelectItem>
              <SelectItem value="maryam">
                <bdi>މަރްޔަމް</bdi>
              </SelectItem>
              <SelectItem value="sara">
                <bdi lang="en">Sara Mohamed</bdi>
              </SelectItem>
            </SelectContent>
          </DvSelect>
        </div>
      }
    />
  )
}

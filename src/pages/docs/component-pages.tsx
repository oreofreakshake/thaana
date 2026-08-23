import type { ReactNode } from "react"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DvInput } from "@/registry/components/dv-input"
import { DvSelect } from "@/registry/components/dv-select"
import { DvInputDemo } from "@/registry/examples/dv-input-demo"
import { DvSelectDemo } from "@/registry/examples/dv-select-demo"
import { CodeBlock } from "@/src/components/code-block"
import { ComponentExample } from "@/src/components/component-example"
import { DocsPage } from "@/src/components/docs-page"
import { type PackageCommands, TerminalCommand } from "@/src/components/terminal-command"
import {
  inputUsage,
  installInputCommands,
  installSelectCommands,
  selectUsage,
} from "@/src/content/code-examples"

type ComponentPageProps = {
  name: string
  description: string
  preview: ReactNode
  previewCode: string
  installCommands: PackageCommands
  usage: string
  rtlBehavior: ReactNode
  children: ReactNode
}

export function ComponentPage({
  name,
  description,
  preview,
  previewCode,
  installCommands,
  usage,
  rtlBehavior,
  children,
}: ComponentPageProps) {
  return (
    <DocsPage title={name} description={description} eyebrow="Components">
      <ComponentExample code={previewCode}>{preview}</ComponentExample>

      <section id="installation">
        <h2>Installation</h2>
        <TerminalCommand commands={installCommands} />
      </section>

      <section id="usage">
        <h2>Usage</h2>
        <CodeBlock>{usage}</CodeBlock>
      </section>

      <section id="examples">
        <h2>Examples</h2>
        {children}
      </section>

      <section id="rtl-behavior">
        <h2>RTL behavior</h2>
        {rtlBehavior}
      </section>
    </DocsPage>
  )
}

const inputPreviewCode = `import { DvInput } from "@/components/dv-input"

export function DvInputDemo() {
  return (
    <div lang="dv" dir="rtl" className="grid max-w-sm gap-2">
      <label htmlFor="name">ނަން</label>
      <DvInput id="name" placeholder="ނަން ލިޔުއްވާ" />
    </div>
  )
}`

const disabledInputCode = `<DvInput disabled placeholder="މި ފީލްޑް ބަންދު" />`

const ltrInputCode = `<div lang="dv" dir="rtl">
  <label htmlFor="email">އީމެއިލް</label>
  <DvInput
    id="email"
    type="email"
    lang="en"
    dir="ltr"
    placeholder="support@example.com"
  />
</div>`

export function InputPage() {
  return (
    <ComponentPage
      name="DvInput"
      description="A shadcn Input with small, overrideable defaults for Dhivehi language, RTL direction, and logical alignment."
      preview={<DvInputDemo />}
      previewCode={inputPreviewCode}
      installCommands={installInputCommands}
      usage={inputUsage}
      rtlBehavior={
        <p>
          DvInput defaults to <code>lang=&quot;dv&quot;</code>, <code>dir=&quot;rtl&quot;</code>,
          and logical <code>textAlign: &quot;start&quot;</code>. Normal React input props can
          override each default. It does not need DirectionProvider because it renders a native
          input.
        </p>
      }
    >
      <div id="disabled" className="scroll-m-20">
        <h3>Disabled</h3>
        <p>Use the native disabled state without changing the Dhivehi defaults.</p>
        <ComponentExample code={disabledInputCode} className="min-h-56">
          <div lang="dv" dir="rtl" className="w-full max-w-sm">
            <DvInput disabled placeholder="މި ފީލްޑް ބަންދު" />
          </div>
        </ComponentExample>
      </div>

      <div id="ltr-values" className="scroll-m-20">
        <h3>LTR values</h3>
        <p>
          Override language and direction for email addresses, phone numbers, URLs, and other known
          left-to-right values.
        </p>
        <ComponentExample code={ltrInputCode} className="min-h-64">
          <div lang="dv" dir="rtl" className="grid w-full max-w-sm gap-5">
            <div className="grid gap-2">
              <label htmlFor="example-email" className="text-sm font-medium">
                އީމެއިލް
              </label>
              <DvInput
                id="example-email"
                type="email"
                lang="en"
                dir="ltr"
                placeholder="support@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="example-phone" className="text-sm font-medium">
                ފޯނު ނަންބަރު
              </label>
              <DvInput
                id="example-phone"
                type="tel"
                lang="en"
                dir="ltr"
                placeholder="+960 777-1234"
              />
            </div>
          </div>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

const selectPreviewCode = `import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DvSelect } from "@/components/dv-select"

export function DvSelectDemo() {
  return (
    <DvSelect>
      <SelectTrigger lang="dv" className="w-full">
        <SelectValue placeholder="ރަށެއް ހޮވާ" />
      </SelectTrigger>
      <SelectContent lang="dv">
        <SelectItem value="male">މާލެ</SelectItem>
        <SelectItem value="addu">އައްޑޫ ސިޓީ</SelectItem>
      </SelectContent>
    </DvSelect>
  )
}`

const disabledSelectCode = `<DvSelect disabled>
  <SelectTrigger lang="dv">
    <SelectValue placeholder="ރަށެއް ހޮވާ" />
  </SelectTrigger>
</DvSelect>`

const mixedSelectCode = `<DvSelect>
  <SelectTrigger lang="dv">
    <SelectValue placeholder="ކަސްޓަމަރެއް ހޮވާ" />
  </SelectTrigger>
  <SelectContent lang="dv">
    <SelectItem value="ahmed"><bdi lang="en">Ahmed</bdi></SelectItem>
    <SelectItem value="maryam"><bdi>މަރްޔަމް</bdi></SelectItem>
    <SelectItem value="sara"><bdi lang="en">Sara Mohamed</bdi></SelectItem>
  </SelectContent>
</DvSelect>`

export function SelectPage() {
  return (
    <ComponentPage
      name="DvSelect"
      description="A shadcn Select that gives the direction-aware Radix Root an overrideable RTL default."
      preview={<DvSelectDemo />}
      previewCode={selectPreviewCode}
      installCommands={installSelectCommands}
      usage={selectUsage}
      rtlBehavior={
        <p>
          DvSelect defaults the Radix Select Root to <code>dir=&quot;rtl&quot;</code>. Radix uses
          that direction for popup positioning and propagates it into portalled Select content.
          Apply <code>lang=&quot;dv&quot;</code> to DOM-rendering parts such as SelectTrigger and
          SelectContent, or inherit language from the document.
        </p>
      }
    >
      <div id="disabled" className="scroll-m-20">
        <h3>Disabled</h3>
        <p>Disable selection while retaining the same RTL trigger layout.</p>
        <ComponentExample code={disabledSelectCode} className="min-h-56">
          <div lang="dv" dir="rtl" className="w-full max-w-sm">
            <DvSelect disabled>
              <SelectTrigger lang="dv" className="w-full">
                <SelectValue placeholder="ރަށެއް ހޮވާ" />
              </SelectTrigger>
            </DvSelect>
          </div>
        </ComponentExample>
      </div>

      <div id="mixed-direction-options" className="scroll-m-20">
        <h3>Mixed-direction options</h3>
        <p>Isolate user names so Latin and Thaana options remain stable in the same menu.</p>
        <ComponentExample code={mixedSelectCode} className="min-h-64">
          <div lang="dv" dir="rtl" className="grid w-full max-w-sm gap-2">
            <span id="example-customer-label" className="text-sm font-medium">
              ކަސްޓަމަރ
            </span>
            <DvSelect>
              <SelectTrigger aria-labelledby="example-customer-label" lang="dv" className="w-full">
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
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

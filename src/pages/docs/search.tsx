import { RufiyaaSymbol } from "@/registry/components/dv-currency-input"
import { DvSearch, getTextDirection } from "@/registry/components/dv-search"
import { DvSearchDemo } from "@/registry/examples/dv-search-demo"
import { ComponentExample } from "@/src/components/component-example"
import { installSearchCommands, searchUsage } from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const searchPreviewCode = `import { useState } from "react"

import { DvSearch, getTextDirection } from "@/components/dv-search"

export function DvSearchDemo() {
  const [query, setQuery] = useState("އަހުމަދު")
  const direction = getTextDirection(query)

  return (
    <div lang="dv" dir="rtl">
      <DvSearch
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <div dir={direction}>{/* Results */}</div>
    </div>
  )
}`

const englishQueryCode = `<DvSearch
  aria-label="Search customers"
  defaultValue="Ahmed"
/>

<div dir={getTextDirection("Ahmed")}>
  <bdi lang="en">Ahmed Ali</bdi>
</div>`

const mixedDataCode = `<div dir={getTextDirection(query)}>
  <bdi dir="auto">އަހުމަދު</bdi>
  <bdi dir="auto">Ahmed Ali</bdi>
  <span dir="ltr">ahmed@example.com</span>
  <span dir="ltr">+960 7771234</span>
  <bdi dir="ltr">MVR 1,250.00</bdi>
</div>`

export function SearchPage() {
  return (
    <ComponentPage
      name="DvSearch"
      description="A native search input that follows the first strong character in mixed Thaana and Latin queries."
      preview={<DvSearchDemo />}
      previewCode={searchPreviewCode}
      installCommands={installSearchCommands}
      usage={searchUsage}
      rtlBehavior={
        <div className="space-y-4">
          <p>
            The input defaults to <code>lang=&quot;dv&quot;</code> and native
            <code>dir=&quot;auto&quot;</code>, so the browser controls caret and text direction from
            the first strong character. Pass <code>dir=&quot;ltr&quot;</code> or
            <code>dir=&quot;rtl&quot;</code> to override it.
          </p>
          <p>
            <code>getTextDirection</code> is only for optional result-layout direction. Result
            fields still need their own isolation with <code>bdi</code> or an explicit direction.
            Queries containing only numbers, punctuation, or emoji fall back to LTR.
          </p>
        </div>
      }
    >
      <div id="english-query" className="scroll-m-20">
        <h3>English query</h3>
        <p>Latin text makes both the native input and this optional result surface LTR.</p>
        <ComponentExample code={englishQueryCode} className="min-h-64">
          <div lang="dv" dir="rtl" className="grid w-full max-w-sm gap-3">
            <DvSearch aria-label="Search customers" defaultValue="Ahmed" />
            <div
              dir={getTextDirection("Ahmed")}
              className="rounded-md border bg-background/40 px-3 py-2 text-sm"
            >
              <bdi lang="en">Ahmed Ali</bdi>
            </div>
          </div>
        </ComponentExample>
      </div>

      <div id="mixed-data" className="scroll-m-20">
        <h3>Mixed real-world data</h3>
        <p>
          Query direction can control the result layout, but each unknown or known-LTR value remains
          isolated independently.
        </p>
        <ComponentExample code={mixedDataCode} className="min-h-80">
          <div lang="dv" dir="rtl" className="grid w-full max-w-md gap-3">
            <DvSearch aria-label="ހޯދާ" defaultValue="އަހުމަދު Ahmed" />
            <div
              dir={getTextDirection("އަހުމަދު Ahmed")}
              className="grid gap-2 rounded-md border bg-background/40 p-3 text-sm"
            >
              <bdi dir="auto">އަހުމަދު</bdi>
              <bdi dir="auto" lang="en">
                Ahmed Ali
              </bdi>
              <span dir="ltr" lang="en">
                ahmed@example.com
              </span>
              <span dir="ltr" lang="en">
                +960 7771234
              </span>
              <span dir="ltr" lang="en" className="inline-flex items-center gap-1.5">
                <span className="sr-only">MVR</span>
                <RufiyaaSymbol className="h-3.5 w-5" />
                <span className="tabular-nums">1,250.00</span>
              </span>
            </div>
          </div>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

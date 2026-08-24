import { Invoice01 } from "@/registry/blocks/invoice-01"
import { CodeBlock } from "@/src/components/code-block"
import { DocsPage } from "@/src/components/docs-page"
import { TerminalCommand } from "@/src/components/terminal-command"
import { installInvoiceCommands } from "@/src/content/code-examples"

const exampleUsage = `import { Invoice01 } from "@/components/invoice-01"

export function InvoicePage() {
  return <Invoice01 />
}`

export function InvoicePage() {
  return (
    <DocsPage
      title="Invoice"
      description="A realistic Dhivehi invoice workflow with editable Rufiyaa line items and mixed-direction customer details."
      eyebrow="Blocks"
    >
      <section id="live-block">
        <h2>Live block</h2>
        <p>
          Choose a customer, edit item quantities and prices, add rows, adjust tax, and inspect the
          totals. The data and actions are intentionally local mock behavior.
        </p>
        <div className="my-6 overflow-hidden rounded-lg bg-showcase/45 p-2 sm:p-4">
          <Invoice01 />
        </div>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <TerminalCommand commands={installInvoiceCommands} />
        <CodeBlock>{exampleUsage}</CodeBlock>
      </section>

      <section id="architecture">
        <h2>Architecture</h2>
        <p>
          This block composes DvCombobox, DvFormField, DvInput, DvPhoneInput, DvCurrencyInput, and
          DvDataTable. It demonstrates invoice UI and bidi boundaries without pretending to be an
          accounting engine or prescribing persistence, tax, or numbering rules.
        </p>
      </section>
    </DocsPage>
  )
}

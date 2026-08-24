import { CustomerManagement01 } from "@/registry/blocks/customer-management-01"
import { CodeBlock } from "@/src/components/code-block"
import { DocsPage } from "@/src/components/docs-page"
import { TerminalCommand } from "@/src/components/terminal-command"
import { installCustomerManagementCommands } from "@/src/content/code-examples"

const exampleUsage = `import { CustomerManagement01 } from "@/components/customer-management-01"

export function CustomersPage() {
  return <CustomerManagement01 />
}`

export function CustomerManagementPage() {
  return (
    <DocsPage
      title="Customer Management"
      description="A complete Maldivian admin block composed from Thaana registry components and realistic mixed-direction data."
      eyebrow="Blocks"
    >
      <section id="live-block">
        <h2>Live block</h2>
        <p>
          Search in Thaana or English, paginate the filtered records, open row actions, and add or
          edit a customer through the portal-safe dialog.
        </p>
        <div className="my-6 overflow-hidden rounded-lg bg-showcase/45 p-2 sm:p-4">
          <CustomerManagement01 />
        </div>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <TerminalCommand commands={installCustomerManagementCommands} />
        <CodeBlock>{exampleUsage}</CodeBlock>
      </section>

      <section id="architecture">
        <h2>Architecture</h2>
        <p>
          The block owns mock customer state, filtering, pagination, selection, and dialog state.
          The registry components own only their UI and bidi contracts. Table cells isolate email
          addresses, identifiers, and Rufiyaa values independently of the current search direction.
        </p>
      </section>
    </DocsPage>
  )
}

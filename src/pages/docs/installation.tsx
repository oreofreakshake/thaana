import { CodeBlock } from "@/src/components/code-block"
import { DocsPage } from "@/src/components/docs-page"
import { TerminalCommand } from "@/src/components/terminal-command"
import {
  directionProvider,
  documentDirection,
  initCommands,
  installDirectionCommands,
  installInputCommands,
} from "@/src/content/code-examples"

export function InstallationPage() {
  return (
    <DocsPage
      title="Installation"
      description="Add Thaana components to an existing shadcn project with the same CLI workflow you already use."
    >
      <section id="prerequisite">
        <h2>Prerequisite</h2>
        <p>
          Initialize shadcn in the target React and TypeScript project if it is not already
          configured.
        </p>
        <TerminalCommand commands={initCommands} />
      </section>

      <section id="add-a-component">
        <h2>Add a component</h2>
        <p>The registry item resolves its normal shadcn primitive dependency automatically.</p>
        <TerminalCommand commands={installInputCommands} />
      </section>

      <section id="recommended-rtl-host-setup">
        <h2>Recommended RTL host setup</h2>
        <p>Set document direction so native layout, text, and portalled content inherit RTL.</p>
        <CodeBlock language="html">{documentDirection}</CodeBlock>
        <p>
          Add shadcn&apos;s Direction component and wrap the React application so direction-aware
          Radix primitives receive behavioral direction as well.
        </p>
        <TerminalCommand commands={installDirectionCommands} />
        <CodeBlock>{directionProvider}</CodeBlock>
        <p>
          The document attribute controls browser layout. The provider supplies direction to
          primitives whose keyboard or positioning logic needs it. Thaana components retain local
          defaults so they can also work inside mixed-direction or LTR applications.
        </p>
      </section>
    </DocsPage>
  )
}

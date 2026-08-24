import { DvComboboxDemo } from "@/registry/examples/dv-combobox-demo"
import { comboboxUsage, installComboboxCommands } from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const comboboxPreviewCode = `const options = [
  { value: "ahmed-dv", label: "އަހުމަދު" },
  { value: "ahmed-en", label: "Ahmed Ali" },
  { value: "male", label: "Malé", keywords: ["މާލެ"] },
  { value: "invoice", label: "INV-2026-001" },
]

<DvCombobox
  options={options}
  value={value}
  onValueChange={setValue}
  aria-label="ކަސްޓަމަރެއް ހޮވާ"
/>`

export function ComboboxPage() {
  return (
    <ComponentPage
      name="DvCombobox"
      description="A searchable selection control for Dhivehi, English, and identifier-heavy option sets."
      preview={<DvComboboxDemo />}
      previewCode={comboboxPreviewCode}
      installCommands={installComboboxCommands}
      usage={comboboxUsage}
      rtlBehavior={
        <p>
          The trigger and portalled popover default to Dhivehi and RTL. The search input changes
          direction from the first strong character, while every result label receives its own bidi
          boundary. Command handles filtering and keyboard navigation without a separate search
          dependency.
        </p>
      }
    >
      <div id="option-model" className="scroll-m-20">
        <h3>Option model</h3>
        <p>
          Keep labels as plain strings so filtering and accessible text stay predictable. Add
          optional keywords for alternate Thaana or Latin spellings, and set an explicit option
          direction only when first-strong detection is not enough.
        </p>
      </div>
    </ComponentPage>
  )
}

import { DvFormField } from "@/registry/components/dv-form-field"
import { DvInput } from "@/registry/components/dv-input"

export function DvFormFieldDemo() {
  return (
    <DvFormField
      label="ފުރިހަމަ ނަން"
      description="އިންވޮއިސްތަކުގައި ފެންނާނެ ނަން."
      required
      className="w-full max-w-sm"
    >
      <DvInput placeholder="ނަން ލިޔުއްވާ" required />
    </DvFormField>
  )
}

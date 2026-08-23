"use client"

import * as React from "react"

import { DvFormField } from "@/registry/components/dv-form-field"
import { DvPhoneInput } from "@/registry/components/dv-phone-input"

export function DvPhoneInputDemo() {
  const [phone, setPhone] = React.useState("")

  return (
    <DvFormField label="ފޯނު ނަންބަރު" description="ހަތް އަދަދުގެ ދިވެހި ނަންބަރެއް." className="w-full max-w-sm">
      <DvPhoneInput value={phone} onValueChange={setPhone} required />
    </DvFormField>
  )
}

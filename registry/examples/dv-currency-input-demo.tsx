"use client"

import * as React from "react"

import { DvCurrencyInput } from "@/registry/components/dv-currency-input"
import { DvFormField } from "@/registry/components/dv-form-field"

export function DvCurrencyInputDemo() {
  const [amount, setAmount] = React.useState<number | null>(1250)

  return (
    <DvFormField label="ފައިސާ" description="ރުފިޔާއިން އަދަދު ލިޔުއްވާ." className="w-full max-w-sm">
      <DvCurrencyInput value={amount} onValueChange={setAmount} />
    </DvFormField>
  )
}

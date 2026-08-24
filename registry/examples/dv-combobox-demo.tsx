"use client"

import * as React from "react"

import { DvCombobox, type DvComboboxOption } from "@/registry/components/dv-combobox"

const people: DvComboboxOption[] = [
  { value: "ahmed-dv", label: "އަހުމަދު" },
  { value: "ahmed-en", label: "Ahmed Ali" },
  { value: "male", label: "Malé", keywords: ["މާލެ"] },
  { value: "hulhumale", label: "Hulhumalé", keywords: ["ހުޅުމާލެ"] },
  { value: "invoice", label: "INV-2026-001" },
]

export function DvComboboxDemo() {
  const [value, setValue] = React.useState("")

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvCombobox
        options={people}
        value={value}
        onValueChange={setValue}
        aria-label="ކަސްޓަމަރެއް ހޮވާ"
        placeholder="ކަސްޓަމަރެއް ހޮވާ"
      />
    </div>
  )
}

"use client"

import type { DvAtoll } from "../lib/location-types"
import { DvCombobox } from "./dv-combobox"

type DvAtollPickerProps = {
  atolls: readonly DvAtoll[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  lang?: string
  dir?: "ltr" | "rtl"
  "aria-label"?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

function DvAtollPicker({
  atolls,
  value,
  onValueChange,
  placeholder = "އަތޮޅެއް ހޮވާ",
  searchPlaceholder = "އަތޮޅެއް ހޯދާ...",
  emptyMessage = "އަތޮޅެއް ނުފެނުނު",
  "aria-label": ariaLabel,
  ...props
}: DvAtollPickerProps) {
  const options = atolls.map((atoll) => ({
    value: atoll.id,
    label: `${atoll.nameDv} — ${atoll.nameEn}`,
    keywords: [atoll.nameDv, atoll.nameEn, atoll.code, atoll.id].filter(
      (keyword): keyword is string => Boolean(keyword)
    ),
    dir: "auto" as const,
  }))

  return (
    <DvCombobox
      {...props}
      options={options}
      value={value ?? ""}
      onValueChange={onValueChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
      aria-label={ariaLabel ?? placeholder}
    />
  )
}

export { DvAtollPicker, type DvAtollPickerProps }

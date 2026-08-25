"use client"

import type { DvIsland } from "../lib/location-types"
import { DvCombobox } from "./dv-combobox"

type DvIslandPickerProps = {
  islands: readonly DvIsland[]
  atollId?: string
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

function DvIslandPicker({
  islands,
  atollId,
  value,
  onValueChange,
  placeholder = "ރަށެއް ހޮވާ",
  searchPlaceholder = "ރަށެއް ހޯދާ...",
  emptyMessage = "ރަށެއް ނުފެނުނު",
  "aria-label": ariaLabel,
  ...props
}: DvIslandPickerProps) {
  const options = islands
    .filter((island) => !atollId || island.atollId === atollId)
    .map((island) => ({
      value: island.id,
      label: `${island.nameDv} — ${island.nameEn}`,
      keywords: [island.nameDv, island.nameEn, island.id],
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

export { DvIslandPicker, type DvIslandPickerProps }

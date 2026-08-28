"use client"

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { DvIslandValue } from "../lib/location-types"
import { MALDIVES_ATOLLS, type MaldivesAtoll, type MaldivesIsland } from "../lib/maldives-locations"
import { getTextDirection } from "../lib/text-direction"

type DvIslandPickerProps = {
  atolls?: readonly MaldivesAtoll[]
  value?: DvIslandValue
  onValueChange: (value: DvIslandValue) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
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

function islandLabel(island: MaldivesIsland, dir: "ltr" | "rtl" = "rtl") {
  return dir === "rtl" && island.nameDv ? island.nameDv : island.nameEn
}

function atollLabel(atoll: MaldivesAtoll, dir: "ltr" | "rtl" = "rtl") {
  if (dir === "rtl" && atoll.abbreviationDv) {
    return atoll.code === "MLE" ? "މާލެ ސިޓީ" : `${atoll.abbreviationDv}. އަތޮޅު`
  }
  return `${atoll.code} · ${atoll.nameEn}`
}

function matchesValue(
  value: DvIslandValue | undefined,
  atoll: MaldivesAtoll,
  island: MaldivesIsland
) {
  return value?.atollCode === atoll.code && value.island === island.nameEn
}

function findSelectedIsland(atolls: readonly MaldivesAtoll[], value?: DvIslandValue) {
  if (!value) return undefined
  const atoll = atolls.find((entry) => entry.code === value.atollCode)
  const island = atoll?.islands.find((entry) => entry.nameEn === value.island)
  return atoll && island ? { atoll, island } : undefined
}

function DvIslandPicker({
  atolls = MALDIVES_ATOLLS,
  value,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "ރަށެއް ހޮވާ",
  searchPlaceholder = "ރަށެއް ނުވަތަ އަތޮޅެއް ހޯދާ...",
  emptyMessage = "ރަށެއް ނުފެނުނު",
  disabled = false,
  lang = "dv",
  dir = "rtl",
  "aria-label": ariaLabel,
  className,
  triggerClassName,
  contentClassName,
}: DvIslandPickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [query, setQuery] = React.useState("")
  const isOpen = open ?? internalOpen
  const selected = findSelectedIsland(atolls, value)
  const queryDirection = query ? getTextDirection(query, dir) : dir

  function updateOpen(nextOpen: boolean) {
    if (open === undefined) setInternalOpen(nextOpen)
    if (!nextOpen) setQuery("")
    onOpenChange?.(nextOpen)
  }

  function selectIsland(atoll: MaldivesAtoll, island: MaldivesIsland) {
    onValueChange({ atollCode: atoll.code, island: island.nameEn })
    updateOpen(false)
  }

  return (
    <div data-slot="dv-island-picker" className={cn("w-full", className)}>
      <Popover open={isOpen} onOpenChange={updateOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label={ariaLabel ?? placeholder}
            disabled={disabled}
            dir={dir}
            lang={lang}
            className={cn("w-full justify-between font-normal", triggerClassName)}
          >
            {selected ? (
              <bdi dir="auto" className="min-w-0 truncate text-start">
                {`${islandLabel(selected.island, dir)} · ${
                  dir === "rtl"
                    ? (selected.atoll.abbreviationDv ?? selected.atoll.code)
                    : selected.atoll.code
                }`}
              </bdi>
            ) : (
              <span className="truncate text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDownIcon aria-hidden="true" className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          dir={dir}
          lang={lang}
          align="start"
          className={cn("w-(--radix-popover-trigger-width) p-0", contentClassName)}
        >
          <Command>
            <CommandInput
              value={query}
              onValueChange={setQuery}
              dir={queryDirection}
              lang={queryDirection === "rtl" ? lang : "en"}
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              style={{ textAlign: "start" }}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {atolls.map((atoll) => (
                <CommandGroup
                  key={atoll.code}
                  heading={
                    <bdi dir="auto" className="text-xs font-medium">
                      {atollLabel(atoll, dir)}
                    </bdi>
                  }
                >
                  {atoll.islands.map((island) => {
                    const selectedIsland = matchesValue(value, atoll, island)
                    const searchValue = [
                      island.nameEn,
                      island.nameDv,
                      atoll.nameEn,
                      atoll.nameDv,
                      atoll.code,
                      atoll.abbreviationDv,
                    ]
                      .filter(Boolean)
                      .join(" ")
                    return (
                      <CommandItem
                        key={`${atoll.code}:${island.nameEn}`}
                        value={searchValue}
                        onSelect={() => selectIsland(atoll, island)}
                      >
                        <CheckIcon
                          aria-hidden="true"
                          className={cn("shrink-0", selectedIsland ? "opacity-100" : "opacity-0")}
                        />
                        <bdi dir="auto" className="min-w-0 flex-1 truncate text-start">
                          {islandLabel(island, dir)}
                        </bdi>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export {
  atollLabel,
  DvIslandPicker,
  type DvIslandPickerProps,
  type DvIslandValue,
  findSelectedIsland,
  islandLabel,
}

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

import { getTextDirection } from "../lib/text-direction"

type DvComboboxOption = {
  value: string
  label: string
  keywords?: string[]
  disabled?: boolean
  dir?: "ltr" | "rtl" | "auto"
}

type DvComboboxProps = {
  options: readonly DvComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
  "aria-label"?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

function DvCombobox({
  options,
  value,
  defaultValue = "",
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "އެއްޗެއް ހޮވާ",
  searchPlaceholder = "ހޯދާ...",
  emptyMessage = "ނަތީޖާއެއް ނުފެނުނު",
  disabled = false,
  dir = "rtl",
  lang = "dv",
  "aria-label": ariaLabel,
  className,
  triggerClassName,
  contentClassName,
}: DvComboboxProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [query, setQuery] = React.useState("")
  const selectedValue = value ?? internalValue
  const isOpen = open ?? internalOpen
  const selectedOption = options.find((option) => option.value === selectedValue)
  const queryDirection = query ? getTextDirection(query, dir) : dir

  function updateOpen(nextOpen: boolean) {
    if (open === undefined) setInternalOpen(nextOpen)
    if (!nextOpen) setQuery("")
    onOpenChange?.(nextOpen)
  }

  function selectOption(option: DvComboboxOption) {
    if (value === undefined) setInternalValue(option.value)
    onValueChange?.(option.value)
    updateOpen(false)
  }

  function optionDirection(option: DvComboboxOption) {
    return option.dir ?? getTextDirection(option.label, dir)
  }

  return (
    <div data-slot="dv-combobox" className={cn("w-full", className)}>
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
            {selectedOption ? (
              <bdi dir={optionDirection(selectedOption)} className="min-w-0 truncate text-start">
                {selectedOption.label}
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
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.label} ${option.value}`}
                    keywords={option.keywords}
                    disabled={option.disabled}
                    onSelect={() => selectOption(option)}
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className={cn(
                        "shrink-0",
                        selectedValue === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <bdi
                      dir={optionDirection(option)}
                      className="min-w-0 flex-1 truncate text-start"
                    >
                      {option.label}
                    </bdi>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DvCombobox, type DvComboboxOption, type DvComboboxProps }

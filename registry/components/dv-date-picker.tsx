"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { DvGregorianCalendar, formatGregorianDate } from "./dv-gregorian-calendar"
import { DvHijriCalendar, formatHijriDate } from "./dv-hijri-calendar"

type DvDatePickerCalendarProps = Omit<
  React.ComponentProps<typeof DvHijriCalendar>,
  "dir" | "lang" | "mode" | "onSelect" | "selected"
>

type DvDatePickerCommonProps = {
  calendar?: "gregorian" | "hijri"
  placeholder?: string
  disabled?: boolean
  required?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  "aria-label"?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  calendarProps?: DvDatePickerCalendarProps
}

type DvDatePickerSingleProps = DvDatePickerCommonProps & {
  mode?: "single"
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
}

type DvDatePickerRangeProps = DvDatePickerCommonProps & {
  mode: "range"
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
}

type DvDatePickerProps = DvDatePickerSingleProps | DvDatePickerRangeProps

function DvDatePicker(props: DvDatePickerProps) {
  const {
    calendar = "gregorian",
    placeholder = props.mode === "range" ? "ތާރީޚުގެ ރޭންޖެއް ހޮވާ" : "ތާރީޚެއް ހޮވާ",
    disabled = false,
    required = false,
    dir = "rtl",
    lang = "dv",
    open,
    defaultOpen = false,
    onOpenChange,
    "aria-label": ariaLabel,
    className,
    triggerClassName,
    contentClassName,
    calendarProps,
  } = props
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    props.mode === "range" ? undefined : props.defaultValue
  )
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(
    props.mode === "range" ? props.defaultValue : undefined
  )
  const isOpen = open ?? internalOpen
  const selectedDate = props.mode === "range" ? undefined : (props.value ?? internalDate)
  const selectedRange = props.mode === "range" ? (props.value ?? internalRange) : undefined

  function updateOpen(nextOpen: boolean) {
    if (open === undefined) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  function updateDate(date: Date | undefined) {
    if (props.mode === "range") return
    if (props.value === undefined) setInternalDate(date)
    props.onValueChange?.(date)
    if (date) updateOpen(false)
  }

  function updateRange(range: DateRange | undefined) {
    if (props.mode !== "range") return
    if (props.value === undefined) setInternalRange(range)
    props.onValueChange?.(range)
    if (range?.from && range.to) updateOpen(false)
  }

  const label = selectedDate
    ? formatDate(selectedDate, calendar)
    : selectedRange?.from
      ? selectedRange.to
        ? `${formatDate(selectedRange.from, calendar)} – ${formatDate(selectedRange.to, calendar)}`
        : formatDate(selectedRange.from, calendar)
      : undefined

  return (
    <div data-slot="dv-date-picker" className={cn("w-full", className)}>
      <Popover open={isOpen} onOpenChange={updateOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            data-empty={!label}
            disabled={disabled}
            aria-label={ariaLabel ?? placeholder}
            aria-required={required || undefined}
            aria-expanded={isOpen}
            dir={dir}
            lang={lang}
            title={label}
            className={cn(
              "w-full min-w-0 justify-start overflow-hidden text-start font-normal data-[empty=true]:text-muted-foreground",
              triggerClassName
            )}
          >
            <CalendarIcon aria-hidden="true" className="shrink-0" />
            {label ? (
              <bdi dir="rtl" lang="dv" className="min-w-0 flex-1 truncate">
                {label}
              </bdi>
            ) : (
              <span className="min-w-0 flex-1 truncate">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          dir={dir}
          lang={lang}
          className={cn("w-auto p-0", contentClassName)}
        >
          {calendar === "hijri" && props.mode === "range" ? (
            <DvHijriCalendar
              {...calendarProps}
              mode="range"
              selected={selectedRange}
              onSelect={updateRange}
              dir={dir}
              lang={lang}
            />
          ) : calendar === "hijri" ? (
            <DvHijriCalendar
              {...calendarProps}
              mode="single"
              selected={selectedDate}
              onSelect={updateDate}
              dir={dir}
              lang={lang}
            />
          ) : props.mode === "range" ? (
            <DvGregorianCalendar
              {...calendarProps}
              mode="range"
              selected={selectedRange}
              onSelect={updateRange}
              dir={dir}
            />
          ) : (
            <DvGregorianCalendar
              {...calendarProps}
              mode="single"
              selected={selectedDate}
              onSelect={updateDate}
              dir={dir}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

function formatDate(date: Date, calendar: "gregorian" | "hijri") {
  return calendar === "hijri" ? formatHijriDate(date) : formatGregorianDate(date)
}

export {
  DvDatePicker,
  type DvDatePickerCalendarProps,
  type DvDatePickerProps,
  type DvDatePickerRangeProps,
  type DvDatePickerSingleProps,
  formatGregorianDate,
}

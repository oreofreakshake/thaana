"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { DvDatePicker } from "@/registry/components/dv-date-picker"
import { DvInput } from "@/registry/components/dv-input"

const demoDate = new Date(2026, 7, 24)

export function DvDatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(demoDate)

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvDatePicker value={date} onValueChange={setDate} />
    </div>
  )
}

export function DvHijriDatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(demoDate)

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvDatePicker calendar="hijri" value={date} onValueChange={setDate} />
    </div>
  )
}

export function DvDateRangePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 7, 24),
    to: new Date(2026, 8, 3),
  })

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-2xl">
      <DvDatePicker
        mode="range"
        value={range}
        onValueChange={setRange}
        calendarProps={{ numberOfMonths: 2 }}
      />
    </div>
  )
}

export function DvDateOfBirthPickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvDatePicker
        value={date}
        onValueChange={setDate}
        placeholder="އުފަން ތާރީޚު ހޮވާ"
        calendarProps={{
          captionLayout: "dropdown",
          startMonth: new Date(1940, 0, 1),
          endMonth: new Date(),
        }}
      />
    </div>
  )
}

export function DvDateTimePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(demoDate)

  return (
    <div lang="dv" dir="rtl" className="grid w-full max-w-lg gap-3 sm:grid-cols-[1fr_9rem]">
      <DvDatePicker value={date} onValueChange={setDate} />
      <DvInput type="time" dir="ltr" lang="en" defaultValue="09:00" aria-label="ގަޑި" />
    </div>
  )
}

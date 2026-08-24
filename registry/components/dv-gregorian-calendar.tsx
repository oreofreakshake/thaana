"use client"

import type * as React from "react"

import { Calendar } from "@/components/ui/calendar"

const gregorianMonths = [
  "ޖެނުއަރީ",
  "ފެބްރުއަރީ",
  "މާރިޗު",
  "އޭޕްރީލު",
  "މެއި",
  "ޖޫން",
  "ޖުލައި",
  "އޯގަސްޓް",
  "ސެޕްޓެމްބަރު",
  "އޮކްޓޯބަރު",
  "ނޮވެމްބަރު",
  "ޑިސެމްބަރު",
] as const

const dhivehiWeekdays = ["އާދީއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"] as const

const dhivehiWeekdayShort = ["އާ", "ހޯ", "އަން", "ބު", "ބުރާ", "ހު", "ހޮ"] as const

function formatGregorianDate(date: Date) {
  return `${date.getDate()} ${gregorianMonths[date.getMonth()]} ${date.getFullYear()}`
}

function formatGregorianMonthYear(date: Date) {
  return `${gregorianMonths[date.getMonth()]} ${date.getFullYear()}`
}

function DvGregorianCalendar({
  formatters,
  labels,
  dir = "rtl",
  lang = "dv",
  ...props
}: React.ComponentProps<typeof Calendar>) {
  return (
    <Calendar
      {...props}
      dir={dir}
      lang={lang}
      formatters={{
        formatCaption: formatGregorianMonthYear,
        formatMonthDropdown: (date) => gregorianMonths[date.getMonth()],
        formatYearDropdown: (date) => String(date.getFullYear()),
        formatWeekdayName: (date) => dhivehiWeekdayShort[date.getDay()],
        ...formatters,
      }}
      labels={{
        labelNav: () => "ކަލަންޑަރުގެ މަސްތައް",
        labelGrid: (date) => formatGregorianMonthYear(date),
        labelMonthDropdown: () => "މަސް ހޮވާ",
        labelYearDropdown: () => "އަހަރު ހޮވާ",
        labelNext: () => "ދެން އޮތް މަސް",
        labelPrevious: () => "ކުރީގެ މަސް",
        labelDayButton: (date) => `${dhivehiWeekdays[date.getDay()]}، ${formatGregorianDate(date)}`,
        labelWeekday: (date) => dhivehiWeekdays[date.getDay()],
        ...labels,
      }}
    />
  )
}

export { DvGregorianCalendar, formatGregorianDate, formatGregorianMonthYear, gregorianMonths }

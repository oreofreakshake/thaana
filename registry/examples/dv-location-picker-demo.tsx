"use client"

import * as React from "react"

import { DvIslandPicker } from "@/registry/components/dv-island-picker"
import { DvLocationPicker } from "@/registry/components/dv-location-picker"
import type { DvIslandValue, DvLocationValue } from "@/registry/lib/location-types"
import type { MaldivesAtoll } from "@/registry/lib/maldives-locations"

const customAtolls: MaldivesAtoll[] = [
  {
    code: "SN",
    nameEn: "Sample North Atoll",
    nameDv: "މިސާލު އުތުރު އަތޮޅު",
    abbreviationDv: "ސނ",
    islands: [
      {
        nameEn: "Sample Harbor",
        nameDv: "މިސާލު ބަނދަރު",
        latitude: 4.1755,
        longitude: 73.5093,
      },
      {
        nameEn: "Sample Jetty",
        nameDv: "މިސާލު ޖެޓީ",
      },
    ],
  },
]

function DvIslandPickerDemo() {
  const [value, setValue] = React.useState<DvIslandValue>()
  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvIslandPicker value={value} onValueChange={setValue} />
    </div>
  )
}

function DvIslandPickerCustomDemo() {
  const [value, setValue] = React.useState<DvIslandValue>()
  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvIslandPicker atolls={customAtolls} value={value} onValueChange={setValue} />
    </div>
  )
}

function DvIslandPickerDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <DvIslandPicker
        value={{ atollCode: "MLE", island: "Malé" }}
        onValueChange={() => undefined}
        disabled
      />
    </div>
  )
}

function DvIslandPickerLtrDemo() {
  const [value, setValue] = React.useState<DvIslandValue>()
  return (
    <div dir="ltr" className="w-full max-w-sm">
      <DvIslandPicker
        value={value}
        onValueChange={setValue}
        dir="ltr"
        lang="en"
        placeholder="Select an island"
        searchPlaceholder="Search islands or atolls..."
      />
    </div>
  )
}

function DvLocationPickerDemo() {
  const [value, setValue] = React.useState<DvLocationValue>({
    atollCode: "MLE",
    island: "Malé",
    latitude: 4.1755,
    longitude: 73.5093,
  })

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-2xl space-y-4">
      <div>
        <h3 className="m-0 text-lg font-semibold">ލޮކޭޝަން ނަގާ</h3>
        <p className="mt-1 text-sm text-muted-foreground">ރަށް ހޮވާލައި ނުވަތަ ޗާޓުން ލޮކޭޝަން ނަގާ.</p>
      </div>
      <DvLocationPicker
        value={value}
        onValueChange={setValue}
        fallbackCenter={{ latitude: 4.1755, longitude: 73.5093 }}
        defaultZoom={11}
      />
      <output dir="ltr" lang="en" className="block font-sans text-sm tabular-nums">
        {value.latitude ?? "—"}, {value.longitude ?? "—"}
      </output>
    </div>
  )
}

function DvLocationPickerWithoutMapDemo() {
  const [value, setValue] = React.useState<DvLocationValue>({})
  return (
    <div className="w-full max-w-lg">
      <DvLocationPicker value={value} onValueChange={setValue} showMap={false} />
    </div>
  )
}

export {
  customAtolls,
  DvIslandPickerCustomDemo,
  DvIslandPickerDemo,
  DvIslandPickerDisabledDemo,
  DvIslandPickerLtrDemo,
  DvLocationPickerDemo,
  DvLocationPickerWithoutMapDemo,
}

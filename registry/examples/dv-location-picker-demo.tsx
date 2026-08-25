"use client"

import * as React from "react"

import { DvAtollPicker } from "@/registry/components/dv-atoll-picker"
import { DvIslandPicker } from "@/registry/components/dv-island-picker"
import { DvLocationPicker } from "@/registry/components/dv-location-picker"
import type { DvAtoll, DvIsland, DvLocationValue } from "@/registry/lib/location-types"

const mockAtolls: DvAtoll[] = [
  { id: "sample-north", code: "SN", nameDv: "މިސާލު އުތުރު އަތޮޅު", nameEn: "Sample North Atoll" },
  { id: "sample-south", code: "SS", nameDv: "މިސާލު ދެކުނު އަތޮޅު", nameEn: "Sample South Atoll" },
]

const mockIslands: DvIsland[] = [
  {
    id: "sample-harbor",
    atollId: "sample-north",
    nameDv: "މިސާލު ބަނދަރު",
    nameEn: "Sample Harbor",
    latitude: 4.1755,
    longitude: 73.5093,
  },
  {
    id: "sample-market",
    atollId: "sample-north",
    nameDv: "މިސާލު މާކެޓް",
    nameEn: "Sample Market",
    latitude: 4.181,
    longitude: 73.51,
  },
  {
    id: "sample-jetty",
    atollId: "sample-south",
    nameDv: "މިސާލު ޖެޓީ",
    nameEn: "Sample Jetty",
  },
]

function DvAtollPickerDemo() {
  const [value, setValue] = React.useState("sample-north")
  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvAtollPicker atolls={mockAtolls} value={value} onValueChange={setValue} />
    </div>
  )
}

function DvIslandPickerDemo() {
  const [value, setValue] = React.useState("")
  return (
    <div lang="dv" dir="rtl" className="w-full max-w-sm">
      <DvIslandPicker
        islands={mockIslands}
        atollId="sample-north"
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

function DvLocationPickerDemo() {
  const [value, setValue] = React.useState<DvLocationValue>({
    atollId: "sample-north",
    islandId: "sample-harbor",
    latitude: 4.1755,
    longitude: 73.5093,
  })

  return (
    <div lang="dv" dir="rtl" className="w-full max-w-2xl space-y-4">
      <div>
        <h3 className="m-0 text-lg font-semibold">ލޮކޭޝަން ނަގާ</h3>
        <p className="mt-1 text-sm text-muted-foreground">މިއީ ޑެމޯއަށް ހަދާފައިވާ މިސާލު ޑޭޓާއެކެވެ.</p>
      </div>
      <DvLocationPicker
        atolls={mockAtolls}
        islands={mockIslands}
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
      <DvLocationPicker
        atolls={mockAtolls}
        islands={mockIslands}
        value={value}
        onValueChange={setValue}
        showMap={false}
      />
    </div>
  )
}

export {
  DvAtollPickerDemo,
  DvIslandPickerDemo,
  DvLocationPickerDemo,
  DvLocationPickerWithoutMapDemo,
  mockAtolls,
  mockIslands,
}

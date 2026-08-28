import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import * as React from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Dialog, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DvCombobox } from "@/registry/components/dv-combobox"
import { DvDatePicker, formatGregorianDate } from "@/registry/components/dv-date-picker"
import { DvDialogContent } from "@/registry/components/dv-dialog-content"
import { DvDropdownMenu, DvDropdownMenuContent } from "@/registry/components/dv-dropdown-menu"
import { DvFormField } from "@/registry/components/dv-form-field"
import { formatHijriDate } from "@/registry/components/dv-hijri-calendar"
import { DvIslandPicker } from "@/registry/components/dv-island-picker"
import {
  DvLocationPicker,
  updateLocationCoordinates,
  updateLocationIsland,
} from "@/registry/components/dv-location-picker"
import { DvPagination } from "@/registry/components/dv-pagination"
import { DvPhoneInput } from "@/registry/components/dv-phone-input"
import { MALDIVES_ATOLLS, type MaldivesAtoll } from "@/registry/lib/maldives-locations"

const mapTestState = vi.hoisted(() => ({
  handlers: {} as Record<
    string,
    ((event: { lngLat: { lat: number; lng: number } }) => void) | undefined
  >,
  dragEnd: undefined as ((coordinates: { lat: number; lng: number }) => void) | undefined,
  flyTo: vi.fn(),
}))

vi.mock("@/components/ui/map", async () => {
  const ReactModule = await import("react")
  const map = {
    on: (event: string, handler: (event: { lngLat: { lat: number; lng: number } }) => void) => {
      mapTestState.handlers[event] = handler
    },
    off: (event: string) => {
      delete mapTestState.handlers[event]
    },
    flyTo: mapTestState.flyTo,
  }
  return {
    Map: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement("div", { "data-testid": "map" }, children),
    MapControls: () => null,
    MapMarker: ({
      children,
      onDragEnd,
    }: {
      children: React.ReactNode
      onDragEnd?: (coordinates: { lat: number; lng: number }) => void
    }) => {
      mapTestState.dragEnd = onDragEnd
      return ReactModule.createElement(ReactModule.Fragment, null, children)
    },
    MarkerContent: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactModule.Fragment, null, children),
    useMap: () => ({ map, isLoaded: true, resolvedTheme: "light" }),
  }
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)
Element.prototype.scrollIntoView = vi.fn()

afterEach(() => {
  cleanup()
  mapTestState.handlers = {}
  mapTestState.dragEnd = undefined
  mapTestState.flyTo.mockClear()
})

const customAtolls: MaldivesAtoll[] = [
  {
    code: "N",
    nameEn: "North Atoll",
    nameDv: "އުތުރު އަތޮޅު",
    abbreviationDv: "އ",
    islands: [
      {
        nameEn: "Harbor",
        nameDv: "ބަނދަރު",
        latitude: 4.1,
        longitude: 73.5,
      },
      { nameEn: "Jetty", nameDv: "ޖެޓީ" },
    ],
  },
]

describe("DvIslandPicker", () => {
  it("uses built-in data and returns the island with its atoll", () => {
    const onValueChange = vi.fn()
    render(<DvIslandPicker defaultOpen onValueChange={onValueChange} />)

    const search = screen.getByLabelText("ރަށެއް ނުވަތަ އަތޮޅެއް ހޯދާ...")
    fireEvent.change(search, { target: { value: "Baarah" } })
    expect(search.getAttribute("dir")).toBe("ltr")
    fireEvent.click(screen.getByText("ބާރަށް"))
    expect(onValueChange).toHaveBeenCalledWith({ atollCode: "HA", island: "Baarah" })
  })

  it.each(["HA", "Haa Alif"])("finds built-in islands by %s", (query) => {
    render(<DvIslandPicker defaultOpen onValueChange={() => undefined} />)
    fireEvent.change(screen.getByLabelText("ރަށެއް ނުވަތަ އަތޮޅެއް ހޯދާ..."), {
      target: { value: query },
    })
    expect(screen.getByText("ބާރަށް")).toBeTruthy()
    expect(screen.getByText("ހއ. އަތޮޅު")).toBeTruthy()
  })

  it("replaces built-in data and supports mixed-language controlled selection", () => {
    function ControlledPicker() {
      const [value, setValue] = React.useState<{ atollCode: string; island: string }>()
      return (
        <DvIslandPicker atolls={customAtolls} value={value} onValueChange={setValue} defaultOpen />
      )
    }

    render(<ControlledPicker />)
    const search = screen.getByLabelText("ރަށެއް ނުވަތަ އަތޮޅެއް ހޯދާ...")
    fireEvent.change(search, { target: { value: "ބަނދަރު" } })
    expect(search.getAttribute("dir")).toBe("rtl")
    expect(screen.queryByText("Baarah")).toBeNull()
    fireEvent.click(screen.getByText("ބަނދަރު"))
    expect(screen.getByRole("combobox").textContent).toContain("ބަނދަރު · އ")
  })

  it("renders English labels for an explicit LTR interface", () => {
    render(<DvIslandPicker dir="ltr" defaultOpen onValueChange={() => undefined} />)
    expect(screen.getByText("HA · Haa Alif")).toBeTruthy()
    expect(screen.getByText("Baarah")).toBeTruthy()
  })

  it("is accessible, RTL by default, and supports disabled behavior", () => {
    render(<DvIslandPicker onValueChange={() => undefined} disabled />)
    const trigger = screen.getByRole("combobox")
    expect(trigger.getAttribute("dir")).toBe("rtl")
    expect(trigger.getAttribute("lang")).toBe("dv")
    expect(trigger.getAttribute("aria-expanded")).toBe("false")
    expect((trigger as HTMLButtonElement).disabled).toBe(true)
  })
})

describe("DvLocationPicker", () => {
  const selected = { atollCode: "N", island: "Harbor" }
  const initial = { ...selected, latitude: 1, longitude: 2 }

  it("replaces coordinates only when the selected island provides a valid pair", () => {
    expect(updateLocationIsland(initial, selected, customAtolls)).toEqual({
      ...selected,
      latitude: 4.1,
      longitude: 73.5,
    })
    expect(
      updateLocationIsland(initial, { atollCode: "N", island: "Jetty" }, customAtolls)
    ).toEqual({ atollCode: "N", island: "Jetty", latitude: 1, longitude: 2 })
  })

  it("selecting a custom island updates atoll, island, and available coordinates", () => {
    const onValueChange = vi.fn()
    render(
      <DvLocationPicker
        atolls={customAtolls}
        value={{}}
        onValueChange={onValueChange}
        showMap={false}
      />
    )

    fireEvent.click(screen.getByLabelText("ރަށް"))
    fireEvent.click(screen.getByText("ބަނދަރު"))
    expect(onValueChange).toHaveBeenCalledWith({
      atollCode: "N",
      island: "Harbor",
      latitude: 4.1,
      longitude: 73.5,
    })
  })

  it("focuses the map when the selected island has coordinates", () => {
    render(<DvLocationPicker atolls={customAtolls} value={{}} onValueChange={() => undefined} />)

    fireEvent.click(screen.getByLabelText("ރަށް"))
    fireEvent.click(screen.getByText("ބަނދަރު"))
    expect(mapTestState.flyTo).toHaveBeenCalledWith({ center: [73.5, 4.1], zoom: 13 })
  })

  it("a built-in island replaces coordinates with its official map position", () => {
    expect(
      updateLocationIsland(
        { latitude: 4.2, longitude: 73.6 },
        { atollCode: "HA", island: "Baarah" },
        MALDIVES_ATOLLS
      )
    ).toEqual({
      atollCode: "HA",
      island: "Baarah",
      latitude: 6.816661,
      longitude: 73.208382,
    })
  })

  it("map click and marker drag update only coordinates", () => {
    const onValueChange = vi.fn()
    render(<DvLocationPicker value={initial} onValueChange={onValueChange} />)

    act(() => mapTestState.handlers.click?.({ lngLat: { lat: 4.2, lng: 73.6 } }))
    expect(onValueChange).toHaveBeenCalledWith({ ...selected, latitude: 4.2, longitude: 73.6 })
    act(() => mapTestState.dragEnd?.({ lat: 4.3, lng: 73.7 }))
    expect(onValueChange).toHaveBeenCalledWith({ ...selected, latitude: 4.3, longitude: 73.7 })
  })

  it("manual LTR coordinate editing preserves island selection without rendering a map", () => {
    const onValueChange = vi.fn()
    render(<DvLocationPicker value={initial} onValueChange={onValueChange} showMap={false} />)

    expect(screen.queryByTestId("map")).toBeNull()
    const latitude = screen.getByLabelText("ލެޓިޓިއުޑް")
    expect(latitude.getAttribute("dir")).toBe("ltr")
    fireEvent.change(latitude, { target: { value: "4.1755" } })
    expect(onValueChange).toHaveBeenCalledWith({
      ...selected,
      latitude: 4.1755,
      longitude: 2,
    })
    expect(updateLocationCoordinates(initial, { latitude: 3 })).toEqual({
      ...selected,
      latitude: 3,
      longitude: 2,
    })

    const longitude = screen.getByLabelText("ލޮންޖިޓިއުޑް")
    expect(longitude.getAttribute("dir")).toBe("ltr")
    fireEvent.change(longitude, { target: { value: "-73.5093" } })
    expect(onValueChange).toHaveBeenCalledWith({
      ...selected,
      latitude: 1,
      longitude: -73.5093,
    })
  })

  it("renders a useful RTL coordinate form without data or a map and disables every control", () => {
    const { container } = render(
      <DvLocationPicker value={{}} onValueChange={() => undefined} showMap={false} disabled />
    )

    expect(container.querySelector('[data-slot="dv-location-picker"]')?.getAttribute("dir")).toBe(
      "rtl"
    )
    expect(screen.queryByTestId("map")).toBeNull()
    expect((screen.getByLabelText("ރަށް") as HTMLButtonElement).disabled).toBe(true)
    for (const label of ["ލެޓިޓިއުޑް", "ލޮންޖިޓިއުޑް"]) {
      const input = screen.getByLabelText(label) as HTMLInputElement
      expect(input.disabled).toBe(true)
      expect(input.dir).toBe("ltr")
      expect(input.value).toBe("")
    }
  })

  it("ships the complete supplied atoll grouping", () => {
    expect(MALDIVES_ATOLLS).toHaveLength(21)
    expect(MALDIVES_ATOLLS.flatMap((atoll) => atoll.islands)).toHaveLength(189)
    expect(
      MALDIVES_ATOLLS.every((atoll) =>
        atoll.islands.every(
          (island) =>
            island.nameDv &&
            typeof island.latitude === "number" &&
            typeof island.longitude === "number"
        )
      )
    ).toBe(true)
    expect(MALDIVES_ATOLLS.find((atoll) => atoll.code === "MLE")?.islands).toEqual([
      {
        nameEn: "Hulhumalé",
        nameDv: "ހުޅުމާލެ",
        latitude: 4.222071,
        longitude: 73.542463,
      },
      {
        nameEn: "Malé",
        nameDv: "މާލެ",
        latitude: 4.174446,
        longitude: 73.5097,
      },
      {
        nameEn: "Villimalé",
        nameDv: "ވިލިނގިލި",
        latitude: 4.173395,
        longitude: 73.485279,
      },
    ])
  })
})

describe("DvCombobox", () => {
  const options = [
    { value: "ahmed", label: "އަހުމަދު އަލީ", keywords: ["Ahmed Ali"] },
    { value: "invoice", label: "Invoice INV-2026-0042", dir: "ltr" as const },
  ]

  it("uses local RTL defaults and supports uncontrolled selection", () => {
    const onValueChange = vi.fn()
    render(
      <DvCombobox options={options} defaultOpen onValueChange={onValueChange} aria-label="ހޮވާ" />
    )

    const trigger = screen.getByLabelText("ހޮވާ")
    const search = screen.getByLabelText("ހޯދާ...")
    expect(trigger.getAttribute("dir")).toBe("rtl")
    expect(search.getAttribute("dir")).toBe("rtl")
    expect(screen.getByText("Invoice INV-2026-0042").closest("bdi")?.getAttribute("dir")).toBe(
      "ltr"
    )

    fireEvent.change(search, { target: { value: "Invoice" } })
    expect(search.getAttribute("dir")).toBe("ltr")
    fireEvent.click(screen.getByText("Invoice INV-2026-0042"))

    expect(onValueChange).toHaveBeenCalledWith("invoice")
    expect(trigger.textContent).toContain("Invoice INV-2026-0042")
  })
})

describe("DvDatePicker", () => {
  it("formats Gregorian dates with Dhivehi month names", () => {
    expect(formatGregorianDate(new Date(2026, 7, 26))).toBe("26 އޯގަސްޓް 2026")
  })

  it("formats dates with the Umm al-Qura Hijri calendar", () => {
    expect(formatHijriDate(new Date(2026, 7, 24))).toBe("11 ރަބީޢުލް އައްވަލް 1448")
  })

  it("uses local Dhivehi and RTL defaults", () => {
    render(<DvDatePicker calendar="hijri" defaultValue={new Date(2026, 7, 24)} />)

    const trigger = screen.getByRole("button", { name: "ތާރީޚެއް ހޮވާ" })
    expect(trigger.getAttribute("dir")).toBe("rtl")
    expect(trigger.getAttribute("lang")).toBe("dv")
    expect(trigger.textContent).toContain("1448")
  })

  it("uses Gregorian dates by default and constrains long labels", () => {
    render(<DvDatePicker defaultValue={new Date(2026, 7, 24)} />)

    const trigger = screen.getByRole("button", { name: "ތާރީޚެއް ހޮވާ" })
    expect(trigger.textContent).toContain("24 އޯގަސްޓް 2026")
    expect(trigger.querySelector("bdi")?.classList.contains("truncate")).toBe(true)
  })
})

describe("DvPhoneInput", () => {
  it("formats a full +960 default value", () => {
    render(
      <React.StrictMode>
        <DvFormField label="Phone">
          <DvPhoneInput defaultValue="+9607771234" />
        </DvFormField>
      </React.StrictMode>
    )
    expect((screen.getByLabelText("Phone") as HTMLInputElement).value).toBe("777 1234")
  })
})

describe("DvDropdownMenu", () => {
  it.each([
    [undefined, "rtl"],
    ["ltr" as const, "ltr"],
  ])("uses %s as %s direction", (dir, expected) => {
    render(
      <DvDropdownMenu open dir={dir}>
        <DvDropdownMenuContent>
          <DropdownMenuItem>ތަފްޞީލު</DropdownMenuItem>
        </DvDropdownMenuContent>
      </DvDropdownMenu>
    )

    expect(screen.getByRole("menu").getAttribute("dir")).toBe(expected)
  })
})

describe("DvPagination", () => {
  it("keeps previous and next semantics and icons correct in RTL", () => {
    const onPageChange = vi.fn()
    render(<DvPagination page={3} totalPages={5} onPageChange={onPageChange} />)

    const navigation = screen.getByRole("navigation")
    const previous = screen.getByLabelText("ފަހަތަށް")
    const next = screen.getByLabelText("ކުރިޔަށް")

    expect(navigation.getAttribute("dir")).toBe("rtl")
    expect(previous.querySelector("svg")?.classList.contains("lucide-chevron-right")).toBe(true)
    expect(next.querySelector("svg")?.classList.contains("lucide-chevron-left")).toBe(true)

    fireEvent.click(previous)
    fireEvent.click(next)
    fireEvent.click(screen.getByLabelText("ޞަފްޙާ 5"))

    expect(onPageChange.mock.calls).toEqual([[2], [4], [5]])
  })

  it("uses LTR icons when direction is overridden", () => {
    render(
      <DvPagination
        page={3}
        totalPages={5}
        onPageChange={() => undefined}
        dir="ltr"
        lang="en"
        previousLabel="Previous page"
        nextLabel="Next page"
      />
    )

    const previous = screen.getByLabelText("Previous page")
    const next = screen.getByLabelText("Next page")

    expect(screen.getByRole("navigation").getAttribute("dir")).toBe("ltr")
    expect(previous.querySelector("svg")?.classList.contains("lucide-chevron-left")).toBe(true)
    expect(next.querySelector("svg")?.classList.contains("lucide-chevron-right")).toBe(true)
  })
})

describe("DvDialogContent", () => {
  it.each([
    [undefined, undefined, "rtl", "dv"],
    ["ltr" as const, "en", "ltr", "en"],
  ])("uses overridable direction and language defaults", (dir, lang, expectedDir, expectedLang) => {
    render(
      <Dialog open>
        <DvDialogContent dir={dir} lang={lang}>
          <DialogTitle>ކަސްޓަމަރ</DialogTitle>
        </DvDialogContent>
      </Dialog>
    )

    const dialog = screen.getByRole("dialog")
    expect(dialog.getAttribute("dir")).toBe(expectedDir)
    expect(dialog.getAttribute("lang")).toBe(expectedLang)
  })
})

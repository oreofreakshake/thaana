import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import * as React from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Dialog, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DvAtollPicker } from "@/registry/components/dv-atoll-picker"
import { DvCombobox } from "@/registry/components/dv-combobox"
import { DvDatePicker, formatGregorianDate } from "@/registry/components/dv-date-picker"
import { DvDialogContent } from "@/registry/components/dv-dialog-content"
import { DvDropdownMenu, DvDropdownMenuContent } from "@/registry/components/dv-dropdown-menu"
import { DvFormField } from "@/registry/components/dv-form-field"
import { formatHijriDate } from "@/registry/components/dv-hijri-calendar"
import { DvIslandPicker } from "@/registry/components/dv-island-picker"
import {
  DvLocationPicker,
  updateLocationAtoll,
  updateLocationCoordinates,
  updateLocationIsland,
} from "@/registry/components/dv-location-picker"
import { DvPagination } from "@/registry/components/dv-pagination"
import { DvPhoneInput } from "@/registry/components/dv-phone-input"

const mapTestState = vi.hoisted(() => ({
  handlers: {} as Record<
    string,
    ((event: { lngLat: { lat: number; lng: number } }) => void) | undefined
  >,
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
    flyTo: vi.fn(),
  }
  return {
    Map: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement("div", { "data-testid": "map" }, children),
    MapControls: () => null,
    MapMarker: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactModule.Fragment, null, children),
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

afterEach(cleanup)

const locationAtolls = [
  { id: "north", code: "N", nameDv: "އުތުރު އަތޮޅު", nameEn: "North Atoll" },
  { id: "south", code: "S", nameDv: "ދެކުނު އަތޮޅު", nameEn: "South Atoll" },
]

const locationIslands = [
  {
    id: "harbor",
    atollId: "north",
    nameDv: "ބަނދަރު",
    nameEn: "Harbor",
    latitude: 4.1,
    longitude: 73.5,
  },
  { id: "jetty", atollId: "south", nameDv: "ޖެޓީ", nameEn: "Jetty" },
]

describe("DvAtollPicker", () => {
  it("renders mixed-language labels and updates a controlled value", () => {
    function ControlledPicker() {
      const [value, setValue] = React.useState("north")
      return <DvAtollPicker atolls={locationAtolls} value={value} onValueChange={setValue} />
    }

    render(<ControlledPicker />)
    expect(screen.getByRole("combobox").textContent).toContain("އުތުރު އަތޮޅު — North Atoll")
    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(screen.getByText("ދެކުނު އަތޮޅު — South Atoll"))
    expect(screen.getByRole("combobox").textContent).toContain("South Atoll")
  })
})

describe("DvIslandPicker", () => {
  it("filters by atoll and supports mixed-direction search in controlled usage", () => {
    const onValueChange = vi.fn()
    render(
      <DvIslandPicker
        islands={locationIslands}
        atollId="north"
        value=""
        onValueChange={onValueChange}
      />
    )

    fireEvent.click(screen.getByRole("combobox"))
    const search = screen.getByLabelText("ރަށެއް ހޯދާ...")
    fireEvent.change(search, { target: { value: "Harbor" } })
    expect(search.getAttribute("dir")).toBe("ltr")
    expect(screen.getByText("ބަނދަރު — Harbor")).toBeTruthy()
    expect(screen.queryByText("ޖެޓީ — Jetty")).toBeNull()
    fireEvent.click(screen.getByText("ބަނދަރު — Harbor"))
    expect(onValueChange).toHaveBeenCalledWith("harbor")
  })
})

describe("DvLocationPicker", () => {
  it("implements atoll, island, and coordinate update semantics", () => {
    const initial = { islandId: "harbor", latitude: 1, longitude: 2 }
    expect(updateLocationAtoll(initial, "south", locationIslands)).toEqual({
      atollId: "south",
      islandId: undefined,
      latitude: 1,
      longitude: 2,
    })
    expect(updateLocationIsland(initial, "harbor", locationIslands)).toEqual({
      atollId: "north",
      islandId: "harbor",
      latitude: 4.1,
      longitude: 73.5,
    })
    expect(updateLocationIsland(initial, "jetty", locationIslands)).toEqual({
      atollId: "south",
      islandId: "jetty",
      latitude: 1,
      longitude: 2,
    })
    expect(updateLocationCoordinates(initial, { latitude: 3, longitude: 4 })).toEqual({
      islandId: "harbor",
      latitude: 3,
      longitude: 4,
    })
  })

  it("selecting an island emits its valid coordinates", () => {
    const onValueChange = vi.fn()
    render(
      <DvLocationPicker
        islands={locationIslands}
        value={{}}
        onValueChange={onValueChange}
        showMap={false}
      />
    )

    fireEvent.click(screen.getByLabelText("ރަށް"))
    fireEvent.click(screen.getByText("ބަނދަރު — Harbor"))
    expect(onValueChange).toHaveBeenCalledWith({
      atollId: "north",
      islandId: "harbor",
      latitude: 4.1,
      longitude: 73.5,
    })
  })

  it("map selection updates coordinates and coordinate fields remain LTR", () => {
    const onValueChange = vi.fn()
    render(<DvLocationPicker value={{ islandId: "manual" }} onValueChange={onValueChange} />)

    expect(screen.getByLabelText("ލެޓިޓިއުޑް").getAttribute("dir")).toBe("ltr")
    expect(screen.getByLabelText("ލޮންޖިޓިއުޑް").getAttribute("dir")).toBe("ltr")
    act(() => mapTestState.handlers.click?.({ lngLat: { lat: 4.2, lng: 73.6 } }))
    expect(onValueChange).toHaveBeenCalledWith({
      islandId: "manual",
      latitude: 4.2,
      longitude: 73.6,
    })
  })

  it("allows direct coordinate editing without a map", () => {
    const onValueChange = vi.fn()
    render(
      <DvLocationPicker value={{ longitude: 73.5 }} onValueChange={onValueChange} showMap={false} />
    )

    fireEvent.change(screen.getByLabelText("ލެޓިޓިއުޑް"), { target: { value: "4.1755" } })
    expect(onValueChange).toHaveBeenCalledWith({ latitude: 4.1755, longitude: 73.5 })
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

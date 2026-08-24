import { cleanup, fireEvent, render, screen } from "@testing-library/react"
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
import { DvPagination } from "@/registry/components/dv-pagination"
import { DvPhoneInput } from "@/registry/components/dv-phone-input"

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)
Element.prototype.scrollIntoView = vi.fn()

afterEach(cleanup)

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

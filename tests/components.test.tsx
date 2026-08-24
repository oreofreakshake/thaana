import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Dialog, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DvDialogContent } from "@/registry/components/dv-dialog-content"
import { DvDropdownMenu, DvDropdownMenuContent } from "@/registry/components/dv-dropdown-menu"
import { DvPagination } from "@/registry/components/dv-pagination"

afterEach(cleanup)

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

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"

import {
  buildFontCss,
  DEFAULT_PUBLIC_FONT_CDN_URL,
  getFontCss,
  validateFontRegistry,
} from "@/lib/fonts/css"
import { getFont, thaanaFonts } from "@/lib/fonts/registry"
import type { ThaanaFont } from "@/lib/fonts/types"
import { FontDetailPage } from "@/src/pages/fonts/font-detail"

afterEach(cleanup)

describe("Thaana font CSS", () => {
  const requestedFonts = [
    ["mv-kelaa", "MV Kelaa", [400, 700], ["kelaa-regular.woff2", "kelaa-bold.woff2"]],
    ["mv-faseyha", "MV Faseyha", [400, 700], ["faseyha-regular.woff2", "faseyha-bold.woff2"]],
    [
      "mv-typewriter",
      "MV Typewriter",
      [400, 600, 700],
      ["typewriter-regular.woff2", "typewriter-semibold.woff2", "typewriter-bold.woff2"],
    ],
    ["mv-ilham", "MV Ilham", [400, 700], ["ilham-regular.woff2", "ilham-bold.woff2"]],
    ["mv-utheemu", "MV Utheemu", [400, 700], ["utheemu-regular.woff2", "utheemu-bold.woff2"]],
    ["mv-a-waheed", "MV A Waheed", [700], ["a-waheed-bold.woff2"]],
  ] as const

  it("contains only fonts explicitly requested by the user", () => {
    expect(thaanaFonts.map((font) => font.slug)).toEqual(requestedFonts.map(([slug]) => slug))
  })

  it.each(requestedFonts)("builds the expected styles for %s", (slug, family, weights, files) => {
    const css = getFontCss(slug)
    expect(css).toContain(`font-family: "${family}"`)
    for (const weight of weights) expect(css).toContain(`font-weight: ${weight}`)
    for (const file of files) expect(css).toContain(file)
    expect(css).toContain(`--thaana-font-${slug}`)
  })

  it("builds deterministic CSS for a known public font", () => {
    const css = getFontCss("mv-kelaa")

    expect(css).toContain('font-family: "MV Kelaa"')
    expect(css).toContain("font-weight: 400")
    expect(css).toContain("font-display: swap")
    expect(css).toContain('/fonts/assets/mv-kelaa/kelaa-regular.woff2")')
    expect(css).toContain('format("woff2")')
    expect(css).toContain("--thaana-font-mv-kelaa")
    expect(css).toBe(getFontCss("mv-kelaa"))

    const remoteCss = buildFontCss(getFont("mv-kelaa") as ThaanaFont, "https://cdn.thaana.yazak.me")
    expect(remoteCss).toContain("https://cdn.thaana.yazak.me/mv-kelaa/kelaa-regular.woff2")
    expect(DEFAULT_PUBLIC_FONT_CDN_URL).toBe("https://thaana.yazak.me/fonts/assets")
  })

  it("does not serve metadata-only fonts", () => {
    const privateFont: ThaanaFont = {
      slug: "private-font",
      name: "Private Font",
      family: "Private Font",
      license: "Unknown",
      distribution: "metadata-only",
      fallback: "sans-serif",
      styles: [],
    }
    expect(() => buildFontCss(privateFont)).toThrow("not publicly distributable")
  })
})

describe("font registry validation", () => {
  it("accepts the canonical registry", () => {
    expect(validateFontRegistry()).toEqual([])
  })

  it("rejects missing required metadata and unlicensed public distribution", () => {
    const invalid: ThaanaFont = {
      slug: "Bad Slug",
      name: "",
      family: "Bad\nFamily",
      license: "Unknown",
      distribution: "public",
      fallback: "" as ThaanaFont["fallback"],
      styles: [],
    }
    expect(validateFontRegistry([invalid])).toEqual(
      expect.arrayContaining([
        expect.stringContaining("invalid slug"),
        expect.stringContaining("name is required"),
        expect.stringContaining("invalid CSS family"),
        expect.stringContaining("verified license"),
        expect.stringContaining("at least one style"),
      ])
    )
  })
})

describe("font detail page", () => {
  it("previews Dhivehi text and exposes copy-ready installation", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/fonts/mv-kelaa"]}>
        <Routes>
          <Route path="/fonts/:slug" element={<FontDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole("heading", { name: "MV Kelaa", level: 1 })).toBeTruthy()
    const preview = screen.getByLabelText("Dhivehi font preview text") as HTMLTextAreaElement
    fireEvent.change(preview, { target: { value: "ތާނަ" } })
    expect(preview.value).toBe("ތާނަ")
    expect(container.textContent).toContain("@import url")
    expect(document.head.querySelector('link[href="/fonts/css/mv-kelaa.css"]')).toBeTruthy()
  })
})

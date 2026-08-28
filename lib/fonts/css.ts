import { getFont, getPublicFonts, thaanaFonts } from "./registry.ts"
import type { FontWeight, ThaanaFont } from "./types.ts"

export const FONT_CSS_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
export const FONT_BINARY_CACHE_CONTROL = "public, max-age=31536000, immutable"
export const DEFAULT_PUBLIC_FONT_CDN_URL = "https://thaana.yazak.me/fonts/assets"

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const cssFamilyPattern = /^[\p{L}\p{N} ._-]+$/u
const unicodeRangePattern =
  /^U\+[0-9A-F?]{1,6}(?:-[0-9A-F]{1,6})?(?:, U\+[0-9A-F?]{1,6}(?:-[0-9A-F]{1,6})?)*$/i
const allowedFallbacks = new Set(["sans-serif", "serif", "monospace", "system-ui"])

function weightValue(weight: FontWeight): string {
  return typeof weight !== "number" ? `${weight[0]} ${weight[1]}` : String(weight)
}

function variableName(slug: string): string {
  return `--thaana-font-${slug}`
}

function escapeCssString(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\a ")
}

function resolveAssetUrl(url: string, cdnBaseUrl?: string): string {
  if (/^https:\/\//.test(url)) return url
  const base = cdnBaseUrl?.replace(/\/$/, "") ?? "/fonts/assets"
  return `${base}/${url.replace(/^\//, "")}`
}

export function validateFontRegistry(fonts: readonly ThaanaFont[] = thaanaFonts): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()

  for (const font of fonts) {
    if (!slugPattern.test(font.slug)) errors.push(`${font.slug || "<missing>"}: invalid slug`)
    if (slugs.has(font.slug)) errors.push(`${font.slug}: duplicate slug`)
    slugs.add(font.slug)
    if (!font.name.trim()) errors.push(`${font.slug}: name is required`)
    if (!cssFamilyPattern.test(font.family)) errors.push(`${font.slug}: invalid CSS family`)
    if (!font.license.trim()) errors.push(`${font.slug}: license is required`)
    if (!allowedFallbacks.has(font.fallback)) errors.push(`${font.slug}: invalid fallback`)
    if (font.distribution === "public") {
      if (font.styles.length === 0)
        errors.push(`${font.slug}: public fonts need at least one style`)
      if (font.license.toLowerCase() === "unknown") {
        errors.push(`${font.slug}: public fonts need a verified license`)
      }
      if (!font.licenseUrl) errors.push(`${font.slug}: public fonts need a license URL`)
    }
    for (const style of font.styles) {
      const weights = typeof style.weight !== "number" ? style.weight : [style.weight]
      if (weights.some((weight) => !Number.isInteger(weight) || weight < 1 || weight > 1000)) {
        errors.push(`${font.slug}: invalid weight`)
      }
      if (typeof style.weight !== "number" && style.weight[0] >= style.weight[1]) {
        errors.push(`${font.slug}: invalid weight range`)
      }
      if (!style.url || (!/^https:\/\//.test(style.url) && style.url.includes(".."))) {
        errors.push(`${font.slug}: invalid asset URL`)
      }
      if (style.unicodeRange && !unicodeRangePattern.test(style.unicodeRange)) {
        errors.push(`${font.slug}: invalid unicode range`)
      }
    }
  }

  return errors
}

export function assertValidFontRegistry(fonts: readonly ThaanaFont[] = thaanaFonts): void {
  const errors = validateFontRegistry(fonts)
  if (errors.length > 0) throw new Error(`Invalid Thaana font registry:\n${errors.join("\n")}`)
}

export function buildFontCss(font: ThaanaFont, cdnBaseUrl?: string): string {
  if (font.distribution !== "public") throw new Error(`${font.slug} is not publicly distributable`)

  const family = escapeCssString(font.family)
  const fallback = escapeCssString(font.fallback)
  const faces = font.styles.map((style) => {
    const unicodeRange = style.unicodeRange ? `\n  unicode-range:\n    ${style.unicodeRange};` : ""
    return `@font-face {\n  font-family: "${family}";\n  font-style: ${style.style};\n  font-weight: ${weightValue(style.weight)};\n  font-display: swap;\n  src: url("${escapeCssString(resolveAssetUrl(style.url, cdnBaseUrl))}")\n    format("woff2");${unicodeRange}\n}`
  })

  const variable = variableName(font.slug)
  return `${faces.join("\n\n")}\n\n:root {\n  ${variable}: "${family}", ${fallback};\n}\n\n.font-${font.slug} {\n  font-family: var(${variable});\n}\n`
}

assertValidFontRegistry()

export const prebuiltFontCss = new Map(
  getPublicFonts().map((font) => [font.slug, buildFontCss(font, process.env.THAANA_FONT_CDN_URL)])
)

export function getFontCss(slug: string): string | undefined {
  const font = getFont(slug)
  if (font?.distribution !== "public") return undefined
  return prebuiltFontCss.get(slug)
}

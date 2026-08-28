export type FontDistribution = "public" | "metadata-only"
export type FontFallback = "sans-serif" | "serif" | "monospace" | "system-ui"

export type FontWeight = number | readonly [min: number, max: number]

export type ThaanaFontStyle = {
  weight: FontWeight
  style: "normal" | "italic"
  url: string
  format: "woff2"
  unicodeRange?: string
}

export type ThaanaFont = {
  slug: string
  name: string
  family: string
  description?: string
  designer?: string
  license: string
  licenseUrl?: string
  sourceUrl?: string
  subsets?: string[]
  distribution: FontDistribution
  fallback: FontFallback
  styles: ThaanaFontStyle[]
}

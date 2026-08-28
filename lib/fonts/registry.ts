import type { ThaanaFont } from "./types.ts"

export const thaanaFonts: readonly ThaanaFont[] = [
  {
    slug: "mv-kelaa",
    name: "MV Kelaa",
    family: "MV Kelaa",
    description: "A versatile Dhivehi family with regular and bold styles.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-kelaa",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_Kelaa.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "sans-serif",
    styles: [
      {
        weight: 400,
        style: "normal",
        url: "mv-kelaa/kelaa-regular.woff2",
        format: "woff2",
      },
      {
        weight: 700,
        style: "normal",
        url: "mv-kelaa/kelaa-bold.woff2",
        format: "woff2",
      },
    ],
  },
  {
    slug: "mv-faseyha",
    name: "MV Faseyha",
    family: "MV Faseyha",
    description: "A readable Dhivehi family for body copy and everyday interfaces.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-faseyha",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_Faseyha.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "sans-serif",
    styles: [
      {
        weight: 400,
        style: "normal",
        url: "mv-faseyha/faseyha-regular.woff2",
        format: "woff2",
      },
      {
        weight: 700,
        style: "normal",
        url: "mv-faseyha/faseyha-bold.woff2",
        format: "woff2",
      },
    ],
  },
  {
    slug: "mv-typewriter",
    name: "MV Typewriter",
    family: "MV Typewriter",
    description: "A distinctive typewriter inspired Dhivehi family in three weights.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-typewriter",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_Typewriter.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "monospace",
    styles: [
      {
        weight: 400,
        style: "normal",
        url: "mv-typewriter/typewriter-regular.woff2",
        format: "woff2",
      },
      {
        weight: 600,
        style: "normal",
        url: "mv-typewriter/typewriter-semibold.woff2",
        format: "woff2",
      },
      {
        weight: 700,
        style: "normal",
        url: "mv-typewriter/typewriter-bold.woff2",
        format: "woff2",
      },
    ],
  },
  {
    slug: "mv-ilham",
    name: "MV Ilham",
    family: "MV Ilham",
    description: "A confident Dhivehi family with regular and bold styles.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-ilham",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_Ilham.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "sans-serif",
    styles: [
      {
        weight: 400,
        style: "normal",
        url: "mv-ilham/ilham-regular.woff2",
        format: "woff2",
      },
      {
        weight: 700,
        style: "normal",
        url: "mv-ilham/ilham-bold.woff2",
        format: "woff2",
      },
    ],
  },
  {
    slug: "mv-utheemu",
    name: "MV Utheemu",
    family: "MV Utheemu",
    description: "A characterful Dhivehi family with regular and bold styles.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-utheemu",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_Utheemu.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "sans-serif",
    styles: [
      {
        weight: 400,
        style: "normal",
        url: "mv-utheemu/utheemu-regular.woff2",
        format: "woff2",
      },
      {
        weight: 700,
        style: "normal",
        url: "mv-utheemu/utheemu-bold.woff2",
        format: "woff2",
      },
    ],
  },
  {
    slug: "mv-a-waheed",
    name: "MV A Waheed",
    family: "MV A Waheed",
    description: "A bold Dhivehi display face for prominent headings and labels.",
    designer: "Hassan Hameed",
    license: "Free for personal & commercial use",
    licenseUrl: "https://www.thaanafontgallery.com/font/mv-a-waheed",
    sourceUrl: "https://www.thaanafontgallery.com/downloads/fonts/MV_A_Waheed.zip",
    subsets: ["thaana"],
    distribution: "public",
    fallback: "sans-serif",
    styles: [
      {
        weight: 700,
        style: "normal",
        url: "mv-a-waheed/a-waheed-bold.woff2",
        format: "woff2",
      },
    ],
  },
]

export function getFont(slug: string): ThaanaFont | undefined {
  return thaanaFonts.find((font) => font.slug === slug)
}

export function getPublicFonts(): ThaanaFont[] {
  return thaanaFonts.filter((font) => font.distribution === "public")
}

export function getFontWeightOptions(font: ThaanaFont): number[] {
  const weights = new Set<number>()
  for (const style of font.styles) {
    if (typeof style.weight !== "number") {
      for (const weight of [100, 300, 400, 500, 700, 900]) {
        if (weight >= style.weight[0] && weight <= style.weight[1]) weights.add(weight)
      }
    } else {
      weights.add(style.weight)
    }
  }
  return [...weights].sort((a, b) => a - b)
}

import { mkdir, readdir, unlink, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { buildFontCss, DEFAULT_PUBLIC_FONT_CDN_URL } from "../lib/fonts/css.ts"
import { getPublicFonts } from "../lib/fonts/registry.ts"

const packageOutputDirectory = fileURLToPath(new URL("../packages/fonts/dist/", import.meta.url))
const publicOutputDirectory = fileURLToPath(new URL("../public/fonts/css/", import.meta.url))
const cdnBaseUrl = process.env.THAANA_FONT_CDN_URL ?? DEFAULT_PUBLIC_FONT_CDN_URL
const fonts = getPublicFonts()

const expectedFiles = new Set(["all.css", ...fonts.map((font) => `${font.slug}.css`)])

async function prepareOutputDirectory(directory: string) {
  await mkdir(directory, { recursive: true })
  for (const file of await readdir(directory)) {
    if (file.endsWith(".css") && !expectedFiles.has(file)) {
      await unlink(`${directory}/${file}`)
    }
  }
}

async function buildStylesheets(directory: string, assetBaseUrl?: string) {
  await prepareOutputDirectory(directory)
  for (const font of fonts) {
    await writeFile(`${directory}/${font.slug}.css`, buildFontCss(font, assetBaseUrl), "utf8")
  }

  const allCss = fonts
    .map((font) => `/* ${font.name} */\n${buildFontCss(font, assetBaseUrl)}`)
    .join("\n")
  await writeFile(`${directory}/all.css`, allCss, "utf8")
}

await Promise.all([
  buildStylesheets(packageOutputDirectory, cdnBaseUrl),
  buildStylesheets(publicOutputDirectory),
])

console.log(
  `Built ${fonts.length} Thaana font stylesheet${fonts.length === 1 ? "" : "s"} for the package and public site.`
)

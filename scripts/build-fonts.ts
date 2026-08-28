import { mkdir, readdir, unlink, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { buildFontCss, DEFAULT_PUBLIC_FONT_CDN_URL } from "../lib/fonts/css.ts"
import { getPublicFonts } from "../lib/fonts/registry.ts"

const outputDirectory = fileURLToPath(new URL("../packages/fonts/dist/", import.meta.url))
const cdnBaseUrl = process.env.THAANA_FONT_CDN_URL ?? DEFAULT_PUBLIC_FONT_CDN_URL
const fonts = getPublicFonts()

await mkdir(outputDirectory, { recursive: true })

const expectedFiles = new Set(["all.css", ...fonts.map((font) => `${font.slug}.css`)])
for (const file of await readdir(outputDirectory)) {
  if (file.endsWith(".css") && !expectedFiles.has(file)) {
    await unlink(`${outputDirectory}/${file}`)
  }
}

for (const font of fonts) {
  await writeFile(`${outputDirectory}/${font.slug}.css`, buildFontCss(font, cdnBaseUrl), "utf8")
}

const allCss = fonts
  .map((font) => `/* ${font.name} */\n${buildFontCss(font, cdnBaseUrl)}`)
  .join("\n")
await writeFile(`${outputDirectory}/all.css`, allCss, "utf8")

console.log(`Built ${fonts.length} Thaana font stylesheet${fonts.length === 1 ? "" : "s"}.`)

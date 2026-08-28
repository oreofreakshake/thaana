import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

import { FONT_CSS_CACHE_CONTROL, getFontCss } from "./lib/fonts/css.ts"

const projectRoot = fileURLToPath(new URL(".", import.meta.url))

function fontCssDevServer(): Plugin {
  return {
    name: "thaana-font-css",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname
        const match = pathname.match(/^\/fonts\/css\/([a-z0-9-]+)$/)
        if (!match) return next()

        const css = getFontCss(match[1])
        response.statusCode = css ? 200 : 404
        response.setHeader("Content-Type", "text/css; charset=utf-8")
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader(
          "Cache-Control",
          css ? FONT_CSS_CACHE_CONTROL : "public, max-age=60, s-maxage=300"
        )
        response.setHeader("X-Content-Type-Options", "nosniff")
        response.end(css ?? "/* Thaana font not found */\n")
      })
    },
  }
}

export default defineConfig({
  plugins: [fontCssDevServer(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
})

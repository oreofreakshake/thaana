import { copyFile, mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { sites } from "@openai/sites-vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const projectRoot = fileURLToPath(new URL(".", import.meta.url))

function workerEntry() {
  return {
    name: "thaana-worker-entry",
    apply: "build",
    async closeBundle() {
      const serverDirectory = fileURLToPath(new URL("./dist/server", import.meta.url))
      await mkdir(serverDirectory, { recursive: true })
      await copyFile(
        fileURLToPath(new URL("./server/index.js", import.meta.url)),
        fileURLToPath(new URL("./dist/server/index.js", import.meta.url))
      )
    },
  } as const
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sites(), workerEntry()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
})

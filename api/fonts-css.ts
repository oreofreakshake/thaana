import { FONT_CSS_CACHE_CONTROL, getFontCss } from "../lib/fonts/css.ts"

type ApiRequest = {
  query: Record<string, string | string[] | undefined>
}

type ApiResponse = {
  status: (statusCode: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  send: (body: string) => void
}

export default function handler(request: ApiRequest, response: ApiResponse) {
  const value = request.query.slug
  const slug = Array.isArray(value) ? value[0] : value
  const css = slug ? getFontCss(slug) : undefined

  response.setHeader("Content-Type", "text/css; charset=utf-8")
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("X-Content-Type-Options", "nosniff")
  if (!css) {
    response.setHeader("Cache-Control", "public, max-age=60, s-maxage=300")
    response.status(404).send("/* Thaana font not found */\n")
    return
  }

  response.setHeader("Cache-Control", FONT_CSS_CACHE_CONTROL)
  response.status(200).send(css)
}

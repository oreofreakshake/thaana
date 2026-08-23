export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)

    if (
      response.status === 404 &&
      request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html")
    ) {
      const indexUrl = new URL("/index.html", request.url)
      return env.ASSETS.fetch(new Request(indexUrl, request))
    }

    return response
  },
}

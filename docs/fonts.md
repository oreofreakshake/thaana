# Maintaining Thaana Fonts

`lib/fonts/registry.ts` is the only source of font metadata. Public entries automatically appear
in the catalogue, CSS endpoint, and generated `@thaana/fonts` stylesheets.

## Add a font

1. Verify the exact redistribution and web-hosting license. Keep uncertain entries
   `metadata-only`.
2. Export production WOFF2 files. Do not ship TTF or OTF to browsers.
3. Upload the versioned assets to the configured font CDN.
4. Add one registry entry with its family, designer, source, license, and distribution state.
5. Add each weight/style and its CDN-relative asset path. Add `unicodeRange` only when it comes
   from verified glyph metadata.
6. Run `pnpm fonts:build` and `pnpm validate`.
7. Commit the generated `packages/fonts/dist` stylesheets. The font then appears in the catalogue.

## CDN configuration

Set `THAANA_FONT_CDN_URL` to override the asset origin during package generation. Published package
CSS defaults to `https://thaana.yazak.me/fonts/assets`; the application CSS endpoint falls back to
same-origin `/fonts/assets` in local development. Absolute HTTPS style URLs are also supported for
exceptional cases, but Thaana-owned CDN paths are preferred.

Public WOFF2 responses should include:

```text
Content-Type: font/woff2
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=31536000, immutable
```

Use versioned or content-hashed asset paths before applying immutable caching. Generated CSS uses a
short browser cache and a longer shared CDN cache so registry changes can propagate safely.

The Vercel configuration already applies the CORS and immutable cache headers to local
`/fonts/assets/*`. Mirror those headers on Cloudflare R2 or the CDN in front of it.

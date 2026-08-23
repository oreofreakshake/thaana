# thaana

An open-source, Dhivehi-first shadcn registry for React and TypeScript projects.

Thaana provides Dhivehi, Thaana-script, and RTL-aware components and blocks. It composes shadcn primitives instead of translating or forking them, and avoids framework-specific APIs so items can be used in Next.js, Vite React, React Router, TanStack Start, Astro with React, and other React environments.

The registry currently contains two components: `dv-input` and `dv-select`.

## Install `dv-input`

The target project must already be initialized for shadcn and use TypeScript:

```sh
pnpm dlx shadcn@latest init
```

Install directly from this public GitHub registry:

```sh
pnpm dlx shadcn@latest add oreofreakshake/thaana/dv-input
```

The CLI installs `dv-input` into the project's configured components directory and resolves its standard shadcn `input` dependency.

Then import it using the alias configured by the target project:

```tsx
import { DvInput } from "@/components/dv-input"

export function ProfileField() {
  return <DvInput placeholder="ނަން ލިޔުއްވާ" />
}
```

`DvInput` defaults to `lang="dv"`, `dir="rtl"`, and logically start-aligned text. Standard React input props remain available, and explicit `lang`, `dir`, or `style={{ textAlign: ... }}` values override those defaults.

## Install `dv-select`

Install `dv-select` and its standard shadcn Select dependency:

```sh
pnpm dlx shadcn@latest add oreofreakshake/thaana/dv-select
```

Compose it with the Select parts installed by shadcn:

```tsx
import { DvSelect } from "@/components/dv-select"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function IslandField() {
  return (
    <DvSelect>
      <SelectTrigger lang="dv">
        <SelectValue placeholder="ރަށެއް ހޮވާ" />
      </SelectTrigger>
      <SelectContent lang="dv">
        <SelectItem value="male">މާލެ</SelectItem>
        <SelectItem value="hulhumale">ހުޅުމާލެ</SelectItem>
      </SelectContent>
    </DvSelect>
  )
}
```

`DvSelect` defaults the Select root to `dir="rtl"`, including its portalled content and Radix direction-aware behavior. Pass `dir="ltr"` to override it. Apply `lang="dv"` to DOM-rendering parts such as `SelectTrigger` and `SelectContent`, or inherit it from the host document.

## RTL application setup

For a Dhivehi application, set the document language and direction:

```html
<html lang="dv" dir="rtl">
```

Add shadcn's direction component and wrap the React application with its provider:

```sh
pnpm dlx shadcn@latest add direction
```

```tsx
import { DirectionProvider } from "@/components/ui/direction"

<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>
```

Thaana components still provide local RTL defaults so individual components also work inside mixed-direction or LTR applications.

## Bidirectional content

- Use `dir="ltr"` for email addresses, URLs, phone numbers, codes, and complete formatted MVR values.
- Use `dir="auto"` or `<bdi>` for user-generated or otherwise unknown-direction content.
- Use logical alignment utilities such as `text-start` and `text-end` instead of physical left/right alignment.

## Local development

Install dependencies and run all checks:

```sh
pnpm install
pnpm validate
```

Biome is the sole formatter and linter for this repository. Check formatting, imports, and lint rules without changing files:

```sh
pnpm check
```

Apply Biome's safe formatting, import organization, and lint fixes:

```sh
pnpm check:write
```

Build the static registry payloads in `public/r`:

```sh
pnpm build
```

Validate only the source registry:

```sh
pnpm registry:validate
```

The source registry is defined by `registry.json`. Generated static item payloads are written to `public/r` by the shadcn CLI.

## License

MIT

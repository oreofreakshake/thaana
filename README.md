# thaana

An open-source, Dhivehi-first shadcn registry for React and TypeScript projects.

Thaana provides Dhivehi, Thaana-script, and RTL-aware components and blocks. It composes shadcn primitives instead of translating or forking them, and avoids framework-specific APIs so items can be used in Next.js, Vite React, React Router, TanStack Start, Astro with React, and other React environments.

The registry currently contains one component: `dv-input`.

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

`DvInput` defaults to `lang="dv"`, `dir="rtl"`, and right-aligned text. Standard React input props remain available, and explicit `lang`, `dir`, or `style={{ textAlign: ... }}` values override those defaults.

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

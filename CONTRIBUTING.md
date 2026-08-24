# Contributing to Thaana

Thaana stays useful by keeping a small, framework-neutral surface and by solving concrete Dhivehi, Thaana, RTL, or bidirectional interface problems.

## Before proposing an item

- Start with a real Dhivehi use case that normal shadcn composition does not already cover.
- Compose current shadcn primitives; do not fork a primitive for cosmetic differences.
- Keep React and TypeScript code framework-neutral. Do not introduce Next.js-only APIs.
- Avoid localization frameworks, global providers, font packages, or date abstractions unless an accepted design explicitly requires one.
- Prefer native bidi behavior, semantic HTML, logical CSS, and local portal direction defaults.

Open an issue before implementing a large block or a new abstraction so its API and registry dependency graph can be reviewed first.

## Local setup

```sh
pnpm install
pnpm dev
```

Source registry items live in `registry/components`, examples in `registry/examples`, blocks in `registry/blocks`, and shared portable utilities in `registry/lib`. The docs application lives in `src` and must not become a hidden runtime dependency of registry items.

## Required checks

```sh
pnpm check
pnpm typecheck
pnpm test
pnpm registry:validate
pnpm build
```

Run `pnpm registry:build` after editing registry source. Commit the matching generated `public/r/*.json` payloads. Do not edit generated payloads by hand.

For portable changes, install the affected URL into at least one clean non-Next React project. Portal-based components should also be checked under an RTL DirectionProvider and in an LTR host.

## Pull requests

Keep each pull request focused. Explain the Dhivehi/RTL problem, the public API, dependency additions, framework portability, bidi behavior, and tests performed. Include screenshots for visual changes and call out any breaking behavior.

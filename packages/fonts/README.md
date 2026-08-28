# @thaana/fonts

Small CSS entry points for the public fonts in the Thaana Fonts catalogue. Font binaries stay on
the remote font host and are not included in this package.

```sh
pnpm add @thaana/fonts
```

```tsx
import "@thaana/fonts/mv-kelaa"
```

```css
.title {
  font-family: var(--thaana-font-mv-kelaa);
}
```

Importing `@thaana/fonts/all` is supported, but individual imports avoid loading unused fonts.

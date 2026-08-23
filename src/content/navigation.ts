type DocsLink = {
  title: string
  href: string
}

type DocsSection = {
  title: string
  links: DocsLink[]
}

export const docsNavigation: DocsSection[] = [
  {
    title: "Start here",
    links: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Foundations",
    links: [
      { title: "RTL architecture", href: "/docs/rtl" },
      { title: "Bidirectional content", href: "/docs/bidirectional-content" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Select", href: "/docs/components/select" },
    ],
  },
]

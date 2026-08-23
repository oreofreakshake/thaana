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
      { title: "Form Field", href: "/docs/components/form-field" },
      { title: "Currency Input", href: "/docs/components/currency-input" },
      { title: "Phone Input", href: "/docs/components/phone-input" },
      { title: "Data Table", href: "/docs/components/data-table" },
    ],
  },
]

export const docsOnThisPage: Record<string, DocsLink[]> = {
  "/docs/introduction": [
    { title: "What Thaana solves", href: "#what-thaana-solves" },
    { title: "Built on shadcn", href: "#built-on-shadcn" },
    { title: "Current scope", href: "#current-scope" },
  ],
  "/docs/installation": [
    { title: "Prerequisite", href: "#prerequisite" },
    { title: "Add a component", href: "#add-a-component" },
    { title: "Recommended RTL setup", href: "#recommended-rtl-host-setup" },
  ],
  "/docs/rtl": [
    { title: "Document direction", href: "#document-direction" },
    { title: "Primitive direction", href: "#primitive-direction" },
    { title: "Logical CSS", href: "#logical-css" },
    { title: "Local defaults and portals", href: "#local-defaults-and-portals" },
  ],
  "/docs/bidirectional-content": [
    { title: "Known LTR values", href: "#known-ltr-values" },
    { title: "Unknown direction", href: "#unknown-direction" },
    { title: "Alignment", href: "#alignment" },
  ],
  "/docs/components/input": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Disabled", href: "#disabled" },
    { title: "LTR values", href: "#ltr-values" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/select": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Disabled", href: "#disabled" },
    { title: "Mixed-direction options", href: "#mixed-direction-options" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/form-field": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Validation", href: "#validation" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/currency-input": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Value model", href: "#value-model" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/phone-input": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Validation", href: "#validation" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/data-table": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Column model", href: "#column-model" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
}

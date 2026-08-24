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
    title: "Patterns",
    links: [
      { title: "Mixed Dhivehi and English", href: "/docs/patterns/mixed-content" },
      { title: "Search direction", href: "/docs/patterns/search-direction" },
      { title: "Currency", href: "/docs/patterns/currency" },
      { title: "Phone numbers", href: "/docs/patterns/phone-numbers" },
      { title: "RTL forms", href: "/docs/patterns/rtl-forms" },
      { title: "RTL tables", href: "/docs/patterns/rtl-tables" },
      { title: "Portals in RTL", href: "/docs/patterns/portals" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Search", href: "/docs/components/search" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Form Field", href: "/docs/components/form-field" },
      { title: "Currency Input", href: "/docs/components/currency-input" },
      { title: "Phone Input", href: "/docs/components/phone-input" },
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Dialog", href: "/docs/components/dialog" },
    ],
  },
  {
    title: "Blocks",
    links: [
      { title: "Customer Management", href: "/docs/blocks/customer-management" },
      { title: "Invoice", href: "/docs/blocks/invoice" },
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
  "/docs/components/search": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "English query", href: "#english-query" },
    { title: "Mixed real-world data", href: "#mixed-data" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/combobox": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Option model", href: "#option-model" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/date-picker": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Hijri calendar", href: "#hijri-calendar" },
    { title: "Date range", href: "#date-range" },
    { title: "Date of birth", href: "#date-of-birth" },
    { title: "Date and time", href: "#date-and-time" },
    { title: "Calendar model", href: "#calendar-model" },
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
  "/docs/components/dropdown-menu": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/pagination": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/components/dialog": [
    { title: "Installation", href: "#installation" },
    { title: "Usage", href: "#usage" },
    { title: "Examples", href: "#examples" },
    { title: "Portal boundary", href: "#portal-boundary" },
    { title: "RTL behavior", href: "#rtl-behavior" },
  ],
  "/docs/blocks/customer-management": [
    { title: "Live block", href: "#live-block" },
    { title: "Installation", href: "#installation" },
    { title: "Architecture", href: "#architecture" },
  ],
  "/docs/blocks/invoice": [
    { title: "Live block", href: "#live-block" },
    { title: "Installation", href: "#installation" },
    { title: "Architecture", href: "#architecture" },
  ],
}

for (const href of [
  "/docs/patterns/mixed-content",
  "/docs/patterns/search-direction",
  "/docs/patterns/currency",
  "/docs/patterns/phone-numbers",
  "/docs/patterns/rtl-forms",
  "/docs/patterns/rtl-tables",
  "/docs/patterns/portals",
]) {
  docsOnThisPage[href] = [
    { title: "Convention", href: "#convention" },
    { title: "Example", href: "#example" },
    { title: "Checklist", href: "#checklist" },
  ]
}

import { CodeBlock } from "@/src/components/code-block"
import { DocsPage } from "@/src/components/docs-page"

type PatternPageProps = {
  title: string
  description: string
  principle: string
  example: string
  checklist: string[]
}

function PatternPage({ title, description, principle, example, checklist }: PatternPageProps) {
  return (
    <DocsPage title={title} description={description} eyebrow="Patterns">
      <section id="convention">
        <h2>Convention</h2>
        <p>{principle}</p>
      </section>
      <section id="example">
        <h2>Example</h2>
        <CodeBlock>{example}</CodeBlock>
      </section>
      <section id="checklist">
        <h2>Checklist</h2>
        <ul>
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </DocsPage>
  )
}

export function MixedContentPatternPage() {
  return (
    <PatternPage
      title="Mixed Dhivehi and English"
      description="Keep each value in its natural reading direction without changing the surrounding RTL layout."
      principle={
        'Use a local bidi boundary for each mixed value. Known Latin values get dir="ltr"; user-provided names and labels get bdi or dir="auto".'
      }
      example={`<p lang="dv" dir="rtl">
  ކަސްޓަމަރ: <bdi dir="auto">{customer.name}</bdi>
  <span dir="ltr" lang="en">{customer.email}</span>
</p>`}
      checklist={[
        "Do not reverse strings or punctuation in JavaScript.",
        "Isolate dynamic inline values with bdi.",
        "Set lang when the value's language is known.",
      ]}
    />
  )
}

export function SearchDirectionPatternPage() {
  return (
    <PatternPage
      title="Search direction"
      description="Let a search field follow the query while the surrounding form remains RTL."
      principle="Use DvSearch or DvCombobox for adaptive query direction. Their direction follows the first strong character, not the keyboard or the page direction."
      example={`<DvSearch
  placeholder="ނަން، އީމެއިލް ނުވަތަ ID ހޯދާ..."
  onChange={(event) => setQuery(event.currentTarget.value)}
/>`}
      checklist={[
        "Keep an empty query RTL by default.",
        "Search both Dhivehi and Latin fields when the dataset contains both.",
        "Do not force every result label into the query direction.",
      ]}
    />
  )
}

export function CurrencyPatternPage() {
  return (
    <PatternPage
      title="Currency"
      description="Treat the Rufiyaa symbol and formatted amount as one stable LTR numeric unit."
      principle={
        'Use DvCurrencyInput for entry and isolate displayed amounts with dir="ltr". Keep decimals and grouping in a numeric font with tabular figures.'
      }
      example={`<DvCurrencyInput
  value={amount}
  onValueChange={setAmount}
  min={0}
/>

<span dir="ltr" lang="en" className="tabular-nums">
  <RufiyaaSymbol /> 1,250.00
</span>`}
      checklist={[
        "Keep the symbol and digits inside the same LTR boundary.",
        "Store a number or null, not the formatted input string.",
        "Define tax and rounding rules in the application domain.",
      ]}
    />
  )
}

export function PhoneNumbersPatternPage() {
  return (
    <PatternPage
      title="Phone numbers"
      description="Keep the +960 prefix, digits, and punctuation readable inside RTL forms."
      principle="Use DvPhoneInput for Maldivian mobile numbers. It owns the +960 prefix, LTR isolation, seven-digit formatting, and 7-or-9 validation."
      example={`<DvFormField label="ފޯނު ނަންބަރު" required>
  <DvPhoneInput
    value={phone}
    onValueChange={setPhone}
    required
  />
</DvFormField>`}
      checklist={[
        "Keep the entire phone token LTR.",
        "Validate complete values on submission as well as in the UI.",
        "Do not add spaces to the value sent to an API unless its contract expects them.",
      ]}
    />
  )
}

export function RtlFormsPatternPage() {
  return (
    <PatternPage
      title="RTL forms"
      description="Build forms from logical layout rules and give exceptional fields their own direction."
      principle="Keep the form, labels, descriptions, and errors RTL. Override only values with a clear LTR structure such as email, URLs, dates, and identifiers."
      example={`<form lang="dv" dir="rtl" className="grid gap-4">
  <DvFormField label="ނަން" required>
    <DvInput required />
  </DvFormField>
  <DvFormField label="އީމެއިލް">
    <DvInput type="email" dir="ltr" lang="en" />
  </DvFormField>
</form>`}
      checklist={[
        "Use DvFormField to connect labels and messages.",
        "Use gap, start, and end instead of left and right spacing.",
        "Keep validation text adjacent to the control it describes.",
      ]}
    />
  )
}

export function RtlTablesPatternPage() {
  return (
    <PatternPage
      title="RTL tables"
      description="Keep table order RTL while aligning each column for the type of data it contains."
      principle="Use DvDataTable's column dir and align fields. Dhivehi text starts in RTL; identifiers and numbers stay LTR and usually align to the logical end."
      example={`const columns = [
  { id: "name", header: "ނަން", cell: (row) => <bdi>{row.name}</bdi> },
  {
    id: "email",
    header: "އީމެއިލް",
    cell: (row) => row.email,
    dir: "ltr",
  },
  { id: "total", header: "ޖުމްލަ", cell: renderMoney, dir: "ltr", align: "end" },
]`}
      checklist={[
        "Set direction per column rather than per table row.",
        "Use tabular numerals for comparable amounts.",
        "Give icon-only row actions an accessible label.",
      ]}
    />
  )
}

export function PortalsPatternPage() {
  return (
    <PatternPage
      title="Portals in RTL"
      description="Ensure menus, dialogs, popovers, and select content keep direction when rendered outside their trigger tree."
      principle="Set document direction and use shadcn's DirectionProvider at the application boundary. Thaana portal-aware wrappers also set local dir and lang defaults for mixed or LTR hosts."
      example={`<html lang="dv" dir="rtl">
  <DirectionProvider dir="rtl">
    <App />
  </DirectionProvider>
</html>

<DvDropdownMenuContent align="end">
  <DropdownMenuItem>ބަދަލު ކުރަން</DropdownMenuItem>
</DvDropdownMenuContent>`}
      checklist={[
        "Test the rendered portal content, not only the trigger.",
        "Use the prop name exposed by the DirectionProvider generated in your project.",
        "Keep local defaults on portable registry components used inside LTR applications.",
      ]}
    />
  )
}

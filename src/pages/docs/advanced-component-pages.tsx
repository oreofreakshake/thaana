import { DvCurrencyInput } from "@/registry/components/dv-currency-input"
import { DvFormField } from "@/registry/components/dv-form-field"
import { DvInput } from "@/registry/components/dv-input"
import { DvPhoneInput } from "@/registry/components/dv-phone-input"
import { DvCurrencyInputDemo } from "@/registry/examples/dv-currency-input-demo"
import { DvDataTableDemo } from "@/registry/examples/dv-data-table-demo"
import { DvFormFieldDemo } from "@/registry/examples/dv-form-field-demo"
import { DvPhoneInputDemo } from "@/registry/examples/dv-phone-input-demo"
import { ComponentExample } from "@/src/components/component-example"
import {
  currencyInputUsage,
  dataTableUsage,
  formFieldUsage,
  installCurrencyInputCommands,
  installDataTableCommands,
  installFormFieldCommands,
  installPhoneInputCommands,
  phoneInputUsage,
} from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const formFieldPreviewCode = `import { DvFormField } from "@/components/dv-form-field"
import { DvInput } from "@/components/dv-input"

export function DvFormFieldDemo() {
  return (
    <DvFormField
      label="ފުރިހަމަ ނަން"
      description="އިންވޮއިސްތަކުގައި ފެންނާނެ ނަން."
      required
    >
      <DvInput placeholder="ނަން ލިޔުއްވާ" required />
    </DvFormField>
  )
}`

const formFieldErrorCode = `<DvFormField
  label="އީމެއިލް"
  error="ރަނގަޅު އީމެއިލެއް ލިޔުއްވާ."
  required
>
  <DvInput type="email" lang="en" dir="ltr" />
</DvFormField>`

export function FormFieldPage() {
  return (
    <ComponentPage
      name="DvFormField"
      description="An accessible Dhivehi field composition for labels, descriptions, required indicators, and validation messages."
      preview={<DvFormFieldDemo />}
      previewCode={formFieldPreviewCode}
      installCommands={installFormFieldCommands}
      usage={formFieldUsage}
      rtlBehavior={
        <p>
          The wrapper defaults to <code>lang=&quot;dv&quot;</code> and{" "}
          <code>dir=&quot;rtl&quot;</code>
          while leaving the control free to override direction for email, phone, currency, and other
          LTR values.
        </p>
      }
    >
      <div id="validation" className="scroll-m-20">
        <h3>Validation</h3>
        <p>
          Passing an error links it to the control with <code>aria-describedby</code>, marks the
          control invalid, and announces the message as an alert.
        </p>
        <ComponentExample code={formFieldErrorCode} className="min-h-56">
          <DvFormField label="އީމެއިލް" error="ރަނގަޅު އީމެއިލެއް ލިޔުއްވާ." required className="w-full max-w-sm">
            <DvInput type="email" lang="en" dir="ltr" />
          </DvFormField>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

const currencyPreviewCode = `import { DvCurrencyInput } from "@/components/dv-currency-input"

export function DvCurrencyInputDemo() {
  return <DvCurrencyInput defaultValue={1250} />
}`

const currencyRangeCode = `<DvCurrencyInput min={100} max={10000} defaultValue={2500} />`

export function CurrencyInputPage() {
  return (
    <ComponentPage
      name="DvCurrencyInput"
      description="A focused MVR input with decimal sanitizing, grouped display formatting, numeric callbacks, and bidi-safe alignment."
      preview={<DvCurrencyInputDemo />}
      previewCode={currencyPreviewCode}
      installCommands={installCurrencyInputCommands}
      usage={currencyInputUsage}
      rtlBehavior={
        <p>
          The input value is isolated with <code>dir=&quot;ltr&quot;</code> and uses tabular Latin
          digits. Its container can sit naturally inside an RTL form without reordering the currency
          code or amount.
        </p>
      }
    >
      <div id="value-model" className="scroll-m-20">
        <h3>Value model</h3>
        <p>
          Use <code>value</code> and <code>onValueChange</code> for a numeric value. The visible
          text remains editable while focused and formats to two decimal places on blur.
        </p>
        <ComponentExample code={currencyRangeCode} className="min-h-56">
          <div className="w-full max-w-sm">
            <DvCurrencyInput min={100} max={10000} defaultValue={2500} />
          </div>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

const phonePreviewCode = `import { DvPhoneInput } from "@/components/dv-phone-input"

export function DvPhoneInputDemo() {
  return <DvPhoneInput required />
}`

const phoneValidationCode = `<DvPhoneInput
  required
  onValueChange={(value) => {
    // value is +9607771234 when all seven digits are present
  }}
/>`

export function PhoneInputPage() {
  return (
    <ComponentPage
      name="DvPhoneInput"
      description="A Maldives phone input with a fixed +960 prefix, seven-digit 7-or-9 validation, local formatting, and LTR isolation."
      preview={<DvPhoneInputDemo />}
      previewCode={phonePreviewCode}
      installCommands={installPhoneInputCommands}
      usage={phoneInputUsage}
      rtlBehavior={
        <p>
          The complete phone control is isolated with <code>dir=&quot;ltr&quot;</code>. The +960
          prefix and seven Latin digits therefore remain stable even when the field label and
          surrounding form are RTL.
        </p>
      }
    >
      <div id="validation" className="scroll-m-20">
        <h3>Validation</h3>
        <p>
          The control uses a native pattern for exactly seven local digits beginning with 7 or 9.
          Its callback returns an E.164-shaped value plus a validity flag while the user types.
        </p>
        <ComponentExample code={phoneValidationCode} className="min-h-56">
          <DvFormField label="ފޯނު ނަންބަރު" required className="w-full max-w-sm">
            <DvPhoneInput required />
          </DvFormField>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

const dataTablePreviewCode = `import { DvDataTable } from "@/components/dv-data-table"

export function PaymentsTable() {
  return (
    <DvDataTable
      data={payments}
      columns={columns}
      getRowId={(payment) => payment.id}
      pageSize={10}
    />
  )
}`

const dataTableColumnCode = `const columns: DvDataTableColumn<Payment>[] = [
  {
    id: "customer",
    header: "ކަސްޓަމަރ",
    cell: (row) => <bdi dir="auto">{row.customer}</bdi>,
    searchValue: (row) => row.customer,
  },
  {
    id: "amount",
    header: "ޖުމްލަ",
    cell: (row) => row.amount,
    dir: "ltr",
    align: "end",
  },
]`

export function DataTablePage() {
  return (
    <ComponentPage
      name="DvDataTable"
      description="A small generic data table for common business screens, with Dhivehi search, RTL layout, mixed-direction cells, pagination, and row actions."
      preview={
        <div className="w-full">
          <DvDataTableDemo />
        </div>
      }
      previewCode={dataTablePreviewCode}
      installCommands={installDataTableCommands}
      usage={dataTableUsage}
      rtlBehavior={
        <p>
          The table defaults to a Dhivehi RTL surface. Each column can independently set
          <code>dir=&quot;ltr&quot;</code> and logical end alignment for email addresses, IDs, phone
          numbers, and amounts. Portalled action menus receive RTL direction directly.
        </p>
      }
    >
      <div id="column-model" className="scroll-m-20">
        <h3>Column model</h3>
        <p>
          Columns own rendering and direction. Add <code>searchValue</code> only to columns that
          should participate in the built-in global search.
        </p>
        <ComponentExample code={dataTableColumnCode} className="min-h-72">
          <div className="w-full">
            <DvDataTableDemo />
          </div>
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

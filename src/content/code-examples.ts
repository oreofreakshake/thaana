import type { PackageCommands } from "@/src/components/terminal-command"

function shadcnCommands(command: string): PackageCommands {
  return {
    pnpm: `pnpm dlx shadcn@latest ${command}`,
    npm: `npx shadcn@latest ${command}`,
    bun: `bunx --bun shadcn@latest ${command}`,
  }
}

export const initCommands = shadcnCommands("init")

export const installDirectionCommands = shadcnCommands("add direction")

export const installInputCommands = shadcnCommands("add oreofreakshake/thaana/dv-input")

export const installSelectCommands = shadcnCommands("add oreofreakshake/thaana/dv-select")

export const installFormFieldCommands = shadcnCommands("add oreofreakshake/thaana/dv-form-field")

export const installCurrencyInputCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-currency-input"
)

export const installPhoneInputCommands = shadcnCommands("add oreofreakshake/thaana/dv-phone-input")

export const installDataTableCommands = shadcnCommands("add oreofreakshake/thaana/dv-data-table")

export const inputUsage = `import { DvInput } from "@/components/dv-input"

export function NameField() {
  return <DvInput placeholder="ނަން ލިޔުއްވާ" />
}`

export const selectUsage = `import { DvSelect } from "@/components/dv-select"
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
}`

export const formFieldUsage = `import { DvFormField } from "@/components/dv-form-field"
import { DvInput } from "@/components/dv-input"

<DvFormField label="ނަން" description="ފުރިހަމަ ނަން ލިޔުއްވާ." required>
  <DvInput required />
</DvFormField>`

export const currencyInputUsage = `import { DvCurrencyInput } from "@/components/dv-currency-input"

<DvCurrencyInput
  defaultValue={1250}
  min={0}
  onValueChange={(amount) => console.log(amount)}
/>`

export const phoneInputUsage = `import { DvPhoneInput } from "@/components/dv-phone-input"

<DvPhoneInput
  required
  onValueChange={(phone) => console.log(phone)}
/>`

export const dataTableUsage = `import {
  DvDataTable,
  type DvDataTableColumn,
} from "@/components/dv-data-table"

const columns: DvDataTableColumn<Customer>[] = [
  {
    id: "name",
    header: "ނަން",
    cell: (customer) => <bdi dir="auto">{customer.name}</bdi>,
    searchValue: (customer) => customer.name,
  },
  {
    id: "amount",
    header: "ޖުމްލަ",
    cell: (customer) => customer.amount,
    dir: "ltr",
    align: "end",
  },
]

<DvDataTable
  data={customers}
  columns={columns}
  getRowId={(customer) => customer.id}
/>`

export const documentDirection = `<html lang="dv" dir="rtl">`

export const directionProvider = `<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>`

export const bidiExamples = `<span dir="ltr">support@example.com</span>
<span dir="ltr">+960 777-1234</span>
<bdi dir="ltr">MVR 1,250.00</bdi>
<bdi>{userGeneratedName}</bdi>`

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

export const installSearchCommands = shadcnCommands("add oreofreakshake/thaana/dv-search")

export const installComboboxCommands = shadcnCommands("add oreofreakshake/thaana/dv-combobox")

export const installDatePickerCommands = shadcnCommands("add oreofreakshake/thaana/dv-date-picker")

export const installAtollPickerCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-atoll-picker"
)

export const installIslandPickerCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-island-picker"
)

export const installLocationPickerCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-location-picker"
)

export const installFormFieldCommands = shadcnCommands("add oreofreakshake/thaana/dv-form-field")

export const installCurrencyInputCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-currency-input"
)

export const installPhoneInputCommands = shadcnCommands("add oreofreakshake/thaana/dv-phone-input")

export const installDataTableCommands = shadcnCommands("add oreofreakshake/thaana/dv-data-table")

export const installDropdownMenuCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-dropdown-menu"
)

export const installPaginationCommands = shadcnCommands("add oreofreakshake/thaana/dv-pagination")

export const installDialogContentCommands = shadcnCommands(
  "add oreofreakshake/thaana/dv-dialog-content"
)

export const installCustomerManagementCommands = shadcnCommands(
  "add oreofreakshake/thaana/customer-management-01"
)

export const installInvoiceCommands = shadcnCommands("add oreofreakshake/thaana/invoice-01")

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

export const searchUsage = `import { useState } from "react"

import { DvSearch, getTextDirection } from "@/components/dv-search"

export function CustomerSearch() {
  const [query, setQuery] = useState("")
  const direction = getTextDirection(query)

  return (
    <div lang="dv" dir="rtl">
      <DvSearch
        aria-label="ކަސްޓަމަރެއް ހޯދާ"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="ހޯދާ..."
      />
      <div dir={direction}>{/* Search results */}</div>
    </div>
  )
}`

export const comboboxUsage = `import { useState } from "react"

import {
  DvCombobox,
  type DvComboboxOption,
} from "@/components/dv-combobox"

const customers: DvComboboxOption[] = [
  { value: "ahmed-dv", label: "އަހުމަދު" },
  { value: "ahmed-en", label: "Ahmed Ali" },
  { value: "invoice", label: "INV-2026-001" },
]

export function CustomerCombobox() {
  const [value, setValue] = useState("")

  return (
    <DvCombobox
      options={customers}
      value={value}
      onValueChange={setValue}
      aria-label="ކަސްޓަމަރެއް ހޮވާ"
    />
  )
}`

export const datePickerUsage = `import { useState } from "react"

import { DvDatePicker } from "@/components/dv-date-picker"

export function InvoiceDate() {
  const [date, setDate] = useState<Date>()

  return <DvDatePicker value={date} onValueChange={setDate} />
}`

export const atollPickerUsage = `import { useState } from "react"

import { DvAtollPicker } from "@/components/dv-atoll-picker"

const atolls = [
  { id: "custom-a", code: "CA", nameDv: "މިސާލު އަތޮޅު", nameEn: "Custom Atoll" },
]

export function AtollField() {
  const [atollId, setAtollId] = useState("")
  return <DvAtollPicker atolls={atolls} value={atollId} onValueChange={setAtollId} />
}`

export const islandPickerUsage = `import { useState } from "react"

import { DvIslandPicker } from "@/components/dv-island-picker"

const islands = [
  { id: "custom-island", atollId: "custom-a", nameDv: "މިސާލު ރަށް", nameEn: "Custom Island" },
]

export function IslandField() {
  const [islandId, setIslandId] = useState("")
  return (
    <DvIslandPicker
      islands={islands}
      atollId="custom-a"
      value={islandId}
      onValueChange={setIslandId}
    />
  )
}`

export const locationPickerUsage = `import { useState } from "react"

import { DvLocationPicker } from "@/components/dv-location-picker"
import type { DvAtoll, DvIsland, DvLocationValue } from "@/lib/location-types"

const atolls: DvAtoll[] = [/* your data */]
const islands: DvIsland[] = [/* your data */]

export function DeliveryLocation() {
  const [value, setValue] = useState<DvLocationValue>({})

  return (
    <DvLocationPicker
      atolls={atolls}
      islands={islands}
      value={value}
      onValueChange={setValue}
    />
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

export const dropdownMenuUsage = `import { DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  DvDropdownMenu,
  DvDropdownMenuContent,
} from "@/components/dv-dropdown-menu"

<DvDropdownMenu>
  <DropdownMenuTrigger>އެކްޝަންތައް</DropdownMenuTrigger>
  <DvDropdownMenuContent>
    <DropdownMenuItem>ތަފްޞީލު</DropdownMenuItem>
    <DropdownMenuItem>ބަދަލު ކުރަން</DropdownMenuItem>
  </DvDropdownMenuContent>
</DvDropdownMenu>`

export const paginationUsage = `import { useState } from "react"

import { DvPagination } from "@/components/dv-pagination"

export function ResultsPagination() {
  const [page, setPage] = useState(3)

  return <DvPagination page={page} totalPages={12} onPageChange={setPage} />
}`

export const dialogContentUsage = `import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DvDialogContent } from "@/components/dv-dialog-content"

<Dialog>
  <DialogTrigger>ބަދަލު ކުރަން</DialogTrigger>
  <DvDialogContent>
    <DialogTitle>ކަސްޓަމަރ ބަދަލު ކުރުން</DialogTitle>
  </DvDialogContent>
</Dialog>`

export const documentDirection = `<html lang="dv" dir="rtl">`

export const directionProvider = `<DirectionProvider dir="rtl">
  <App />
</DirectionProvider>`

export const bidiExamples = `<span dir="ltr">support@example.com</span>
<span dir="ltr">+960 777-1234</span>
<bdi dir="ltr">MVR 1,250.00</bdi>
<bdi>{userGeneratedName}</bdi>`

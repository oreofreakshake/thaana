"use client"

import { MoreHorizontalIcon, PlusIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DvCurrencyInput, RufiyaaSymbol } from "../components/dv-currency-input"
import { DvDataTable, type DvDataTableColumn } from "../components/dv-data-table"
import { DvDialogContent } from "../components/dv-dialog-content"
import { DvDropdownMenu, DvDropdownMenuContent } from "../components/dv-dropdown-menu"
import { DvFormField } from "../components/dv-form-field"
import { DvInput } from "../components/dv-input"
import { DvPagination } from "../components/dv-pagination"
import { DvPhoneInput } from "../components/dv-phone-input"
import { DvSearch } from "../components/dv-search"

type Customer = {
  id: string
  name: string
  englishName: string
  email: string
  phone: string
  balance: number
  status: "ހުންނަ" | "ނުހުންނަ"
}

const initialCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "އަހުމަދު އަލީ",
    englishName: "Ahmed Ali",
    email: "ahmed@example.com",
    phone: "+9607771234",
    balance: 1250,
    status: "ހުންނަ",
  },
  {
    id: "CUS-1002",
    name: "މަރްޔަމް ސަޢީދު",
    englishName: "Mariyam Saeed",
    email: "mariyam@example.com",
    phone: "+9609912345",
    balance: 875.5,
    status: "ހުންނަ",
  },
  {
    id: "CUS-1003",
    name: "އިބްރާހީމް ހަސަން",
    englishName: "Ibrahim Hassan",
    email: "ibrahim@example.com",
    phone: "+9607654321",
    balance: 3200,
    status: "ނުހުންނަ",
  },
  {
    id: "CUS-1004",
    name: "ފާތިމަތު ނަޒީރު",
    englishName: "Fathimath Nazeer",
    email: "fathimath@example.com",
    phone: "+9609123456",
    balance: 450,
    status: "ހުންނަ",
  },
  {
    id: "CUS-1005",
    name: "ޢަލީ ރަޝީދު",
    englishName: "Ali Rasheed",
    email: "ali@example.com",
    phone: "+9607987654",
    balance: 1825,
    status: "ހުންނަ",
  },
]

const pageSize = 4

export function CustomerManagement01() {
  const [customers, setCustomers] = React.useState(initialCustomers)
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  const filteredCustomers = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return customers

    return customers.filter((customer) =>
      [customer.id, customer.name, customer.englishName, customer.email, customer.phone]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery)
    )
  }, [customers, query])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  function openCustomerDialog(customer: Customer | null) {
    setSelectedCustomer(customer)
    setDialogOpen(true)
  }

  function saveCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const phoneDigits = String(formData.get("phone") ?? "").replace(/\D/g, "")
    const balance = Number(String(formData.get("balance") ?? "0").replaceAll(",", ""))
    const customer: Customer = {
      id: selectedCustomer?.id ?? `CUS-${String(customers.length + 1001)}`,
      name: String(formData.get("name") ?? ""),
      englishName: String(formData.get("englishName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: `+960${phoneDigits}`,
      balance: Number.isFinite(balance) ? balance : 0,
      status: selectedCustomer?.status ?? "ހުންނަ",
    }

    setCustomers((value) =>
      selectedCustomer
        ? value.map((item) => (item.id === selectedCustomer.id ? customer : item))
        : [...value, customer]
    )
    setDialogOpen(false)
  }

  const columns: DvDataTableColumn<Customer>[] = [
    {
      id: "customer",
      header: "ކަސްޓަމަރ",
      cell: (customer) => (
        <bdi dir="auto" className="font-medium">
          {customer.name}
        </bdi>
      ),
    },
    {
      id: "contact",
      header: "ގުޅޭނެ ގޮތް",
      cell: (customer) => (
        <div dir="ltr" lang="en" className="text-start">
          {customer.email}
        </div>
      ),
      dir: "ltr",
    },
    {
      id: "balance",
      header: "ބާކީ",
      cell: (customer) => (
        <span dir="ltr" lang="en" className="inline-flex items-center gap-1.5 tabular-nums">
          <span className="sr-only">MVR</span>
          <RufiyaaSymbol className="h-3 w-4" />
          {customer.balance.toLocaleString("en-MV", { minimumFractionDigits: 2 })}
        </span>
      ),
      dir: "ltr",
      align: "end",
    },
    {
      id: "status",
      header: "ހާލަތު",
      cell: (customer) => (
        <span className="inline-flex rounded-full border px-2 py-0.5 text-xs">
          {customer.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">އެކްޝަން</span>,
      cell: (customer) => (
        <DvDropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="އިތުރު އެކްޝަން">
              <MoreHorizontalIcon aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DvDropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => openCustomerDialog(customer)}>ތަފްޞީލު</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openCustomerDialog(customer)}>
              ބަދަލު ކުރަން
            </DropdownMenuItem>
            <DropdownMenuItem>
              <bdi lang="en">{customer.id}</bdi>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() =>
                setCustomers((value) => value.filter((item) => item.id !== customer.id))
              }
            >
              ފޮހެލާ
            </DropdownMenuItem>
          </DvDropdownMenuContent>
        </DvDropdownMenu>
      ),
      align: "end",
      className: "w-12",
      headerClassName: "w-12",
    },
  ]

  return (
    <section lang="dv" dir="rtl" className="grid gap-6 rounded-xl border bg-background p-4 sm:p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">ކަސްޓަމަރ މެނޭޖްމަންޓް</h2>
          <p className="mt-1 text-sm text-muted-foreground">ކަސްޓަމަރުންގެ މަޢުލޫމާތު، ބާކީ އަދި ހާލަތު ބެލެހެއްޓުން.</p>
        </div>
        <Button onClick={() => openCustomerDialog(null)}>
          <PlusIcon aria-hidden="true" />
          އާ ކަސްޓަމަރެއް
        </Button>
      </header>

      <DvSearch
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value)
          setPage(1)
        }}
        aria-label="ކަސްޓަމަރެއް ހޯދާ"
        placeholder="ނަން، އީމެއިލް ނުވަތަ އައިޑީ ހޯދާ..."
        className="max-w-md"
      />

      <div className="overflow-x-auto">
        <DvDataTable
          data={visibleCustomers}
          columns={columns}
          getRowId={(customer) => customer.id}
          showSearch={false}
          showPagination={false}
          className="min-w-3xl"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex gap-2 text-sm text-muted-foreground">
          ޖުމްލަ <bdi lang="en">{filteredCustomers.length}</bdi>
        </span>
        <DvPagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DvDialogContent
          key={selectedCustomer?.id ?? "new"}
          className="max-h-[90dvh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>{selectedCustomer ? "ކަސްޓަމަރ ބަދަލު ކުރުން" : "އާ ކަސްޓަމަރެއް"}</DialogTitle>
            <DialogDescription>ކަސްޓަމަރުގެ މަޢުލޫމާތު ފުރިހަމަ ކުރައްވާ.</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={saveCustomer}>
            <DvFormField label="ދިވެހި ނަން" required>
              <DvInput name="name" defaultValue={selectedCustomer?.name} required />
            </DvFormField>
            <DvFormField label="އިނގިރޭސި ނަން" required>
              <DvInput
                name="englishName"
                lang="en"
                dir="ltr"
                defaultValue={selectedCustomer?.englishName}
                required
              />
            </DvFormField>
            <DvFormField label="އީމެއިލް" required>
              <DvInput
                type="email"
                name="email"
                lang="en"
                dir="ltr"
                defaultValue={selectedCustomer?.email}
                required
              />
            </DvFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <DvFormField label="ފޯނު ނަންބަރު" required>
                <DvPhoneInput name="phone" defaultValue={selectedCustomer?.phone} required />
              </DvFormField>
              <DvFormField label="ބާކީ">
                <DvCurrencyInput name="balance" defaultValue={selectedCustomer?.balance ?? 0} />
              </DvFormField>
            </div>
            <DialogFooter>
              <Button type="submit">ރައްކާ ކުރައްވާ</Button>
            </DialogFooter>
          </form>
        </DvDialogContent>
      </Dialog>
    </section>
  )
}

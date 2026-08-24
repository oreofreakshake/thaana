"use client"

import { PlusIcon, PrinterIcon, SendIcon, Trash2Icon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DvCombobox, type DvComboboxOption } from "../components/dv-combobox"
import { DvCurrencyInput, RufiyaaSymbol } from "../components/dv-currency-input"
import { DvDataTable, type DvDataTableColumn } from "../components/dv-data-table"
import { DvFormField } from "../components/dv-form-field"
import { DvInput } from "../components/dv-input"
import { DvPhoneInput } from "../components/dv-phone-input"

type InvoiceCustomer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

const customers: InvoiceCustomer[] = [
  {
    id: "CUS-1001",
    name: "އަހުމަދު އަލީ",
    email: "ahmed@example.com",
    phone: "+9607771234",
    address: "ހ. އާސްމާނީގެ، މާލެ",
  },
  {
    id: "CUS-1002",
    name: "މަރްޔަމް ސަޢީދު",
    email: "mariyam@example.com",
    phone: "+9609912345",
    address: "މ. ޗާނދަނީގެ، މާލެ",
  },
]

const customerOptions: DvComboboxOption[] = customers.map((customer) => ({
  value: customer.id,
  label: customer.name,
  keywords: [customer.id, customer.email, customer.phone],
}))

const initialItems: InvoiceItem[] = [
  { id: "item-1", description: "ވެބްސައިޓް ޑިޒައިން", quantity: 1, unitPrice: 4500 },
  { id: "item-2", description: "މަސްދުވަހުގެ މެއިންޓެނެންސް", quantity: 2, unitPrice: 750 },
]

function Money({ value }: { value: number }) {
  return (
    <span dir="ltr" lang="en" className="inline-flex items-center gap-1.5 tabular-nums">
      <span className="sr-only">MVR</span>
      <RufiyaaSymbol className="h-3.5 w-5" />
      {value.toLocaleString("en-MV", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  )
}

export function Invoice01() {
  const [customerId, setCustomerId] = React.useState(customers[0].id)
  const [items, setItems] = React.useState(initialItems)
  const [taxRate, setTaxRate] = React.useState(8)
  const customer = customers.find((item) => item.id === customerId) ?? customers[0]

  const subtotal = items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  function updateItem(id: string, patch: Partial<InvoiceItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { id: `item-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 },
    ])
  }

  const columns: DvDataTableColumn<InvoiceItem>[] = [
    {
      id: "description",
      header: "ތަފްޞީލު",
      cell: (item) => (
        <DvInput
          value={item.description}
          onChange={(event) => updateItem(item.id, { description: event.currentTarget.value })}
          aria-label="އައިޓަމްގެ ތަފްޞީލު"
          placeholder="ޚިދުމަތް ނުވަތަ ތަކެތި"
          className="min-w-52"
        />
      ),
    },
    {
      id: "quantity",
      header: "އަދަދު",
      cell: (item) => (
        <DvInput
          type="number"
          min={1}
          value={item.quantity}
          onChange={(event) =>
            updateItem(item.id, { quantity: Math.max(1, Number(event.currentTarget.value) || 1) })
          }
          aria-label="އައިޓަމްގެ އަދަދު"
          lang="en"
          dir="ltr"
          className="w-20 text-end tabular-nums"
        />
      ),
      dir: "ltr",
      align: "end",
    },
    {
      id: "price",
      header: "އަގު",
      cell: (item) => (
        <DvCurrencyInput
          value={item.unitPrice}
          onValueChange={(value) => updateItem(item.id, { unitPrice: value ?? 0 })}
          aria-label="އައިޓަމްގެ އަގު"
          containerClassName="w-40"
        />
      ),
      dir: "ltr",
      align: "end",
    },
    {
      id: "total",
      header: "ޖުމްލަ",
      cell: (item) => <Money value={item.quantity * item.unitPrice} />,
      dir: "ltr",
      align: "end",
      className: "whitespace-nowrap font-medium",
    },
    {
      id: "remove",
      header: <span className="sr-only">ފޮހެލުން</span>,
      cell: (item) => (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={items.length === 1}
          onClick={() => setItems((current) => current.filter((value) => value.id !== item.id))}
          aria-label="އައިޓަމް ފޮހެލާ"
        >
          <Trash2Icon aria-hidden="true" />
        </Button>
      ),
      align: "end",
      className: "w-12",
      headerClassName: "w-12",
    },
  ]

  return (
    <section lang="dv" dir="rtl" className="grid gap-8 rounded-xl border bg-background p-4 sm:p-6">
      <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">އިންވޮއިސް</p>
          <h2 className="mt-1 text-2xl font-semibold">އިންވޮއިސް އެއް އުފައްދާ</h2>
        </div>
        <div dir="ltr" lang="en" className="grid gap-1 text-sm text-muted-foreground sm:text-end">
          <span className="font-medium text-foreground">INV-2026-0042</span>
          <span>24 Aug 2026</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <DvFormField label="ކަސްޓަމަރ" required>
          <DvCombobox
            options={customerOptions}
            value={customerId}
            onValueChange={setCustomerId}
            placeholder="ކަސްޓަމަރެއް ހޮވާ"
            searchPlaceholder="ނަން، އީމެއިލް ނުވަތަ އައިޑީ ހޯދާ..."
          />
        </DvFormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <DvFormField label="އިންވޮއިސް ނަންބަރު">
            <DvInput defaultValue="INV-2026-0042" dir="ltr" lang="en" />
          </DvFormField>
          <DvFormField label="ތާރީޚު">
            <DvInput type="date" defaultValue="2026-08-24" dir="ltr" lang="en" />
          </DvFormField>
        </div>
      </div>

      <div className="grid gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <DvFormField label="އީމެއިލް">
          <DvInput key={`${customer.id}-email`} defaultValue={customer.email} dir="ltr" lang="en" />
        </DvFormField>
        <DvFormField label="ފޯނު ނަންބަރު">
          <DvPhoneInput key={`${customer.id}-phone`} defaultValue={customer.phone} />
        </DvFormField>
        <DvFormField label="އެޑްރެސް">
          <DvInput key={`${customer.id}-address`} defaultValue={customer.address} />
        </DvFormField>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">އައިޓަމްތައް</h3>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <PlusIcon aria-hidden="true" />
            އައިޓަމެއް އިތުރު ކުރޭ
          </Button>
        </div>
        <div className="overflow-x-auto">
          <DvDataTable
            data={items}
            columns={columns}
            getRowId={(item) => item.id}
            showSearch={false}
            showPagination={false}
            className="min-w-4xl"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <DvFormField label="ނޯޓް">
          <Textarea placeholder="އިންވޮއިސްއާ ގުޅޭ އިތުރު މަޢުލޫމާތު..." className="min-h-28 text-start" />
        </DvFormField>
        <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span>ސަބްޓޯޓަލް</span>
            <Money value={subtotal} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="invoice-tax">ޓެކްސް</label>
            <div dir="ltr" className="flex items-center gap-2">
              <DvInput
                id="invoice-tax"
                type="number"
                min={0}
                max={100}
                value={taxRate}
                onChange={(event) =>
                  setTaxRate(Math.max(0, Number(event.currentTarget.value) || 0))
                }
                dir="ltr"
                lang="en"
                className="h-8 w-20 text-end tabular-nums"
              />
              <span>%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-muted-foreground">
            <span>ޓެކްސްގެ އަދަދު</span>
            <Money value={tax} />
          </div>
          <div className="flex items-center justify-between gap-4 border-t pt-3 text-base font-semibold">
            <span>ޖުމްލަ</span>
            <Money value={total} />
          </div>
        </div>
      </div>

      <footer className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => window.print()}>
          <PrinterIcon aria-hidden="true" />
          ޕްރިންޓް
        </Button>
        <Button type="button">
          <SendIcon aria-hidden="true" />
          އިންވޮއިސް ފޮނުވާ
        </Button>
      </footer>
    </section>
  )
}

import { DvDataTable, type DvDataTableColumn } from "@/registry/components/dv-data-table"

type Payment = {
  id: string
  customer: string
  email: string
  amount: number
  status: string
}

const payments: Payment[] = [
  {
    id: "INV-1001",
    customer: "އަހުމަދު އަލީ",
    email: "ahmed@example.com",
    amount: 1250,
    status: "ދައްކާފައި",
  },
  {
    id: "INV-1002",
    customer: "Mariyam Saeed",
    email: "mariyam@example.com",
    amount: 875.5,
    status: "ޕްރޮސެސްވަނީ",
  },
  {
    id: "INV-1003",
    customer: "އިބްރާހީމް ހަސަން",
    email: "ibrahim@example.com",
    amount: 3200,
    status: "ދައްކާފައި",
  },
  {
    id: "INV-1004",
    customer: "Sara Mohamed",
    email: "sara@example.com",
    amount: 450,
    status: "ލަސްވެފައި",
  },
  {
    id: "INV-1005",
    customer: "ފާތިމަތު ހަސަން",
    email: "fathimath@example.com",
    amount: 1825,
    status: "ދައްކާފައި",
  },
  {
    id: "INV-1006",
    customer: "Ali Rasheed",
    email: "ali@example.com",
    amount: 990,
    status: "ޕްރޮސެސްވަނީ",
  },
]

const columns: DvDataTableColumn<Payment>[] = [
  {
    id: "customer",
    header: "ކަސްޓަމަރ",
    cell: (payment) => <bdi dir="auto">{payment.customer}</bdi>,
    searchValue: (payment) => payment.customer,
  },
  {
    id: "email",
    header: "އީމެއިލް",
    cell: (payment) => payment.email,
    searchValue: (payment) => payment.email,
    dir: "ltr",
  },
  {
    id: "status",
    header: "ހާލަތު",
    cell: (payment) => payment.status,
    searchValue: (payment) => payment.status,
  },
  {
    id: "amount",
    header: "ޖުމްލަ",
    cell: (payment) =>
      `MVR ${payment.amount.toLocaleString("en-MV", { minimumFractionDigits: 2 })}`,
    align: "end",
    dir: "ltr",
  },
]

export function DvDataTableDemo() {
  return (
    <DvDataTable
      data={payments}
      columns={columns}
      getRowId={(payment) => payment.id}
      pageSize={4}
      actions={() => [
        { id: "view", label: "ތަފްޞީލު ބަލާ", onSelect: () => undefined },
        { id: "copy", label: "އިންވޮއިސް ކޮޕީ ކުރޭ", onSelect: () => undefined },
      ]}
    />
  )
}

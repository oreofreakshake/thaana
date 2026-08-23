"use client"

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, SearchIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import { DvInput } from "./dv-input"

type DvDataTableColumn<TData> = {
  id: string
  header: React.ReactNode
  cell: (row: TData) => React.ReactNode
  searchValue?: (row: TData) => string
  align?: "start" | "center" | "end"
  dir?: "auto" | "ltr" | "rtl"
  className?: string
  headerClassName?: string
}

type DvDataTableAction<TData> = {
  id: string
  label: React.ReactNode
  onSelect: (row: TData) => void
  destructive?: boolean
  disabled?: boolean
}

type DvDataTableProps<TData> = {
  data: TData[]
  columns: DvDataTableColumn<TData>[]
  getRowId: (row: TData) => string
  getSearchText?: (row: TData) => string
  actions?: (row: TData) => DvDataTableAction<TData>[]
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  pageSize?: number
  className?: string
}

const alignmentClass = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
}

function DvDataTable<TData>({
  data,
  columns,
  getRowId,
  getSearchText,
  actions,
  searchPlaceholder = "ހޯދާ...",
  emptyMessage = "ޑޭޓާއެއް ނުފެނުނު",
  pageSize = 10,
  className,
}: DvDataTableProps<TData>) {
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(0)

  const filteredData = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return data

    return data.filter((row) => {
      const value = getSearchText
        ? getSearchText(row)
        : columns.map((column) => column.searchValue?.(row) ?? "").join(" ")
      return value.toLocaleLowerCase().includes(normalizedQuery)
    })
  }, [columns, data, getSearchText, query])

  const safePageSize = Math.max(1, pageSize)
  const pageCount = Math.max(1, Math.ceil(filteredData.length / safePageSize))
  const currentPage = Math.min(page, pageCount - 1)
  const visibleRows = filteredData.slice(
    currentPage * safePageSize,
    currentPage * safePageSize + safePageSize
  )

  function updateQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value)
    setPage(0)
  }

  return (
    <div lang="dv" dir="rtl" data-slot="dv-data-table" className={cn("grid gap-4", className)}>
      <div className="relative max-w-sm">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted-foreground"
        />
        <DvInput
          value={query}
          onChange={updateQuery}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="ps-9"
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  dir={column.dir}
                  className={cn(alignmentClass[column.align ?? "start"], column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="w-12">
                  <span className="sr-only">އެކްޝަން</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <TableRow key={getRowId(row)}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      dir={column.dir}
                      className={cn(alignmentClass[column.align ?? "start"], column.className)}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="w-12">
                      <DropdownMenu dir="rtl">
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label="އިތުރު އެކްޝަން">
                            <MoreHorizontalIcon aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent lang="dv" align="end">
                          {actions(row).map((action) => (
                            <DropdownMenuItem
                              key={action.id}
                              variant={action.destructive ? "destructive" : "default"}
                              disabled={action.disabled}
                              onSelect={() => action.onSelect(row)}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-28 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          ޖުމްލަ <bdi lang="en">{filteredData.length}</bdi>
        </span>
        <div className="flex items-center gap-2">
          <span>
            <bdi lang="en">{currentPage + 1}</bdi> / <bdi lang="en">{pageCount}</bdi>
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={currentPage === 0}
            onClick={() => setPage((value) => Math.max(0, value - 1))}
            aria-label="ކުރީގެ ޞަފްޙާ"
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={currentPage >= pageCount - 1}
            onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
            aria-label="ދެން އޮތް ޞަފްޙާ"
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DvDataTable, type DvDataTableAction, type DvDataTableColumn, type DvDataTableProps }

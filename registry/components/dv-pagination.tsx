import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

type DvPaginationProps = Omit<React.ComponentProps<typeof Pagination>, "children" | "dir"> & {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  dir?: "ltr" | "rtl"
  disabled?: boolean
  previousLabel?: string
  nextLabel?: string
}

function DvPagination({
  page,
  totalPages,
  onPageChange,
  dir = "rtl",
  lang = "dv",
  disabled = false,
  previousLabel = "ފަހަތަށް",
  nextLabel = "ކުރިޔަށް",
  className,
  ...props
}: DvPaginationProps) {
  const safeTotalPages = Number.isFinite(totalPages) ? Math.max(1, Math.floor(totalPages)) : 1
  const normalizedPage = Number.isFinite(page) ? Math.floor(page) : 1
  const currentPage = Math.min(Math.max(1, normalizedPage), safeTotalPages)
  const previousDisabled = disabled || currentPage === 1
  const nextDisabled = disabled || currentPage === safeTotalPages
  const PreviousIcon = dir === "rtl" ? ChevronRightIcon : ChevronLeftIcon
  const NextIcon = dir === "rtl" ? ChevronLeftIcon : ChevronRightIcon

  function changePage(event: React.MouseEvent<HTMLAnchorElement>, nextPage: number) {
    event.preventDefault()
    if (!disabled && nextPage !== currentPage && nextPage >= 1 && nextPage <= safeTotalPages) {
      onPageChange(nextPage)
    }
  }

  return (
    <Pagination
      dir={dir}
      lang={lang}
      aria-label="ޞަފްޙާ ހޮވުން"
      className={cn("justify-end", className)}
      {...props}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label={previousLabel}
            aria-disabled={previousDisabled}
            tabIndex={previousDisabled ? -1 : undefined}
            className={cn(
              "gap-1 px-2.5 sm:ps-2.5",
              previousDisabled && "pointer-events-none opacity-50"
            )}
            onClick={(event) => changePage(event, currentPage - 1)}
          >
            <PreviousIcon aria-hidden="true" />
            <span className="hidden sm:block">{previousLabel}</span>
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: safeTotalPages }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={pageNumber === currentPage}
              aria-label={`ޞަފްޙާ ${pageNumber}`}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : undefined}
              className={cn(disabled && "pointer-events-none opacity-50")}
              onClick={(event) => changePage(event, pageNumber)}
            >
              <bdi lang="en">{pageNumber}</bdi>
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label={nextLabel}
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : undefined}
            className={cn(
              "gap-1 px-2.5 sm:pe-2.5",
              nextDisabled && "pointer-events-none opacity-50"
            )}
            onClick={(event) => changePage(event, currentPage + 1)}
          >
            <span className="hidden sm:block">{nextLabel}</span>
            <NextIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { DvPagination, type DvPaginationProps }

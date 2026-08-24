import * as React from "react"

import { DvPagination } from "@/registry/components/dv-pagination"

export function DvPaginationDemo() {
  const [page, setPage] = React.useState(3)

  return (
    <DvPagination page={page} totalPages={6} onPageChange={setPage} className="justify-center" />
  )
}

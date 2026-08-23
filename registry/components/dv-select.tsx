import type * as React from "react"

import { Select } from "@/components/ui/select"

type DvSelectProps = React.ComponentProps<typeof Select>

function DvSelect({ dir = "rtl", ...props }: DvSelectProps) {
  return <Select dir={dir} {...props} />
}

export { DvSelect, type DvSelectProps }

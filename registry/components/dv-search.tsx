import * as React from "react"

import { getTextDirection, type TextDirection } from "../lib/text-direction"
import { DvInput, type DvInputProps } from "./dv-input"

type DvSearchProps = DvInputProps

const DvSearch = React.forwardRef<HTMLInputElement, DvSearchProps>(
  ({ dir = "auto", lang = "dv", type = "search", ...props }, ref) => (
    <DvInput ref={ref} dir={dir} lang={lang} type={type} {...props} />
  )
)

DvSearch.displayName = "DvSearch"

export { DvSearch, type DvSearchProps, getTextDirection, type TextDirection }

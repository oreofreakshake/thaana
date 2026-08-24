import type * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type DvDropdownMenuProps = React.ComponentProps<typeof DropdownMenu>
type DvDropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuContent>
type DvDropdownMenuSubTriggerProps = React.ComponentProps<typeof DropdownMenuSubTrigger>

function DvDropdownMenu({ dir = "rtl", ...props }: DvDropdownMenuProps) {
  return <DropdownMenu dir={dir} {...props} />
}

function DvDropdownMenuContent({ lang = "dv", ...props }: DvDropdownMenuContentProps) {
  return <DropdownMenuContent lang={lang} {...props} />
}

function DvDropdownMenuSubTrigger({ className, ...props }: DvDropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuSubTrigger
      className={cn("rtl:[&>svg:last-child]:rotate-180", className)}
      {...props}
    />
  )
}

export {
  DvDropdownMenu,
  DvDropdownMenuContent,
  type DvDropdownMenuContentProps,
  type DvDropdownMenuProps,
  DvDropdownMenuSubTrigger,
  type DvDropdownMenuSubTriggerProps,
}

import { Button } from "@/components/ui/button"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DvDropdownMenu,
  DvDropdownMenuContent,
  DvDropdownMenuSubTrigger,
} from "@/registry/components/dv-dropdown-menu"

export function DvDropdownMenuDemo() {
  return (
    <DvDropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" lang="dv" dir="rtl">
          އެކްޝަންތައް
        </Button>
      </DropdownMenuTrigger>
      <DvDropdownMenuContent align="end">
        <DropdownMenuItem>ތަފްޞީލު</DropdownMenuItem>
        <DropdownMenuItem>ބަދަލު ކުރަން</DropdownMenuItem>
        <DropdownMenuSub>
          <DvDropdownMenuSubTrigger>އިންވޮއިސް</DvDropdownMenuSubTrigger>
          <DropdownMenuSubContent lang="dv">
            <DropdownMenuItem>
              <bdi lang="en">INV-2026-001</bdi>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">ފޮހެލާ</DropdownMenuItem>
      </DvDropdownMenuContent>
    </DvDropdownMenu>
  )
}

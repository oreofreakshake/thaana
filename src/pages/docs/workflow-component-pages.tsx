import { DvDialogContentDemo } from "@/registry/examples/dv-dialog-content-demo"
import { DvDropdownMenuDemo } from "@/registry/examples/dv-dropdown-menu-demo"
import { DvPaginationDemo } from "@/registry/examples/dv-pagination-demo"
import {
  dialogContentUsage,
  dropdownMenuUsage,
  installDialogContentCommands,
  installDropdownMenuCommands,
  installPaginationCommands,
  paginationUsage,
} from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const dropdownPreviewCode = `<DvDropdownMenu>
  <DropdownMenuTrigger>އެކްޝަންތައް</DropdownMenuTrigger>
  <DvDropdownMenuContent>
    <DropdownMenuItem>ތަފްޞީލު</DropdownMenuItem>
    <DropdownMenuItem>ބަދަލު ކުރަން</DropdownMenuItem>
    <DropdownMenuItem><bdi lang="en">INV-2026-001</bdi></DropdownMenuItem>
    <DropdownMenuItem variant="destructive">ފޮހެލާ</DropdownMenuItem>
  </DvDropdownMenuContent>
</DvDropdownMenu>`

export function DropdownMenuPage() {
  return (
    <ComponentPage
      name="DvDropdownMenu"
      description="A Radix Dropdown Menu composition with an RTL behavioral default and a Dhivehi portal boundary."
      preview={<DvDropdownMenuDemo />}
      previewCode={dropdownPreviewCode}
      installCommands={installDropdownMenuCommands}
      usage={dropdownMenuUsage}
      rtlBehavior={
        <div className="space-y-4">
          <p>
            <code>DvDropdownMenu</code> defaults Radix Root to <code>dir=&quot;rtl&quot;</code>.
            Radix uses that direction for placement, submenu opening, and Left/Right keyboard
            navigation. <code>DvDropdownMenuContent</code> defaults the portalled DOM boundary to
            <code>lang=&quot;dv&quot;</code>.
          </p>
          <p>
            Isolate English identifiers and unknown names with <code>bdi</code>.
          </p>
        </div>
      }
    >
      {null}
    </ComponentPage>
  )
}

const paginationPreviewCode = `<DvPagination
  page={3}
  totalPages={6}
  onPageChange={setPage}
/>`

export function PaginationPage() {
  return (
    <ComponentPage
      name="DvPagination"
      description="Controlled pagination with logical RTL ordering, direction-aware navigation icons, and accessible Dhivehi labels."
      preview={<DvPaginationDemo />}
      previewCode={paginationPreviewCode}
      installCommands={installPaginationCommands}
      usage={paginationUsage}
      rtlBehavior={
        <p>
          Page numbers stay ascending in DOM order. The container direction controls their visual
          flow, while previous and next retain their semantic meaning and choose the appropriate
          chevron for RTL or LTR. Pages are 1-based and clamped to the available range.
        </p>
      }
    >
      {null}
    </ComponentPage>
  )
}

const dialogPreviewCode = `<Dialog>
  <DialogTrigger>ޑައިލޮގް ހުޅުވާ</DialogTrigger>
  <DvDialogContent>
    <DialogTitle>ކަސްޓަމަރ ބަދަލު ކުރުން</DialogTitle>
  </DvDialogContent>
</Dialog>`

export function DialogContentPage() {
  return (
    <ComponentPage
      name="DvDialogContent"
      description="A portal-safe shadcn Dialog content boundary with overridable Dhivehi language and RTL defaults."
      preview={<DvDialogContentDemo />}
      previewCode={dialogPreviewCode}
      installCommands={installDialogContentCommands}
      usage={dialogContentUsage}
      rtlBehavior={
        <p>
          Direction and language are applied to <code>DialogContent</code>, not a fake Dialog root
          wrapper. That content renders through a portal and therefore cannot safely depend on a
          nearby LTR application container for inherited <code>dir</code> or <code>lang</code>.
        </p>
      }
    >
      <div id="portal-boundary" className="scroll-m-20">
        <h3>Portal boundary</h3>
        <p>
          The local boundary keeps the portalled content in RTL even when the trigger lives inside
          an LTR application region.
        </p>
      </div>
    </ComponentPage>
  )
}

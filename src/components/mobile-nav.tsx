import * as React from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { docsNavigation } from "@/src/content/navigation"

const mainLinks = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs/installation" },
  { title: "Components", href: "/docs/components/input" },
  { title: "Blocks", href: "/docs/blocks/customer-management" },
  { title: "Fonts", href: "/fonts" },
]

type MobileNavProps = {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <span className="relative flex h-8 w-4 items-center justify-center">
            <span className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </span>
            <span className="sr-only">Toggle Menu</span>
          </span>
          <span className="flex h-8 items-center text-lg font-medium leading-none">Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-[state=open]:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <nav
          className="flex flex-col gap-12 overflow-auto px-6 py-6"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-muted-foreground">Menu</p>
            <div className="flex flex-col gap-3">
              {mainLinks.map((link) => (
                <MobileLink key={link.href} href={link.href} onOpenChange={setOpen}>
                  {link.title}
                </MobileLink>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {docsNavigation.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <p className="text-sm font-medium text-muted-foreground">{section.title}</p>
                <div className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <MobileLink key={link.href} href={link.href} onOpenChange={setOpen}>
                      {link.title}
                    </MobileLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </PopoverContent>
    </Popover>
  )
}

type MobileLinkProps = {
  href: string
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

function MobileLink({ href, children, onOpenChange }: MobileLinkProps) {
  function handleClick() {
    onOpenChange?.(false)
  }

  return (
    <Link to={href} onClick={handleClick} className="flex items-center gap-2 text-2xl font-medium">
      {children}
    </Link>
  )
}

import { Outlet } from "react-router-dom"

import { ScrollToTop } from "@/src/components/scroll-to-top"
import { SiteHeader } from "@/src/components/site-header"

export function SiteShell() {
  return (
    <div className="min-h-dvh bg-background">
      <ScrollToTop />
      <SiteHeader />
      <Outlet />
    </div>
  )
}

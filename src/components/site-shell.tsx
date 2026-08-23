import { Outlet } from "react-router-dom"

import { SiteHeader } from "@/src/components/site-header"

export function SiteShell() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <Outlet />
    </div>
  )
}

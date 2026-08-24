import { Navigate, Route, Routes } from "react-router-dom"

import { DocsLayout } from "@/src/components/docs-layout"
import { SiteShell } from "@/src/components/site-shell"
import {
  CurrencyInputPage,
  DataTablePage,
  FormFieldPage,
  PhoneInputPage,
} from "@/src/pages/docs/advanced-component-pages"
import { BidirectionalContentPage } from "@/src/pages/docs/bidirectional-content"
import { InputPage, SelectPage } from "@/src/pages/docs/component-pages"
import { InstallationPage } from "@/src/pages/docs/installation"
import { IntroductionPage } from "@/src/pages/docs/introduction"
import { RtlPage } from "@/src/pages/docs/rtl"
import { SearchPage } from "@/src/pages/docs/search"
import { HomePage } from "@/src/pages/home"
import { NotFoundPage } from "@/src/pages/not-found"

export function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route path="introduction" element={<IntroductionPage />} />
          <Route path="installation" element={<InstallationPage />} />
          <Route path="rtl" element={<RtlPage />} />
          <Route path="bidirectional-content" element={<BidirectionalContentPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/search" element={<SearchPage />} />
          <Route path="components/form-field" element={<FormFieldPage />} />
          <Route path="components/currency-input" element={<CurrencyInputPage />} />
          <Route path="components/phone-input" element={<PhoneInputPage />} />
          <Route path="components/data-table" element={<DataTablePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

import { lazy, Suspense } from "react"
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
import { ComboboxPage } from "@/src/pages/docs/combobox"
import { InputPage, SelectPage } from "@/src/pages/docs/component-pages"
import { CustomerManagementPage } from "@/src/pages/docs/customer-management"
import { DatePickerPage } from "@/src/pages/docs/date-picker"
import { InstallationPage } from "@/src/pages/docs/installation"
import { IntroductionPage } from "@/src/pages/docs/introduction"
import { InvoicePage } from "@/src/pages/docs/invoice"
import {
  CurrencyPatternPage,
  MixedContentPatternPage,
  PhoneNumbersPatternPage,
  PortalsPatternPage,
  RtlFormsPatternPage,
  RtlTablesPatternPage,
  SearchDirectionPatternPage,
} from "@/src/pages/docs/patterns"
import { RtlPage } from "@/src/pages/docs/rtl"
import { SearchPage } from "@/src/pages/docs/search"
import {
  DialogContentPage,
  DropdownMenuPage,
  PaginationPage,
} from "@/src/pages/docs/workflow-component-pages"
import { HomePage } from "@/src/pages/home"
import { NotFoundPage } from "@/src/pages/not-found"

const IslandPickerPage = lazy(() =>
  import("@/src/pages/docs/location-pages").then((module) => ({
    default: module.IslandPickerPage,
  }))
)
const LocationPickerPage = lazy(() =>
  import("@/src/pages/docs/location-pages").then((module) => ({
    default: module.LocationPickerPage,
  }))
)

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
          <Route path="patterns" element={<Navigate to="/docs/patterns/mixed-content" replace />} />
          <Route path="patterns/mixed-content" element={<MixedContentPatternPage />} />
          <Route path="patterns/search-direction" element={<SearchDirectionPatternPage />} />
          <Route path="patterns/currency" element={<CurrencyPatternPage />} />
          <Route path="patterns/phone-numbers" element={<PhoneNumbersPatternPage />} />
          <Route path="patterns/rtl-forms" element={<RtlFormsPatternPage />} />
          <Route path="patterns/rtl-tables" element={<RtlTablesPatternPage />} />
          <Route path="patterns/portals" element={<PortalsPatternPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/search" element={<SearchPage />} />
          <Route path="components/combobox" element={<ComboboxPage />} />
          <Route path="components/date-picker" element={<DatePickerPage />} />
          <Route
            path="components/island-picker"
            element={
              <Suspense fallback={null}>
                <IslandPickerPage />
              </Suspense>
            }
          />
          <Route
            path="components/location-picker"
            element={
              <Suspense fallback={null}>
                <LocationPickerPage />
              </Suspense>
            }
          />
          <Route path="components/form-field" element={<FormFieldPage />} />
          <Route path="components/currency-input" element={<CurrencyInputPage />} />
          <Route path="components/phone-input" element={<PhoneInputPage />} />
          <Route path="components/data-table" element={<DataTablePage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/pagination" element={<PaginationPage />} />
          <Route path="components/dialog" element={<DialogContentPage />} />
          <Route path="blocks/customer-management" element={<CustomerManagementPage />} />
          <Route path="blocks/invoice" element={<InvoicePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { Shell } from './layout/Shell'
import { Home } from './pages/Home'
import { FoundationsOverview } from './pages/foundations/Overview'
import { ColorsPage } from './pages/foundations/Colors'
import { TypographyPage } from './pages/foundations/Typography'
import { SpacingPage } from './pages/foundations/Spacing'
import { RadiusPage } from './pages/foundations/Radius'
import { ShadowsPage } from './pages/foundations/Shadows'
import { ComponentsOverview } from './pages/components/Overview'
import { BannerPage } from './pages/components/BannerPage'
import { ButtonPage } from './pages/components/ButtonPage'
import { CardPage } from './pages/components/CardPage'
import { ChipPage } from './pages/components/ChipPage'
import { DataTablePage } from './pages/components/DataTablePage'
import { FormFieldPage } from './pages/components/FormFieldPage'
import { InputPage } from './pages/components/InputPage'
import { ListRowPage } from './pages/components/ListRowPage'
import { ModalPage } from './pages/components/ModalPage'
import { PageHeaderPage } from './pages/components/PageHeaderPage'
import { SelectPage } from './pages/components/SelectPage'
import { StatTilePage } from './pages/components/StatTilePage'
import { TextareaPage } from './pages/components/TextareaPage'
import { AppShellPage } from './pages/components/AppShellPage'
import { ClockCardPage } from './pages/components/ClockCardPage'
import { CorrectionModalPage } from './pages/components/CorrectionModalPage'
import { EmpPhotoPage } from './pages/components/EmpPhotoPage'
import { LeaveModalPage } from './pages/components/LeaveModalPage'
import { PatternsOverview } from './pages/patterns/Overview'
import { ApprovalsInboxPage } from './pages/patterns/ApprovalsInboxPage'
import { FilteredTablePage } from './pages/patterns/FilteredTablePage'
import { FormModalPage } from './pages/patterns/FormModalPage'
import { OrgChartPage } from './pages/patterns/OrgChartPage'
import { RtoCardPage } from './pages/patterns/RtoCardPage'
import { WeekGridPage } from './pages/patterns/WeekGridPage'
import { TraceabilityPage } from './pages/resources/Traceability'
import { ChangelogPage } from './pages/resources/Changelog'
import { ContributingPage } from './pages/resources/Contributing'

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />

        <Route path="foundations">
          <Route index element={<FoundationsOverview />} />
          <Route path="colors" element={<ColorsPage />} />
          <Route path="typography" element={<TypographyPage />} />
          <Route path="spacing" element={<SpacingPage />} />
          <Route path="radius" element={<RadiusPage />} />
          <Route path="shadows" element={<ShadowsPage />} />
        </Route>

        <Route path="components">
          <Route index element={<ComponentsOverview />} />
          <Route path="banner" element={<BannerPage />} />
          <Route path="button" element={<ButtonPage />} />
          <Route path="card" element={<CardPage />} />
          <Route path="chip" element={<ChipPage />} />
          <Route path="datatable" element={<DataTablePage />} />
          <Route path="formfield" element={<FormFieldPage />} />
          <Route path="input" element={<InputPage />} />
          <Route path="listrow" element={<ListRowPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="pageheader" element={<PageHeaderPage />} />
          <Route path="select" element={<SelectPage />} />
          <Route path="stattile" element={<StatTilePage />} />
          <Route path="textarea" element={<TextareaPage />} />
          <Route path="appshell" element={<AppShellPage />} />
          <Route path="clockcard" element={<ClockCardPage />} />
          <Route path="correctionmodal" element={<CorrectionModalPage />} />
          <Route path="empphoto" element={<EmpPhotoPage />} />
          <Route path="leavemodal" element={<LeaveModalPage />} />
        </Route>

        <Route path="patterns">
          <Route index element={<PatternsOverview />} />
          <Route path="approvalsinbox" element={<ApprovalsInboxPage />} />
          <Route path="filteredtable" element={<FilteredTablePage />} />
          <Route path="formmodal" element={<FormModalPage />} />
          <Route path="orgchart" element={<OrgChartPage />} />
          <Route path="rtocard" element={<RtoCardPage />} />
          <Route path="weekgrid" element={<WeekGridPage />} />
        </Route>

        <Route path="resources">
          <Route index element={<Navigate to="traceability" replace />} />
          <Route path="traceability" element={<TraceabilityPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="contributing" element={<ContributingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

import { lazy } from "react";

// Code-split route pages using dynamic imports
const HomePage = lazy(() => import("@/pages/Home/HomePage"));

const ButtonsPage = lazy(() => import("@/pages/Buttons/ButtonsPage"));
const ButtonDetails = lazy(() => import("@/pages/Buttons/ButtonDetails"));
const ButtonsCustomizerPage = lazy(
  () => import("@/pages/Buttons/customizer/ButtonsCustomizerPage"),
);

const CardsPage = lazy(() => import("@/pages/Cards/CardsPage"));
const CardDetails = lazy(() => import("@/pages/Cards/CardDetails"));
const CardCustomizerPage = lazy(
  () => import("@/pages/Cards/customizer/CardCustomizerPage"),
);

const FormsPage = lazy(() => import("@/pages/Forms/FormsPage"));
const FormDetails = lazy(() => import("@/pages/Forms/FormDetails"));
const FormsCustomizerPage = lazy(
  () => import("@/pages/Forms/customizer/FormsCustomizerPage"),
);

const FormCompositionsPage = lazy(
  () => import("@/pages/FormCompositions/FormCompositionsPage"),
);
const FormCompositionDetails = lazy(
  () => import("@/pages/FormCompositions/FormCompositionDetails"),
);

const LayoutsPage = lazy(() => import("@/pages/Layouts/LayoutsPage"));
const LayoutDetails = lazy(() => import("@/pages/Layouts/LayoutDetails"));

const NotificationsPage = lazy(
  () => import("@/pages/Notifications/NotificationsPage"),
);
const NotificationDetails = lazy(
  () => import("@/pages/Notifications/NotificationDetails"),
);
const NotificationsCustomizerPage = lazy(
  () => import("@/pages/Notifications/customizer/NotificationsCustomizerPage"),
);

const DataDisplayPage = lazy(
  () => import("@/pages/DataDisplay/DataDisplayPage"),
);
const DataDisplayDetails = lazy(
  () => import("@/pages/DataDisplay/DataDisplayDetails"),
);

const TablesDashboardPage = lazy(
  () => import("@/pages/TablesDashboard/TablesDashboardPage"),
);
const TablesDashboardCustomizerPage = lazy(
  () =>
    import("@/pages/TablesDashboard/customizer/TablesDashboardCustomizerPage"),
);

const AccordionPage = lazy(() => import("@/pages/Accordion/AccordionPage"));
const AccordionDetails = lazy(
  () => import("@/pages/Accordion/AccordionDetails"),
);

const ModalOverlayPage = lazy(
  () => import("@/pages/ModalOverlay/ModalOverlayPage"),
);
const ModalOverlayDetails = lazy(
  () => import("@/pages/ModalOverlay/ModalOverlayDetails"),
);

const FileSystemPage = lazy(() => import("@/pages/FileSystem/FileSystemPage"));
const FileSystemDetails = lazy(
  () => import("@/pages/FileSystem/FileSystemDetails"),
);

const NavigationPage = lazy(() => import("@/pages/Navigation/NavigationPage"));
const NavigationDetails = lazy(
  () => import("@/pages/Navigation/NavigationDetails"),
);

const SelectionSearchPage = lazy(() => import("@/pages/SelectionSearch/page"));
const ThemeFormDesign = lazy(() =>
  import("@/pages/DesignSystem/ThemeDesign").then((module) => ({
    default: module.ThemeFormDesign,
  })),
);

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <HomePage /> },

  { path: "/buttons", element: <ButtonsPage /> },
  { path: "/buttons/customize", element: <ButtonsCustomizerPage /> },
  { path: "/buttons/customize/:id", element: <ButtonsCustomizerPage /> },
  { path: "/buttons/:id", element: <ButtonDetails /> },

  { path: "/cards", element: <CardsPage /> },
  { path: "/cards/customize", element: <CardCustomizerPage /> },
  { path: "/cards/customize/:id", element: <CardCustomizerPage /> },
  { path: "/cards/:id", element: <CardDetails /> },

  { path: "/forms", element: <FormsPage /> },
  { path: "/forms/customize", element: <FormsCustomizerPage /> },
  { path: "/forms/customize/:id", element: <FormsCustomizerPage /> },
  { path: "/forms/:id", element: <FormDetails /> },

  { path: "/form-compositions", element: <FormCompositionsPage /> },
  {
    path: "/form-compositions/:id",
    element: <FormCompositionDetails />,
  },

  { path: "/layouts", element: <LayoutsPage /> },
  { path: "/layouts/:slug", element: <LayoutDetails /> },

  { path: "/notifications", element: <NotificationsPage /> },
  { path: "/notifications/customize", element: <NotificationsCustomizerPage /> },
  { path: "/notifications/customize/:id", element: <NotificationsCustomizerPage /> },
  { path: "/notifications/:id", element: <NotificationDetails /> },

  { path: "/data-display", element: <DataDisplayPage /> },
  { path: "/data-display/:id", element: <DataDisplayDetails /> },

  { path: "/tables-dashboard", element: <TablesDashboardPage /> },
  {
    path: "/tables-dashboard/customize/:id",
    element: <TablesDashboardCustomizerPage />,
  },
  { path: "/tables-dashboard/:id", element: <TablesDashboardPage /> },

  { path: "/accordion", element: <AccordionPage /> },
  { path: "/accordion/:id", element: <AccordionDetails /> },

  { path: "/modal-overlay", element: <ModalOverlayPage /> },
  { path: "/modal-overlay/:id", element: <ModalOverlayDetails /> },

  { path: "/file-system", element: <FileSystemPage /> },
  { path: "/file-system/:id", element: <FileSystemDetails /> },

  { path: "/navigation", element: <NavigationPage /> },
  { path: "/navigation/:id", element: <NavigationDetails /> },

  { path: "/selection-search", element: <SelectionSearchPage /> },
  { path: "/design-system", element: <ThemeFormDesign /> },
];

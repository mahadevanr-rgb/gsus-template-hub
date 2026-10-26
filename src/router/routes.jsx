import HomePage from "@/pages/Home/HomePage";
import ButtonsPage from "@/pages/Buttons/ButtonsPage";
import ButtonDetails from "@/pages/Buttons/ButtonDetails";
import CardsPage from "@/pages/Cards/CardsPage";
import CardDetails from "@/pages/Cards/CardDetails";
import FormsPage from "@/pages/Forms/FormsPage";
import FormDetails from "@/pages/Forms/FormDetails";
import FormCompositionsPage from "@/pages/FormCompositions/FormCompositionsPage";
import FormCompositionDetails from "@/pages/FormCompositions/FormCompositionDetails";
import FormCompositionCustomizePage from "@/pages/FormCompositions/FormCompositionCustomizePage";
import LayoutsPage from "@/pages/Layouts/LayoutsPage";
import LayoutDetails from "@/pages/Layouts/LayoutDetails";
import NotificationsPage from "@/pages/Notifications/NotificationsPage";
import NotificationDetails from "@/pages/Notifications/NotificationDetails";
import DataDisplayPage from "@/pages/DataDisplay/DataDisplayPage";
import DataDisplayDetails from "@/pages/DataDisplay/DataDisplayDetails";
import DateTimePage from "@/pages/DateTime/DateTimePage";
import DateTimeDetails from "@/pages/DateTime/DateTimeDetails";
import CustomizeCodePage from "../pages/DateTime/components/CustomizeCodePage";
import LayoutCustomizeCodePage from "@/pages/Layouts/LayoutCustomizeCodePage";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <HomePage /> },
  { path: "/buttons", element: <ButtonsPage /> },
  { path: "/buttons/:id", element: <ButtonDetails /> },
  { path: "/cards", element: <CardsPage /> },
  { path: "/cards/:id", element: <CardDetails /> },
  { path: "/forms", element: <FormsPage /> },
  { path: "/forms/:id", element: <FormDetails /> },
  { path: "/form-compositions", element: <FormCompositionsPage /> },
  { path: "/form-compositions/:id", element: <FormCompositionDetails /> },
  { path: "/form-compositions/:id/customize", element: <FormCompositionCustomizePage /> },
  { path: "/layouts", element: <LayoutsPage /> },
  { path: "/layouts/:slug", element: <LayoutDetails /> },
  { path: "/layouts/:layoutId/customize", element: <LayoutCustomizeCodePage /> },
  { path: "/notifications", element: <NotificationsPage /> },
  { path: "/notifications/:id", element: <NotificationDetails /> },
  { path: "/data-display", element: <DataDisplayPage /> },
  { path: "/data-display/:id", element: <DataDisplayDetails /> },
  { path: "/date-time", element: <DateTimePage /> },
  { path: "/date-time/:id", element: <DateTimeDetails /> },
  {
    path: "/date-time/:componentId/customize",
    element: <CustomizeCodePage />,
  },
];

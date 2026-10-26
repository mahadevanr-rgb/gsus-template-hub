import React, { lazy } from 'react';

// Code-split route pages using dynamic imports
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const ButtonsPage = lazy(() => import('@/pages/Buttons/ButtonsPage'));
const ButtonDetails = lazy(() => import('@/pages/Buttons/ButtonDetails'));
const CardsPage = lazy(() => import('@/pages/Cards/CardsPage'));
const CardDetails = lazy(() => import('@/pages/Cards/CardDetails'));
const CardCustomizerPage = lazy(() => import('@/pages/Cards/customizer/CardCustomizerPage'));
const FormsPage = lazy(() => import('@/pages/Forms/FormsPage'));
const FormDetails = lazy(() => import('@/pages/Forms/FormDetails'));
const FormCompositionsPage = lazy(() => import('@/pages/FormCompositions/FormCompositionsPage'));
const FormCompositionDetails = lazy(() => import('@/pages/FormCompositions/FormCompositionDetails'));
const LayoutsPage = lazy(() => import('@/pages/Layouts/LayoutsPage'));
const LayoutDetails = lazy(() => import('@/pages/Layouts/LayoutDetails'));
const NotificationsPage = lazy(() => import('@/pages/Notifications/NotificationsPage'));
const NotificationDetails = lazy(() => import('@/pages/Notifications/NotificationDetails'));
const DataDisplayPage = lazy(() => import('@/pages/DataDisplay/DataDisplayPage'));
const DataDisplayDetails = lazy(() => import('@/pages/DataDisplay/DataDisplayDetails'));
const AccordionPage = lazy(() => import('@/pages/Accordion/AccordionPage'));
const AccordionDetails = lazy(() => import('@/pages/Accordion/AccordionDetails'));
const AccordionCustomizerPage = lazy(() => import('@/pages/Accordion/customizer/AccordionCustomizerPage'));
const ModalOverlayPage = lazy(() => import('@/pages/ModalOverlay/ModalOverlayPage'));
const ModalOverlayDetails = lazy(() => import('@/pages/ModalOverlay/ModalOverlayDetails'));
const ModalOverlayCustomizerPage = lazy(() => import('@/pages/ModalOverlay/customizer/ModalOverlayCustomizerPage'));
const FileSystemPage = lazy(() => import('@/pages/FileSystem/FileSystemPage'));
const FileSystemDetails = lazy(() => import('@/pages/FileSystem/FileSystemDetails'));
const FileSystemCustomizerPage = lazy(() => import('@/pages/FileSystem/customizer/FileSystemCustomizerPage'));
const NavigationPage = lazy(() => import('@/pages/Navigation/NavigationPage'));
const NavigationDetails = lazy(() => import('@/pages/Navigation/NavigationDetails'));
const NavigationCustomizerPage = lazy(() => import('@/pages/Navigation/customizer/NavigationCustomizerPage'));

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/dashboard', element: <HomePage /> },
  { path: '/buttons', element: <ButtonsPage /> },
  { path: '/buttons/:id', element: <ButtonDetails /> },
  { path: '/cards', element: <CardsPage /> },
  { path: '/cards/customize', element: <CardCustomizerPage /> },
  { path: '/cards/customize/:id', element: <CardCustomizerPage /> },
  { path: '/cards/:id', element: <CardDetails /> },

  { path: '/forms', element: <FormsPage /> },
  { path: '/forms/:id', element: <FormDetails /> },
  { path: '/form-compositions', element: <FormCompositionsPage /> },
  { path: '/form-compositions/:id', element: <FormCompositionDetails /> },
  { path: '/layouts', element: <LayoutsPage /> },
  { path: '/layouts/:slug', element: <LayoutDetails /> },
  { path: '/notifications', element: <NotificationsPage /> },
  { path: '/notifications/:id', element: <NotificationDetails /> },
  { path: '/data-display', element: <DataDisplayPage /> },
  { path: '/data-display/:id', element: <DataDisplayDetails /> },
  { path: '/accordion', element: <AccordionPage /> },
  { path: '/accordion/customize', element: <AccordionCustomizerPage /> },
  { path: '/accordion/customize/:id', element: <AccordionCustomizerPage /> },
  { path: '/accordion/:id', element: <AccordionDetails /> },
  { path: '/modal-overlay', element: <ModalOverlayPage /> },
  { path: '/modal-overlay/customize', element: <ModalOverlayCustomizerPage /> },
  { path: '/modal-overlay/customize/:id', element: <ModalOverlayCustomizerPage /> },
  { path: '/modal-overlay/:id', element: <ModalOverlayDetails /> },
  { path: '/file-system', element: <FileSystemPage /> },
  { path: '/file-system/customize', element: <FileSystemCustomizerPage /> },
  { path: '/file-system/customize/:id', element: <FileSystemCustomizerPage /> },
  { path: '/file-system/:id', element: <FileSystemDetails /> },
  { path: '/navigation', element: <NavigationPage /> },
  { path: '/navigation/customize', element: <NavigationCustomizerPage /> },
  { path: '/navigation/customize/:id', element: <NavigationCustomizerPage /> },
  { path: '/navigation/:id', element: <NavigationDetails /> },
];

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import DashboardPage      from "./pages/Dashboard";
import ButtonsPage        from "./pages/ButtonsPage";
import FormsPage          from "./pages/FormsPage";
import NotificationsPage  from "./pages/NotificationsPage";
import DataDisplayPage    from "./pages/DataDisplayPage";
import EcommercePage      from "./pages/ecommerce/EcommercePage";
import InventoryPage      from "./pages/inventory/InventoryPage";
import CreateProjectPage  from "./pages/create-project/CreateProjectPage";
import SyncPage           from "./pages/SyncPage";
import FormCompositionsPage from "./pages/FormCompositionsPage";
import FormCompositionDetails from "./pages/FormCompositionDetails";

function App() {
  return (
    <Routes>
      <Route path="/"               element={<DashboardPage />} />
      <Route path="/buttons/*"      element={<ButtonsPage />} />
      <Route path="/forms/*"        element={<FormsPage />} />
      <Route path="/form-compositions" element={<FormCompositionsPage />} />
      <Route path="/form-compositions/:slug" element={<FormCompositionDetails />} />
      <Route path="/notifications/*" element={<NotificationsPage />} />
      <Route path="/data-display/*" element={<DataDisplayPage />} />
      <Route path="/ecommerce/*"    element={<EcommercePage />} />
      <Route path="/inventory/*"    element={<InventoryPage />} />
      <Route path="/create-project/*" element={<CreateProjectPage />} />
      <Route path="/sync"           element={<SyncPage />} />
      <Route path="*"               element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

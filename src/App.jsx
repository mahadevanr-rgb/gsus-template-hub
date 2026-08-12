import { useState } from "react";
import "./App.css";

import DashboardPage from "./pages/Dashboard";
import ButtonsPage from "./pages/ButtonsPage";
import FormsPage from "./pages/FormsPage";
import NotificationsPage from "./pages/NotificationsPage";
import DataDisplayPage from "./pages/DataDisplayPage";
import EcommercePage from "./pages/ecommerce/EcommercePage";
import InventoryPage from "./pages/inventory/InventoryPage";
import CreateProjectPage from "./pages/create-project/CreateProjectPage";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "buttons":
        return <ButtonsPage />;
      case "forms":
        return <FormsPage />;
      case "notifications":
        return <NotificationsPage />;
      case "data-display":
        return <DataDisplayPage />;
      case "ecommerce":
        return <EcommercePage />;
      case "inventory":
        return <InventoryPage />;
      case "create-project":
        return <CreateProjectPage />;
      case "dashboard":
      default:
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
        );
    }
  };

  return (
    <>
      {renderPage()}

      {currentPage !== "dashboard" && (
        <button
          className="app-back-home"
          onClick={() => handleNavigate("dashboard")}
          title="Back to Dashboard"
        >
          ← Home
        </button>
      )}
    </>
  );
}

export default App;

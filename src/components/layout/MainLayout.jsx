import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();

  // derive currentPage from URL
  const currentPage = pathname === "/" ? "dashboard" : pathname.split("/")[1];

  return (
    <div className="min-h-screen bg-[#07090e] transition-colors duration-200">
      <Sidebar
        currentPage={currentPage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-60"}`}>
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

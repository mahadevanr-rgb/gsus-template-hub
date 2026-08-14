import { useState } from "react";
import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";
import Footer from "./Footer";

export default function MainLayout({ children, onNavigate, currentPage }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] transition-colors duration-200">
      {/* 1. Full height Left Sidebar (Top to Bottom) */}
      <Sidebar
        onNavigate={onNavigate}
        currentPage={currentPage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* 2. Right Side Area (Shifted dynamically based on Sidebar width) */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-60"
        }`}
      >
        {/* Top Header (Only covers right side) */}
        <Header onNavigate={onNavigate} currentPage={currentPage} />

        {/* Main Content Body */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

import MainLayout from "../components/layout/MainLayout";
import DashboardStats from "../components/organisms/DashboardStats";
import TemplatesSection from "../components/organisms/TemplatesSection";
import ComponentsSection from "../components/organisms/ComponentsSection";
import ComponentsNavigation from "../components/organisms/ComponentsNavigation";

export default function DashboardPage({ onNavigate, currentPage }) {
  return (
    <MainLayout onNavigate={onNavigate} currentPage={currentPage}>
      {/* <DashboardStats /> */}
      {/* <ComponentsNavigation onNavigate={onNavigate} /> */}
      <TemplatesSection onNavigate={onNavigate} />
      <ComponentsSection onNavigate={onNavigate} />
    </MainLayout>
  );
}

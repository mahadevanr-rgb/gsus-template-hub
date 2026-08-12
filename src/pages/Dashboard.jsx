import MainLayout from "../components/layout/MainLayout";
import TemplatesSection from "../components/organisms/TemplatesSection";
import ComponentsSection from "../components/organisms/ComponentsSection";
import SyncBanner from "../components/organisms/SyncBanner";

export default function DashboardPage({ onNavigate, currentPage }) {
  return (
    <MainLayout onNavigate={onNavigate} currentPage={currentPage}>
      <SyncBanner />
      <TemplatesSection onNavigate={onNavigate} />
      <ComponentsSection onNavigate={onNavigate} />
    </MainLayout>
  );
}

import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TemplatesSection from "../components/organisms/TemplatesSection";
import SyncBanner from "../components/organisms/SyncBanner";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <SyncBanner />
      <TemplatesSection onNavigate={(id) => navigate(id === "dashboard" ? "/" : `/${id}`)} />
    </MainLayout>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import TemplatesSection from "./components/TemplatesSection/TemplatesSection";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <TemplatesSection onNavigate={(id) => navigate(id === "dashboard" ? "/" : `/${id}`)} />
    </div>
  );
}

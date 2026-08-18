import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ButtonShowcase from "../components/organisms/ButtonShowcase";
import ButtonDetails from "../pages/ButtonDetails";
import "./ButtonsPage.css";

export default function ButtonsPage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();

  const handleSelectButton = (slug) => {
    setSelectedButton(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedButton(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className="buttons-page">
        {selectedButton ? (
          <ButtonDetails
            selectedButton={selectedButton}
            onBack={handleBack}
            onNavigateHome={() => navigate("/")}
          />
        ) : (
          <ButtonShowcase
            onSelectButton={handleSelectButton}
            onNavigateHome={() => navigate("/")}
          />
        )}
      </div>
    </MainLayout>
  );
}

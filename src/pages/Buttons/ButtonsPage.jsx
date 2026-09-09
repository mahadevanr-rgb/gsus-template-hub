import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonShowcase from "@/pages/Buttons/components/ButtonShowcase/ButtonShowcase";
import ButtonDetails from "./ButtonDetails";

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
    <div className="buttons-page space-y-6">
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
  );
}

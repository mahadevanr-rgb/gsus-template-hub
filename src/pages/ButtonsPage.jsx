import { useState } from "react";
import ButtonShowcase from "../components/organisms/ButtonShowcase";
import ButtonDetails from "../pages/ButtonDetails";
import "./ButtonsPage.css";

export default function ButtonsPage() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleSelectButton = (slug) => {
    setSelectedButton(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedButton(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="buttons-page">
      {selectedButton ? (
        <ButtonDetails selectedButton={selectedButton} onBack={handleBack} />
      ) : (
        <ButtonShowcase onSelectButton={handleSelectButton} />
      )}
    </div>
  );
}

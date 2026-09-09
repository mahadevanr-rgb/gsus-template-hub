import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

const buttonSiblings = [
  { slug: "primary-button", name: "Primary Button" },
  { slug: "secondary-button", name: "Secondary Button" },
  { slug: "outline-button", name: "Outline Button" },
  { slug: "ghost-button", name: "Ghost Button" },
  { slug: "gradient-button", name: "Gradient Button" },
  { slug: "shadow-button", name: "Shadow Button" },
  { slug: "animated-button", name: "Animated Button" },
  { slug: "pulse-button", name: "Pulse Button" },
  { slug: "icon-button", name: "Icon Button" },
  { slug: "floating-button", name: "Floating Button" },
];

export default function ButtonDetails({ selectedButton, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selectedButton || params.id || "primary-button";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selectedButton) {
      setCurrentSlug(selectedButton);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selectedButton, params.id]);

  const component = getComponent(currentSlug);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/buttons");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  return (
    <ComponentDetailsView
      component={component}
      categoryName="Buttons"
      categoryPath="/buttons"
      subCategories={buttonSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
    />
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import { getCardsBySubCategory } from "@/codeRegistry/cardsRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

export default function CardDetails({ selectedCard, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selectedCard || params.id || params.slug || "profile-card";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selectedCard) {
      setCurrentSlug(selectedCard);
    } else if (params.id || params.slug) {
      setCurrentSlug(params.id || params.slug);
    }
  }, [selectedCard, params.id, params.slug]);

  const component = getComponent(currentSlug);
  const subCategoryCards = getCardsBySubCategory(component?.subCategory || "profile");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/cards");
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
      categoryName="Cards"
      categoryPath="/cards"
      subCategories={subCategoryCards}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
    />
  );
}

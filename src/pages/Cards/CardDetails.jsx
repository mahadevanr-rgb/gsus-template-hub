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

  const handleCustomize = () => {
    navigate(`/cards/customize/${currentSlug}`);
  };

  const renderSidebar = () => (
    <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 space-y-3 shadow-lg">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">🎨</span>
        <div>
          <h4 className="font-bold text-sm text-white">Customize This Card</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Modify layout, colors, typography, images, and content in the visual workspace.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCustomize}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
      >
        <span>⚡ Customize Your Own Card</span>
      </button>
    </div>
  );

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
      renderSidebar={renderSidebar}
    />
  );
}


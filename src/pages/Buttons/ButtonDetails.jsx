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

  const handleCustomize = () => {
    navigate(`/buttons/customize/${currentSlug}`);
  };

  const renderSidebar = () => (
    <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 space-y-3 shadow-lg">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">🎨</span>
        <div>
          <h4 className="font-bold text-sm text-white">Customize This Button</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Adjust the label, colors, size, shape, and style in the visual workspace.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCustomize}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
      >
        <span>⚡ Customize Your Own Button</span>
      </button>
    </div>
  );

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
      renderSidebar={renderSidebar}
    />
  );
}

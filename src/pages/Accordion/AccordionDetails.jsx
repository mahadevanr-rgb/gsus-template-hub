import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import NumberedAccordion from "./components/NumberedAccordion/NumberedAccordion";
import FilterAccordion from "./components/FilterAccordion/FilterAccordion";
import SimpleAccordion from "./components/SimpleAccordion/SimpleAccordion";
import IconAccordion from "./components/IconAccordion/IconAccordion";
import FormAccordion from "./components/FormAccordion/FormAccordion";
import BaseAccordionPreview from "./components/BaseAccordion/BaseAccordionPreview";
import {
  numberedFaqItems,
  filterSections,
  simpleFaqItems,
  iconAccordionItems,
  formAccordionSections,
} from "./accordion.config";

const accordionSiblings = [
  { slug: "numbered-accordion", name: "Numbered FAQ Accordion" },
  { slug: "filter-accordion", name: "Filter Selection Accordion" },
  { slug: "simple-accordion", name: "Simple FAQ Accordion" },
  { slug: "icon-accordion", name: "Icon Navigation Accordion" },
  { slug: "form-accordion", name: "Dynamic Form Accordion" },
  { slug: "accordion-primitive", name: "Base Accordion Primitive" },
];

export default function AccordionDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "numbered-accordion";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const component = getComponent(currentSlug);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/accordion");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderCustomPreview = () => {
    switch (currentSlug) {
      case "numbered-accordion":
        return (
          <div className="w-full max-w-xl py-2">
            <NumberedAccordion
              items={numberedFaqItems.slice(0, 3)}
              defaultValue="01"
            />
          </div>
        );
      case "filter-accordion":
        return (
          <div className="w-full max-w-xs py-2 flex justify-center">
            <FilterAccordion
              sections={filterSections.slice(0, 3)}
              defaultOpenSections={["industry"]}
            />
          </div>
        );
      case "simple-accordion":
        return (
          <div className="w-full max-w-lg py-2">
            <SimpleAccordion
              items={simpleFaqItems.slice(0, 3)}
              defaultValue="faq-1"
            />
          </div>
        );
      case "icon-accordion":
        return (
          <div className="w-full max-w-md py-2 flex justify-center">
            <IconAccordion
              items={iconAccordionItems}
              defaultValue="health-profile"
              variant="warm"
            />
          </div>
        );
      case "form-accordion":
        return (
          <div className="w-full max-w-xl py-2 flex justify-center">
            <FormAccordion
              sections={formAccordionSections}
              defaultValue="income"
            />
          </div>
        );
      case "accordion-primitive":
      default:
        return (
          <div className="w-full max-w-md py-2 flex justify-center">
            <BaseAccordionPreview />
          </div>
        );
    }
  };

  return (
    <ComponentDetailsView
      component={component}
      categoryName="Accordion"
      categoryPath="/accordion"
      subCategories={accordionSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderCustomPreview}
    />
  );
}

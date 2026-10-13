import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import { navigateBackOrFallback } from "@/components/common/Navigation/navigationUtils";
import {
  NavbarDemo,
  HeaderDemo,
  SidebarDemo,
  BreadcrumbDemo,
  TabsDemo,
  NestedTabsDemo,
  BottomNavigationDemo,
  StepperDemo,
  MenuDemo,
  DropdownMenuDemo,
  MegaMenuDemo,
  ContextMenuDemo,
  CommandPaletteDemo,
  NavigationDrawerDemo,
} from "./components";

const navigationSiblings = [
  { slug: "navbar", name: "Navbar" },
  { slug: "header", name: "Header" },
  { slug: "sidebar", name: "Sidebar" },
  { slug: "breadcrumb", name: "Breadcrumb" },
  { slug: "tabs", name: "Tabs" },
  { slug: "nested-tabs", name: "Nested Tabs" },
  { slug: "bottom-navigation", name: "Bottom Navigation" },
  { slug: "stepper", name: "Stepper" },
  { slug: "menu", name: "Menu" },
  { slug: "dropdown-menu", name: "Dropdown Menu" },
  { slug: "mega-menu", name: "Mega Menu" },
  { slug: "context-menu", name: "Context Menu" },
  { slug: "command-palette", name: "Command Palette" },
  { slug: "navigation-drawer", name: "Navigation Drawer" },
];

export default function NavigationDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "navbar";
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
      navigateBackOrFallback(navigate, "/navigation");
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
      case "navbar":
        return <NavbarDemo />;
      case "header":
        return <HeaderDemo />;
      case "sidebar":
        return <SidebarDemo />;
      case "breadcrumb":
        return <BreadcrumbDemo />;
      case "tabs":
        return <TabsDemo />;
      case "nested-tabs":
        return <NestedTabsDemo />;
      case "bottom-navigation":
        return <BottomNavigationDemo />;
      case "stepper":
        return <StepperDemo />;
      case "menu":
        return <MenuDemo />;
      case "dropdown-menu":
        return <DropdownMenuDemo />;
      case "mega-menu":
        return <MegaMenuDemo />;
      case "context-menu":
        return <ContextMenuDemo />;
      case "command-palette":
        return <CommandPaletteDemo />;
      case "navigation-drawer":
        return <NavigationDrawerDemo />;
      default:
        return <NavbarDemo />;
    }
  };

  return (
    <ComponentDetailsView
      component={component}
      categoryName="Navigation"
      categoryPath="/navigation"
      subCategories={navigationSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => {
        setCurrentSlug(slug);
        navigate(`/navigation/${slug}`);
      }}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderCustomPreview}
    />
  );
}

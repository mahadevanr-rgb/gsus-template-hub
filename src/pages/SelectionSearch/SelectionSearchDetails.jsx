import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Standard UI Components / Demos
import SelectDemo from "./components/SelectDemo";
import MultiSelectDemo from "./components/MultiSelectDemo";
import AutocompleteDemo from "./components/AutocompleteDemo";
import ComboboxDemo from "./components/ComboboxDemo";
import AsyncSelectDemo from "./components/AsyncSelectDemo";
import SearchableSelectDemo from "./components/SearchableSelectDemo";
import FilterDemo from "./components/FilterDemo";
import SuggestionDemo from "./components/SuggestionDemo";
import DebounceDemo from "./components/DebounceDemo";
import ValidationDemo from "./components/ValidationDemo";
import KeyboardDemo from "./components/KeyboardDemo";
import LoadingStateDemo from "./components/LoadingStateDemo";

import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

/* -------------------------------------------------------------------------- */
/* Component Navigation Siblings                                              */
/* -------------------------------------------------------------------------- */

const selectionSiblings = [
  { slug: "select", name: "Select Dropdown" },
  { slug: "multiSelect", name: "Multi Select" },
  { slug: "autocomplete", name: "Autocomplete Search" },
  { slug: "combobox", name: "Combobox Input" },
  { slug: "asyncSelect", name: "Async Remote Select" },
  { slug: "searchableSelect", name: "Searchable Select" },
  { slug: "filterDemo", name: "Facet Filter Controls" },
  { slug: "suggestionDemo", name: "Smart Suggestions" },
  { slug: "debounceDemo", name: "Debounced Search" },
  { slug: "validationDemo", name: "Validated Select Form" },
  { slug: "keyboardDemo", name: "Keyboard Navigable Select" },
  { slug: "loadingStateDemo", name: "Loading / Empty / Error States" },
];

/* -------------------------------------------------------------------------- */
/* Component Metadata & Documentation                                        */
/* -------------------------------------------------------------------------- */

const selectionMeta = {
  select: {
    name: "Select Dropdown",
    tag: "Select",
    description:
      "Accessible single-option dropdown selection built with smooth transitions and customizable item rendering.",
    code: `import Select from "@/components/ui/Select";\n\n<Select options={options} value={selected} onChange={setSelected} placeholder="Choose an option..." />`,
    files: [{ path: "components/ui/selection/Select.jsx" }],
  },
  multiSelect: {
    name: "Multi Select",
    tag: "MultiSelect",
    description:
      "Tag-based multi-option selector with removable badge chips and clear-all capabilities.",
    code: `import MultiSelect from "@/components/ui/MultiSelect";\n\n<MultiSelect options={options} values={selectedTags} onChange={setSelectedTags} placeholder="Select technologies..." />`,
    files: [{ path: "components/ui/selection/MultiSelect.jsx" }],
  },
  autocomplete: {
    name: "Autocomplete Search",
    tag: "Search",
    description:
      "Live search input with dynamic query matching and highlight support.",
    code: `import Autocomplete from "@/components/ui/Autocomplete";\n\n<Autocomplete items={items} onSelect={handleSelect} placeholder="Search components..." />`,
    files: [{ path: "components/ui/selection/Autocomplete.jsx" }],
  },
  combobox: {
    name: "Combobox Input",
    tag: "Combobox",
    description:
      "Combined editable text input and selectable listbox dropdown for custom entries.",
    code: `import Combobox from "@/components/ui/Combobox";\n\n<Combobox options={options} value={value} onChange={setValue} createable />`,
    files: [{ path: "components/ui/selection/Combobox.jsx" }],
  },
  asyncSelect: {
    name: "Async Remote Select",
    tag: "Async",
    description:
      "Remote API query search with automated loading indicators and debounced network requests.",
    code: `import AsyncSelect from "@/components/ui/AsyncSelect";\n\n<AsyncSelect loadOptions={fetchUsers} onChange={setUser} placeholder="Search remote users..." />`,
    files: [{ path: "components/ui/selection/AsyncSelect.jsx" }],
  },
  searchableSelect: {
    name: "Searchable Select",
    tag: "Filter",
    description:
      "Compact dropdown containing an inline filter search box inside the popover menu.",
    code: `import SearchableSelect from "@/components/ui/SearchableSelect";\n\n<SearchableSelect options={countries} onChange={setCountry} />`,
    files: [{ path: "components/ui/selection/SearchableSelect.jsx" }],
  },
  filterDemo: {
    name: "Facet Filter Controls",
    tag: "Filter",
    description:
      "Multi-parameter filter toolbar with pills, active counters, and reset triggers.",
    code: `import FilterGroup from "@/components/ui/FilterGroup";\n\n<FilterGroup filters={activeFilters} onFilterChange={handleFilterChange} />`,
    files: [{ path: "components/ui/selection/FilterGroup.jsx" }],
  },
  suggestionDemo: {
    name: "Smart Suggestions",
    tag: "Suggestions",
    description:
      "Contextual search recommendations and recent query history prompts.",
    code: `import SuggestionInput from "@/components/ui/SuggestionInput";\n\n<SuggestionInput recentSearches={history} suggestions={recommended} />`,
    files: [{ path: "components/ui/selection/SuggestionInput.jsx" }],
  },
  debounceDemo: {
    name: "Debounced Search",
    tag: "Performance",
    description:
      "High-performance search input that throttles keystrokes before triggering state updates.",
    code: `import DebounceInput from "@/components/ui/DebounceInput";\n\n<DebounceInput delay={300} onDebounce={handleSearch} placeholder="Type to search..." />`,
    files: [{ path: "components/ui/selection/DebounceInput.jsx" }],
  },
  validationDemo: {
    name: "Validated Select Form",
    tag: "Validation",
    description:
      "Form-ready select inputs supporting error borders, required markers, and custom validation messages.",
    code: `import ValidatedSelect from "@/components/ui/ValidatedSelect";\n\n<ValidatedSelect error="Please choose a valid tier" required options={tiers} />`,
    files: [{ path: "components/ui/selection/ValidatedSelect.jsx" }],
  },
  keyboardDemo: {
    name: "Keyboard Navigable Select",
    tag: "Accessibility",
    description:
      "Fully WAI-ARIA compliant dropdown supporting arrow keys, Escape, and Enter key navigation.",
    code: `import KeyboardSelect from "@/components/ui/KeyboardSelect";\n\n<KeyboardSelect options={options} autoFocus />`,
    files: [{ path: "components/ui/selection/KeyboardSelect.jsx" }],
  },
  loadingStateDemo: {
    name: "Loading / Empty / Error States",
    tag: "States",
    description:
      "Comprehensive UI states for empty result sets, failed network loads, and pending requests.",
    code: `import SelectStateWrapper from "@/components/ui/SelectStateWrapper";\n\n<SelectStateWrapper isLoading={loading} isEmpty={items.length === 0} error={error} />`,
    files: [{ path: "components/ui/selection/SelectStateWrapper.jsx" }],
  },
};

/* -------------------------------------------------------------------------- */
/* Component Detail View Component                                            */
/* -------------------------------------------------------------------------- */

export default function SelectionSearchDetails({
  selected,
  onBack,
  onNavigateHome,
}) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "select";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const meta = selectionMeta[currentSlug] || selectionMeta.select;

  const componentData = {
    name: meta.name,
    slug: currentSlug,
    subCategory: meta.tag,
    tag: meta.tag,
    description: meta.description,
    sourceCode: meta.code,
    files: meta.files,
    framework: "react",
    styling: "Tailwind CSS",
    version: "1.0.0",
    dependencies: ["lucide-react"],
    size: "~2.4 KB",
    lastUpdated: "May 12, 2025",
    author: "TemplateHub UI Team",
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/selection-search");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderPreview = () => {
    switch (currentSlug) {
      case "select":
        return <SelectDemo />;
      case "multiSelect":
        return <MultiSelectDemo />;
      case "autocomplete":
        return <AutocompleteDemo />;
      case "combobox":
        return <ComboboxDemo />;
      case "asyncSelect":
        return <AsyncSelectDemo />;
      case "searchableSelect":
        return <SearchableSelectDemo />;
      case "filterDemo":
        return <FilterDemo />;
      case "suggestionDemo":
        return <SuggestionDemo />;
      case "debounceDemo":
        return <DebounceDemo />;
      case "validationDemo":
        return <ValidationDemo />;
      case "keyboardDemo":
        return <KeyboardDemo />;
      case "loadingStateDemo":
        return <LoadingStateDemo />;
      default:
        return <SelectDemo />;
    }
  };

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Selection & Search"
      categoryPath="/selection-search"
      subCategories={selectionSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderPreview}
    />
  );
}

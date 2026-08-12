import "./ComponentsNavigation.css";

export default function ComponentsNavigation({ onNavigate }) {
  const components = [
    {
      id: "buttons",
      name: "Button Components",
      description:
        "Professional animated buttons with multiple styles and animations",
      icon: "🔘",
      color: "blue",
      page: "buttons",
    },
    {
      id: "forms",
      name: "Form Components",
      description: "Input fields, text areas, and form elements",
      icon: "📝",
      color: "purple",
      page: "forms",
    },
    {
      id: "cards",
      name: "Card Components",
      description: "Various card layouts and designs",
      icon: "🎴",
      color: "green",
      page: "cards",
    },
    {
      id: "modals",
      name: "Modal Components",
      description: "Dialog boxes and modal windows",
      icon: "📦",
      color: "orange",
      page: "modals",
    },
  ];

  const handleClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <section className="components-navigation">
      <div className="nav-header">
        <h2>Component Collections</h2>
        <p>Explore our professional UI component library</p>
      </div>

      <div className="nav-grid">
        {components.map((component) => (
          <div
            key={component.id}
            className={`nav-card nav-card-${component.color}`}
            onClick={() => handleClick(component.page)}
          >
            <div className="nav-icon">{component.icon}</div>
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <span className="nav-arrow">Explore →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

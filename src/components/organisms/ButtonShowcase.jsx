import { useState } from "react";
import { getComponentsByCategory } from "../../registry/index";
import { FloatingButton, IconButton } from "../atoms/buttons";
import "./ButtonShowcase.css";

export default function ButtonShowcase({ onSelectButton, onNavigateHome }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const buttons = getComponentsByCategory("buttons");

  return (
    <section className="button-showcase">
      {onNavigateHome && (
        <div className="breadcrumbs" style={{ marginBottom: "1.5rem" }}>
          <span style={{ cursor: "pointer" }} onClick={onNavigateHome}>Home</span>
          {" > "}
          <span style={{ cursor: "pointer" }} onClick={onNavigateHome}>Components</span>
          {" > "}
          <span className="active">Buttons</span>
        </div>
      )}
      <div className="showcase-header">
        <h2>Button Components Collection</h2>
        <p>Professional, animated button components for every use case</p>
      </div>

      <div className="buttons-grid">
        {buttons.map((btn) => {
          const Component = btn.component;
          const isHovered = hoveredButton === btn.slug;

          return (
            <div
              key={btn.slug}
              className={`button-card ${isHovered ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredButton(btn.slug)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => onSelectButton(btn.slug)}
            >
              <div className="button-preview">
                <div className="button-container">
                  {btn.isFloating ? (
                    <FloatingButton icon="+" label="Add" onClick={() => onSelectButton(btn.slug)} />
                  ) : btn.isIcon ? (
                    <IconButton icon="🎨" label="Action" variant="primary" onClick={() => onSelectButton(btn.slug)} />
                  ) : (
                    <Component {...btn.previewProps} onClick={() => onSelectButton(btn.slug)} />
                  )}
                </div>
              </div>

              <div className="button-info">
                <h3>{btn.name}</h3>
                <p>{btn.description}</p>
                <span className="view-details">View Details →</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

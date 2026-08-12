import { useState, useEffect } from "react";

const FONTS = [
  "Inter",
  "Roboto",
  "Poppins",
  "Nunito",
  "Raleway",
  "Montserrat",
  "Lato",
  "Open Sans",
  "Playfair Display",
  "DM Sans",
  "Outfit",
  "Sora",
  "Plus Jakarta Sans",
  "Space Grotesk",
  "Figtree",
  "Geist",
  "Manrope",
  "Work Sans",
  "Urbanist",
  "Lexend",
];

const PRESET_SINGLES = [
  { name: "Indigo", color: "#6366f1" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Emerald", color: "#10b981" },
  { name: "Teal", color: "#14b8a6" },
  { name: "Rose", color: "#f43f5e" },
  { name: "Pink", color: "#ec4899" },
  { name: "Orange", color: "#f97316" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Slate", color: "#475569" },
  { name: "Zinc", color: "#71717a" },
];

const PRESET_GRADIENTS = [
  { name: "Indigo → Violet", from: "#6366f1", to: "#8b5cf6" },
  { name: "Blue → Cyan", from: "#3b82f6", to: "#06b6d4" },
  { name: "Violet → Pink", from: "#8b5cf6", to: "#ec4899" },
  { name: "Rose → Orange", from: "#f43f5e", to: "#f97316" },
  { name: "Emerald → Cyan", from: "#10b981", to: "#06b6d4" },
  { name: "Orange → Amber", from: "#f97316", to: "#f59e0b" },
  { name: "Pink → Rose", from: "#ec4899", to: "#f43f5e" },
  { name: "Indigo → Cyan", from: "#6366f1", to: "#06b6d4" },
  { name: "Slate → Indigo", from: "#475569", to: "#6366f1" },
  { name: "Teal → Emerald", from: "#14b8a6", to: "#10b981" },
  { name: "Amber → Rose", from: "#f59e0b", to: "#f43f5e" },
  { name: "Blue → Violet", from: "#3b82f6", to: "#8b5cf6" },
];

function getThemeBg(theme) {
  if (!theme) return "#6366f1";
  if (theme.type === "single") return theme.color;
  if (theme.type === "gradient")
    return `linear-gradient(135deg,${theme.from},${theme.to})`;
  return "#6366f1";
}

export default function Step1({ data, onChange, onNext }) {
  const [fontSearch, setFontSearch] = useState("");
  const [colorMode, setColorMode] = useState(
    data.theme?.type === "gradient" ? "gradient" : "single",
  );
  const [customFrom, setCustomFrom] = useState(data.theme?.from || "#6366f1");
  const [customTo, setCustomTo] = useState(data.theme?.to || "#8b5cf6");
  const [customSingle, setCustomSingle] = useState(
    data.theme?.color || "#6366f1",
  );
  const [errors, setErrors] = useState({});

  const filtered = FONTS.filter((f) =>
    f.toLowerCase().includes(fontSearch.toLowerCase()),
  );

  useEffect(() => {
    if (data.font) {
      const fontSlug = data.font.replace(/ /g, "+");
      let link = document.getElementById("font-preview-link");
      if (!link) {
        link = document.createElement("link");
        link.id = "font-preview-link";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${fontSlug}:wght@400;600;700;800&display=swap`;
    }
  }, [data.font]);

  const validate = () => {
    const e = {};
    if (!data.projectName?.trim()) e.projectName = "Project name is required";
    if (!data.appName?.trim()) e.appName = "App name is required";
    if (!data.font) e.font = "Please choose a font";
    // if (!data.theme) e.theme = "Please choose a color theme";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  // const selectSingle = (color) =>
  //   onChange({ theme: { type: "single", color } });
  // const selectGradient = (from, to) =>
  //   onChange({ theme: { type: "gradient", from, to } });

  // const applyCustomSingle = () =>
  //   onChange({ theme: { type: "single", color: customSingle } });
  // const applyCustomGradient = () =>
  //   onChange({ theme: { type: "gradient", from: customFrom, to: customTo } });

  //const themeBg = getThemeBg(data.theme);

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ marginBottom: "36px" }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "28px",
            fontWeight: 900,
            color: "#111827",
          }}
        >
          Create your project
        </h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>
          Set up your project details, font and color theme.
        </p>
      </div>

      {/* Project Name */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 700,
            color: "#374151",
            marginBottom: "8px",
          }}
        >
          Project Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          value={data.projectName || ""}
          onChange={(e) => onChange({ projectName: e.target.value })}
          placeholder="e.g. my-inventory-app"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: `2px solid ${errors.projectName ? "#ef4444" : "#e5e7eb"}`,
            borderRadius: "12px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) =>
            (e.target.style.borderColor = errors.projectName
              ? "#ef4444"
              : "#e5e7eb")
          }
        />
        {errors.projectName && (
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#ef4444" }}>
            {errors.projectName}
          </p>
        )}
        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#9ca3af" }}>
          Used as the folder name. Lowercase, no spaces (use hyphens).
        </p>
      </div>

      {/* App Name */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 700,
            color: "#374151",
            marginBottom: "8px",
          }}
        >
          App Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          value={data.appName || ""}
          onChange={(e) => onChange({ appName: e.target.value })}
          placeholder="e.g. StockMaster Pro"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: `2px solid ${errors.appName ? "#ef4444" : "#e5e7eb"}`,
            borderRadius: "12px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) =>
            (e.target.style.borderColor = errors.appName
              ? "#ef4444"
              : "#e5e7eb")
          }
        />
        {errors.appName && (
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#ef4444" }}>
            {errors.appName}
          </p>
        )}
        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#9ca3af" }}>
          This name appears in the sidebar and appbar of your app.
        </p>
      </div>

      {/* Font Picker */}
      <div style={{ marginBottom: "32px" }}>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 700,
            color: "#374151",
            marginBottom: "8px",
          }}
        >
          App Font <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            value={fontSearch}
            onChange={(e) => setFontSearch(e.target.value)}
            placeholder="Search fonts..."
            style={{
              width: "100%",
              padding: "10px 16px 10px 38px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "8px",
            maxHeight: "200px",
            overflowY: "auto",
            padding: "4px",
          }}
        >
          {filtered.map((font) => (
            <button
              key={font}
              onClick={() => onChange({ font })}
              style={{
                padding: "12px 10px",
                border: `2px solid ${data.font === font ? "#6366f1" : "#e5e7eb"}`,
                borderRadius: "10px",
                background: data.font === font ? "#eff6ff" : "#fff",
                cursor: "pointer",
                fontFamily: font,
                fontSize: "13px",
                fontWeight: 600,
                color: data.font === font ? "#6366f1" : "#374151",
                boxShadow:
                  data.font === font
                    ? "0 0 0 3px rgba(99,102,241,0.15)"
                    : "none",
                transition: "all 0.15s",
              }}
            >
              {font}
            </button>
          ))}
        </div>
        {errors.font && (
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#ef4444" }}>
            {errors.font}
          </p>
        )}
      </div>

      {/* ── Color Theme Picker ── */}
      {/* <div style={{ marginBottom: "32px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "12px" }}>
          App Color Theme <span style={{ color: "#ef4444" }}>*</span>
        </label>

        {/* Mode Toggle */}
      {/* <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["single", "gradient"].map((mode) => (
          <button
            key={mode}
            onClick={() => setColorMode(mode)}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "2px solid",
              borderColor: colorMode === mode ? "#6366f1" : "#e5e7eb",
              background: colorMode === mode ? "#eff6ff" : "#fff",
              color: colorMode === mode ? "#6366f1" : "#6b7280",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.15s",
              textTransform: "capitalize",
            }}
          >
            {mode === "single" ? "🎨 Single Color" : "🌈 Gradient"}
          </button>
        ))}
      </div> */}

      {/* Single Color */}
      {/* {colorMode === "single" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {PRESET_SINGLES.map((p) => (
              <button
                key={p.color}
                onClick={() => selectSingle(p.color)}
                title={p.name}
                style={{
                  height: "44px",
                  borderRadius: "12px",
                  background: p.color,
                  border: `3px solid ${data.theme?.color === p.color && data.theme?.type === "single" ? "#111827" : "transparent"}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow:
                    data.theme?.color === p.color &&
                    data.theme?.type === "single"
                      ? `0 0 0 3px ${p.color}55`
                      : "0 2px 6px rgba(0,0,0,0.15)",
                  position: "relative",
                }}
              >
                {data.theme?.color === p.color &&
                  data.theme?.type === "single" && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </span>
                  )}
              </button>
            ))}
          </div>
         
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "#f9fafb",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
            >
              Custom:
            </span>
            <input
              type="color"
              value={customSingle}
              onChange={(e) => setCustomSingle(e.target.value)}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                padding: 0,
                background: "none",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                color: "#6b7280",
                fontFamily: "monospace",
              }}
            >
              {customSingle}
            </span>
            <button
              onClick={applyCustomSingle}
              style={{
                marginLeft: "auto",
                padding: "6px 16px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )} */}

      {/* Gradient */}
      {/* {colorMode === "gradient" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {PRESET_GRADIENTS.map((g) => {
              const isSelected =
                data.theme?.type === "gradient" &&
                data.theme?.from === g.from &&
                data.theme?.to === g.to;
              return (
                <button
                  key={g.name}
                  onClick={() => selectGradient(g.from, g.to)}
                  title={g.name}
                  style={{
                    height: "48px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg,${g.from},${g.to})`,
                    border: `3px solid ${isSelected ? "#111827" : "transparent"}`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: isSelected
                      ? `0 0 0 3px ${g.from}55`
                      : "0 2px 6px rgba(0,0,0,0.15)",
                    position: "relative",
                  }}
                >
                  {isSelected && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "#f9fafb",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
            >
              Custom:
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="color"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                {customFrom}
              </span>
            </div>
            <span style={{ fontSize: "16px", color: "#9ca3af" }}>→</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="color"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                {customTo}
              </span>
            </div>
           
            <div
              style={{
                width: "60px",
                height: "28px",
                borderRadius: "8px",
                background: `linear-gradient(135deg,${customFrom},${customTo})`,
                border: "1px solid #e5e7eb",
              }}
            />
            <button
              onClick={applyCustomGradient}
              style={{
                marginLeft: "auto",
                padding: "6px 16px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )} */}

      {/* {errors.theme && (
        <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#ef4444" }}>
          {errors.theme}
        </p>
      )} */}

      {/* Live Theme + Font Preview */}
      {data.theme && (
        <div
          style={{
            marginTop: "16px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Mock appbar */}
          <div
            style={{
              background: themeBg,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: data.font || "Inter",
                fontWeight: 800,
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {data.appName || "Your App"}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </div>
          </div>
          {/* Mock body */}
          <div
            style={{
              background: "#f9fafb",
              padding: "16px 20px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: "8px 18px",
                background: themeBg,
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontFamily: data.font || "Inter",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "default",
              }}
            >
              Primary Button
            </button>
            <button
              style={{
                padding: "8px 18px",
                background: "transparent",
                color:
                  data.theme?.type === "single"
                    ? data.theme.color
                    : data.theme?.from,
                border: `2px solid ${data.theme?.type === "single" ? data.theme.color : data.theme?.from}`,
                borderRadius: "8px",
                fontFamily: data.font || "Inter",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "default",
              }}
            >
              Outline Button
            </button>
            <span
              style={{
                fontFamily: data.font || "Inter",
                fontSize: "13px",
                fontWeight: 600,
                background: themeBg,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Colored Text
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleNext}
        style={{
          width: "100%",
          padding: "14px",
          background: data.theme
            ? themeBg
            : "linear-gradient(135deg,#6366f1,#8b5cf6)",
          color: "#fff",
          border: "none",
          borderRadius: "14px",
          fontWeight: 700,
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
        }}
      >
        Next: Choose Template →
      </button>
    </div>
  );
}

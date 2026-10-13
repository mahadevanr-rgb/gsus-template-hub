import { useState, useRef, useEffect, useCallback } from "react";
import Menu from "./Menu";

/**
 * Reusable ContextMenu component
 * Listens for onContextMenu on children, prevents default locally, calculates boundary-safe position
 */
export default function ContextMenu({
  children,
  items = [
    { id: "inspect", label: "Inspect Properties", shortcut: "⌥⌘I" },
    { id: "copy", label: "Copy Component JSX", shortcut: "⌘C" },
    { id: "duplicate", label: "Duplicate Entry", shortcut: "⌘D" },
    { type: "separator" },
    { id: "share", label: "Share Link", shortcut: "⇧⌘S" },
    { id: "archive", label: "Archive Resource", shortcut: "⌘E" },
    { type: "separator" },
    { id: "delete", label: "Remove from Canvas", danger: true, shortcut: "⌫" },
  ],
  onSelect = null,
  disabled = false,
  className = "",
}) {
  const [coords, setCoords] = useState(null);
  const menuRef = useRef(null);

  const handleClose = useCallback(() => {
    setCoords(null);
  }, []);

  const handleContextMenu = (e) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Viewport boundary clamping
    const menuWidth = 260;
    const menuHeight = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const x = mouseX + menuWidth > windowWidth ? windowWidth - menuWidth - 12 : mouseX;
    const y = mouseY + menuHeight > windowHeight ? windowHeight - menuHeight - 12 : mouseY;

    setCoords({ x, y });
  };

  useEffect(() => {
    if (!coords) return;

    function handleMouseDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [coords, handleClose]);

  const handleItemSelect = (item) => {
    handleClose();
    if (onSelect) onSelect(item);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`relative inline-block w-full ${className}`}
    >
      {children}

      {coords && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            zIndex: 60,
          }}
          className="animate-in fade-in zoom-in-95 duration-100"
        >
          <Menu items={items} onSelect={handleItemSelect} />
        </div>
      )}
    </div>
  );
}

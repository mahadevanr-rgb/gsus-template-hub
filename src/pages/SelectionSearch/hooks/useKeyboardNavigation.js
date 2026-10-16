import { useEffect, useState } from "react";

export default function useKeyboardNavigation(items = []) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        setIndex((prev) => Math.min(prev + 1, items.length - 1));
      }

      if (e.key === "ArrowUp") {
        setIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [items.length]);

  return {
    activeIndex: index,
    setActiveIndex: setIndex,
  };
}

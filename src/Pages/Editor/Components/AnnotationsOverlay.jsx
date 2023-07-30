import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Highlight from "../Modules/Highlight";

export default function EditorAnnotationsOverlay() {
  const [hoveredEl, setHoveredEl] = useState();
  const [highlights, setHighlights] = useState([]);

  const { quill, editor, contentLoading } = useEditor();

  useEffect(
    (_) => {
      if (!quill || contentLoading) return;

      const lineHoverHandler = (e) => {
        const target = e.target;

        if (
          !editor.contains(target) ||
          target.isSameNode(hoveredEl) ||
          ["ql-clipboard", "ql-cursor"].some((v) =>
            target.classList.contains(v),
          )
        )
          return;

        setHoveredEl(target);
      };

      window.addEventListener("mousemove", lineHoverHandler);

      return (_) => window.removeEventListener("mousemove", lineHoverHandler);
    },
    [quill, contentLoading],
  );

  useEffect(
    (_) => {
      if (!hoveredEl) return;

      setHighlights([hoveredEl]);
    },
    [hoveredEl],
  );

  return (
    <div className="pointer-events-none absolute h-full w-full">
      {highlights.map((el, i) => {
        const lineIndex = [...editor.querySelectorAll("p")].findIndex((line) =>
          line.contains(el),
        );

        return (
          <Highlight parentEl={el} lineIndex={lineIndex} key={lineIndex} />
        );
      })}
    </div>
  );
}

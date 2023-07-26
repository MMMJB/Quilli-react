import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import LineHighlight from "../Modules/LineHighlight";

export default function EditorAnnotationsOverlay() {
  const [lineHighlights, setLineHighlights] = useState([]);

  const { quill, editor, contentLoading } = useEditor();

  const updateLineHighlights = (_) => {
    setLineHighlights(
      Array.from([...editor.querySelectorAll("p")], (el, i) => {
        return { parent: el, key: Math.random() }; // ! CHANGE THIS
      }),
    );
  };

  useEffect(
    (_) => {
      if (!quill || contentLoading) return;

      const mutationObserver = new MutationObserver((_) => {
        updateLineHighlights();
      });

      mutationObserver.observe(editor.querySelector(".ql-editor"), {
        childList: true,
      });

      updateLineHighlights();

      return (_) => mutationObserver.disconnect();
    },
    [quill, contentLoading],
  );

  return (
    <div className="pointer-events-none absolute h-full w-full">
      {lineHighlights.map((h) => {
        return <LineHighlight key={h.key} parentEl={h.parent} />;
      })}
    </div>
  );
}

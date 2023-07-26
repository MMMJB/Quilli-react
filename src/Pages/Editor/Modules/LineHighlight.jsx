import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

export default function LineHighlight({ parentEl }) {
  const [pos, setPos] = useState([0, 0]);
  const [size, setSize] = useState([0, 0]);

  const { editor } = useEditor();

  useEffect((_) => {
    console.log("It's alive!!!");

    const startingBox = parentEl.getBoundingClientRect();
    const trueParentBox = editor.getBoundingClientRect();

    setPos([startingBox.x - trueParentBox.x, startingBox.y - trueParentBox.y]);

    const observer = new ResizeObserver((entries) => {
      const newBox = entries[0].contentRect;

      setSize([newBox.width, newBox.height]);
    });

    observer.observe(parentEl);

    return (_) => observer.disconnect();
  }, []);

  return (
    <span
      className={`absolute block bg-red-500/50`}
      style={{
        left: `calc(${pos[0]}px + 1in)`,
        top: `calc(${pos[1]}px + 1in)`,
        width: `${size[0]}px`,
        height: `${size[1]}px`,
      }}
    ></span>
  );
}

import React, { useState, useEffect } from "react";

import Quill from "quill";

import { useEditor } from "../../../Contexts/EditorContext";

export default function Highlight({ parentEl, lineIndex }) {
  const [pos, setPos] = useState([0, 0]);
  const [textContent, setTextContent] = useState("");
  const [index, setIndex] = useState();
  const [format, setFormat] = useState({});

  const { editor, quill } = useEditor();

  useEffect((_) => {
    if (!editor || !quill) return;

    const i = quill.getIndex(Quill.find(parentEl));
    const line = editor.querySelectorAll("p")[lineIndex];

    setIndex(i);

    const startingBox = line.getBoundingClientRect();
    const trueParentBox = editor.getBoundingClientRect();

    setPos([startingBox.x - trueParentBox.x, startingBox.y - trueParentBox.y]);

    const resizeObserver = new ResizeObserver((_) => {
      if (parentEl.innerText !== textContent && parentEl.innerText !== "\n")
        setTextContent(parentEl.innerText);
    });

    resizeObserver.observe(parentEl);

    return (_) => resizeObserver.disconnect();
  }, []);

  useEffect(
    (_) => {
      if (index == undefined) return;

      const f = quill.getFormat(index, 1);

      setFormat({
        fontSize: f["size"] || "12px",
        fontFamily: f["font"] || "var(--helvetica)",
      });
    },
    [index],
  );

  return (
    <span
      className={`absolute block max-w-[6.5in] whitespace-normal rounded-md text-transparent ${
        textContent !== "" ? "outline" : ""
      } outline-1 outline-brand-lgt`}
      style={{
        left: `calc(${pos[0]}px + 1in)`,
        top: `calc(${pos[1]}px + 1in)`,
        ...format,
      }}
    >
      {textContent}
    </span>
  );
}

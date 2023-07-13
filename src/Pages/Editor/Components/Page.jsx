import React, { useState, useEffect, useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

export default function EditorPage() {
  const [wrapper, setWrapper] = useState();

  const { quill, setQuill, format } = useEditor();

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    setWrapper(wrapper);

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor);
    setQuill(q);
  }, []);

  return (
    <div className="mt-3 inline-block">
      <div
        onClick={(_) => quill?.focus()}
        ref={wrapperRef}
        className="h-[11in] w-[8.5in] cursor-text rounded-[4px] bg-[#FFFFFD] p-[1in] shadow-default"
      ></div>
    </div>
  );
}

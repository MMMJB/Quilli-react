import React, { useState, useEffect, useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

const Size = Quill.import("attributors/style/size");
Size.whitelist = Array.from({ length: 11 }, (_, i) => `${i * 6}px`).slice(1);
Quill.register(Size, true);

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
    q.focus();
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

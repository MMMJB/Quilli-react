import React, { useState, useEffect, useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

const Size = Quill.import("attributors/style/size");
Size.whitelist = Array.from({ length: 11 }, (_, i) => `${i * 6}px`).slice(1);
Quill.register(Size, true);

export default function EditorPage() {
  const { quill, pageColor, editor } = useEditor();

  const wrapperRef = useCallback(
    (wrapper) => {
      if (!wrapper || !editor) return;
      wrapper.innerHTML = "";

      wrapper.append(editor);
    },
    [editor],
  );

  return (
    <div className="mt-3 inline-block">
      <div
        id="PAGE-WRAPPER"
        onClick={(_) => quill?.focus()}
        ref={wrapperRef}
        className="h-[11in] w-[8.5in] cursor-text rounded-[4px] p-[1in] shadow-default"
        style={{ backgroundColor: pageColor }}
      ></div>
    </div>
  );
}

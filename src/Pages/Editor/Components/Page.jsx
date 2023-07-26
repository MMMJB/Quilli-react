import React, { useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import EditorAnnotationsOverlay from "./AnnotationsOverlay";

import initializeQuill from "../../../Utils/quill-config";
initializeQuill();

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
    <div className="relative mt-3 inline-block">
      <EditorAnnotationsOverlay />
      <div
        id="PAGE-WRAPPER"
        spellCheck="false"
        onClick={(_) => quill?.focus()}
        ref={wrapperRef}
        className="mb-3 h-[11in] w-[8.5in] cursor-text rounded-[4px] p-[1in] shadow-default"
        style={{ backgroundColor: pageColor }}
      ></div>
    </div>
  );
}

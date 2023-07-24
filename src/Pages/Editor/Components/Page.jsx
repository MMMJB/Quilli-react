import React, { useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

import fonts from "../../../Utils/fonts";

const Font = Quill.import("formats/font");
Font.whitelist = Array.from(fonts, (f) => f.toLowerCase().replaceAll(" ", "-"));
Quill.register(Font, true);

const customStyles = document.createElement("style");
document.head.appendChild(customStyles);
const sheet = customStyles.sheet;

Font.whitelist.forEach((f) => {
  sheet.insertRule(`.ql-font-${f} {font-family:var(--${f})}`, 0);
});

["center", "right", "justify"].forEach((a) => {
  sheet.insertRule(`.ql-align-${a} {text-align: ${a}}`);
});

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
        spellCheck="false"
        onClick={(_) => quill?.focus()}
        ref={wrapperRef}
        className="mb-3 h-[11in] w-[8.5in] cursor-text rounded-[4px] p-[1in] shadow-default"
        style={{ backgroundColor: pageColor }}
      ></div>
    </div>
  );
}

import React from "react";

export default function EditorToolbarInput({ defaultValue }) {
  return (
    <li>
      <input
        type="number"
        defaultValue={defaultValue}
        className="block h-5 w-5 rounded-sm border-[1px] border-gray-border text-center font-roboto text-xs text-editor-lgt [direction:ltr] focus-visible:outline-none"
      />
    </li>
  );
}

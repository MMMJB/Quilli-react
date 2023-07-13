import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Icon from "../../../Components/Icon";

export default function EditorToolbarColorInput({ data }) {
  const [selectedColor, setSelectedColor] = useState(data.default);
  const [active, setActive] = useState(false);

  const { quill, format, changeFormat } = useEditor();

  useEffect(
    (_) => {
      if (!quill || !format) return;

      if (format.hasOwnProperty(data.targetFormat)) {
        setActive(true);
        setSelectedColor(format[data.targetFormat]);
      } else {
        setActive(false);
        setSelectedColor(data.default);
      }
    },
    [quill, format],
  );

  useEffect(
    (_) => {
      if (!quill) return;

      if (
        data.hasOwnProperty("targetFormat") &&
        (data.toggleable ? active : true)
      )
        changeFormat(data.targetFormat, selectedColor);
      else if (data.toggleable && !active)
        changeFormat(data.targetFormat, false);
    },
    [quill, active, selectedColor],
  );

  return (
    <li
      onClick={(_) => {
        if (data.toggleable) setActive((p) => !p);
      }}
      className={`relative ${
        data.toggleable
          ? `${
              active
                ? "before:rounded-md before:border-[1px] before:border-brand-lgt before:opacity-25"
                : "before:hidden before:rounded-sm before:bg-black/[.03] before:hover:block"
            } cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:aspect-square before:w-[calc(1rem+100%)] before:-translate-x-1/2 before:-translate-y-1/2`
          : ""
      }`}
    >
      <div
        className={
          data.toggleable && active
            ? "[filter:sepia(1)_hue-rotate(125deg)]"
            : ""
        }
      >
        <Icon icon={data.icon} size={14} />
      </div>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="absolute bottom-0 right-0 h-2 w-2 translate-x-1/4 translate-y-1/4 cursor-pointer rounded-full outline outline-1 outline-gray-border"
        style={{ backgroundColor: selectedColor }}
      />
    </li>
  );
}

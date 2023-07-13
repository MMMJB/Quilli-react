import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Icon from "../../../Components/Icon";

export default function EditorToolbarButton({ data }) {
  const [highlighted, setHighlighted] = useState(false);

  const { quill, format, changeFormat } = useEditor();

  const inactiveStyles =
    "before:bg-black/[.03] before:hover:block before:hidden before:rounded-sm";
  const activeStyles =
    "ACTIVE [filter:sepia(1)_hue-rotate(125deg)] before:border-[1px] before:border-brand-lgt before:rounded-md before:opacity-25";

  useEffect(
    (_) => {
      if (!quill) return;

      setHighlighted(
        data.toggleable
          ? format[data.targetFormat] || false
          : data.hasOwnProperty("formatValue")
          ? format[data.targetFormat] == data.formatValue
          : false,
      );
    },
    [format],
  );

  const clickHandler = (_) => {
    changeFormat(
      data.targetFormat,
      data.hasOwnProperty("formatValue") ? data.formatValue : !highlighted,
    );
    if (data.toggleable) setHighlighted((p) => !p);
  };

  return (
    <li
      onClick={clickHandler}
      className={`${
        highlighted ? activeStyles : inactiveStyles
      } relative cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:aspect-square before:w-[calc(1rem+100%)] before:-translate-x-1/2 before:-translate-y-1/2`}
    >
      <Icon icon={data.icon} size={data.iconSize || 12} />
    </li>
  );
}
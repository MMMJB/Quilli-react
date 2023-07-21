import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Icon from "../../../Components/Icon";

export default function EditorToolbarInput({ data }) {
  const [size, setSize] = useState(data.default);

  const { quill, format, changeFormat } = useEditor();

  const changeSize = (amount) => {
    if (size + amount > data.max) return setSize(data.max);
    else if (size + amount < data.min) return setSize(data.min);

    setSize((p) => p + amount);
  };

  useEffect(
    (_) => {
      if (!quill) return;

      changeFormat(data.targetFormat, `${size}px`, "user");
    },
    [quill, size],
  );

  useEffect(
    (_) => {
      if (!quill || !format) return;

      if (!format[data.targetFormat]) setSize(12);
    },
    [quill, format],
  );

  return (
    <li>
      <div
        onClick={(_) => changeSize(data.stepSize)}
        className="flex cursor-pointer justify-center"
      >
        <Icon icon={25} size={7} className="mx-auto cursor-pointer" />
      </div>
      <span className="grid h-5 w-5 place-items-center rounded-sm border-[1px] border-gray-border text-center font-roboto text-xs text-editor-lgt [direction:ltr] focus-visible:outline-none">
        {size}
      </span>
      <div
        onClick={(_) => changeSize(-data.stepSize)}
        className="flex cursor-pointer justify-center"
      >
        <Icon icon={17} size={7} className="mx-auto cursor-pointer" />
      </div>
    </li>
  );
}

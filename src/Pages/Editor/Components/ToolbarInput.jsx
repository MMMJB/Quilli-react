import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Icon from "../../../Components/Icon";

export default function EditorToolbarInput({
  data,
  "data-tooltip-id": tooltipId,
  "data-tooltip-content": tooltipContent,
}) {
  const [value, setValue] = useState(data.default);

  const { quill, format, changeFormat } = useEditor();

  const setValueWithUpdate = (newValue) => {
    setValue(newValue);
    changeFormat(data.targetFormat, `${newValue}px`, "user");
  };

  const changeSize = (amount) => {
    if (value + amount > data.max) return setValueWithUpdate(data.max);
    else if (value + amount < data.min) return setValueWithUpdate(data.min);

    setValueWithUpdate(value + amount);
  };

  useEffect(
    (_) => {
      if (!quill || !format) return;

      if (!format[data.targetFormat]) setValue(data.default);
      else if (parseInt(format[data.targetFormat]) !== value)
        setValue(parseInt(format[data.targetFormat]));
    },
    [quill, format],
  );

  return (
    <li
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="top"
      data-tooltip-delay-show={1000}
    >
      <div
        onClick={(_) => changeSize(data.stepSize)}
        className="flex cursor-pointer justify-center"
      >
        <Icon icon={25} size={7} className="mx-auto cursor-pointer" />
      </div>
      <span className="grid h-5 w-5 place-items-center rounded-sm border-[1px] border-gray-border text-center font-roboto text-xs text-editor-lgt [direction:ltr] focus-visible:outline-none">
        {value}
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

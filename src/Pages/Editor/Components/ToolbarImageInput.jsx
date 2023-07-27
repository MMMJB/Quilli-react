import React from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarImageInput({
  data,
  "data-tooltip-id": tooltipId,
  "data-tooltip-content": tooltipContent,
}) {
  return (
    <li
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="top"
      data-tooltip-delay-show={1000}
      className="relative cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:hidden before:aspect-square before:w-[calc(1rem+100%)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-black/[.03] before:hover:block"
    >
      <Icon icon={data.icon} size={14} />
    </li>
  );
}

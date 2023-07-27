import React from "react";

import Icon from "../../../Components/Icon";

import { useEditor } from "../../../Contexts/EditorContext";

export default function EditorToolbarModal({
  data,
  "data-tooltip-id": tooltipId,
  "data-tooltip-content": tooltipContent,
}) {
  const { setModalOpen, setModalContents } = useEditor();

  const handleClick = (_) => {
    setModalContents(data.children);
    setModalOpen(true);
  };

  return (
    <li
      onClick={handleClick}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="top"
      data-tooltip-delay-show={1000}
    >
      <div className="relative grid h-5 w-5 cursor-pointer place-items-center rounded-sm border-[1px] border-gray-border">
        <Icon icon={data.icon} size={12} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-border"></div>
      </div>
    </li>
  );
}

import React from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarModal({ icon }) {
  return (
    <li className="relative">
      <div className="relative grid h-5 w-5 cursor-pointer place-items-center rounded-sm border-[1px] border-gray-border">
        <Icon icon={icon} size={12} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-border"></div>
      </div>
    </li>
  );
}

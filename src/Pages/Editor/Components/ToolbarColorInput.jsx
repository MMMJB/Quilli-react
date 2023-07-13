import React, { useState } from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarColorInput({ data }) {
  const [selectedColor, setSelectedColor] = useState(data.default);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <li className="relative cursor-pointer">
      <span
        className="absolute bottom-0 right-0 aspect-square w-2 translate-x-1/4 translate-y-1/4 rounded-full outline outline-1 outline-gray-border"
        style={{ backgroundColor: selectedColor }}
      ></span>
      <Icon icon={data.icon} size={14} />
    </li>
  );
}

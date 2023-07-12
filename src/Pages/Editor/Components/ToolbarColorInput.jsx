import React, { useState } from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarColorInput({ icon, defaultValue }) {
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <li className="relative cursor-pointer">
      <span
        className="absolute bottom-0 right-0 aspect-square w-2 translate-x-1/4 translate-y-1/4 rounded-full outline outline-1 outline-gray-border"
        style={{ backgroundColor: selectedColor }}
      ></span>
      <Icon icon={icon} size={14} />
    </li>
  );
}

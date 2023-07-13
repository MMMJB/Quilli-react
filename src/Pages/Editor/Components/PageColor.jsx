import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Icon from "../../../Components/Icon";

export default function EditorPageColor() {
  const { pageColor, setPageColor } = useEditor();

  const [selectedColor, setSelectedColor] = useState(pageColor);

  useEffect(
    (_) => {
      setPageColor(selectedColor);
    },
    [selectedColor],
  );

  return (
    <li className="relative">
      <Icon icon={15} size={14} />
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

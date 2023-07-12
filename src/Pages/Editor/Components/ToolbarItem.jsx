import React, { useState } from "react";

import Icon from "../../../Components/Icon";
import EditorToolbarButton from "./ToolbarButton";
import EditorToolbarInput from "./ToolbarInput";
import EditorToolbarModal from "./ToolbarModal";
import EditorToolbarColorInput from "./ToolbarColorInput";
import EditorToolbarImageInput from "./ToolbarImageInput";
import EditorToolbarDivider from "./ToolbarDivider";

const ENABLE_DIVIDERS = false;

export default function EditorToolbarItem({ icon, items, index }) {
  const [active, setActive] = useState(false);

  return (
    <li className="relative [direction:rtl]" style={{ zIndex: 4 - index }}>
      <div
        onClick={(_) => setActive((p) => !p)}
        id="POPOUT-COVER"
        className={`${
          active ? "active" : ""
        } relative my-6 w-max cursor-pointer rounded-full bg-white p-4 shadow-secondary transition-all`}
      >
        <Icon icon={icon} size={16} />
      </div>
      <div
        id="POPOUT-WRAPPER"
        className="absolute top-1/2 -z-10 mr-6 flex h-[101%] -translate-y-1/2 items-center overflow-x-hidden"
      >
        <ul
          id="POPOUT"
          className="flex h-10 min-w-[220px] flex-row-reverse items-center gap-5 rounded-l-full bg-[#FCFCFC] py-2 pl-6 pr-9 shadow-secondary transition-all duration-[250ms] ease-in-out"
        >
          {items.map((item) => {
            return item.type == "modal" ? (
              <EditorToolbarModal icon={item.icon} />
            ) : item.type == "button" ? (
              <EditorToolbarButton
                icon={item.icon}
                iconSize={item.size || 12}
              />
            ) : item.type == "value" ? (
              <EditorToolbarInput defaultValue={12} />
            ) : item.type == "color" ? (
              <EditorToolbarColorInput
                icon={item.icon}
                defaultValue={item.default}
              />
            ) : item.type == "image" ? (
              <EditorToolbarImageInput icon={item.icon} />
            ) : ENABLE_DIVIDERS ? (
              <EditorToolbarDivider />
            ) : (
              ""
            );
          })}
        </ul>
      </div>
    </li>
  );
}

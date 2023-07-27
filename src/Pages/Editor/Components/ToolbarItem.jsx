import React, { useState } from "react";

import Icon from "../../../Components/Icon";
import { Tooltip } from "react-tooltip";

export default function EditorToolbarItem({ icon, items, index }) {
  const [active, setActive] = useState(false);

  return (
    <li className="[direction:rtl]" style={{ zIndex: index }}>
      <div
        onClick={(_) => setActive((p) => !p)}
        id="POPOUT-COVER"
        className={`${
          active ? "active" : ""
        } relative z-10 my-6 w-max cursor-pointer rounded-full bg-white p-4 shadow-secondary transition-all`}
      >
        <Icon icon={icon} size={16} />
      </div>
      <div
        id="POPOUT-WRAPPER"
        className="-mb-[72px] mr-6 flex -translate-y-[72px] items-center py-[5px] pl-2"
      >
        <ul
          onClick={(e) => setActive(!e.target.classList.contains("ACTIVE"))}
          id="POPOUT"
          className="flex h-10 min-w-[220px] flex-row-reverse items-center gap-5 rounded-l-full bg-[#FCFCFC] py-2 pl-6 pr-9 transition-all duration-[250ms] ease-in-out"
        >
          {items.map((item) => {
            return item.elm;
          })}
        </ul>
        {items.map((item, i) => {
          return (
            <Tooltip
              id={item.tooltip.toLowerCase().replaceAll(" ", "")}
              key={i}
            />
          );
        })}
      </div>
    </li>
  );
}

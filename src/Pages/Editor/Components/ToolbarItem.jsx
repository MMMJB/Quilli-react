import React from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarItem({ icon, items }) {
  return (
    <li className="relative [direction:rtl]">
      <div className="relative my-6 w-max cursor-pointer rounded-full bg-white p-4 shadow-secondary transition-all hover:scale-[1.1]">
        <Icon icon={icon} size={16} />
      </div>
      <div className="absolute top-1/2 -z-10 mr-6 flex h-[101%] -translate-y-1/2 items-center overflow-x-hidden">
        <ul className="flex min-w-[220px] flex-row-reverse items-center gap-5 rounded-l-full bg-[#FCFCFC] px-6 py-2 shadow-secondary transition-all duration-[350] ease-in-out">
          {items.map((item, i) => {
            return <li key={i}></li>;
          })}
        </ul>
      </div>
    </li>
  );
}

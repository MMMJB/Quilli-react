import React from "react";

import Icon from "../../../Components/Icon";

export default function EditorToolbarItem({ icon, items }) {
  return (
    <li className="relative [direction:rtl]">
      <div className="w-max p-4 bg-white rounded-full shadow-secondary relative my-6 hover:scale-[1.1] transition-all cursor-pointer">
        <Icon icon={icon} size={16} />
      </div>
      <div className="absolute h-[101%] flex items-center top-1/2 -translate-y-1/2 -z-10 mr-6 overflow-x-hidden">
        <ul className="flex flex-row-reverse items-center min-w-[220px] gap-5 bg-[#FCFCFC] rounded-l-full py-2 px-6 shadow-secondary transition-all duration-[350] ease-in-out"></ul>
      </div>
    </li>
  );
}

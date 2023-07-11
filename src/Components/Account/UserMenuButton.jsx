import React from "react";

export default function UserMenuButton({ icon, text, onClick }) {
  return (
    <li
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 hover:bg-black/[.035]"
    >
      <button className="material-symbols-outlined text-lg/[1px] text-gray-icon">
        {icon}
      </button>
      <button className="text-xs text-editor-lgt">{text}</button>
    </li>
  );
}

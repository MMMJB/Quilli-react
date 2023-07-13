import React, { useState } from "react";

import colors from "../../../Utils/colors";

export default function ColorPopup({ active, pos, defaultValue }) {
  const [currentColor, setCurrentColor] = useState(defaultValue);

  return active ? (
    <div
      className={`fixed z-50 flex flex-col items-center gap-[3px] rounded-lg bg-white p-[9px] shadow-default`}
      style={{ left: `${pos[0]}px`, top: `${pos[1]}px` }}
    >
      {colors.map((row) => {
        return (
          <ul className="flex flex-row-reverse gap-[3px]">
            {row.map((color, i) => {
              return (
                <li
                  className={`h-4 w-4 cursor-pointer rounded-full border-[1px] border-black/5 ${
                    currentColor == color ? "scale-110" : ""
                  }`}
                  key={color}
                  style={{ backgroundColor: color }}
                ></li>
              );
            })}
          </ul>
        );
      })}
    </div>
  ) : (
    ""
  );
}

import React, { useState, useEffect } from "react";

import fonts from "../../../Utils/fonts";

import { useEditor } from "../../../Contexts/EditorContext";

export default function FontModal() {
  const [selectedFont, setSelectedFont] = useState("Helvetica");
  const [previewFont, setPreviewFont] = useState(selectedFont);

  const { quill, format, changeFormat } = useEditor();

  useEffect((_) => {
    if (!quill || !format) return;

    if (!format.font) setSelectedFont("Helvetica");
    else setSelectedFont(varToFont(format.font));
  }, []);

  const fontToVar = (font, shorten) =>
    shorten
      ? font.toLowerCase().replaceAll(" ", "-")
      : `var(--${font.toLowerCase().replaceAll(" ", "-")})`;

  const varToFont = (v) =>
    fonts[
      Array.from(fonts, (f) => f.toLowerCase()).indexOf(
        v.toLowerCase().replaceAll("-", " "),
      )
    ];

  const hoverHandler = (font) => {
    if (previewFont !== font) setPreviewFont(font);
  };

  const selectNewFont = (_) => {
    if (!quill) return;

    changeFormat("font", fontToVar(previewFont, true));
    setSelectedFont(previewFont);
  };

  return (
    <div className="flex w-[600px] max-w-[50%] flex-col rounded-lg bg-white shadow-xl">
      <div className="flex h-20 w-full items-center rounded-t-lg bg-white px-8 py-6 text-xl text-editor">
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: fontToVar(previewFont) }}
        >
          The quick brown fox jumps over the lazy dog.
        </span>
      </div>
      <div className="border-gra-border flex gap-3 border-y-[1px] bg-gray-50 px-4 py-3">
        <button className="flex">
          <span className="material-symbols-outlined text-gray-icon">
            search
          </span>
        </button>
        <input
          className="w-full bg-transparent text-sm text-editor-lgt"
          placeholder="Search fonts"
        />
      </div>
      <ul className="flex max-h-60 flex-col overflow-y-auto pt-2">
        {fonts.map((font, i) => {
          return (
            <li
              onMouseOver={(_) => hoverHandler(font)}
              onClick={selectNewFont}
              style={{
                fontFamily: fontToVar(font),
              }}
              className={`${
                selectedFont == font ? "" : "hover:bg-editor-lgt/5"
              } flex cursor-pointer items-center px-4 py-2 text-sm text-editor-lgt`}
              key={i}
            >
              <span className="flex-grow">{font}</span>
              {selectedFont == font && (
                <span className="h-2 w-2 rounded-full bg-brand-lgt"></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

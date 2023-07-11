import React, { useState, useEffect, useCallback } from "react";

import Quill from "quill";

export default function Doc({ onClick, data }) {
  const [hasRendered, setHasRendered] = useState(false);

  const Delta = Quill.import("delta");

  const title = data.title;
  const type = data.type;
  const meter = data.meter;
  const content = new Delta(data.content);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const preview = document.createElement("div");
    wrapper.append(preview);

    const q = new Quill(preview);
    q.disable();
    q.setContents(content || "Failed to load document preview.");
  });

  return (
    <li
      onClick={onClick}
      className="flex h-80 w-52 cursor-pointer flex-col rounded-md border-[1px] border-gray-border/50 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="h-[min(max-content, 11in)] max-h-[80%] w-[8.5in] flex-grow origin-top-left scale-[.25] p-[1in]">
        <div
          className="h-max max-h-[8.5in] max-w-full overflow-hidden"
          id="PREVIEW"
          ref={wrapperRef}
        ></div>
      </div>
      <div className="text-sans border-t-border-gray-border border-t-[1px] p-3">
        <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm/[16px] font-medium text-editor">
          {title}
        </h4>
        <span className="inline-block text-xs/[14px] text-editor-lgt">{`${
          type || "Poem"
        }${meter ? ` - ${meter}` : ""}`}</span>
      </div>
    </li>
  );
}

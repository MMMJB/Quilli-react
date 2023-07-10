import React, { useState, useEffect, useCallback } from 'react'

import Quill from 'quill'

export default function Doc({onClick, data}) {
    const [hasRendered, setHasRendered] = useState(false);

    const Delta = Quill.import("delta");

    const title = data.title;
    const type = data.type;
    const meter = data.meter;
    const content = new Delta(data.content);

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return;

        wrapper.innerHTML = "";

        const preview = document.createElement("div");
        wrapper.append(preview);

        const q = new Quill(preview);
        q.disable();
        q.setContents(content || "Failed to load document preview.");
    })

    return (
        <li onClick={onClick} className="flex flex-col w-52 h-80 border-gray-border/50 border-[1px] rounded-md shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-[8.5in] h-[min(max-content, 11in)] p-[1in] scale-[.25] max-h-[80%] origin-top-left flex-grow">
                <div className="max-w-full max-h-[8.5in] overflow-hidden h-max" id="PREVIEW" ref={wrapperRef}></div>
            </div>
            <div className="text-sans p-3 border-t-border-gray-border border-t-[1px]">
                <h4 className="text-editor text-sm/[16px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">{title}</h4>
                <span className="inline-block text-editor-lgt text-xs/[14px]">{`${type || "Poem"}${meter ? ` - ${meter}` : ""}`}</span>
            </div>
        </li>
    )
}

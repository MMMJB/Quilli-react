import React from 'react'

export default function Doc({title, type, meter, onClick}) {
    return (
        <li onClick={onClick} className="flex flex-col w-52 h-80 border-gray-border/50 border-[1px] rounded-md shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-full flex-grow border-b-border-gray-border border-b-[1px] bg-gradient-to-t from-gray-border/10 via-transparent"></div>
            <div className="text-sans p-3">
                <h4 className="text-editor text-sm/[16px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">{title}</h4>
                <span className="inline-block text-editor-lgt text-xs/[14px]">{`${type}${meter ? ` - ${meter}` : ""}`}</span>
            </div>
        </li>
    )
}

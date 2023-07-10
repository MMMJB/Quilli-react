import React from 'react'

export default function UserMenuButton({icon, text, onClick}) {
    return (
        <li onClick={onClick} className="w-full p-4 flex gap-4 items-center rounded-lg cursor-pointer hover:bg-black/[.035]">
            <button className="material-symbols-outlined text-gray-icon text-lg/[1px]">{icon}</button>
            <button className="text-editor-lgt text-xs">{text}</button>
        </li>
    )
}

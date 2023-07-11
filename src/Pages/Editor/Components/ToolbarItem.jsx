import React from 'react'

import Icon from "../../../Components/Icon"

export default function EditorToolbarItem() {
    return (
        <li className="relative [direction:rtl]">
            <div className="w-max p-4 bg-white rounded-full shadow-secondary relative my-6 hover:scale-[1.1] transition-all cursor-pointer">
                <Icon icon={23} size={16} />
            </div>
        </li>
    )
}

import React from 'react'

import AccountButton from '../../../Components/Account/AccountButton'

export default function EditorHeader() {
    return (
        <div className="w-full px-4 py-3 bg-white border-b-gray-border border-[1px] flex gap-4 items-center">
            <img className="cursor-pointer" src="/images/logo_flat.png" alt="Quilli" />
            <div className="flex flex-col mr-auto">
                <input defaultValue="New Document" className="text-lg/[25px] font-sans text-editor focus-visible:outline-none"></input>
                <span className="text-sm/[16px] font-roboto text-editor-lgt font-light cursor-default">Last edited on January 29, 1845</span>
            </div>
            <AccountButton large={true} />
        </div>
    )
}

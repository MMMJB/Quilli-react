import React from 'react'

import EditorHeader from './Components/Header'
import EditorToolbar from './Components/Toolbar'
import EditorPage from './Components/Page'

export default function EditorUI() {
    return (
        <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col bg-[#F0F0F0]">
            <EditorHeader />
            <div className="w-full flex-grow overflow-auto flex">
                <div className="w-max mx-auto">
                    <EditorToolbar />
                    <EditorPage />
                </div>
            </div>
        </div>
    )
}

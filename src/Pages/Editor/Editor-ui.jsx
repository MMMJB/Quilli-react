import React from "react";

import EditorHeader from "./Components/Header";
import EditorToolbar from "./Components/Toolbar";
import EditorPage from "./Components/Page";

export default function EditorUI() {
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col overflow-hidden bg-[#F0F0F0]">
      <EditorHeader />
      <main className="flex w-full flex-grow overflow-auto whitespace-nowrap">
        <div className="mx-auto w-max">
          <EditorToolbar />
          <EditorPage />
        </div>
      </main>
    </div>
  );
}

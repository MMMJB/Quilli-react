import React from "react";

import toolbarItems from "../../../Utils/toolbar-items";

import EditorToolbarItem from "./ToolbarItem";

export default function EditorToolbar() {
  return (
    <div className="inline-block align-top min-w-[300px] h-0 sticky top-6">
      <ul className="mr-9">
        {toolbarItems.map((item, i) => {
          return <EditorToolbarItem icon={item.icon} key={i} />;
        })}
      </ul>
    </div>
  );
}

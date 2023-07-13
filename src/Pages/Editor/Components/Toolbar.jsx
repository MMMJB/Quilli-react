import React from "react";

import toolbarItems from "../../../Utils/toolbar-items";

import EditorToolbarItem from "./ToolbarItem";

export default function EditorToolbar() {
  return (
    <div
      id="TOOLBAR"
      className="sticky top-6 inline-block h-0 min-w-[300px] align-top"
    >
      <ul className="mr-9">
        {toolbarItems.map((item, i) => {
          return (
            <EditorToolbarItem
              icon={item.icon}
              items={item.items}
              index={i}
              key={i}
            />
          );
        })}
      </ul>
    </div>
  );
}

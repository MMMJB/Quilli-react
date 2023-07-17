import React, { useState, useEffect, useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

const Size = Quill.import("attributors/style/size");
Size.whitelist = Array.from({ length: 11 }, (_, i) => `${i * 6}px`).slice(1);
Quill.register(Size, true);

export default function EditorPage() {
  const { quill, pageColor, editor } = useEditor();

  const Inline = Quill.import("blots/inline");
  const Parchment = Quill.import("parchment");

  class WordBlot extends Inline {
    static create() {
      return super.create();
    }

    static formats() {
      return true;
    }
  }

  WordBlot.blotName = "word";
  WordBlot.className = "word";
  WordBlot.tagName = "span";

  Inline.order.push(WordBlot.blotName);

  Quill.register(WordBlot, true);

  const insertIsValid = (insert) => {
    if (!insert) return false;

    return insert.split("").every((char) => char.match(/^[a-z]+$/i));
  };

  useEffect(
    (_) => {
      if (!quill) return;

      // quill.keyboard.bindings[32] = [
      //   {
      //     key: " ",
      //     collapsed: true, // Collapsed selection (selection.length === 0)
      //     format: { word: false },
      //     prefix: /^.+$/, // Preceded by at least one character
      //     handler: (_, context) => {
      //       const preceding = quill.getText().substring(0, context.offset);

      //       const index = preceding.lastIndexOf(" ") + 1;
      //       const length = context.offset - index;

      //       quill.formatText(index, length, "word", true);
      //       quill.format("word", false);

      //       return true;
      //     },
      //   },
      //   {
      //     key: " ",
      //     collapsed: true,
      //     format: { word: true },
      //     prefix: /^.+$/,
      //     handler: (_, context) => {
      //       quill.format("word", false);

      //       return true;
      //     },
      //   },
      // ];

      const handleWordEdit = (delta, oldDelta, source) => {
        if (source !== "user") return;
        console.log(delta);

        const emptyLine = delta.ops.length == 1;

        const insert = emptyLine ? delta.ops[0].insert : delta.ops[1].insert;
        const index = emptyLine ? 0 : delta.ops[0].retain;

        if (!insert) return;

        quill.formatText(index, 1, "word", insertIsValid(insert));
      };

      quill.on("text-change", handleWordEdit);

      return (_) => quill.off("text-change", handleWordEdit);
    },
    [quill],
  );

  const wrapperRef = useCallback(
    (wrapper) => {
      if (!wrapper || !editor) return;
      wrapper.innerHTML = "";

      wrapper.append(editor);
    },
    [editor],
  );

  return (
    <div className="mt-3 inline-block">
      <div
        id="PAGE-WRAPPER"
        onClick={(_) => quill?.focus()}
        ref={wrapperRef}
        className="mb-3 h-[11in] w-[8.5in] cursor-text rounded-[4px] p-[1in] shadow-default"
        style={{ backgroundColor: pageColor }}
      ></div>
    </div>
  );
}

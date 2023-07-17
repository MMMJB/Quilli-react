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
    static create(value) {
      const node = super.create(value);
      node.__id = value;

      return node;
    }

    static formats(domNode) {
      const blot = Parchment.find(domNode);

      if (
        blot &&
        blot.parent &&
        blot.parent.children &&
        blot.parent.children.head !== blot
      )
        return domNode.__id;
    }
  }

  const generateWordId = (_) => `rand-${Math.floor(Math.random() * 1e9)}`;

  WordBlot.blotName = "word";
  WordBlot.className = "word";
  WordBlot.tagName = "span";

  Inline.order.push(WordBlot.blotName);

  Quill.register(WordBlot, true);

  useEffect(
    (_) => {
      if (!quill) return;

      quill.keyboard.bindings[32] = [
        {
          key: " ",
          collapsed: true, // Collapsed selection (selection.length === 0)
          format: { word: false },
          prefix: /^.+$/, // Preceded by at least one character
          handler: (range, context) => {
            const index = context.prefix.lastIndexOf(" ") + 1;
            const length = range.index - index;

            console.log(context.prefix);

            quill.formatText(index, length, "word", generateWordId());
            quill.format("word", false);

            return true;
          },
        },
      ];
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

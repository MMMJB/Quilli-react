import React, { useState, useEffect, useCallback } from "react";

import { useEditor } from "../../../Contexts/EditorContext";

import Quill from "quill";

import fonts from "../../../Utils/fonts";

import onWordHover from "../Modules/Syllables";

const Font = Quill.import("formats/font");
Font.whitelist = Array.from(fonts, (f) => f.toLowerCase().replaceAll(" ", "-"));
Quill.register(Font, true);

const customStyles = document.createElement("style");
document.head.appendChild(customStyles);
const sheet = customStyles.sheet;

Font.whitelist.forEach((f) => {
  sheet.insertRule(`.ql-font-${f} {font-family:var(--${f})}`, 0);
});

["center", "right", "justify"].forEach((a) => {
  sheet.insertRule(`.ql-align-${a} {text-align: ${a}}`);
});

const Size = Quill.import("attributors/style/size");
Size.whitelist = Array.from({ length: 11 }, (_, i) => `${i * 6}px`).slice(1);
Quill.register(Size, true);

export default function EditorPage() {
  const { quill, pageColor, editor } = useEditor();

  const Inline = Quill.import("blots/inline");

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
    return (
      (insert.length > 1
        ? insert.split("").every((char) => char.match(/^[a-z]+$/i))
        : insert.match(/^[a-z]+$/i)) !== null
    );
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

      const handleWordEdit = (delta, _, source) => {
        if (source !== "user") return;

        const emptyLine = delta.ops.length == 1;

        const insert = emptyLine ? delta.ops[0].insert : delta.ops[1].insert;
        const index = emptyLine ? 0 : delta.ops[0].retain;

        if (!insert) return;

        quill.formatText(index, insert.length, "word", insertIsValid(insert));
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
      wrapper.removeEventListener("mousemove", onWordHover);

      wrapper.append(editor);
      wrapper.addEventListener("mousemove", onWordHover);
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

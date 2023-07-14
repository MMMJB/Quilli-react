import React, { useState, useEffect, useContext } from "react";

import Quill from "quill";

const EditorContext = React.createContext();

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [quill, setQuill] = useState();
  const [editor, setEditor] = useState();
  const [format, setFormat] = useState();
  const [pageColor, setPageColor] = useState("#FFFFFD");
  const [loading, setLoading] = useState(true);

  const changeFormat = (property, newValue) => {
    quill.format(property, newValue);
  };

  useEffect(
    (_) => {
      if (!quill) return;

      const handler = (_) => {
        const f = quill.getFormat();
        if (!f.hasOwnProperty("align")) f["align"] = false;

        setFormat(f);
      };

      quill.on("editor-change", handler);

      return (_) => quill.off("editor-change", handler);
    },
    [quill],
  );

  useEffect((_) => {
    const editor = document.createElement("div");
    setEditor(editor);

    const q = new Quill(editor);
    q.disable();
    q.setText("Loading document...");

    setQuill(q);
    setLoading(false);
  }, []);

  const value = {
    quill,
    editor,
    format,
    changeFormat,
    pageColor,
    setPageColor,
  };

  return (
    <EditorContext.Provider value={value}>
      {!loading && children}
    </EditorContext.Provider>
  );
}

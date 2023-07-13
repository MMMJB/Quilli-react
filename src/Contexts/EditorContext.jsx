import React, { useState, useEffect, useContext } from "react";

const EditorContext = React.createContext();

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [quill, setQuill] = useState();
  const [format, setFormat] = useState();
  const [pageColor, setPageColor] = useState("#FFFFFD");

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

  const value = {
    quill,
    setQuill,
    format,
    changeFormat,
    pageColor,
    setPageColor,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

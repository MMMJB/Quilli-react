import React, { useState, useEffect, useReducer, useContext } from "react";

import Quill from "quill";

const initialFormats = {
  bold: false,
  italic: false,
  underline: false,
  align: false,
  font: "Helvetica",
  size: "12px",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, [action.format]: !state[action.format] };
    case "SET":
      return { ...state, [action.format]: action.value };
    case "SETALL":
      return { ...initialFormats, ...action.formats };
    default:
      return state;
  }
};

const EditorContext = React.createContext();

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [quill, setQuill] = useState();
  const [quillContent, setQuillContent] = useState("");
  const [editor, setEditor] = useState();
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [pageColor, setPageColor] = useState("#FFFFFD");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState("");
  const [docTitle, setDocTitle] = useState("");

  const [format, dispatchFormat] = useReducer(reducer, initialFormats);

  const bindingTargets = ["bold", "italic", "underline"];
  const bindings = Object.assign(
    {},
    ...bindingTargets.map((b) => ({
      [b]: {
        collapsed: true,
        handler: (range, context) => {
          dispatchFormat({ type: "TOGGLE", format: b });

          return true;
        },
      },
    })),
  );

  const updateFormat = (_) => {
    dispatchFormat({ type: "SETALL", formats: quill.getFormat() });
  };

  const changeFormat = (property, newValue, source) => {
    quill.format(property, newValue, source || "api");
    updateFormat();
  };

  const handleEdits = (_) => {
    updateFormat();

    setQuillContent(JSON.stringify(quill.getContents().ops));
  };

  useEffect((_) => {
    const editor = document.createElement("div");

    editor.style.setProperty("font-size", "12px");
    editor.style.setProperty("font-family", "var(--helvetica)");
    editor.style.setProperty("text-wrap", "wrap");

    setEditor(editor);

    const q = new Quill(editor, {
      modules: { keyboard: { bindings: bindings } },
    });

    q.disable();
    q.setText("Loading document...");

    setQuill(q);
    setLoading(false);
  }, []);

  const value = {
    quill,
    quillContent,
    contentLoading,
    setContentLoading,
    editor,
    handleEdits,
    format,
    changeFormat,
    updateFormat,
    pageColor,
    setPageColor,
    modalOpen,
    setModalOpen,
    modalContents,
    setModalContents,
    docTitle,
    setDocTitle,
  };

  return (
    <EditorContext.Provider value={value}>
      {!loading && children}
    </EditorContext.Provider>
  );
}

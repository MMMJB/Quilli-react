import React, { useState, useEffect, useReducer, useContext } from "react";

import Quill from "quill";

const initialFormats = {
  bold: false,
  italic: false,
  underline: false,
  align: false,
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
  const [pageColor, setPageColor] = useState("#FFFFFD");

  const [format, dispatchFormat] = useReducer(reducer, initialFormats);

  const bindingTargets = ["bold", "italic", "underline"];
  const bindings = Object.assign(
    {},
    ...bindingTargets.map((b) => ({
      [b]: {
        handler: (range, context) => {
          if (range.length > 0) return;

          dispatchFormat({ type: "TOGGLE", format: b });

          return true;
        },
      },
    })),
  );

  const changeFormat = (property, newValue) => {
    quill.format(property, newValue);
  };

  const handleEdits = (_) => {
    const f = quill.getFormat();

    dispatchFormat({ type: "SETALL", formats: f });

    setQuillContent(quill.getText());
  };

  useEffect((_) => {
    const editor = document.createElement("div");
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
    editor,
    handleEdits,
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

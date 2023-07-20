import React, { useState, useCallback } from "react";

import { useAuth } from "../../../Contexts/AuthContext";

import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../Utils/firebase-config";

import Quill from "quill";

export default function Doc({ onClick, data }) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [docExists, setDocExists] = useState(true);
  const [error, setError] = useState();

  const { currentUser } = useAuth();

  const Delta = Quill.import("delta");

  const title = data.title;
  const type = data.type;
  const meter = data.meter;
  const content = new Delta(data.content);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const preview = document.createElement("div");
    wrapper.append(preview);

    const q = new Quill(preview);
    q.disable();
    q.setContents(content || "Failed to load document preview.");
    q.formatText(0, q.getText().length, "word", false);
  });

  const docOptions = [
    {
      icon: "delete",
      value: "Delete",
      action: async (_) => {
        if (!currentUser) return;

        const docRef = doc(
          database,
          "user",
          currentUser.uid,
          "docsData",
          data.id,
        );

        try {
          await deleteDoc(docRef);
          setDocExists(false);
        } catch (err) {
          setError(err.message);
        }
      },
    },
    {
      icon: "edit",
      value: "Rename",
      action: (_) => {},
    },
    {
      icon: "open_in_new",
      value: "Open in new tab",
      action: (_) => {},
    },
  ];

  return (
    docExists && (
      <>
        <li
          onClick={onClick}
          className="relative flex h-80 w-52 cursor-pointer flex-col rounded-md border-[1px] border-gray-border/50 shadow-sm transition-shadow hover:shadow-lg"
        >
          <div
            className={`${
              settingsMenuOpen ? "" : "w-0"
            } absolute right-0 top-0 z-50 flex flex-col items-end`}
          >
            <button
              onClick={(_) => setSettingsMenuOpen((p) => !p)}
              className="grid w-max place-items-center rounded-full p-2 hover:bg-gray-border/20"
            >
              <span className="material-symbols-outlined text-lg/[1em] text-editor-lgt/50">
                tune
              </span>
            </button>
            <ul
              className={`${
                settingsMenuOpen ? "" : "scale-0"
              } origin-top translate-x-1/3 rounded-md bg-white py-1 font-roboto text-xs text-editor-lgt shadow-secondary transition-transform`}
            >
              {docOptions.map((option, i) => {
                return (
                  <li
                    key={i}
                    onClick={option.action}
                    className="flex items-center gap-3 px-3 py-1 hover:bg-gray-border/20"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {option.icon}
                    </span>
                    <span>{option.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="h-[min(max-content, 11in)] max-h-[80%] w-[8.5in] flex-grow origin-top-left scale-[.25] cursor-pointer p-[1in]">
            <div
              className="relative h-max max-h-[8.5in] max-w-full overflow-hidden"
              id="PREVIEW"
              ref={wrapperRef}
            ></div>
          </div>
          <div className="text-sans border-t-border-gray-border cursor-auto border-t-[1px] p-3">
            <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm/[16px] font-medium text-editor">
              {title}
            </h4>
            <span className="inline-block text-xs/[14px] text-editor-lgt">{`${
              type || "Poem"
            }${meter ? ` - ${meter}` : ""}`}</span>
          </div>
        </li>
        {error && <div className="text-red-500">{error}</div>}
      </>
    )
  );
}

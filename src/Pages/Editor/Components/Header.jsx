import React, { useState, useEffect } from "react";

import { useEditor } from "../../../Contexts/EditorContext";
import { useAuth } from "../../../Contexts/AuthContext";

import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../Utils/firebase-config";

import AccountButton from "../../../Components/Account/AccountButton";
import WaveLoader from "../../../Components/WaveLoader";

export default function EditorHeader({ saved }) {
  const [title, setTitle] = useState("Loading document...");

  const { docTitle, quill } = useEditor();
  const { currentUser } = useAuth();

  const renameDoc = async (e) => {
    if (!currentUser || !docTitle) return;

    const docId = window.location.pathname.substring(11);
    const docRef = doc(database, "users", currentUser.uid, "docsData", docId);

    await updateDoc(docRef, {
      title: e.target.value,
    });
  };

  useEffect(
    (_) => {
      if (!docTitle) return;

      setTitle(docTitle);
    },
    [docTitle],
  );

  return (
    <div
      id="HEADER"
      className="flex w-full items-center gap-6 border-[1px] border-transparent border-b-gray-border bg-white px-6 py-3"
    >
      <img
        className="cursor-pointer"
        src="/images/logo_flat.png"
        alt="Quilli"
      />
      <div className="mr-auto flex flex-col">
        <input
          value={title}
          onInput={(e) => setTitle(e.target.value)}
          onBlur={renameDoc}
          className="font-sans text-lg/[25px] text-editor focus-visible:outline-none"
        />
        <span className="cursor-default font-roboto text-sm/[16px] font-light text-editor-lgt">
          Last edited on January 29, 1845
        </span>
      </div>
      <WaveLoader loading={!saved} />
      <AccountButton large={true} />
    </div>
  );
}

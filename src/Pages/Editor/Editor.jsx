import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { useParams } from "react-router-dom";

import { io } from "socket.io-client";
import Quill from "quill";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database, SAVE_INTERVAL_MS } from "../../Utils/firebase-config";

import { useAuth } from "../../Contexts/AuthContext";
import { useEditor } from "../../Contexts/EditorContext";

import Loader from "../../Components/Loader";
import EditorHeader from "./Components/Header";
import EditorToolbar from "./Components/Toolbar";
import EditorPage from "./Components/Page";

export default function Editor() {
  const docRef = useRef();
  const lastSavedContent = useRef("");

  const [socket, setSocket] = useState();
  const [error, setError] = useState();
  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const {
    quill,
    quillContent,
    handleEdits,
    updateFormat,
    modalOpen,
    setModalOpen,
    modalContents,
    setDocTitle,
  } = useEditor();

  const { id: documentId } = useParams();

  const Delta = Quill.import("delta");

  const contentsHaveChanged = (_) => {
    return lastSavedContent.current !== JSON.stringify(quill.getContents().ops);
  };

  const saveDocument = async (_) => {
    console.log("Attempting to save...");

    if (!contentsHaveChanged()) setSaved(true);
    if (!quill || !contentsHaveChanged()) return;

    const data = quill.getContents().ops;

    await updateDoc(docRef.current, {
      content: data,
    });

    lastSavedContent.current = JSON.stringify(data);
    setSaved(true);

    console.log("Successfully saved document.");
  };

  useEffect((_) => {
    const s = io("http://192.168.1.17:3001");
    // const s = io("http://localhost:3001");
    setSocket(s);

    return (_) => s.disconnect();
  }, []);

  useEffect(
    (_) => {
      if (!socket || !quill) return;

      window.onbeforeunload = (_) => {
        if (contentsHaveChanged())
          return "Some of your edits may not have been saved. Are you sure you would like to exit?";
      };

      return (_) => (window.onbeforeunload = null);
    },
    [socket, quill],
  );

  useEffect(
    (_) => {
      if (!socket || !quill) return;

      const getDocumentContents = async (_) => {
        docRef.current = doc(
          database,
          "users",
          currentUser.uid,
          "docsData",
          documentId,
        );
        const docSnap = await getDoc(docRef.current);

        if (docSnap.exists()) {
          socket.emit("get-document", documentId);

          const data = docSnap.data();

          quill.setContents(new Delta(data.content));
          lastSavedContent.current = JSON.stringify(quill.getContents().ops);
          setDocTitle(data.title);

          quill.enable();

          setLoading(false);
          console.log(`Successfully loaded document ${documentId}.`);
        } else setError(`Could not find document ${documentId}.`);
      };

      getDocumentContents();
    },
    [socket, quill, documentId],
  );

  useEffect(
    (_) => {
      if (!socket || !quill) return;

      const interval = setInterval((_) => {
        saveDocument();
      }, SAVE_INTERVAL_MS);

      return (_) => clearInterval(interval);
    },
    [socket, quill],
  );

  useEffect(
    (_) => {
      if (!socket || !quill) return;

      const editorChangeHandler = (type, ...args) => {
        const source = args[2];

        if (type == "selection-change" && args[0]) updateFormat();
        else if (type === "text-change") {
          handleEdits();

          if (source === "user") socket.emit("send-changes", args[0]);
        }
      };

      quill.on("editor-change", editorChangeHandler);

      return (_) => quill.off("editor-change", editorChangeHandler);
    },
    [socket, quill],
  );

  useEffect(
    (_) => {
      if (!socket || !quill) return;

      const handler = (delta) => {
        quill.updateContents(delta);
      };

      socket.on("receive-changes", handler);

      return (_) => socket.off("receive-changes", handler);
    },
    [socket, quill],
  );

  useEffect(
    (_) => {
      if (!quill) return;

      setSaved(!contentsHaveChanged());
    },
    [quill, quillContent],
  );

  const handleModalClick = (e) => {
    if (e.target == document.getElementById("MODAL-WRAPPER"))
      setModalOpen(false);
  };

  return (
    <Loader>
      {!error ? (
        <div className="flex h-screen max-h-screen w-screen flex-col overflow-hidden bg-[#F0F0F0]">
          <EditorHeader saved={saved} />
          <main className="flex w-full flex-grow overflow-auto whitespace-nowrap">
            <div className="mx-auto w-max">
              <EditorToolbar />
              <EditorPage />
            </div>
          </main>
          {modalOpen && (
            <div
              id="MODAL-WRAPPER"
              onClick={handleModalClick}
              className="absolute z-50 grid h-full w-full animate-fade-in place-items-center bg-black/25"
            >
              {modalContents}
            </div>
          )}
        </div>
      ) : (
        <div className="text-red-500">{error}</div>
      )}
    </Loader>
  );
}

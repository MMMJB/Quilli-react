import React, { useRef, useState, useEffect, useCallback } from "react"

import { useParams } from "react-router-dom"

import { io } from "socket.io-client"
import Quill from "quill"
import "quill/dist/quill.snow.css"

import { doc, getDoc, updateDoc } from "firebase/firestore"
import { database, SAVE_INTERVAL_MS } from "../../Utils/firebase-config"
import { useAuth } from "../../Contexts/AuthContext"

export default function Editor() {
    const docRef = useRef();
    const lastSavedContent = useRef("");

    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [error, setError] = useState();

    const { currentUser } = useAuth();

    const { id: documentId } = useParams();

    const Delta = Quill.import("delta");

    const contentsHaveChanged = _ => lastSavedContent.current !== quill.getText();

    const saveDocument = async _ => {
        const data = quill?.getContents().ops;

        if (!quill || !contentsHaveChanged()) return;
        
        await updateDoc(docRef.current, {
            content: data
        })

        lastSavedContent.current = quill.getText();
        console.log("Successfully saved document.");
    }

    useEffect(_ => {
        const s = io("http://192.168.1.17:3001");
        // const s = io("http://localhost:3001");
        setSocket(s);

        return _ => s.disconnect();
    }, []);

    useEffect(_ => {
        if (!socket || !quill) return;

        window.onbeforeunload = _ => {
            if (contentsHaveChanged()) return "Some of your edits may not have been saved. Are you sure you would like to exit?";
        }

        return _ => window.onbeforeunload = null;
    }, [socket, quill])

    useEffect(_ => {
        if (!socket || !quill) return;

        const getDocumentContents = async _ => {
            docRef.current = doc(database, "users", currentUser.uid, "docsData", documentId);
            const docSnap = await getDoc(docRef.current);

            if (docSnap.exists()) {
                socket.emit("get-document", documentId);

                const data = docSnap.data();

                quill.setContents(new Delta(data.content));
                lastSavedContent.current = quill.getText();
                quill.enable();

                console.log(`Successfully loaded document ${documentId}.`);
            } else setError(`Could not find document ${documentId}.`);
        }

        getDocumentContents();
    }, [socket, quill, documentId]);

    useEffect(_ => {
        if (!socket || !quill) return;

        const interval = setInterval(_ => {
            saveDocument();
        }, SAVE_INTERVAL_MS);

        return _ => clearInterval(interval);
    }, [socket, quill])

    useEffect(_ => {
        if (!socket || !quill) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return;

            socket.emit("send-changes", delta);
        }

        quill.on("text-change", handler);

        return _ => quill.off("text-change", handler);
    }, [socket, quill]);

    useEffect(_ => {
        if (!socket || !quill) return;

        const handler = delta => {
            quill.updateContents(delta);
        }

        socket.on("receive-changes", handler);

        return _ => socket.off("receive-changes", handler);
    }, [socket, quill]);

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return;
        
        wrapper.innerHTML = "";

        const editor = document.createElement("div");
        wrapper.append(editor);

        const q = new Quill(editor, {theme: "snow"});
        q.disable();
        q.setText("Loading document...");

        setQuill(q);
    }, []);

    return !error ? <div id="WRAPPER" ref={wrapperRef}></div> : <div className="text-red-500">{error}</div>
}
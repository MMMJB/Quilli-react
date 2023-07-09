import React, { useState, useEffect, useCallback } from "react"

import { useParams } from "react-router-dom"

import { io } from "socket.io-client"
import Quill from "quill"
import "quill/dist/quill.snow.css"

export default function Editor() {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    const { id: documentId } = useParams();

    useEffect(_ => {
        const s = io("http://192.168.1.17:3001");
        // const s = io("http://localhost:3001");
        setSocket(s);

        return _ => s.disconnect();
    }, []);

    useEffect(_ => {
        if (!socket || !quill) return;

        socket.once("load-document", document => {
            quill.setContents(document);
            quill.enable();
        })

        socket.emit("get-document", documentId);
    }, [socket, quill, documentId]);

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

    return <div id="WRAPPER" ref={wrapperRef}>

    </div>
}
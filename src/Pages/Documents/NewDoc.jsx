import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../Contexts/AuthContext"

import { addDoc, collection } from "firebase/firestore"
import { database } from "../../Utils/firebase-config"

export default function NewDoc() {
    const [error, setError] = useState("");

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const createNewDoc = id => {
        const collectionRef = collection(database, "users", id, "docsData");
        
        return addDoc(collectionRef, {
            title: "some title",
            owner: id
        })
    }

    useEffect(_ => {
        createNewDoc(currentUser.uid).then(docRef => {
            navigate(`/documents/${docRef.id}`);
        }).catch(err => setError(err.message));
    }, [currentUser]);

    return (<>
        <span>Creating new document...</span>
        {error && <div className="text-red-500">Failed to create document: {error}</div>}
    </>)
}

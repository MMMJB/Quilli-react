import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../Contexts/AuthContext"

import { addDoc, collection } from "firebase/firestore"
import { database } from "../../Utils/firebase-config"

export default function NewDoc() {
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    useEffect(_ => {
        const createNewDoc = async _ => {
            try {
                const collectionRef = collection(database, "users", currentUser.uid, "docsData");

                const docRef = await addDoc(collectionRef, {
                    title: "imagine if this works tho"
                })
    
                console.log(docRef.id);
            } catch(err) {
                console.error("Could not create document: ", e);
            }
        }
        
        createNewDoc();
    }, []);

    return <span>Creating new document...</span>
}

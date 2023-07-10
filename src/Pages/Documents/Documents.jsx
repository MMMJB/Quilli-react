import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import AccountButton from '../../Components/AccountButton'
import Doc from './Components/Doc'

import { useAuth } from '../../Contexts/AuthContext'

import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../Utils/firebase-config'

export default function Documents() {
    const [docs, setDocs] = useState([]);

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    useEffect(_ => {
        const getAllDocuments = async _ => {
            const collectionRef = collection(database, "users", currentUser.uid, "docsData");
    
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach(doc => {
                setDocs(p => [...p, {
                    id: doc.id,
                    title: doc.data().title,
                    content: doc.data().content
                }])
            })
        }

        getAllDocuments();

        return _ => setDocs([]);
    }, [currentUser])

    const searchDocuments = e => {
        e.preventDefault();
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <header className="w-full flex justify-center bg-salmon relative">
                <div className="px-4 py-2 absolute top-6 w-1/2 max-w-[570px] bg-white/10 rounded-xl border-home-lgt/50 border-[1px] flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl text-home-lgt">search</span>
                    <input onSubmit={searchDocuments} type="search" placeholder="Search" className="bg-transparent flex-grow text-base font-sans text-home placeholder:text-home-lgt focus-visible:placeholder:text-home-lgt/50 focus-visible:outline-none"></input>
                    <AccountButton />
                </div>
                <img className="w-full max-h-[40vh]" src="/images/quilli_illustration.svg" />
            </header>
            <main className="relative flex justify-center py-8 px-16 w-full flex-grow">
                <ul className="relative grid grid-cols-4 gap-8">
                    {
                        docs.length > 0 ? 
                            docs.map((doc, i) => {
                                // return <Doc title={doc.title} type={doc.type} meter={doc.meter} key={i} />
                                return <Doc onClick={_ => navigate(`/documents/${doc.id}`)} data={{title: doc.title, content: doc.content}} key={doc.id} />
                            })
                        :
                            <span className="absolute left-1/2 w-max -translate-x-1/2 font-roboto text-editor-lgt/50">You haven't created any documents yet.</span>
                    }
                </ul>
                <img src="/images/corner.svg" alt="" className="fixed bottom-0 right-0 h-40" />
                <button onClick={_ => navigate("/new")} className="fixed w-16 h-16 bg-brand rounded-full bottom-6 right-6 text-4xl/[1px] text-white grid place-items-center shadow-lg hover:bg-brand-dark transition-colors">+</button>
            </main>
        </div>
    )
}

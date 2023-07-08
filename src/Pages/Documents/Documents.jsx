import React from 'react'

import AccountButton from '../../Components/AccountButton'
import Doc from './Components/Doc'

const docs = [
    {
        title: "The Raven",
        type: "Ballad",
        meter: "Trochaic Octameter"
    },
    {
        title: "The Road Not Taken",
        type: "Sonnet",
        meter: "Iambic Pentameter"
    },
    {
        title: "Cotton Eye Joe",
        type: "Song",
        meter: undefined
    },
    {
        title: "New Play 1",
        type: "Screenplay",
        meter: undefined
    },
    {
        title: "Cotton Eye Joe",
        type: "Song",
        meter: undefined
    },
    {
        title: "some obscenely long poem name that no one in their right mind would ever write",
        type: "Song",
        meter: undefined
    },
]

export default function Documents() {
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
                <ul className="grid grid-cols-4 gap-8">
                    {
                        docs.map((doc, i) => {
                            return <Doc title={doc.title} type={doc.type} meter={doc.meter} key={i} />
                        })
                    }
                </ul>
                <img src="/images/corner.svg" alt="" className="fixed bottom-0 right-0 h-40" />
                <button className="fixed w-16 h-16 bg-brand rounded-full bottom-6 right-6 text-4xl/[1px] text-white grid place-items-center">+</button>
            </main>
        </div>
    )
}

import React from 'react'

import AccountButton from '../../Components/AccountButton'

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
                <img className="w-full max-h-[40vh]" src="/images/quilli-illustration.svg" />
            </header>
            <main className="w-full flex-grow">

            </main>
        </div>
    )
}

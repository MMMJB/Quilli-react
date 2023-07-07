import React, { useRef, useState, useEffect } from 'react'

// import { useAuth } from '../Contexts/AuthContext'

import User from './User'

export default function AccountButton() {
    const accountRef = useRef();

    const [accountOpen, setAccountOpen] = useState(false);

    useEffect(_ => {
        window.addEventListener("click", e => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountOpen(false);
            }
        })
    }, [])

    // const { currentUser } = useAuth();

    return (
        <div className="relative flex flex-col">
            <input onInput={_ => setAccountOpen(p => !p)} type="checkbox" className="appearance-none h-7 aspect-square rounded-full bg-[url('https://picsum.photos/100/100')] bg-center bg-cover cursor-pointer" />
            {
                accountOpen ? 
                    <div ref={accountRef} className="absolute right-0 top-8">
                        <User />
                    </div>
                : ""
            }
        </div>
    )
}

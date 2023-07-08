import React from "react";

import GetStarted from "./GetStartedBtn";

export default function Hero() {
    return (<>
        <main className="grid grid-cols-2 w-full max-w-[1500px]">
            <div className="flex flex-col justify-center pl-28 text-home">
                <h1 className="tracking-tight">Write incredible <span className="text-brand font-script decorated">poetry&nbsp;</span> with the power of AI</h1>
                <h3 className="mt-4 max-w-xl">Quilli provides you with the AI-driven tools necessary to craft exceptional lyrics, poetry, and more- all in one place.</h3>
                <div className="mt-8 flex">
                    <GetStarted />
                    <button 
                        onClick={_ => document.getElementById("SERVICES").scrollIntoView({behavior: "smooth"})} 
                        className="px-6 py-2 font-sans text-home-lgt hover:text-home">Learn More</button>
                </div>
            </div>
            <img className="justify-self-center max-h-[80vh]" src="/images/ink_illustration.svg" alt="Illustration"></img>
        </main>
    </>)
}
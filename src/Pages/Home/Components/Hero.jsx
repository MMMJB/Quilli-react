import React from "react";

import GetStarted from "./GetStarted";
import H3 from "./H3";

export default function Hero() {
    return (<>
        <main className="grid grid-cols-2 w-full max-w-[1500px]">
            <div className="flex flex-col justify-center pl-28 font-display text-home">
                <h1 className="text-[54px]/[64.8px] tracking-tight">Write incredible <span className="text-brand font-script">poetry</span><br></br> with the aid of AI</h1>
                <H3 className="mt-4" text="Quilli provides you with the AI-driven tools necessary to craft" />
                <H3 text="exceptional lyrics, poetry, and more- all in one place." />
                <div className="mt-8 flex">
                    <GetStarted />
                    <button className="px-6 py-2 font-sans text-home-lgt hover:text-home">Learn More</button>
                </div>
            </div>
            <img className="justify-self-center" src="/images/ink_illustration.svg" alt="Illustration"></img>
        </main>
    </>)
}
import React from "react";

import H3 from "./H3";

export default function About() {
    return (<>
        <section className="grid grid-cols-2 justify-items-center w-full max-w-[1500px]">
            <img src="images/paper_illustration.svg" alt="Illustration"></img>
            <div className="flex flex-col justify-center font-display text-home">
                <h2 className="text-[42px]/[50.4px] tracking-tight">Spend less time switching tabs</h2>
                <h2 className="text-[42px]/[50.4px] tracking-tight">and more time <span className="text-brand">writing</span>.</h2>
                <H3 className="mt-4 max-w-xl" text="Tired of flipping back and forth between dictionaries, rhyme lists, spell checkers, and more? Quilli has you covered, free of charge." />
            </div>
        </section>
    </>)
}
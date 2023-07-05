import React from "react";

export default function About() {
    return (<>
        <section className="grid grid-cols-2 justify-items-center w-full max-w-[1500px]">
            <img src="images/paper_illustration.svg" alt="Illustration"></img>
            <div className="flex flex-col justify-center text-home">
                <h2 className="tracking-tight max-w-xl">Spend less time switching tabs and more time <span className="text-brand">writing</span>.</h2>
                <h3 className="mt-4 max-w-[34rem]">Tired of flipping back and forth between dictionaries, rhyme lists, spell checkers, and more? Quilli has you covered, free of charge.</h3>
            </div>
        </section>
    </>)
}
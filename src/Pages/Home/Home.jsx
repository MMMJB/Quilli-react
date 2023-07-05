import React from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import GetStarted from "./Components/GetStarted";

export default function Home() {
    return (
        <div className="bg-salmon w-full min-h-screen flex flex-col items-center">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <GetStarted />
        </div>
    )
}
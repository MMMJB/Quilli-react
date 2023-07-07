import React from "react"

import PrivateRoute from "../../Components/PrivateRoute"

import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import About from "./Components/About"
import Services from "./Components/Services"
import GetStarted from "./Components/GetStarted"
import Footer from "./Components/Footer"

export default function Home() {
    return (
        <PrivateRoute reverse={true}>
            <div id="HOME" className="bg-salmon w-full min-h-screen flex flex-col items-center">
                <Navbar />
                <Hero />
                <About />
                <Services />
                <GetStarted />
                <Footer />
            </div>
        </PrivateRoute>
    )
}
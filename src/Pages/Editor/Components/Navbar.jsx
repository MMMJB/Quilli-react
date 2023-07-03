import React from "react";

export default function Navbar() {
    return (<>
        <nav className="w-full p-3">
            <span className="text-home font-logo text-2xl ml-3">Quilli</span>
            <div className="float-right flex mr-3 gap-3 text-sm font-semibold">
                <button className="w-32 h-10 text-brand backdrop-blur-sm border-gray-border border-[1px] rounded-[4px]">Log In</button>
                <button className="w-32 h-10 bg-brand text-white rounded-lg">Get Started</button>
            </div>
        </nav>
    </>)
}
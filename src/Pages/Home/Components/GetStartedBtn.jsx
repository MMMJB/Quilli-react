import React from "react";

export default function GetStartedBtn() {
    return (<>
        <div className="text-base/[26px] text-white font-sans">
            <span className="absolute rounded-lg px-6 py-2 bg-brand-dark shadow-[0px_24px_60px_rgba(0,0,0,.01),0px_34px_20px_rgba(0,0,0,.05),0px_15px_15px_rgba(0,0,0,.09),0px_4px_8px_rgba(0,0,0,.1)]">Get Started</span>
            <button className="bg-brand cta-mask rounded-lg px-6 py-2 animate-cta-rev hover:animate-cta">Get Started</button>
        </div>
    </>)
}
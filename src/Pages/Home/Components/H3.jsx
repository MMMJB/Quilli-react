import React from "react";

export default function H3({text, className}) {
    return (
        <h3 className={`text-lg/[27px] text-home font-display ${className}`}>{text}</h3>
    )
}
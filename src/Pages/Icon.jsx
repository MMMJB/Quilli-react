import React, { useState, useEffect } from "react";

export default function Icon({icon, size}) {
    const [backgroundSize, setBackgroundSize] = useState([0, 0]);
    const [backgroundPosition, setBackgroundPosition] = useState([0, 0])
    
    useEffect(_ => {
        const SW = 7, SH = 5;
        const ps = 32, bw = 232, bh = 167;

        const scalar = size / ps;
        const x = icon % SW;
        const y = Math.floor(icon / SW);

        const mx = x * size + (x + 1) * scalar;
        const my = y * size + (y + 1) * scalar;

        setBackgroundSize([bw * scalar, bh * scalar]);
        setBackgroundPosition([-mx, -my * 1.003]);
    }, size)

    return <span className="inline-block" style={{
        background: "url(/images/icon-spritesheet.svg)",
        backgroundRepeat: "no-repeat",
        height: `${size}px`,
        aspectRatio: "1",
        backgroundSize: `${backgroundSize[0]}px ${backgroundSize[1]}px`,
        backgroundPosition: `${backgroundPosition[0]}px ${backgroundPosition[1]}px`
    }}></span>
}
import React from "react";

import servicesList from "../../../Utils/services-list";

export default function Services() {
    return (<>
        <section className="w-full max-w-7xl my-20">
            <ul className="w-full p-14 bg-white rounded-3xl shadow-secondary grid grid-cols-5 gap-[2vw]">
                {servicesList.map((item, i) => {
                    return <>
                        <li className="max-w-48 h-64 px-6 text-sm/[19.6px] text-home text-center font-sans flex flex-col gap-6 justify-center border-gray-border border-[1px] rounded-2xl" key={i}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <p>{item.text}</p>
                        </li>
                    </>
                })}
            </ul>
        </section>
    </>)
}
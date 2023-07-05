import React from "react";

import servicesList from "../../../Utils/services-list";

export default function Services() {
    return (<>
        <section className="w-full max-w-7xl mt-16">
            <ul className="w-full max-h-80 p-14 bg-white rounded-3xl shadow-secondary flex justify-between">
                {servicesList.map((item, i) => {
                    return <>
                        <li className="w-[200px] h-[250px] px-6 text-sm/[19.6px] text-home text-center font-sans flex flex-col gap-6 justify-center border-gray-border border-[1px] rounded-2xl" key={i}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <p>{item.text}</p>
                        </li>
                    </>
                })}
            </ul>
        </section>
    </>)
}
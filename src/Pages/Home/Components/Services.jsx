import React from "react";

import servicesList from "../../../Utils/services-list";

export default function Services() {
  return (
    <>
      <section id="SERVICES" className="mt-20 w-full max-w-7xl">
        <ul className="grid w-full grid-cols-5 gap-[2vw] rounded-3xl bg-white p-14 shadow-secondary">
          {servicesList.map((item, i) => {
            return (
              <>
                <li
                  className="max-w-48 flex h-64 flex-col justify-center gap-6 rounded-2xl border-[1px] border-gray-border px-6 text-center font-sans text-sm/[19.6px] text-home"
                  key={i}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <p>{item.text}</p>
                </li>
              </>
            );
          })}
        </ul>
      </section>
    </>
  );
}

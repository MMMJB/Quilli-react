import React from "react";

import AccountButton from "../../../Components/Account/AccountButton";

export default function EditorHeader() {
  return (
    <div
      id="HEADER"
      className="flex w-full items-center gap-6 border-[1px] border-b-gray-border bg-white px-6 py-3"
    >
      <img
        className="cursor-pointer"
        src="/images/logo_flat.png"
        alt="Quilli"
      />
      <div className="mr-auto flex flex-col">
        <input
          defaultValue="New Document"
          className="font-sans text-lg/[25px] text-editor focus-visible:outline-none"
        ></input>
        <span className="cursor-default font-roboto text-sm/[16px] font-light text-editor-lgt">
          Last edited on January 29, 1845
        </span>
      </div>
      <AccountButton large={true} />
    </div>
  );
}

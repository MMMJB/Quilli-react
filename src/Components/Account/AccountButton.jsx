import React, { useRef, useState, useEffect } from "react";

// import { useAuth } from '../Contexts/AuthContext'

import User from "./User";

export default function AccountButton({ large }) {
  const accountRef = useRef();

  const [accountOpen, setAccountOpen] = useState(false);

  useEffect((_) => {
    window.addEventListener("click", (e) => {
      const targetExists = getComputedStyle(e.target).display !== "";

      if (
        accountRef.current &&
        targetExists &&
        !accountRef.current.contains(e.target)
      ) {
        setAccountOpen(false);
      }
    });
  }, []);

  // const { currentUser } = useAuth();

  return (
    <div className="relative flex flex-col" ref={accountRef}>
      <input
        onInput={(_) => setAccountOpen((p) => !p)}
        type="checkbox"
        className={`${
          !large ? "h-7" : "h-10"
        } aspect-square  cursor-pointer appearance-none rounded-full bg-[url('https://picsum.photos/100/100')] bg-cover bg-center`}
      />
      {accountOpen ? (
        <div className="absolute right-0 top-8 z-50">
          <User />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

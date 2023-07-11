import React, { useState, useEffect } from "react";

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect((_) => {
    if (document.readyState !== "complete") {
      window.addEventListener("load", (_) => {
        console.log("%cPage loaded.", "color: green;");
        setLoading(false);
      });
    } else setLoading(false);

    return (_) => window.removeEventListener("load", window);
  }, []);

  return (
    <>
      <div
        id="LOADER"
        className={`z-50 h-screen w-screen bg-white ${
          !loading ? "hidden touch-none" : ""
        }`}
      ></div>
      <>{children}</>
    </>
  );
}

import { useState, useEffect } from "react";

export default useContextMenu = (_) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect((_) => {
    const handleClick = (_) => setActive(false);
    document.addEventListener("click", handleClick);

    return (_) => document.removeEventListener("click", handleClick);
  }, []);

  return {
    active,
    setActive,
    position,
    setPosition,
  };
};

import React from "react";

export default function WaveLoader({ loading, height }) {
  return (
    <div
      className={`${
        height ? `h-[${height}px]` : "h-3"
      } aspect-[2/1] animate-scroll-left rounded-[40%] bg-[url('/images/wave_loader.svg')] bg-contain ${
        !loading ? "opacity-0" : "opacity-100"
      } transition-opacity`}
    ></div>
  );
}

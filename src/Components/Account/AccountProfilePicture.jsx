import React from "react";

import { useAuth } from "../../Contexts/AuthContext";

export default function AccountProfilePicture() {
  const { currentUser } = useAuth();

  const updateProfilePicture = (_) => {
    console.log("update my darn pfp!");
  };

  return (
    <>
      <img
        className="mx-8 my-6 aspect-square w-14 rounded-full shadow-lg"
        src="https://picsum.photos/100/100"
        alt="Profile"
      />
      <span
        onClick={updateProfilePicture}
        className="material-symbols-outlined absolute left-16 top-14 grid aspect-square cursor-pointer place-items-center rounded-full bg-white/75 p-1 text-lg/[1px] text-editor-lgt"
      >
        photo_camera
      </span>
    </>
  );
}

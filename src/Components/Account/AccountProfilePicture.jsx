import React, { useState } from "react";

import { useAuth } from "../../Contexts/AuthContext";

export default function AccountProfilePicture() {
  const [error, setError] = useState("");
  const [clickable, setClickable] = useState(true);

  const { currentUser, changeProfilePicture } = useAuth();

  const updateProfilePicture = (e) => {
    if (!currentUser) return;

    setError("");

    const file = e.target.files[0];
    if (file.size > 4e6)
      return setError("Profile picture must be less than 4mb.");

    setClickable(false);

    console.log(file);
  };

  return (
    <>
      <img
        className="my-4 ml-6 mr-4 aspect-square w-11 rounded-full shadow-lg"
        src={currentUser.photoURL || "/images/default_pfp.png"}
        alt="Profile"
      />
      {clickable && (
        <input
          type="file"
          className="absolute left-6 top-6 aspect-square w-10 cursor-pointer rounded-full text-[0px] opacity-0"
          onChange={updateProfilePicture}
        />
      )}
      {error && (
        <span className="absolute bottom-0 left-0 px-2 py-1 font-roboto text-xs text-red-500/75">
          {error}
        </span>
      )}
    </>
  );
}

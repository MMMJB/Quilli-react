import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext";

const acceptedFormats = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/svg",
  "image/gif",
];

export default function AccountProfilePicture() {
  const [error, setError] = useState("");
  const [clickable, setClickable] = useState(true);

  const { currentUser, changeProfilePicture } = useAuth();

  const navigate = useNavigate();

  const updateProfilePicture = async (e) => {
    if (!currentUser) return;

    setError("");

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4e6)
      return setError("Profile picture must be less than 4mb.");
    else if (!acceptedFormats.includes(file.type))
      return setError("File must be of type png, jpg, svg, or gif.");

    setClickable(false);

    try {
      await changeProfilePicture(file);

      setClickable(true);
      navigate(0);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <img
        className={`my-4 ml-6 mr-4 aspect-square w-11 rounded-full object-contain shadow-lg ${
          !clickable ? "opacity-50" : ""
        }`}
        src={currentUser.photoURL || "/images/default_pfp.png"}
        alt="Profile"
      />
      {clickable && (
        <input
          type="file"
          className="absolute left-6 top-6 aspect-square w-10 cursor-pointer rounded-full text-[0px] opacity-0"
          onChange={updateProfilePicture}
          accept="image/*"
        />
      )}
      {error && (
        <span className="absolute -top-1 left-0 font-roboto text-[10px] text-red-500/75">
          {error}
        </span>
      )}
    </>
  );
}

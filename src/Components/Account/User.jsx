import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext";

import UserMenuButton from "./UserMenuButton";
import AccountProfilePicture from "./AccountProfilePicture";

const inputStyles =
  "max-w-[12rem] font-roboto text-editor-lgt text-sm rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function User() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const [error, setError] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser, logout, changePassword, changeDisplayName } = useAuth();

  const navigate = useNavigate();

  const menuButtons = [
    {
      icon: "home",
      text: "Documents",
      func: (_) => {
        navigate("/documents");
      },
    },
    {
      icon: "settings",
      text: "Profile Settings",
      func: (_) => {
        setUpdatingProfile(true);
      },
    },
    {
      icon: "palette",
      text: "Appearance",
      func: (_) => {
        // Dark mode, accessibility, etc
      },
    },
  ];

  const handleLogout = async (_) => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out.");
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    if (passwordRef.current.value) {
      try {
        setLoading(true);

        await changePassword(passwordRef.current.value);

        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
      } catch {
        setError(
          "Could not update password. Try logging out and logging back in.",
        );
      }
    }

    if (nameRef.current.value) {
      try {
        setLoading(true);

        await changeDisplayName(nameRef.current.value);

        nameRef.current.value = "";
      } catch {
        setError("Could not update name. Try logging out and logging back in.");
      }
    }

    setLoading(false);
    setUpdatingProfile(false);
  };

  useEffect(
    (_) => {
      setError("");
    },
    [updatingProfile],
  );

  return (
    <>
      <div className="w-max overflow-hidden rounded-lg bg-white p-2 shadow-lg">
        {!updatingProfile ? (
          <>
            <div className="relative z-10 flex w-full font-sans">
              <AccountProfilePicture />
              <div className="my-auto mr-6 flex flex-col">
                <span className="text-sm text-editor">
                  {currentUser.displayName || "Anon"}
                </span>
                <span className="max-w-[100px] overflow-hidden text-ellipsis text-xs text-editor/50">
                  {currentUser.email}
                </span>
              </div>
            </div>
            <ul className="flex w-full flex-col border-y-[1px] border-y-gray-border font-roboto">
              {menuButtons.map((btn, i) => {
                return (
                  <UserMenuButton
                    onClick={btn.func}
                    text={btn.text}
                    icon={btn.icon}
                    key={i}
                  />
                );
              })}
            </ul>
            <div
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-4 p-4 transition-colors"
            >
              <button className="material-symbols-outlined text-lg/[1px] text-gray-icon">
                logout
              </button>
              <button className="text-xs text-editor-lgt">Sign out</button>
            </div>
          </>
        ) : (
          <form
            onSubmit={updateAccount}
            className="flex flex-col items-center gap-8 bg-white p-8"
          >
            <input
              className={inputStyles}
              type="text"
              ref={nameRef}
              placeholder="New Name"
            />
            <input
              className={inputStyles}
              type="password"
              ref={passwordRef}
              placeholder="New Password"
            />
            <input
              className={inputStyles}
              type="password"
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
            />
            <div className="flex items-center gap-8">
              <button
                onClick={(_) => setUpdatingProfile(false)}
                className="font-sans text-sm text-brand-dark"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="rounded-md bg-brand px-6 py-2 font-sans text-sm text-white disabled:bg-brand/50"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
      {error && (
        <div className="mt-4 font-roboto text-sm text-red-500">{error}</div>
      )}
    </>
  );
}

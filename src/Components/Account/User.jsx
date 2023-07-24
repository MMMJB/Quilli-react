import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext";

import UserMenuButton from "./UserMenuButton";
import AccountProfilePicture from "./AccountProfilePicture";

const inputStyles =
  "max-w-[12rem] font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

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
        setError("Could not update password.");
      }
    }

    if (nameRef.current.value) {
      try {
        setLoading(true);

        await changeDisplayName(nameRef.current.value);

        nameRef.current.value = "";
      } catch {
        setError("Could not update name.");
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
      <div className="w-64 overflow-hidden rounded-xl bg-gray-50 shadow-lg">
        {!updatingProfile ? (
          <>
            <div className="relative z-10 flex w-full rounded-xl bg-white bg-[url('/images/corner_waves.svg')] bg-cover bg-right-bottom font-sans shadow-secondary">
              <AccountProfilePicture />
              <div className="my-auto flex flex-col">
                <span className="text-base text-white">
                  {currentUser.displayName || "Anon"}
                </span>
                <span className="max-w-[100px] overflow-hidden text-ellipsis text-xs text-white/50">
                  {currentUser.email}
                </span>
              </div>
            </div>
            <ul className="flex w-full flex-col rounded-b-xl bg-white font-roboto shadow-sm">
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
            <button
              onClick={handleLogout}
              className="relative left-1/2 my-3 -translate-x-1/2 text-xs text-editor-lgt transition-colors hover:text-editor"
            >
              Sign Out
            </button>
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
            <div className="mt-4 flex items-center gap-8">
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

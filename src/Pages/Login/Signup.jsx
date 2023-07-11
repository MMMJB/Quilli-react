import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext";

import PrivateRoute from "../../Components/PrivateRoute";

const inputStyles =
  "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const firstNameRef = useRef();
  // const lastNameRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const navigate = useNavigate();

  const accountSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
      await changeDisplayName(
        firstNameRef.current.value,
        lastNameRef.current.value,
      );

      navigate("/documents");
    } catch (err) {
      const e = err.message;
      const msg = e.substring(e.indexOf(":") + 2, e.indexOf("("));
      const type = e
        .substring(e.indexOf("/") + 1, e.lastIndexOf(")"))
        .replaceAll("-", " ");

      setError(`${msg} - ${type}`);
    }

    setLoading(false);
  };

  return (
    <PrivateRoute reverse={true}>
      <div
        id="SIGNUP"
        className="flex h-screen w-full flex-col items-center justify-center"
      >
        <div>
          <form
            onSubmit={accountSubmit}
            className="flex w-96 flex-col items-center gap-8 rounded-lg border-[1px] border-gray-border bg-white/50 px-12 py-12"
          >
            <h2 className="mb-4 font-sans text-2xl text-editor">Sign Up</h2>
            <input
              className={inputStyles}
              type="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
            {/* <input className={inputStyles} type="text" ref={firstNameRef} placeholder="First Name" required />
                        <input className={inputStyles} type="text" ref={lastNameRef} placeholder="Last Name" required /> */}
            <input
              className={inputStyles}
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
            <input
              className={inputStyles}
              type="password"
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
              required
            />
            <button
              disabled={loading}
              className="ml-auto mt-4 rounded-md bg-brand px-6 py-2 font-sans text-sm text-white disabled:bg-brand/50"
              type="submit"
            >
              Next
            </button>
          </form>
        </div>
        <span className="mt-4 font-sans text-sm text-editor">
          Already have an account? Sign in{" "}
          <Link className="underline" to="/login">
            here
          </Link>
          .
        </span>
        {error && (
          <div className="mt-4 font-roboto text-sm text-red-500">{error}</div>
        )}
      </div>
    </PrivateRoute>
  );
}

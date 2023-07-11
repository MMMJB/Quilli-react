import React, { useRef, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

const inputStyles =
  "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function ForgotPassword() {
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const accountSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await resetPassword(emailRef.current.value);

      setMessage("Success! Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }

    setLoading(false);
  };

  return (
    <div
      id="SIGNUP"
      className="flex h-screen w-full flex-col items-center justify-center"
    >
      <div>
        <form
          onSubmit={accountSubmit}
          className="flex w-96 flex-col items-center gap-8 rounded-lg border-[1px] border-gray-border bg-white/50 px-12 py-12"
        >
          <h2 className="mb-4 font-sans text-2xl text-editor">
            Reset Password
          </h2>
          <input
            className={inputStyles}
            type="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
          <div className="mt-4 flex items-center gap-8">
            <Link to="/login" className="font-sans text-sm text-brand-dark">
              Log In
            </Link>
            <button
              disabled={loading}
              className="rounded-md bg-brand px-6 py-2 font-sans text-sm text-white disabled:bg-brand/50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <span className="mt-4 font-sans text-sm text-editor">
        Need an account? Sign up{" "}
        <Link className="underline" to="/signup">
          here
        </Link>
        .
      </span>
      {error && (
        <div className="mt-4 font-roboto text-sm text-red-500">{error}</div>
      )}
      {message && (
        <div className="mt-4 font-roboto text-sm text-green-500">{message}</div>
      )}
    </div>
  );
}

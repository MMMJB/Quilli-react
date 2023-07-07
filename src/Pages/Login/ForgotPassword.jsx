import React, { useRef, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { Link } from "react-router-dom"

const inputStyles = "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function ForgotPassword() {
    const emailRef = useRef();
    
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();
  
    const accountSubmit = async e => {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);

            await resetPassword(emailRef.current.value);

            setMessage("Success! Check your inbox for further instructions.")
        } catch {
            setError("Failed to reset password.");
        }

        setLoading(false);
    }

    return (
        <div id="SIGNUP" className="w-full h-screen flex flex-col items-center justify-center">
            <div>
                <form onSubmit={accountSubmit} className="w-96 py-12 px-12 rounded-lg bg-white/50 border-gray-border border-[1px] flex flex-col gap-8 items-center">
                    <h2 className="mb-4 font-sans text-2xl text-editor">Reset Password</h2>
                    <input className={inputStyles} type="email" ref={emailRef} placeholder="Email" required />
                    <div className="flex items-center mt-4 gap-8">
                        <Link to="/login" className="font-sans text-brand-dark text-sm">Log In</Link>
                        <button disabled={loading} className="text-sm text-white font-sans py-2 px-6 bg-brand disabled:bg-brand/50 rounded-md" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <span className="font-sans text-editor text-sm mt-4">Need an account? Sign up <Link className="underline" to="/signup">here</Link>.</span>
            {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
            {message && <div className="text-green-500 mt-4 text-sm font-roboto">{message}</div>}
        </div>
    )
}


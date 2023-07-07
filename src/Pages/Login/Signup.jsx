import React, { useRef, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { useNavigate, Link } from "react-router-dom"

const inputStyles = "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const navigate = useNavigate();
  
    const accountSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.");
        }

        try {
            setError("");
            setLoading(true);

            await signup(emailRef.current.value, passwordRef.current.value);
        
            navigate("/documents");
        } catch(err) {
            const e = err.message;
            const msg = e.substring(e.indexOf(":") + 2, e.indexOf("("));
            const type = e.substring(e.indexOf("/") + 1, e.lastIndexOf(")")).replaceAll("-", " ");

            setError(`${msg} - ${type}`);
        }

        setLoading(false);
    }

    return (
        <div id="SIGNUP" className="w-full h-screen flex flex-col items-center justify-center">
            <div>
                <form onSubmit={accountSubmit} className="w-96 py-12 px-12 rounded-lg bg-white/50 border-gray-border border-[1px] flex flex-col gap-8 items-center">
                    <h2 className="mb-4 font-sans text-2xl text-editor">Sign Up</h2>
                    <input className={inputStyles} type="email" ref={emailRef} placeholder="Email" required />
                    <input className={inputStyles} type="password" ref={passwordRef} placeholder="Password" required />
                    <input className={inputStyles} type="password" ref={passwordConfirmRef} placeholder="Confirm Password" required />
                    <button disabled={loading} className="ml-auto mt-4 text-sm text-white font-sans py-2 px-6 bg-brand disabled:bg-brand/50 rounded-md" type="submit">Next</button>
                </form>
            </div>
            <span className="font-sans text-editor text-sm mt-4">Already have an account? Sign in <Link className="underline" to="/login">here</Link>.</span>
            {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
        </div>
    )
}

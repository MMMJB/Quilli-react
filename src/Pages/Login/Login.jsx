import React, { useRef, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"

import { useAuth } from '../../Contexts/AuthContext'

import PrivateRoute from '../../Components/PrivateRoute'

const inputStyles = "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();
  
    const accountSubmit = async e => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            await login(emailRef.current.value, passwordRef.current.value);
        
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
        <PrivateRoute reverse={true}>
            <div id="SIGNUP" className="w-full h-screen flex flex-col items-center justify-center">
                <div>
                    <form onSubmit={accountSubmit} className="w-96 py-12 px-12 rounded-lg bg-white/50 border-gray-border border-[1px] flex flex-col gap-8 items-center">
                        <h2 className="mb-4 font-sans text-2xl text-editor">Log In</h2>
                        <input className={inputStyles} type="email" ref={emailRef} placeholder="Email" required />
                        <input className={inputStyles} type="password" ref={passwordRef} placeholder="Password" required />
                        <div className="flex items-center mt-4 gap-8">
                            <Link to="/password-reset" className="font-sans text-brand-dark text-sm">Forgot password?</Link>
                            <button disabled={loading} className="text-sm text-white font-sans py-2 px-6 bg-brand disabled:bg-brand/50 rounded-md" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
                <span className="font-sans text-editor text-sm mt-4">Need an account? Sign up <Link className="underline" to="/signup">here</Link>.</span>
                {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
            </div>
        </PrivateRoute>
    )
}


import React, { useState, useRef } from 'react'
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const inputStyles = "font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function User() {
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [error, setError] = useState("");
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { currentUser, logout, changePassword } = useAuth();
    
    const navigate = useNavigate(); 

    const handleLogout = async _ => {
        setError("");

        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out.");
        }
    }

    const updateAccount = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.");
        }

        if (passwordRef.current.value) {
            try {
                setLoading(true);

                await changePassword(passwordRef.current.value);
                navigate("/documents");
            } catch(err) {
                const e = err.message;
                const msg = e.substring(e.indexOf(":") + 2, e.indexOf("("));
                const type = e.substring(e.indexOf("/") + 1, e.lastIndexOf(")")).replaceAll("-", " ");

                setError(`${msg} - ${type}`);
            }

            setLoading(false);
        }
    }
  
    return (<>
        <div className="p-8 rounded-lg border-2 border-gray-border flex flex-col items-center justify-center gap-4">
            {
                !updatingProfile ? <>
                    <h2 className="font-sans text-2xl">Profile</h2>
                    <span><strong>Email:</strong> {currentUser.email}</span>
                    {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
                    <button onClick={_ => setUpdatingProfile(true)} className="font-sans hover:underline">Update Profile</button>
                    <button onClick={handleLogout} className="font-sans text-brand-dark hover:underline">Log Out</button>
                </> : <>
                    <form onSubmit={updateAccount} className="flex flex-col gap-8 items-center">
                        <h2 className="mb-4 font-sans text-2xl text-editor">Update Profile</h2>
                        <input className={inputStyles} type="password" ref={passwordRef} placeholder="New Password" required />
                        <input className={inputStyles} type="password" ref={passwordConfirmRef} placeholder="Confirm New Password" required />
                        <div className="flex items-center mt-4 gap-8">
                            <button onClick={_ => setUpdatingProfile(false)} className="font-sans text-brand-dark text-sm">Cancel</button>
                            <button disabled={loading} className="text-sm text-white font-sans py-2 px-6 bg-brand disabled:bg-brand/50 rounded-md" type="submit">Update</button>
                        </div>
                    </form>
                    {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
                </>
            }
        </div>
    </>)
}

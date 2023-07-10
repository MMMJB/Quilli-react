import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../Contexts/AuthContext"

import UserMenuButton from './UserMenuButton'
import AccountProfilePicture from './AccountProfilePicture'

const inputStyles = "max-w-[12rem] font-roboto text-editor-lgt text-base rounded-md px-6 py-3 border-gray-border border-[1px] focus-visible:outline-none focus-visible:border-brand focus-visible:border-2 focus-visible:placeholder:text-editor-lgt/50";

export default function User() {
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [error, setError] = useState("");
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { currentUser, logout, changePassword } = useAuth();
    
    const navigate = useNavigate(); 

    const menuButtons = [
        {
            icon: "home",
            text: "Documents",
            func: _ => {
                navigate("/documents")
            }
        },
        {
            icon: "settings",
            text: "Profile Settings",
            func: _ => {
                setUpdatingProfile(true);
            }
        },
        {
            icon: "palette",
            text: "Appearance",
            func: _ => {
                // Dark mode, accessibility, etc
            }
        }
    ]

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
                
                passwordRef.current.value ="";
                passwordConfirmRef.current.value = "";
                
                setUpdatingProfile(false);
            } catch(err) {
                const e = err.message;
                const msg = e.substring(e.indexOf(":") + 2, e.indexOf("("));
                const type = e.substring(e.indexOf("/") + 1, e.lastIndexOf(")")).replaceAll("-", " ");

                setError(`${msg} - ${type}`);
            }

            setLoading(false);
        }
    }

    useEffect(_ => {
        setError("");
    }, [updatingProfile])
  
    return (<>
        <div className="w-64 rounded-xl bg-gray-300 overflow-hidden shadow-lg">
            {
                !updatingProfile ? <>
                    <div className="w-full bg-white bg-[url('/images/corner_waves.svg')] bg-right-bottom bg-cover flex font-sans rounded-xl relative z-10 shadow-secondary">
                        <AccountProfilePicture />
                        <div className="flex flex-col my-auto">
                            <span className="text-white text-base">Michael Beck</span>
                            <span className="text-white/50 text-xs">{currentUser.email}</span>
                        </div>
                    </div>
                    <ul className="w-full bg-white flex flex-col font-roboto border-gray-300 border-4 relative bottom-2 rounded-b-xl">
                        {
                            menuButtons.map((btn, i) => {
                                return <UserMenuButton onClick={btn.func} text={btn.text} icon={btn.icon} key={i} />
                            })
                        }
                    </ul>
                    <button onClick={handleLogout} className="relative left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-editor-lgt hover:text-editor transition-colors">Sign Out</button>
                    {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
                </> : <>
                    <form onSubmit={updateAccount} className="flex flex-col gap-8 items-center">
                        <input className={inputStyles} type="password" ref={passwordRef} placeholder="New Password" required />
                        <input className={inputStyles} type="password" ref={passwordConfirmRef} placeholder="Confirm Password" required />
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

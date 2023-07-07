import React, { useState } from 'react'
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function User() {
    const [error, setError] = useState("");
    
    const { currentUser, logout } = useAuth();
    
    const navigate = useNavigate(); 

    const handleLogout = async _ => {
        setError("");

        try {
            await logout();
            navigate("/");
        } catch {
            setError("Failed to log out.");
        }
    }
  
    return (<>
        <div className="p-8 rounded-lg border-2 border-gray-border flex flex-col items-center justify-center gap-4">
            <h2 className="font-sans text-2xl">Profile</h2>
            <span><strong>Email:</strong> {currentUser.email}</span>
            {error && <div className="text-red-500 mt-4 text-sm font-roboto">{error}</div>}
            <button onClick={handleLogout} className="font-sans hover:underline">Log Out</button>
        </div>
    </>)
}

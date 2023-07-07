import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

export default function PrivateRoute({children, reverse}) {
    const { currentUser } = useAuth();
  
    if (!reverse) return currentUser ? <>{children}</> : <Navigate to="/login" />;
    else return !currentUser ? <>{children}</> : <Navigate to="/documents" />;
}

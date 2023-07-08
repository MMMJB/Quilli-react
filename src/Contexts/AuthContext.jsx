import React, { useContext, useEffect, useState } from 'react'
import app from "../Utils/firebase-config"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from "firebase/auth"

const auth = getAuth(app);
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = _ => {
        signOut(auth);
    }

    const resetPassword = email => {
        return sendPasswordResetEmail(auth, email);
    }

    const changePassword = password => {
        return updatePassword(currentUser, password);
    }

    useEffect(_ => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);
    
    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
        changePassword
    }
  
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

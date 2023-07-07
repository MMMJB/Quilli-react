import React, { useContext, useEffect, useState } from 'react'
import firebaseConfig from '../Utils/firebase-config'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

const app = initializeApp(firebaseConfig);
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
    }
  
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

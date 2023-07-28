import React, { useContext, useEffect, useState } from "react";

import app from "../Utils/firebase-config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(app);
const storage = getStorage(app);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (_) => {
    signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changePassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const changeDisplayName = (name, credential) => {
    return updateProfile(credential || currentUser, {
      displayName: name,
    });
  };

  const changeProfilePicture = async (file) => {
    const pfpRef = ref(
      storage,
      `users/${currentUser.uid}/pfp.${file.type.substring(6)}`,
    );

    await uploadBytes(pfpRef, file).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);

      await updateProfile(currentUser, {
        photoURL: url,
      });
    });
  };

  useEffect((_) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    changePassword,
    changeDisplayName,
    changeProfilePicture,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

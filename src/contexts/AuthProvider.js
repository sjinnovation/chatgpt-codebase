import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Provider login 
    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    // Email and password register 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Email and password login 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserInfo = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)

        });

        return () => {
            unsubscribe();
        }

    }, [])

    // LogOut 
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    const authInfo = {
        user,
        providerLogin,
        createUser,
        signIn,
        logOut,
        loading,
        updateUserInfo
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const providerLogIn = (provider) =>{
        return signInWithPopup(auth, provider);
        setLoading(true);
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }   

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile);
    }

    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser);
    }

    const logOut = () =>{
        return signOut(auth);
        setLoading(true);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false);
        })
            return () =>{
                unsubscribe();
            }
    }, [])

    const authInfo = {
        user, 
        providerLogIn, 
        createUser, 
        signIn, 
        verifyEmail, 
        logOut, 
        loading, 
        setLoading,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
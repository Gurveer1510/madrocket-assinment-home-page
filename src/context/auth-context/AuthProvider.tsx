import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useState, useEffect, useMemo } from "react";
import { auth } from "src/firebase/firebase";

export interface AuthContextType {
    userLoggedIn: boolean;
    currentUser: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>(
    {
        userLoggedIn: false,
        currentUser: null,
        loading: true,
    }
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async (user: any) => {
            if (user) {
                setCurrentUser({ ...user });
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const value = useMemo(() => ({
        userLoggedIn,
        currentUser,
        loading
    }), [userLoggedIn, currentUser, loading]);
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
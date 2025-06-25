import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Check login status on initial load
    useEffect(() => {
        axios
            .get('http://localhost:8080/is-logged-in', { withCredentials: true })
            .then((response) => {
                setIsLoggedIn(response.data.loggedIn);
            })
            .catch((error) => {
                console.error('Error checking login status', error);
            });
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, userRole, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};

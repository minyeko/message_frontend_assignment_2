// AuthContext.js
import React, { createContext, useState } from 'react';
import { BaseUrl, LoginCredentials } from './constants';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null
    });

    const getToken = async () => {
        try {
            const response = await axios.post(`https://mis-assignment1-backend.vercel.app/api/login/`, LoginCredentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuth({
                //isAuthenticated: true,
                //user: user,
                token: token,
            });
            return token;
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    };


    const login = (username) => {
        setAuth({
            isAuthenticated: true,
            user: { username }, // Ensure the user object contains the username
        });
    };

    const logout = () => {
        // Implement logout logic, clear localStorage, etc.
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider};

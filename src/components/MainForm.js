// MainForm.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const MainForm = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="container mt-5">
            <h2>Main Form</h2>
            {auth.isAuthenticated && auth.user ? (
                <p>Welcome, {auth.user.username}!</p>
            ) : (
                <p>Please log in to access this page.</p>
            )}
            {/* Add your main form content here */}
        </div>
    );
};

export default MainForm;

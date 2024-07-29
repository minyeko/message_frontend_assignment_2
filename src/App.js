import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Register from './components/Register';
import MainForm from './components/MainForm';

const App = () => {
    return (
        <AuthProvider>
                <TopBar />
                <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<MainForm />} />
                    {/* other routes */}
                </Routes>
        </AuthProvider>
    );
};

export default App;

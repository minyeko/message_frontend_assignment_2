import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { AuthContext } from './AuthContext';
import { BaseUrl } from './constants';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate hook here
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${BaseUrl}/api/login/`, formData);
            const { token } = response.data;


            localStorage.setItem('token', token);
            localStorage.setItem('username', formData.username);

            //login(user);
            login(formData.username);
            navigate('/main'); // Redirect to homepage after successful login
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.detail);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                {loading && (
                    <div className="progress mt-3">
                        <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: '100%' }}
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                )}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};

export default Login;

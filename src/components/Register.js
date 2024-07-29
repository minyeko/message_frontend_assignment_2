// Register.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { BaseUrl } from './constants';
import axios from 'axios';

const Register = () => {
    debugger;
    const { getToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = await getToken();
            if (token) {
                const config = {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                };

                await axios.post(`${BaseUrl}/api/register/`, formData, config);
                setSuccess('Registration successful!');
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                });
                setLoading(false);
            } else {
                setError('Login failed. Unable to obtain token.');
                setLoading(false);
            }
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group d-flex align-items-center row">
                    <label htmlFor="username" className="col col-md-2">Username</label>
                    <input
                        type="text"
                        className="col col-md-4"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <div className="form-group d-flex align-items-center row">
                    <label htmlFor="email" className="col col-md-2">Email</label>
                    <input
                        type="email"
                        className="col col-md-4"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>
                <div className="form-group d-flex align-items-center row">
                    <label htmlFor="password" className="col col-md-2">Password</label>
                    <input
                        type="password"
                        className="col col-md-4"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                    Register
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
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </form>
        </div>
    );

};

export default Register;

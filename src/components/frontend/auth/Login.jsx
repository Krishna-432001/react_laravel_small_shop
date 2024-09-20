import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceName, setdeviceName] = useState('Web');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 2) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setLoading(true);
            setMessage('');
            console.log(JSON.stringify({ email, password, deviceName }));
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        email, 
                        password,
                        device_name: deviceName }),
                });

                const data = await response.text();
                setLoading(false);
                console.log(response);
                

                if (response.ok) {
                    setMessage(`Login successful! Token: ${data}`);
                    setMessage(`Login successful! Token: ${data || 'N/A'}`);
                    console.log('Logged in:', data);

                    // Example: Logging token or other response data
                    console.log('Token:', data);
                } else {
                    setMessage('Login failed. Please try again.');
                    setErrors(data.errors || {});
                }
                
            } catch (error) {
                setLoading(false);
                setMessage('Login failed. Please try again.');
                console.log(error);                
                console.error('Error:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">

                    <label htmlFor="email" className="form-label">Email</label>

                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                </div>

                <div className="mb-3">

                    <label htmlFor="password" className="form-label">Password</label>

                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>

                    {loading ? 'Logging in...' : 'Login'}

                </button>
                
                {message && <div className={`mt-3 ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>

                    {message}
                    
                </div>}

            </form>

            <a href="/register" className="signup-link">
                Don't have an account? Sign up
            </a>
        </div>
    );
};

export default Login;
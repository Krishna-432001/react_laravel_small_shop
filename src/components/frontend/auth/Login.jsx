import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your form submission logic here
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      <h1>Welcome To Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <a href="/register" className="signup-link">
        Don't have an account? Sign up
      </a>
    </div>
  );
};

export default Login;

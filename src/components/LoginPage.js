import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Example validation, replace with real authentication logic
    const storedUser = JSON.parse(localStorage.getItem('user')); 
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      navigate('/departments');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>PulseNet LOGIN</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <a href="/signup">Sign Up</a> | <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
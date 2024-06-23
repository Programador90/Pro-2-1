import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('login/', { email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/admin'); // Redirect to the admin page after successful login
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Usuario</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

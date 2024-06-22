// src/components/Login.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ContextoAuth from '../Context/AuthContext';
import Loader from './Loader/Loader';
import '../styles/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser, user } = useContext(ContextoAuth);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    let bodyUser = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {
      const response = await axios.post('http://localhost:4000/users/login', bodyUser);
      localStorage.setItem("user", JSON.stringify(response.data.loginUser.user))
      localStorage.setItem("token", JSON.stringify(response.data.loginUser.token))
      loginUser(response.data.loginUser.user)
      navigate("/reportes")
    } catch (e) {
      const statusCode = e.response.data.status
      if (statusCode === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email o contraseña incorrecta',
        })
      }
    } finally {
      setLoading(false)
    }

  };

  if (loading) {
    <Loader />
  }
  else {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
          </form>
          <div className="register-link">
            <p>No tienes cuenta? <Link to="/register">Registrarse</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

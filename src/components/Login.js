// src/components/Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ContextoAuth from '../Context/AuthContext';
import Loader from './Loader/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(ContextoAuth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar email antes de continuar
    if (!validateEmail(email)) {
      setError('Email no válido');
      return;
    }

    setLoading(true);
    setError('');  // Limpiar errores anteriores

    let bodyUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post('https://backendseminario.onrender.com/users/login', bodyUser);
      if (response.data.loginUser.user.validated) {
        localStorage.setItem('user', JSON.stringify(response.data.loginUser.user));
        localStorage.setItem('token', JSON.stringify(response.data.loginUser.token));
        loginUser(response.data.loginUser.user);
        navigate('/denuncias');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tu cuenta no ha sido validada',
        });
      }
    } catch (e) {
      const statusCode = e.response.data.status;
      if (statusCode === 400) {
        console.log(e)
        setError('Email o contraseña incorrecta');
      } else {
        setError('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
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
          <div className="login-links">
            <p><Link to="/reestablecerContraseña">¿Olvidaste tu contraseña?</Link></p>
            <p>No tienes cuenta? <Link to="/register">Registrarse</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

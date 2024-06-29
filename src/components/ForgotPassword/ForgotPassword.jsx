// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/users/forgotPassword', { email });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Enlace enviado',
          text: 'Revisa tu correo electrónico para restablecer tu contraseña.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el enlace de restablecimiento. Verifica tu correo electrónico e intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Olvidé mi contraseña</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>
        <div className="back-to-login-link">
          <p>¿Recordaste tu contraseña? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

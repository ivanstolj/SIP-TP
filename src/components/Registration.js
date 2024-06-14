// src/components/Registration.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Registration.css';

function Registration() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log('Registration submitted:', data);
  };

  const password = watch('password');

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="firstName">Nombre:</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'El nombre es obligatorio.', minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres.' } })}
              />
            </div>
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido:</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'El apellido es obligatorio.', minLength: { value: 2, message: 'El apellido debe tener al menos 2 caracteres.' } })}
              />
            </div>
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="username"
                {...register('username', { required: 'El nombre de usuario es obligatorio.', minLength: { value: 3, message: 'El nombre de usuario debe tener al menos 3 caracteres.' } })}
              />
            </div>
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                {...register('email', { required: 'El email es obligatorio.', pattern: { value: /\S+@\S+\.\S+/, message: 'Por favor, ingrese un email válido.' } })}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                {...register('password', { required: 'La contraseña es obligatoria.', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres.' } })}
              />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Verificación de contraseña:</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', { required: 'La verificación de contraseña es obligatoria.', validate: value => value === password || 'Las contraseñas no coinciden.' })}
              />
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <div className="login-link">
          <p>Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Registration;

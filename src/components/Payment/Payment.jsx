// src/components/Payment.js
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContextoAuth from '../../Context/AuthContext';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const { plan } = location.state || {};
  const { user } = useContext(ContextoAuth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!plan) {
      navigate('/pricing'); // Redirigir a la página de precios si no hay plan seleccionado
    }
  }, [plan, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Aquí deberías integrar Mercado Pago para manejar el pago
      // Esto es solo una simulación de una llamada a la API
      setTimeout(() => {
        setLoading(false);
        alert(`Pago realizado para el plan ${plan}`);
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      alert('Error en el pago, por favor intenta nuevamente');
    }
  };

  const getPrice = () => {
    switch (plan) {
      case 'Gratis':
        return 0;
      case 'Empresarial':
        return 349.9; // Precio anual
      case 'Premium':
        return 59.9; // Precio anual
      default:
        return 0;
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Pago del Plan {plan}</h2>
        <div className="payment-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Plan seleccionado:</strong> {plan}</p>
          <p><strong>Total a pagar:</strong> ${getPrice()}</p>
        </div>
        <button onClick={handlePayment} disabled={loading} className="payment-button">
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </div>
    </div>
  );
};

export default Payment;

// src/components/Pricing.js
import React, { useState, useContext } from 'react';
import PricingCard from './PricingCard';
import '../styles/PricingApp.css';
import ContextoAuth from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [selectMonthly, setSelectMonthly] = useState(true);
  const { user } = useContext(ContextoAuth);
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate('/payment', { state: { plan } });
  };

  return (
    <div className="PricingApp">
      <div className="app-container">
        <header>
          <h1 className="header-topic">Nuestros Planes</h1>
          <div className="header-row">
            <p>Anual</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Mensual</p>
          </div>
        </header>
        <div className="pricing-cards">
          <PricingCard
            title="Gratis"
            price={selectMonthly ? 'Gratis' : 'Gratis'}
            storage="Configuraciones Limitadas"
            users="1 usuario"
            sendUp="Sin Inteligencia Artificial"
            isCurrentPlan={!user.premium && user.premium !== undefined}
            handleSubscribe={() => handleSubscribe('Gratis')}
          />
          <PricingCard
            title="Empresarial"
            price={selectMonthly ? '34.99' : '349.9'}
            storage="Configuraciones Personalizadas"
            users="10 usuarios"
            sendUp="Acompañante de Inteligencia Artificial"
            isCurrentPlan={user.premium === 'Empresarial'}
            handleSubscribe={() => handleSubscribe('Empresarial')}
          />
          <PricingCard
            title="Premium"
            price={selectMonthly ? '5.99' : '59.9'}
            storage="Configuraciones Personalizadas"
            users="1 usuario"
            sendUp="Acompañante de Inteligencia Artificial"
            isCurrentPlan={user.premium === 'Premium'}
            handleSubscribe={() => handleSubscribe('Premium')}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;

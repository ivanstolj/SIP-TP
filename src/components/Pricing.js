// src/components/Pricing.js
import React, { useState } from 'react';
import PricingCard from './PricingCard';
import '../styles/PricingApp.css';

const Pricing = () => {
  const [selectMonthly, setSelectMonthly] = useState(true);

  return (
    <div className="PricingApp">
      <div className="app-container">
        {/* Header */}
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
        {/* Cards here */}
        <div className="pricing-cards">
          <PricingCard
            title="Gratis"
            price={selectMonthly ? 'Gratis' : 'Gratis'}
            storage="Configuraciones Limitadas"
            users="1 usuario"
            sendUp="Sin Inteligencia Artificial"
          />
          <PricingCard
            title="Empresarial"
            price={selectMonthly ? '34.99' : '349.9'}
            storage="Configuraciones Personalizadas"
            users="10 usuarios"
            sendUp="Acompañante de Inteligencia Artificial"
          />
          <PricingCard
            title="Premium"
            price={selectMonthly ? '5.99' : '59.9'}
            storage="Configuraciones Personalizadas"
            users="1 usuario"
            sendUp="Acompañante de Inteligencia Artificial"
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;

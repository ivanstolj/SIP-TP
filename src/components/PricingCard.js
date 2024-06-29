// src/components/PricingCard.js
import React from "react";
import "../styles/PricingCard.css";

const PricingCard = ({ title, price, storage, users, sendUp, isCurrentPlan, handleSubscribe }) => {
  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      <div className="card-features">
        <div className="card-storage">{storage}</div>
        <div className="card-users-allowed">{users} en total</div>
        <div className="card-send-up">{sendUp}</div>
      </div>
      {isCurrentPlan ? (
        <button className="current-plan-btn" disabled>
          Plan Actual
        </button>
      ) : (
        <button className="card-btn" onClick={handleSubscribe}>
          Suscribirse
        </button>
      )}
    </div>
  );
};

export default PricingCard;

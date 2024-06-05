import React from "react";
import "../styles/PricingCard.css";
const PricingCard = ({ title, price, storage, users, sendUp }) => {
  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      {/* features here */}
      <div className="card-features">
        <div className="card-storage">{storage}</div>
        <div className="card-users-allowed">{users}  en total</div>
        <div className="card-send-up">{sendUp}</div>
      </div>
      <button className="card-btn">Subscribirse</button>
    </div>
  );
};

export default PricingCard;

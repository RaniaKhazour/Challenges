import React from "react";

import "./Card.css";

const Card = ({ image, title, subtitle, button }) => {
  return (
    <div className="result-card">
      <img src={image} alt={title} className="image-card" loading="lazy" width="300"	height="380"/>
      <div className="info-card">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <button className="read-more">{button}</button>
    </div>
  );
};

export default Card;

import React from "react";

import "./CardDetails.css";

const CardDetails = ({ title, subtitle, description }) => {
  return (
    <section className="detail">
        <div className="info">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
        <p>{description}</p>
    </section>
  );
};

export default CardDetails;

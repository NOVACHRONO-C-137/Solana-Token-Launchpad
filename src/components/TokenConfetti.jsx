import React, { useState } from "react";
import "./TokenConfetti.css";

export const TokenConfetti = ({ image }) => {
  const [particles] = useState(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      animationDuration: (Math.random() * 2 + 6).toFixed(1) + "s",
      animationDelay: Math.random() * 3 + "s",
      size: Math.random() * 40 + 30 + "px",
    }));
  });

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <img
          key={p.id}
          src={image}
          alt="coin"
          className="confetti-coin"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

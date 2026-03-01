import React from "react";
import "./Loader.css";

export function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-ring"></div>

        <img src="/solana.png" alt="Solana" className="loader-image" />

        <p className="loader-text">INITIALIZING LAUNCHPAD...</p>
      </div>
    </div>
  );
}

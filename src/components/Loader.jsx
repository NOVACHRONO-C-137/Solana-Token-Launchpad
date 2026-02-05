import React from "react";
import "./Loader.css";

const solanaLogo = "https://cryptologos.cc/logos/solana-sol-logo.png";

export function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-ring"></div>

        <img src={solanaLogo} alt="Solana" className="loader-image" />

        <p className="loader-text">INITIALIZING LAUNCHPAD...</p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./FloatingCoins.css";

export function FloatingCoins() {
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      setOffset({ x: -x, y: -y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`floating-container ${expanded ? "" : "initial-state"}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {/* Coin 1: Solana */}
      <div className="coin-wrapper item-1">
        <img src="/solana.png" alt="Solana" />
      </div>

      {/* Coin 2: Doge */}
      <div className="coin-wrapper item-2">
        <img src="/doge.png" alt="Doge" />
      </div>

      {/* Coin 3: Pepe */}
      <div className="coin-wrapper item-3">
        <img src="/pepe.png" alt="Pepe" />
      </div>

      {/* Coin 4: Bonk */}
      <div className="coin-wrapper item-4">
        <img src="/bonk.png" alt="Bonk" />
      </div>

      {/* Coin 5: BTC */}
      <div className="coin-wrapper item-5">
        <img src="/btc.png" alt="BTC" />
      </div>

      {/* Coin 6: WIF */}
      <div className="coin-wrapper item-6">
        <img src="/wif.png" alt="WIF" />
      </div>

      {/* Coin 7: SHIB */}
      <div className="coin-wrapper item-7">
        <img src="/shib.png" alt="SHIB" />
      </div>

      {/* Coin 8: USDC */}
      <div className="coin-wrapper item-8">
        <img src="/usdc.png" alt="USDC" />
      </div>
    </div>
  );
}

//very bad

import React from "react";
import "./SuccessModal.css";

import solscanLogoSvg from "../assets/solscan-logo-dark.svg";

const shortenAddress = (address, chars = 4) => {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const SuccessModal = ({
  isOpen,
  onClose,
  mintAddress,
  name,
  symbol,
  image,
  supply,
  blockhash,
}) => {
  if (!isOpen) return null;

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={handleCardClick}>
        <button className="modal-close-icon" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="modal-title">Token Deployed On Solana Blockchain</h2>
        <h3 className="modal-subtitle">
          Your token is inside your wallet now, check it, trade it!!
        </h3>

        <div className="modal-image-wrapper">
          <img src={image} alt={name} className="modal-token-image" />
        </div>

        <div className="modal-info">
          <div className="info-row">
            <div className="info-label-group">
              <svg
                className="label-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <span className="info-label">Name</span>
            </div>
            <span className="info-value">{name}</span>
          </div>

          <div className="info-row">
            <div className="info-label-group">
              <svg
                className="label-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
              </svg>
              <span className="info-label">Symbol</span>
            </div>
            <span className="info-value">{symbol}</span>
          </div>

          <div className="info-row">
            <div className="info-label-group">
              <svg
                className="label-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
              </svg>
              <span className="info-label">Supply</span>
            </div>
            <span className="info-value">{supply}</span>
          </div>

          <div className="info-row">
            <div className="info-label-group">
              <svg
                className="label-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <span className="info-label">Address</span>
            </div>
            <span className="info-value address-text">
              {shortenAddress(mintAddress)}
            </span>
          </div>

          <div className="info-row">
            <div className="info-label-group">
              <svg
                className="label-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path
                  opacity="0.2"
                  d="M464.613,0H47.388C21.217,0,0.001,21.216,0.001,47.388v417.226C0.001,490.785,21.217,512,47.387,512 h417.226c26.17,0,47.386-21.216,47.386-47.386V47.388C512.001,21.216,490.785,0,464.613,0z"
                />

                <path d="M143.926,353.167h-23.65c-14.908,0-26.733-11.824-26.733-26.733 c0-14.395,11.825-26.733,26.733-26.733h32.904l15.424-89.455h-29.819c-14.395,0-26.733-12.338-26.733-26.733 c0-14.395,12.338-26.733,26.733-26.733h39.073L188.14,95.6c2.057-13.367,13.367-22.108,26.733-22.108 c16.966,0,28.79,15.424,26.733,31.361l-9.254,51.926h80.716L323.351,95.6c2.057-13.367,13.367-22.108,27.248-22.108 c16.452,0,28.79,15.424,26.22,31.361l-8.739,51.926h23.649c14.395,0,26.733,11.824,26.733,26.733 c0,14.395-12.338,26.733-26.733,26.733h-32.904L343.402,299.7h29.303c14.908,0,26.733,11.825,26.733,26.733 c0,14.395-11.825,26.733-26.733,26.733h-38.558l-10.796,63.236c-2.057,12.853-13.367,22.108-26.733,22.108 c-16.965,0-29.305-15.424-26.733-31.361l9.768-53.982h-80.718l-10.797,63.236c-2.057,11.31-11.824,22.108-27.248,22.108 c-16.452,0-28.79-13.882-26.22-31.361L143.926,353.167z M288.39,299.699l15.423-89.455h-80.201l-15.423,89.455H288.39z" />
              </svg>
              <span className="info-label">Blockhash</span>
            </div>
            <span className="info-value address-text">
              {blockhash ? shortenAddress(blockhash) : "..."}
            </span>
          </div>
        </div>

        <a
          href={`https://solscan.io/token/${mintAddress}?cluster=devnet`}
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          <img src={solscanLogoSvg} alt="Solscan" className="btn-icon" />
          View on Solscan
        </a>
      </div>
    </div>
  );
};

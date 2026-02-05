import { useState, useEffect } from "react";
import "./App.css";

import { Launchpad } from "./components/Launchpad";
import { FloatingCoins } from "./components/FloatingCoins";
import { Loader } from "./components/Loader";

// Wallet Imports
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const MINT_ICON = "/mint.svg";
const ICON_THEME_LIGHT = "/sun.svg";
const ICON_THEME_DARK = "/moon.svg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="app-container">
            {isLoading ? <Loader /> : <FloatingCoins />}

            <header className="header-bar">
              <div className="brand-container">
                <img src={MINT_ICON} alt="icon" className="app-logo" />
                <h2 className="logo-text">MINT//LAB</h2>
              </div>

              <div className="header-actions">
                <button className="theme-toggle" onClick={toggleTheme}>
                  <img
                    src={theme === "dark" ? ICON_THEME_LIGHT : ICON_THEME_DARK}
                    alt="theme"
                    className="theme-toggle-icon"
                  />
                </button>

                <WalletMultiButton />
              </div>
            </header>

            <Launchpad />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [coins, setCoins] = useState([]);
  const [wallets, setWallets] = useState([]);

  return (
    <AppContext.Provider value={{ coins, setCoins, wallets, setWallets }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
    return useContext(AppContext);
  }
  

  